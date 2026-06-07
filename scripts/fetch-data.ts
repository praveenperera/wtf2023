import { mkdir, writeFile } from "node:fs/promises";
import { dirname, join } from "node:path";

type Snapshot = {
  source: string;
  sourceUrl: string;
  fetchedAt: string;
  range: string;
  columns: string[];
  rows: Array<Record<string, string | number | null>>;
  notes: string[];
};

type BlockchainBlock = {
  hash: string;
  height: number;
  time: number;
  main_chain: boolean;
  tx: BlockchainTransaction[];
};

type BlockchainTransaction = {
  hash: string;
  weight: number;
  fee: number;
  inputs: Array<{
    prev_out?: unknown;
    script?: string;
    witness?: string;
  }>;
  out: Array<{
    script?: string;
  }>;
};

const outDir = join(process.cwd(), "src/data/generated");
const fetchedAt = new Date().toISOString();
const impactSampleHeights = [
  772000, 773000, 774000, 775000, 775500, 776000, 776500, 777000, 777500,
  778000, 779000, 780000,
];

async function main() {
  await mkdir(outDir, { recursive: true });

  const statuses: Array<{ file: string; status: string; notes: string[] }> = [];

  const feeRates = await fetchMempoolFeeRates();
  await writeSnapshot("mempool-fee-rates.json", feeRates);
  statuses.push({
    file: "mempool-fee-rates.json",
    status: "fresh",
    notes: feeRates.notes,
  });

  const utxo = await fetchUtxoSet();
  await writeSnapshot("utxo-set.json", utxo);
  statuses.push({
    file: "utxo-set.json",
    status: utxo.rows.length ? "fresh" : "unavailable",
    notes: utxo.notes,
  });

  const impact = await fetchDuneImpact();
  await writeSnapshot("impact-series.json", impact);
  statuses.push({
    file: "impact-series.json",
    status: impact.rows.length ? "fresh" : "stale-or-unavailable",
    notes: impact.notes,
  });

  const pressure = makePressureMapSnapshot();
  await writeFile(
    join(outDir, "blockspace-pressure-map.json"),
    `${JSON.stringify(pressure, null, 2)}\n`,
  );
  statuses.push({
    file: "blockspace-pressure-map.json",
    status: "source-text-approximation",
    notes: pressure.notes,
  });

  await writeFile(
    join(outDir, "data-manifest.json"),
    `${JSON.stringify(
      {
        source: "local refresh manifest",
        sourceUrl: "scripts/fetch-data.ts",
        fetchedAt,
        range: "mixed",
        columns: ["file", "status", "notes"],
        rows: statuses,
        notes: [
          "Normal builds use committed JSON snapshots only",
          "Dune snapshots are used when available; otherwise sampled Blockchain.com block classification is used",
          "Statoshi snapshots are included from the committed generated data",
        ],
      },
      null,
      2,
    )}\n`,
  );
}

async function fetchMempoolFeeRates(): Promise<Snapshot> {
  const sourceUrl = "https://mempool.space/api/v1/mining/blocks/fee-rates/all";
  const rows = await fetchJson<Array<Record<string, number>>>(sourceUrl);
  const filtered = sampleRows(
    rows
      .filter((row) => row.timestamp >= 1667260800)
      .map((row) => ({
        date: toDate(row.timestamp),
        median: row.avgFee_50,
        p75: row.avgFee_75,
        p90: row.avgFee_90,
      })),
    180,
  );

  return {
    source: "mempool.space mining fee-rate history",
    sourceUrl,
    fetchedAt,
    range: "2022-11-01 to latest available",
    columns: ["date", "median", "p75", "p90"],
    rows: filtered,
    notes: [
      "Values are fee-rate percentiles from mined blocks, not a transaction-by-category split",
    ],
  };
}

async function fetchUtxoSet(): Promise<Snapshot> {
  const targets = [
    ["dbSizeBytes", "stats.gauges.utxoset.dbSizeBytes"],
    ["txOutputs", "stats.gauges.utxoset.txOutputs"],
  ] as const;
  const rowsByDate = new Map<string, Record<string, string | number | null>>();
  const notes = [
    "Fetched from the Statoshi Graphite render endpoint for the committed generated snapshot",
  ];

  for (const [column, target] of targets) {
    const url = `https://statoshi.info:3000/api/datasources/proxy/uid/000000001/render?target=aliasByMetric(${target})&from=1672531200&until=now&format=json`;
    try {
      const series = await fetchJson<
        Array<{ datapoints: Array<[number | null, number]> }>
      >(url, {
        insecureTls: true,
      });
      for (const [value, timestamp] of sampleRows(
        series[0]?.datapoints ?? [],
        180,
      )) {
        const date = toDate(timestamp);
        const row = rowsByDate.get(date) ?? {
          date,
          dbSizeGb: null,
          txOutputsMillions: null,
        };
        row[column === "dbSizeBytes" ? "dbSizeGb" : "txOutputsMillions"] =
          value === null
            ? null
            : column === "dbSizeBytes"
              ? Number((value / 1024 ** 3).toFixed(2))
              : Number((value / 1_000_000).toFixed(2));
        rowsByDate.set(date, row);
      }
    } catch (error) {
      notes.push(`Unable to refresh ${column}: ${String(error)}`);
    }
  }

  return {
    source: "Statoshi UTXO set dashboard",
    sourceUrl:
      "https://statoshi.info:3000/d/000000009/unspent-transaction-output-set",
    fetchedAt,
    range: "2023-01-01 to latest available",
    columns: ["date", "dbSizeGb", "txOutputsMillions"],
    rows: [...rowsByDate.values()].sort((a, b) =>
      String(a.date).localeCompare(String(b.date)),
    ),
    notes,
  };
}

async function fetchDuneImpact(): Promise<Snapshot> {
  if (!process.env.DUNE_API_KEY) {
    return fetchSampledImpact();
  }

  const result = await fetchJson<{
    result?: { rows?: Array<Record<string, unknown>> };
  }>("https://api.dune.com/api/v1/query/3307069/results", {
    headers: { "x-dune-api-key": process.env.DUNE_API_KEY },
  });

  const rows = (result.result?.rows ?? []).map((row) => normalizeDuneRow(row));

  return {
    source: "Dune query 3307069",
    sourceUrl: "https://api.dune.com/api/v1/query/3307069/results",
    fetchedAt,
    range: "query result range",
    columns: [
      "date",
      "payments",
      "nonPayments",
      "paymentFees",
      "nonPaymentFees",
    ],
    rows: sampleRows(rows, 180),
    notes: ["Dune result columns are normalized by best-effort key matching"],
  };
}

async function fetchSampledImpact(): Promise<Snapshot> {
  const rows = [];

  for (const height of impactSampleHeights) {
    const response = await fetchJson<{ blocks: BlockchainBlock[] }>(
      `https://blockchain.info/block-height/${height}?format=json`,
    );
    const block = response.blocks.find((candidate) => candidate.main_chain);

    if (!block) {
      throw new Error(`No main-chain block found for height ${height}`);
    }

    rows.push(makeImpactRow(block));
  }

  return {
    source: "Blockchain.com sampled Bitcoin blocks",
    sourceUrl: "https://www.blockchain.com/explorer/api/blockchain_api",
    fetchedAt,
    range: "sampled blocks from 2023-01-15 to 2023-03-09",
    columns: [
      "date",
      "height",
      "payments",
      "nonPayments",
      "paymentFees",
      "nonPaymentFees",
    ],
    rows,
    notes: [
      "This snapshot classifies sampled Bitcoin blocks from Blockchain.com raw block transactions",
      "Non-monetary classification includes OP_RETURN outputs, bare multisig outputs, and ordinal inscription witness envelopes",
      "Sample heights use weekly pre-wave baselines, denser 500-block samples during the February onset, and two post-onset checks",
      "Shares are percentages of non-coinbase transaction weight and transaction fees in each sampled block",
    ],
  };
}

function makeImpactRow(block: BlockchainBlock) {
  let paymentWeight = 0;
  let nonPaymentWeight = 0;
  let paymentFees = 0;
  let nonPaymentFees = 0;

  for (const transaction of block.tx) {
    if (isCoinbaseTransaction(transaction)) {
      continue;
    }

    if (isNonPaymentTransaction(transaction)) {
      nonPaymentWeight += transaction.weight;
      nonPaymentFees += transaction.fee;
      continue;
    }

    paymentWeight += transaction.weight;
    paymentFees += transaction.fee;
  }

  const totalWeight = paymentWeight + nonPaymentWeight;
  const totalFees = paymentFees + nonPaymentFees;

  return {
    date: new Date(block.time * 1000).toISOString().slice(0, 10),
    height: block.height,
    payments: percent(paymentWeight, totalWeight),
    nonPayments: percent(nonPaymentWeight, totalWeight),
    paymentFees: percent(paymentFees, totalFees),
    nonPaymentFees: percent(nonPaymentFees, totalFees),
  };
}

function isCoinbaseTransaction(transaction: BlockchainTransaction) {
  return transaction.inputs.some((input) => input.prev_out === undefined);
}

function isNonPaymentTransaction(transaction: BlockchainTransaction) {
  return (
    transaction.out.some((output) => isDataOutput(output.script ?? "")) ||
    transaction.inputs.some((input) =>
      (input.witness ?? "").toLowerCase().includes("0063036f7264"),
    )
  );
}

function isDataOutput(script: string) {
  return script.startsWith("6a") || isBareMultisigOutput(script);
}

function isBareMultisigOutput(script: string) {
  return /^(5[1-9a-f]|60)(21|41)[0-9a-f]+(5[1-9a-f]|60)ae$/i.test(script);
}

function percent(value: number, total: number) {
  if (total === 0) return 0;
  return Number(((value / total) * 100).toFixed(1));
}

function makePressureMapSnapshot() {
  return {
    source: "Dune BTC spam analysis link",
    sourceUrl: "https://dune.com/piratebiscuit/btc-spam-analysis",
    fetchedAt,
    range: "February 2023 wave onward",
    columns: ["label", "kind", "share", "note"],
    categories: [
      {
        label: "Monetary use",
        kind: "payments",
        share: 50,
        note: "Monetary transactions still compete for confirmation against non-monetary data",
      },
      {
        label: "Inscriptions",
        kind: "inscriptions",
        share: 34,
        note: "Large witness data consumes blockspace and affects fee pressure",
      },
      {
        label: "Bare multisig",
        kind: "bareMultisig",
        share: 10,
        note: "UTXO-heavy data creates long-lived validation and storage costs",
      },
      {
        label: "OP_RETURN",
        kind: "opReturn",
        share: 3,
        note: "Small data-carrier outputs still compete for scarce blockspace",
      },
      {
        label: "Other",
        kind: "other",
        share: 3,
        note: "Remainder bucket for non-monetary and unknown transaction categories",
      },
      {
        label: "Direct-to-miner submissions",
        kind: "other",
        note: "A bypass lane that can avoid ordinary peer relay policy",
      },
    ],
    notes: [
      "This is an explanatory map using approximate ranges, not a measured category split",
      "Direct-to-miner submission is represented as a path rather than a percentage",
    ],
  };
}

async function writeSnapshot(file: string, snapshot: Snapshot) {
  await mkdir(dirname(join(outDir, file)), { recursive: true });
  await writeFile(join(outDir, file), `${JSON.stringify(snapshot, null, 2)}\n`);
}

async function fetchJson<T>(
  url: string,
  options: { headers?: Record<string, string>; insecureTls?: boolean } = {},
): Promise<T> {
  const init: RequestInit = { headers: options.headers };
  if (options.insecureTls) {
    process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";
  }
  const response = await fetch(url, init);
  if (!response.ok)
    throw new Error(`${response.status} ${response.statusText}`);
  return (await response.json()) as T;
}

function sampleRows<T>(rows: T[], max: number) {
  if (rows.length <= max) return rows;
  const step = rows.length / max;
  return Array.from(
    { length: max },
    (_, index) => rows[Math.floor(index * step)],
  );
}

function toDate(timestamp: number) {
  return new Date(timestamp * 1000).toISOString().slice(0, 10);
}

function normalizeDuneRow(row: Record<string, unknown>) {
  const get = (...keys: string[]) => {
    const entry = Object.entries(row).find(([key]) =>
      keys.some((candidate) => key.toLowerCase().includes(candidate)),
    );
    return typeof entry?.[1] === "number" ? entry[1] : null;
  };

  return {
    date: String(row.day ?? row.date ?? row.block_date ?? ""),
    payments: get("payment_blockspace", "payment_share", "payments"),
    nonPayments: get("non_payment_blockspace", "nonpayment", "inscription"),
    paymentFees: get("payment_fee"),
    nonPaymentFees: get("non_payment_fee", "nonpayment_fee"),
  };
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
