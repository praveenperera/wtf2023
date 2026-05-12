# WTF Happened in Feb 2023

Static Astro site for explaining the February 2023 Bitcoin blockspace pressure
incident with committed data snapshots, chart panels, and source-backed
reference pages.

## Development

```sh
npm install
npm run dev
```

Useful checks:

```sh
npm run data:test
npm run check
npm run build
```

## Data Snapshots

Normal builds do not fetch live data. The site renders charts from committed
JSON snapshots in `src/data/generated/`, so deployments do not require Dune,
Statoshi, mempool.space, or Blockchain.com access at page runtime.

Refresh snapshots explicitly with:

```sh
npm run data:fetch
```

Current generated files:

| File                           | Source                                                        | Refresh behavior                                                                                                                       |
| ------------------------------ | ------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------- |
| `mempool-fee-rates.json`       | mempool.space mining fee-rate history                         | Fetches fee-rate percentiles from mined blocks from 2023-01-01 onward                                                                  |
| `utxo-set.json`                | Statoshi UTXO set dashboard                                   | Fetches UTXO DB size and output count through the Statoshi Graphite endpoint                                                           |
| `impact-series.json`           | Dune when keyed, otherwise sampled Blockchain.com blocks      | Fetches Dune query results if `DUNE_API_KEY` exists; otherwise rebuilds the February 2023 sampled block classification described below |
| `blockspace-pressure-map.json` | Dune BTC spam analysis link plus local explanatory categories | Rebuilds a static explanatory map from `scripts/fetch-data.ts`; it is approximate, not a measured category split                       |
| `data-manifest.json`           | Local refresh manifest                                        | Records the source status and notes for the generated snapshots                                                                        |

For `impact-series.json`, the refresh path is:

- If `DUNE_API_KEY` is set, use the Dune query configured in
  `scripts/fetch-data.ts`
- If `DUNE_API_KEY` is not set, sample fixed Bitcoin block heights from
  Blockchain.com raw block data and classify observable non-payment patterns

The fallback sample is intentionally time-bounded around the February 2023
incident: weekly January baselines, denser 500-block samples during the
February onset, and post-onset checks through early March. It classifies
OP_RETURN outputs, bare multisig outputs, and ordinal inscription witness
envelopes as non-payment use, then writes payment/non-payment block weight and
fee-share percentages.

For the broader source map, see the files under `reference/`.
