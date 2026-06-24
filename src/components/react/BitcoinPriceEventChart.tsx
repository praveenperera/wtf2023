import { Activity, ArrowUpRight, TrendingDown, TrendingUp } from "lucide-react";
import { useEffect, useMemo, useRef, useState } from "react";
import {
  CartesianGrid,
  Line,
  LineChart,
  ReferenceDot,
  ReferenceLine,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

const CORE_V30_RELEASE_DATE = "2025-10-10";
const ONE_DAY_MS = 24 * 60 * 60 * 1000;
const PRICE_CHART_START_TIME = Date.UTC(2025, 7, 1);
const MARKET_CHART_URL =
  "https://api.coingecko.com/api/v3/coins/bitcoin/market_chart/range";
const CURRENT_PRICE_URL = "https://api.coingecko.com/api/v3/simple/price";
const COINBASE_CANDLES_URL =
  "https://api.exchange.coinbase.com/products/BTC-USD/candles";
const COINBASE_TICKER_URL =
  "https://api.exchange.coinbase.com/products/BTC-USD/ticker";
const COINBASE_DAILY_CANDLE_LIMIT = 250;

type PriceRow = {
  date: string;
  price: number;
  timestamp: number;
};

type PriceState =
  | { status: "loading" }
  | { status: "ready"; rows: PriceRow[]; source: string }
  | { status: "error"; message: string };

const chartMargin = { top: 18, right: 20, bottom: 4, left: 0 };
const axisTick = { fill: "var(--dim)", fontSize: 11 };
const tooltipContentStyle = {
  background: "var(--surface)",
  border: "1px solid var(--border)",
  borderRadius: 8,
  boxShadow:
    "0 16px 40px color-mix(in srgb, var(--foreground) 12%, transparent)",
  color: "var(--foreground)",
};

function isPricePoint(value: unknown): value is [number, number] {
  return (
    Array.isArray(value) &&
    value.length >= 2 &&
    typeof value[0] === "number" &&
    typeof value[1] === "number" &&
    Number.isFinite(value[0]) &&
    Number.isFinite(value[1])
  );
}

function isCoinbaseCandle(
  value: unknown,
): value is [number, number, number, number, number, number] {
  return (
    Array.isArray(value) &&
    value.length >= 6 &&
    value.every((item) => typeof item === "number" && Number.isFinite(item))
  );
}

function toDateKey(timestamp: number) {
  return new Date(timestamp).toISOString().slice(0, 10);
}

function formatDate(value: string | number) {
  const parsed =
    typeof value === "number"
      ? new Date(value)
      : new Date(`${value}T00:00:00Z`);

  return new Intl.DateTimeFormat("en", {
    day: "numeric",
    month: "short",
    timeZone: "UTC",
  }).format(parsed);
}

function formatFullDate(value: string | number) {
  const parsed =
    typeof value === "number"
      ? new Date(value)
      : new Date(`${value}T00:00:00Z`);

  return new Intl.DateTimeFormat("en", {
    day: "numeric",
    month: "short",
    timeZone: "UTC",
    year: "numeric",
  }).format(parsed);
}

function formatUsd(value: number) {
  return new Intl.NumberFormat("en", {
    currency: "USD",
    maximumFractionDigits: 0,
    style: "currency",
  }).format(value);
}

function formatPercent(value: number, signed = false) {
  const prefix = signed && value > 0 ? "+" : "";

  return `${prefix}${value.toFixed(1)}%`;
}

function parseHistoryRows(input: unknown) {
  if (
    typeof input !== "object" ||
    input === null ||
    !("prices" in input) ||
    !Array.isArray(input.prices)
  ) {
    throw new Error("CoinGecko history response did not include prices");
  }

  return input.prices
    .filter(isPricePoint)
    .map(([timestamp, price]) => ({
      date: toDateKey(timestamp),
      price,
      timestamp,
    }))
    .filter((row) => row.timestamp >= PRICE_CHART_START_TIME);
}

function parseCurrentPriceRow(input: unknown) {
  if (typeof input !== "object" || input === null || !("bitcoin" in input)) {
    return null;
  }

  const bitcoin = input.bitcoin;

  if (
    typeof bitcoin !== "object" ||
    bitcoin === null ||
    !("usd" in bitcoin) ||
    typeof bitcoin.usd !== "number" ||
    !Number.isFinite(bitcoin.usd)
  ) {
    return null;
  }

  const timestamp =
    "last_updated_at" in bitcoin &&
    typeof bitcoin.last_updated_at === "number" &&
    Number.isFinite(bitcoin.last_updated_at)
      ? bitcoin.last_updated_at * 1000
      : Date.now();

  return {
    date: toDateKey(timestamp),
    price: bitcoin.usd,
    timestamp,
  };
}

function parseCoinbaseHistoryRows(input: unknown) {
  if (!Array.isArray(input)) {
    throw new Error("coinbase history response did not include candles");
  }

  return input
    .filter(isCoinbaseCandle)
    .map(([timestampSeconds, , , , close]) => {
      const timestamp = timestampSeconds * 1000;

      return {
        date: toDateKey(timestamp),
        price: close,
        timestamp,
      };
    })
    .filter((row) => row.timestamp >= PRICE_CHART_START_TIME);
}

function parseCoinbaseCurrentPriceRow(input: unknown) {
  if (
    typeof input !== "object" ||
    input === null ||
    !("price" in input) ||
    typeof input.price !== "string"
  ) {
    return null;
  }

  const price = Number(input.price);

  if (!Number.isFinite(price)) {
    return null;
  }

  const timestamp =
    "time" in input && typeof input.time === "string"
      ? Date.parse(input.time)
      : Date.now();

  return {
    date: toDateKey(Number.isFinite(timestamp) ? timestamp : Date.now()),
    price,
    timestamp: Number.isFinite(timestamp) ? timestamp : Date.now(),
  };
}

function mergeRows(historyRows: PriceRow[], currentRow: PriceRow | null) {
  const rowsByDate = new Map(historyRows.map((row) => [row.date, row]));

  if (currentRow) {
    rowsByDate.set(currentRow.date, currentRow);
  }

  return [...rowsByDate.values()].sort((left, right) => {
    return left.timestamp - right.timestamp;
  });
}

async function fetchPriceRows(signal: AbortSignal) {
  try {
    return {
      rows: await fetchCoinGeckoPriceRows(signal),
      source: "CoinGecko",
    };
  } catch {
    return {
      rows: await fetchCoinbasePriceRows(signal),
      source: "Coinbase Exchange",
    };
  }
}

async function fetchJson(url: URL | string, signal: AbortSignal) {
  const response = await fetch(url, { signal });

  if (!response.ok) {
    throw new Error("market data request failed");
  }

  return response.json() as Promise<unknown>;
}

function buildCoinbaseCandleUrls() {
  const urls: URL[] = [];
  let startTime = PRICE_CHART_START_TIME;
  const now = Date.now();
  const chunkMs = COINBASE_DAILY_CANDLE_LIMIT * ONE_DAY_MS;

  while (startTime < now) {
    const endTime = Math.min(startTime + chunkMs, now);
    const url = new URL(COINBASE_CANDLES_URL);

    url.searchParams.set("granularity", "86400");
    url.searchParams.set("start", new Date(startTime).toISOString());
    url.searchParams.set("end", new Date(endTime).toISOString());
    urls.push(url);
    startTime = endTime;
  }

  return urls;
}

async function fetchCoinbasePriceRows(signal: AbortSignal) {
  const candleUrls = buildCoinbaseCandleUrls();
  const [tickerJson, ...candleJsonResponses] = await Promise.all([
    fetchJson(COINBASE_TICKER_URL, signal),
    ...candleUrls.map((url) => fetchJson(url, signal)),
  ]);
  const historyRows = candleJsonResponses.flatMap(parseCoinbaseHistoryRows);
  const currentRow = parseCoinbaseCurrentPriceRow(tickerJson);
  const rows = mergeRows(historyRows, currentRow);

  if (rows.length === 0) {
    throw new Error("market data request failed");
  }

  return rows;
}

async function fetchCoinGeckoPriceRows(signal: AbortSignal) {
  const historyUrl = new URL(MARKET_CHART_URL);
  historyUrl.searchParams.set("vs_currency", "usd");
  historyUrl.searchParams.set(
    "from",
    String(Math.floor(PRICE_CHART_START_TIME / 1000)),
  );
  historyUrl.searchParams.set("to", String(Math.floor(Date.now() / 1000)));

  const currentUrl = new URL(CURRENT_PRICE_URL);
  currentUrl.searchParams.set("ids", "bitcoin");
  currentUrl.searchParams.set("vs_currencies", "usd");
  currentUrl.searchParams.set("include_last_updated_at", "true");

  const [historyJson, currentJson] = (await Promise.all([
    fetchJson(historyUrl, signal),
    fetchJson(currentUrl, signal),
  ])) as [unknown, unknown];

  return mergeRows(
    parseHistoryRows(historyJson),
    parseCurrentPriceRow(currentJson),
  );
}

function useBitcoinPriceRows() {
  const [state, setState] = useState<PriceState>({ status: "loading" });

  useEffect(() => {
    const abortController = new AbortController();

    fetchPriceRows(abortController.signal)
      .then(({ rows, source }) => {
        if (rows.length === 0) {
          setState({
            message: "BTC/USD market data is unavailable right now.",
            status: "error",
          });
          return;
        }

        setState({ rows, source, status: "ready" });
      })
      .catch(() => {
        if (abortController.signal.aborted) {
          return;
        }

        setState({
          message: "BTC/USD market data is unavailable right now.",
          status: "error",
        });
      });

    return () => abortController.abort();
  }, []);

  return state;
}

export default function BitcoinPriceEventChart() {
  const state = useBitcoinPriceRows();
  const chartRef = useRef<HTMLDivElement>(null);
  const [chartSize, setChartSize] = useState({ height: 0, width: 0 });
  const summary = useMemo(() => {
    if (state.status !== "ready") {
      return null;
    }

    const latestRow = state.rows[state.rows.length - 1];
    const releaseRow =
      state.rows.find((row) => row.date === CORE_V30_RELEASE_DATE) ??
      state.rows[0];
    const percentChange =
      ((latestRow.price - releaseRow.price) / releaseRow.price) * 100;
    const declinePercent = Math.max(0, -percentChange);

    return {
      declinePercent,
      latestRow,
      percentChange,
      releaseRow,
    };
  }, [state]);

  useEffect(() => {
    if (state.status !== "ready") {
      return;
    }

    const node = chartRef.current;

    if (!node) {
      return;
    }

    const updateSize = () => {
      const rect = node.getBoundingClientRect();

      setChartSize((currentSize) => {
        const nextSize = {
          height: Math.max(0, Math.floor(rect.height)),
          width: Math.max(0, Math.floor(rect.width)),
        };

        if (
          currentSize.height === nextSize.height &&
          currentSize.width === nextSize.width
        ) {
          return currentSize;
        }

        return nextSize;
      });
    };

    updateSize();

    const resizeObserver = new ResizeObserver(updateSize);
    resizeObserver.observe(node);

    return () => resizeObserver.disconnect();
  }, [state.status]);

  if (state.status === "loading") {
    return (
      <article
        aria-busy="true"
        className="data-panel grid min-h-[32rem] content-center gap-5 p-5 text-center"
      >
        <Activity aria-hidden="true" className="mx-auto size-6 text-accent" />
        <div>
          <h3 className="text-lg font-semibold text-foreground">
            BTC/USD before and after Bitcoin Core v30.0
          </h3>
          <p className="mt-2 text-sm leading-6 text-muted">
            Fetching the current market chart.
          </p>
        </div>
      </article>
    );
  }

  if (state.status === "error") {
    return (
      <article className="data-panel grid min-h-[32rem] content-center gap-5 p-5 text-center">
        <TrendingDown aria-hidden="true" className="mx-auto size-6 text-risk" />
        <div>
          <h3 className="text-lg font-semibold text-foreground">
            BTC/USD before and after Bitcoin Core v30.0
          </h3>
          <p className="mt-2 text-sm leading-6 text-muted">{state.message}</p>
        </div>
      </article>
    );
  }

  if (!summary) {
    return (
      <article className="data-panel grid min-h-[32rem] content-center gap-5 p-5 text-center">
        <TrendingDown aria-hidden="true" className="mx-auto size-6 text-risk" />
        <div>
          <h3 className="text-lg font-semibold text-foreground">
            BTC/USD before and after Bitcoin Core v30.0
          </h3>
          <p className="mt-2 text-sm leading-6 text-muted">
            BTC/USD market data is unavailable right now.
          </p>
        </div>
      </article>
    );
  }

  const isDown = summary.percentChange < 0;
  const TrendIcon = isDown ? TrendingDown : TrendingUp;
  const trendClassName = isDown ? "text-risk" : "text-payment";
  const trendLabel = isDown ? "Current decline" : "Current change";
  const chartHeight = Math.max(1, chartSize.height - 16);
  const chartWidth = Math.max(1, chartSize.width - 16);
  const shouldRenderChart = chartSize.height > 0 && chartSize.width > 0;

  return (
    <article className="data-panel flex min-h-full min-w-0 flex-col p-5">
      <div className="grid gap-4 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-start">
        <div>
          <div className="flex flex-wrap items-center gap-2">
            <TrendIcon
              aria-hidden="true"
              className={`size-4 ${trendClassName}`}
              strokeWidth={2.2}
            />
            <h3 className="text-base font-semibold text-foreground">
              BTC/USD before and after Bitcoin Core v30.0
            </h3>
          </div>
          <p className="mt-2 max-w-3xl text-sm leading-6 text-muted">
            Whilst we cannot precisely quantify how much the negative impact is
            solely because of v30 reducing Bitcoin&apos;s quality as money, that
            it did is apodictically certain.
          </p>
        </div>
        <div className="min-w-[11rem] lg:text-right">
          <p className="font-mono text-xs font-semibold uppercase text-dim">
            {trendLabel}
          </p>
          <p
            className={`mt-1 font-mono text-4xl font-semibold ${trendClassName}`}
          >
            {isDown
              ? formatPercent(summary.declinePercent)
              : formatPercent(summary.percentChange, true)}
          </p>
          <p className="mt-1 text-xs leading-5 text-muted">
            from the release-day price
          </p>
        </div>
      </div>

      <dl className="mt-5 grid gap-3 border-y border-border py-4 sm:grid-cols-3">
        <div>
          <dt className="font-mono text-xs uppercase text-dim">
            Current BTC/USD
          </dt>
          <dd className="mt-1 font-mono text-xl font-semibold text-foreground">
            {formatUsd(summary.latestRow.price)}
          </dd>
          <dd className="mt-1 text-xs text-muted">
            {formatFullDate(summary.latestRow.timestamp)}
          </dd>
        </div>
        <div>
          <dt className="font-mono text-xs uppercase text-dim">Release day</dt>
          <dd className="mt-1 font-mono text-xl font-semibold text-foreground">
            {formatUsd(summary.releaseRow.price)}
          </dd>
          <dd className="mt-1 text-xs text-muted">
            {formatFullDate(summary.releaseRow.date)}
          </dd>
        </div>
        <div>
          <dt className="font-mono text-xs uppercase text-dim">Price move</dt>
          <dd
            className={`mt-1 font-mono text-xl font-semibold ${trendClassName}`}
          >
            {formatPercent(summary.percentChange, true)}
          </dd>
          <dd className="mt-1 text-xs text-muted">since Bitcoin Core v30.0</dd>
        </div>
      </dl>

      <figure className="mt-5 min-w-0 overflow-x-auto overscroll-x-contain pb-2">
        <div
          aria-label={`BTC/USD before and after Bitcoin Core v30.0. Current price ${formatUsd(
            summary.latestRow.price,
          )}; current decline ${formatPercent(
            summary.declinePercent,
          )} from the release-day price.`}
          className="h-[22rem] min-h-[22rem] min-w-[48rem] rounded-md border border-border bg-background/45 p-2 sm:min-w-0"
          ref={chartRef}
          role="img"
        >
          {shouldRenderChart ? (
            <LineChart
              data={state.rows}
              height={chartHeight}
              margin={chartMargin}
              width={chartWidth}
            >
              <CartesianGrid
                stroke="var(--border)"
                strokeDasharray="3 3"
                strokeOpacity={0.72}
                vertical={false}
              />
              <XAxis
                axisLine={false}
                dataKey="date"
                minTickGap={30}
                stroke="var(--dim)"
                tick={axisTick}
                tickFormatter={formatDate}
                tickLine={false}
                tickMargin={10}
              />
              <YAxis
                axisLine={false}
                domain={[
                  (value: number) => Math.floor(value * 0.96),
                  (value: number) => Math.ceil(value * 1.04),
                ]}
                stroke="var(--dim)"
                tick={axisTick}
                tickFormatter={(value) =>
                  typeof value === "number" ? formatUsd(value) : String(value)
                }
                tickLine={false}
                tickMargin={8}
                width={72}
              />
              <Tooltip
                contentStyle={tooltipContentStyle}
                cursor={{
                  stroke: "var(--accent)",
                  strokeOpacity: 0.28,
                  strokeWidth: 1,
                }}
                formatter={(value) =>
                  typeof value === "number" ? formatUsd(value) : null
                }
                labelFormatter={(value) =>
                  typeof value === "string" || typeof value === "number"
                    ? formatFullDate(value)
                    : null
                }
                labelStyle={{ color: "var(--foreground)", fontWeight: 600 }}
              />
              <ReferenceLine
                ifOverflow="extendDomain"
                label={{
                  fill: "var(--accent)",
                  fontSize: 11,
                  position: "insideTopLeft",
                  value: "Bitcoin Core v30.0",
                }}
                stroke="var(--accent)"
                strokeDasharray="4 4"
                strokeOpacity={0.72}
                x={CORE_V30_RELEASE_DATE}
              />
              <ReferenceDot
                fill="var(--accent)"
                ifOverflow="extendDomain"
                r={5}
                stroke="var(--background)"
                strokeWidth={2}
                x={summary.releaseRow.date}
                y={summary.releaseRow.price}
              />
              <Line
                activeDot={{ r: 4, strokeWidth: 0 }}
                dataKey="price"
                dot={false}
                isAnimationActive={false}
                name="BTC/USD"
                stroke="var(--risk)"
                strokeLinecap="round"
                strokeWidth={2}
                type="monotone"
              />
            </LineChart>
          ) : (
            <div className="h-full rounded-sm border border-dashed border-border bg-surface/35" />
          )}
        </div>
      </figure>

      <div className="mt-auto flex flex-wrap items-center justify-between gap-3 border-t border-border pt-4">
        <p className="text-xs leading-5 text-dim">
          Market data: {state.source} · Release date: Bitcoin Core 30.0 notes
        </p>
        <a
          className="inline-flex items-center gap-2 text-xs font-semibold text-accent no-underline hover:text-accent-strong"
          href="https://bitcoincore.org/en/releases/30.0/"
          rel="noreferrer"
          target="_blank"
        >
          Release notes
          <ArrowUpRight aria-hidden="true" className="size-3.5" />
        </a>
      </div>
    </article>
  );
}
