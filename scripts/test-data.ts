import { readFile } from "node:fs/promises";
import { join } from "node:path";

const files = [
  "impact-series.json",
  "blockspace-pressure-map.json",
  "mempool-fee-rates.json",
  "utxo-set.json",
  "data-manifest.json",
];

for (const file of files) {
  const data = JSON.parse(
    await readFile(join(process.cwd(), "src/data/generated", file), "utf8"),
  );
  for (const key of [
    "source",
    "sourceUrl",
    "fetchedAt",
    "range",
    "columns",
    "notes",
  ]) {
    if (!(key in data)) throw new Error(`${file} missing ${key}`);
  }
  if (!Array.isArray(data.notes))
    throw new Error(`${file} notes must be an array`);
  if (!Array.isArray(data.rows) && file !== "blockspace-pressure-map.json") {
    throw new Error(`${file} rows must be an array`);
  }
}

console.log(`validated ${files.length} data snapshots`);
