# WTF Happened in Feb 2023 Site Spec

## Summary

Build a better static version of `https://wtfhappenedinfeb2023.com/` using Astro, Tailwind CSS, shadcn/ui, and real data snapshots. The accepted visual direction is the first generated concept, **Mempool Operations Room**:

`/Users/praveen/.codex/profiles/a/.launch/20260511T144102799621000Z-pid90657/generated_images/019e177c-0203-7943-8121-182fa40e6c07/ig_000acd34e6ecf2bb016a01eb687dfc8198b30e8beac149e580.png`

The site should feel like a serious network observability console crossed with an editorial explainer. It should be dark by default, support light mode, use amber as the primary Bitcoin accent, and make the argument easier to scan with charts, diagrams, role-based action paths, and narrative rebuttals.

The main product goal is to quickly give people the intuition for how bad Bitcoin spam got around February 2023, then let curious readers dig into the details, sources, counterarguments, and actions at their own pace.

Exact visual matching is not the goal when it fights shadcn idioms. The goal is to preserve the concept's hierarchy, density, palette, chart-first structure, and serious tone while using normal shadcn/Tailwind component patterns.

## Goal Mode Definition

Goal objective:

Build and verify the v1 static Astro site described in this spec: a dark-default, shadcn/Tailwind visual explainer that uses the `reference/` content and committed data snapshots to quickly explain how bad Bitcoin spam got around February 2023, then gives curious readers clear paths into the evidence.

The goal is complete only when all of these are true:

- **Application:** the repo contains a working Astro static site with Tailwind, shadcn/ui-compatible React islands, theme support, route generation, and build scripts needed to run and verify it locally
- **Content:** every canonical route listed in the Information Architecture exists, uses the corresponding `reference/` material, preserves old slugs, and exposes deeper source/context links from the homepage
- **Data:** charts and metrics render from local committed JSON snapshots; normal builds do not require live Dune, Statoshi, or mempool.space access; refresh scripts document stale/unavailable source states instead of inventing values
- **Visual direction:** the dark desktop homepage clearly follows the accepted Mempool Operations Room concept in hierarchy, palette, density, chart-first layout, metric rail, borders, and serious editorial/observability tone
- **Core intuition:** the first viewport plus the Blockspace Pressure Map make the basic story legible without deep Bitcoin knowledge: spam/non-payment activity crowded blockspace, changed payment availability/fees, and created resource pressure
- **Digging deeper:** chart panels, narrative rebuttals, role actions, history, and resource sections all link to route pages or source material so the homepage is an orientation layer rather than a dead end
- **Modes and responsiveness:** dark mode is the default on first visit, light mode can be toggled and persists, desktop and mobile layouts have no incoherent overlap or horizontal overflow
- **Accessibility:** navigation, theme controls, tabs/accordions, chart summaries, and chart fallback text are keyboard reachable and usable with semantic headings and adequate contrast
- **Verification:** format/lint/check/build/data tests pass where configured, Browser-based acceptance checks pass, screenshots are captured, and any remaining caveats are explicitly reported

The goal is not complete if any of these are still true:

- homepage or charts use placeholder/fake numbers without visible caveats
- Dune embeds or other live iframes are required for the primary experience
- any canonical route is missing or only contains a stub
- dark mode is not the clean-profile default
- light mode does not persist after reload
- the homepage reads as a generic landing page instead of a chart-led explainer
- the Blockspace Pressure Map is absent, unreadable, or relies on rasterized text for important labels
- chart source captions, snapshot dates, or data staleness notes are hidden
- desktop or mobile screenshots show overlapping UI, clipped text, blank charts, or broken navigation

Out of scope for v1 unless explicitly requested:

- a full editorial rewrite of the arguments in `reference/`
- live data refreshes at page runtime
- pixel-perfect recreation of generated concept art
- Chrome-specific automation as a hard requirement

### Required Browser Confirmation

Use the `@Browser` in-app browser plugin as the required visual and interaction confirmation path. The Chrome plugin may be used as an extra check if it is installed and explicitly chosen, but the goal should not depend on Chrome because `@Browser` is available here and is enough to confirm the static site.

Browser verification should run against a local dev or preview URL after the production build succeeds. Prefer `npm run build` followed by `npm run preview`; use `npm run dev` only when iterating.

Required Browser checks:

- Open the local URL in a clean/new browser state and confirm the first render is dark
- Confirm the first viewport contains the site title, fast answer strip, hero evidence panel, visible chart area, and metric/context rail
- Capture desktop dark and desktop light screenshots at `1536x1024`
- Toggle light mode, reload, and confirm the chosen mode persists
- Capture mobile dark and mobile light screenshots at `390x844`
- Confirm mobile navigation opens, section links are reachable, and there is no horizontal overflow
- Confirm the Blockspace Pressure Map is visible, text is readable, and the category/grid relationship is understandable
- Click through the main nav routes: Impact, Characteristics, Narratives, Actions, Core devs, History, and Resources
- Confirm chart panels show source captions, snapshot dates, and one-sentence interpretations
- Confirm chart deep-links and internal content links do not 404
- Check browser console logs for uncaught errors on the homepage and at least one content-heavy route
- Compare the desktop dark screenshot against `docs/design/mempool-operations-room.png` and update the fidelity ledger with any accepted divergences

Final goal report requirements:

- local URL tested
- commands run and whether they passed
- Browser screenshot paths
- data snapshot status, including stale or unavailable source notes
- visual QA ledger summary
- remaining caveats or follow-up work, if any

## Experience Strategy

The site should work in two layers:

- **Fast intuition layer:** within the first 30 seconds, a new visitor should understand that non-payment activity started crowding shared blockspace, displaced payment activity, pushed fee pressure higher, and increased resource costs for node operators
- **Evidence trail layer:** every major claim should have a clear path to deeper material: expanded charts, source links, relevant reference pages, original examples, and narrative rebuttals

Design implications:

- Lead every major section with a plain-English takeaway before detailed prose
- Put the strongest visual intuition early: hero chart, Blockspace Pressure Map, and a compact “what changed after Feb 2023” summary
- Keep deep explanations behind “dig deeper” links, accordions, tabs, or dedicated pages so the homepage does not become a wall of text
- Prefer charts and diagrams that explain relationships over charts that only report numbers
- Give each chart a one-sentence interpretation, a source caption, and a link to the detailed route
- Avoid assuming the visitor already understands mempool policy, blockspace, UTXO growth, inscriptions, or bare multisig

## Stack And Architecture

- Use Astro in static output mode.
- Use Tailwind CSS for all layout, spacing, typography, and theme tokens.
- Use shadcn/ui through React islands with `@astrojs/react`.
- Use Astro components for static page layout and Markdown/MDX rendering.
- Use React islands only for interactive controls: theme toggle, chart range tabs, narrative/action filters, and charts if the chosen chart library requires React.
- Use lucide icons for UI icons.
- Use a chart library that works cleanly with React and static data, preferably Recharts unless implementation testing shows a clear reason to switch.
- Keep external data out of runtime page loads. Fetch and normalize data before build, commit the latest generated snapshots, and let the static site render from local JSON.

## Information Architecture

Preserve the original site's content and source material from `reference/`. Keep original slugs as canonical routes so old links remain valid, but use shorter labels in the UI. The homepage should be optimized for intuition and orientation; the route pages should carry the deeper evidence and argument detail.

| UI label | Canonical route | Content source |
| --- | --- | --- |
| Home | `/` | `reference/index.md` |
| Impact | `/stats-about-spam/` | `reference/stats-about-spam.md` |
| Characteristics | `/characteristics-of-spam/` | `reference/characteristics-of-spam.md` |
| Narratives | `/common-narratives-around-spam/` | `reference/common-narratives-around-spam.md` and nested files |
| Actions | `/what-you-can-do-about-it/` | `reference/what-you-can-do-about-it.md` and nested files |
| Core devs | `/pr-29187-trying-to-fix-datacarriersize/` | `reference/pr-29187-trying-to-fix-datacarriersize.md` and `reference/fixing-a-bug-through-documentation-change.md` |
| History | `/free-relays-whitelists-free-relays/` | `reference/free-relays-whitelists-free-relays.md`, `reference/the-rise-of-out-of-band-transactions.md`, `reference/noteworthy-cases-of-massive-broadcasts-of-non-payment-tx.md`, `reference/history-of-inflation-bugs.md` |
| Resources | `/articles-and-content-about-the-issue/` | `reference/articles-and-content-about-the-issue.md` |

The homepage should be a guided overview, not a generic landing page or full report:

1. Header with brand, nav, dark/light toggle, and source link
2. Fast answer strip: 3-4 short claims answering “what happened?” and “why was it bad?”
3. Hero evidence panel: editorial intro on the left, primary blockspace chart and metric rail on the right
4. Blockspace Pressure Map: Sankey-style visualization from transaction origins through relay/mining paths into included blockspace
5. Impact of Spam: four chart modules, each with a takeaway and a deep-link
6. Characteristics: two-part spam recognition model
7. Narratives: rebuttal index with filters and compact summaries
8. Actions: role selector for node runner, miner, developer, and pleb
9. Core/dev reaction: PR 29187 and documentation-change summary
10. History: relay policy timeline and out-of-band transaction section
11. Resources: articles, videos, and external references

## Visual System

Use the concept as the design source of truth:

- Background: near-black, not navy-purple. Suggested dark token: `#050607`; elevated surfaces `#090c0f` and `#0d1116`.
- Text: off-white primary `#f4f1e8`, muted text `#a8abb2`, dim text `#6f7680`.
- Accent: amber/orange only for Bitcoin, active nav, warnings, annotations, and key chart series. Suggested amber: `#f59e0b` with darker variants for borders.
- Secondary series colors: green for payments, blue for UTXO, red only for high-risk or spam emphasis.
- Light mode: true light/off-white background, not cream-heavy. Keep the same amber accent and preserve chart contrast.
- Typography: strong grotesk/sans for headings, compact sans for UI chrome, monospaced font for code/config snippets and data labels.
- Layout: dense but readable. Prefer open bands, rails, chart panels, tables, and separators over decorative card stacks.
- Radius: use shadcn defaults where possible, but keep panels restrained at about `6px` to `8px`.
- Borders: thin low-contrast borders; avoid heavy shadows and glow.
- Motion: subtle chart hover, tab transitions, and section anchor focus only. No animated background effects.

Do not add decorative orbs, neon cyberpunk styling, fake crypto visuals, fake metrics, or rasterized UI text. Generated images are allowed for diagrams and infographics, but charts, nav, controls, labels, and important copy must remain code-native.

## Component Decisions

- App shell: Astro layout with sticky top nav on desktop and shadcn `Sheet` mobile nav.
- Theme: shadcn-compatible theme toggle using `class="dark"` on `html`; default to dark on first visit, persist user choice in local storage.
- Header: compact brand mark, title, subtitle, section nav, theme toggle, external GitHub/source icon if a repo URL exists.
- Hero: CSS grid with left narrative rail and right evidence panel. On mobile, stack narrative, key metrics, then chart.
- Chart panels: reusable `ChartPanel` component with title, subtitle, source, range controls, empty/error state, and chart canvas.
- Takeaway panels: compact shadcn-native blocks for “what happened”, “why it mattered”, and “where to dig deeper”. These should use real claims from `reference/`, not marketing copy.
- Metric rail: reusable `MetricStat` component with label, value, unit, source, and optional trend.
- Blockspace pressure map: reusable `BlockspacePressureMap` component inspired by the referenced concept 4 screenshot. It should show transaction-origin categories on the left, mempool/relay acceptance in the middle, optional direct-to-miner submissions as a bypass lane, and included blockspace as a square grid on the right.
- Narrative index: shadcn `Accordion` or `Tabs` plus cards for each rebuttal. Keep summaries sourced from `reference/common-narratives-around-spam/*`.
- Role actions: shadcn `Tabs` or `ToggleGroup` for node runner, miner, developer, and pleb. Use code blocks for config snippets.
- Timeline: a code-native timeline component for history and policy events.
- Resource lists: grouped links with source labels, media type, and short descriptions when present in reference.

Use shadcn `Card` only for actual repeated panels such as chart modules, narrative entries, and resource rows. Do not wrap whole sections in cards, and do not nest cards inside cards.

## Content Model

Create Astro content collections from `reference/` rather than copying prose into components. Prefer Astro's content loader/glob support pointed at `reference/**/*.md`; if the installed Astro version cannot load outside `src/content`, add a small sync step that mirrors `reference/` into `src/content/reference/` before build.

Minimum content fields:

- `title`
- `slug`
- `section`
- `summary`
- `sourceUrl`
- `order`
- `navLabel`
- `links`
- `media`
- `takeaway`
- `detailLevel`

Derive page bodies from the existing Markdown. Clean obvious extraction artifacts during content normalization, such as missing spaces around bold text, malformed bullets, and broken links like `http:// https://...`. Do not rewrite claims or change arguments without an explicit content-edit pass.

Use the `takeaway` field for fast homepage summaries and chart interpretations. Use `detailLevel` to distinguish short orientation content from deep-dive pages.

For v1, content edits should be limited to presentation cleanup, summaries, and navigation labels. If deeper editorial rewrites are needed, handle them as a separate pass.

## Data Strategy

The site must not depend on broken live iframes. Every chart should use local JSON generated from source data and include visible source/provenance text.

Treat all numbers in the generated concept image as placeholders. Use the concept for structure and visual language only; chart values and metric stats must come from the data snapshots below.

### Data Sources

| Data need | Primary source | Notes |
| --- | --- | --- |
| Non-payments vs payments blockspace | Dune query `3307069`, visualization `5538577` | Original iframe: `https://dune.com/embeds/3307069/5538577/` |
| Fees paid by non-payments vs payments | Dune query `3307069`, visualization `5538533` | Original iframe: `https://dune.com/embeds/3307069/5538533/` |
| Blockspace pressure categories | Dune query/export or derived static snapshot | Needed for the Sankey/grid map; categories should include payments, inscriptions, bare multisig, OP_RETURN, other, and direct-to-miner/private channel when sourceable |
| UTXO set size | Statoshi Grafana/Graphite | Dashboard `000000009`, panel `8`, target `stats.gauges.utxoset.dbSizeBytes` |
| UTXO output count | Statoshi Grafana/Graphite | Dashboard `000000009`, panel `6`, target `stats.gauges.utxoset.txOutputs` |
| Fee-rate history | mempool.space API | Use `https://mempool.space/api/v1/mining/blocks/fee-rates/all` for available historical fee-rate data |
| Fee totals | mempool.space API | Use `https://mempool.space/api/v1/mining/blocks/fees/all` |
| Current mempool pressure | mempool.space API | Use `https://mempool.space/api/v1/statistics/24h` or shorter windows for current context only |

Dune direct page scraping currently returns 403 in this environment. Use Dune's official API instead:

- JSON: `GET https://api.dune.com/api/v1/query/{query_id}/results`
- CSV: `GET https://api.dune.com/api/v1/query/{query_id}/results/csv`
- Require `DUNE_API_KEY` with read scope for refreshes
- Assume Dune result reads may consume API credits, so refreshes should be explicit, not part of every build
- Do not require the key for normal local builds if committed snapshots exist

Statoshi's Grafana API is anonymously readable in this environment with certificate verification disabled by curl. Use Graphite render endpoints during data refresh, for example:

```text
https://statoshi.info:3000/api/datasources/proxy/uid/000000001/render?target=aliasByMetric(stats.gauges.utxoset.dbSizeBytes)&from=1672531200&until=now&format=json
```

Implementation should avoid `-k` in production scripts if certificate validation can be fixed locally. If not, document why the Statoshi fetch needs insecure TLS and keep the committed snapshot as the build source.

### Snapshot Files

Add a data refresh script, preferably `scripts/fetch-data.ts`, that writes normalized data to `src/data/generated/`.

Required output files:

- `src/data/generated/impact-series.json`
- `src/data/generated/blockspace-pressure-map.json`
- `src/data/generated/mempool-fee-rates.json`
- `src/data/generated/utxo-set.json`
- `src/data/generated/data-manifest.json`

Each file must include:

- `source`
- `sourceUrl`
- `fetchedAt`
- `range`
- `columns`
- `rows`
- `notes`

Build behavior:

- Normal `astro build` reads committed snapshots only
- `npm run data:fetch` refreshes snapshots
- If Dune is unavailable or `DUNE_API_KEY` is missing, the fetch script keeps existing Dune snapshot files and marks the manifest status as stale
- Never invent chart values; show a source/staleness note instead

### Chart Semantics

Do not blindly copy concept chart labels if the real data supports a more precise label.

- Hero primary chart: use the best available combined evidence chart. Prefer Dune blockspace payment/non-payment series if available. If the Dune result shape is not suitable for the hero, use a mempool fee-rate/fee-pressure chart and make the non-payment split a secondary chart.
- Impact chart 1: mempool.space fee-rate history from `fee-rates/all`, labeled as fee-rate percentiles unless transaction-by-fee-rate data is actually obtained.
- Impact chart 2: Dune non-payments vs payments blockspace.
- Impact chart 3: Dune fees paid by non-payments vs payments.
- Impact chart 4: Statoshi UTXO set size and/or output count.

Every chart needs a short source caption and a visible snapshot date.
Every chart also needs a one-sentence interpretation written for non-experts, plus a deep-link to the source page or route that explains the claim in more detail.

### Blockspace Pressure Map

Use the concept 4 pressure-map visual as a signature infographic, but keep its text and numbers code-native.

Structure:

- Left column: origin/category blocks for `Payments`, `Inscriptions`, `Bare multisig`, `OP_RETURN`, and `Other`
- Middle: `Mempool / Relay Layer` with a dashed vertical policy boundary labeled around the idea that free relays accept anything within limits
- Bypass lane: `Direct-to-miner submissions` shown as a dashed/private route that can enter blocks without ordinary relay
- Right column: `Included in blocks` square grid representing blockspace allocation
- Footer: source/staleness note and a link button such as `Explore mempool data`

Data rules:

- If reliable category percentages are available, render a true code-native Sankey/SVG map where flow widths and grid cells reflect the snapshot values.
- If only approximate/source-text support exists, render the map as an explanatory diagram and label values as approximate ranges with source notes.
- If no reliable category split is available for a category, omit the percentage for that category rather than inventing one.
- Do not use the generated screenshot's example percentages as data unless they are independently sourced.
- Keep the right-side grid deterministic: 100 cells for percentages, or 64 cells for compact mobile if 100 cells does not fit.
- On mobile, stack the category legend, simplified flow, and blockspace grid vertically; keep the relationship readable instead of trying to preserve the desktop Sankey geometry.

Implementation options:

- Prefer a custom SVG/React component for the map because this is visual explanation, not a generic chart.
- Use D3 shape utilities only if they materially simplify Sankey path generation; do not add a heavy charting dependency just for this map.
- Use the same series colors across the site: green for payments, amber for inscriptions/non-payment data, blue for bare multisig, purple for OP_RETURN, gray for other, and dashed amber/purple for direct-to-miner bypass.
- Provide a text fallback below the visual listing the current category values/ranges for screen readers and no-JS contexts.

## Image Gen Asset Plan

Use Image Gen for standalone explanatory visuals, not for charts or UI text.

Needed assets after implementation starts:

- Optional decorative texture or background detail for the Blockspace Pressure Map, without critical text or values baked in
- A two-characteristics diagram for `Characteristics of spam`
- A policy-vs-consensus diagram for the Core/dev reaction section
- A relay-policy timeline background or simple illustrated markers for History

Asset requirements:

- Dark and light compatible, or transparent background where useful
- No embedded body copy, chart labels, nav, buttons, or exact metrics
- Same palette as the accepted concept: near-black, off-white, amber, green, blue, limited red
- Export optimized WebP/PNG assets into `public/images/generated/`
- Keep prompts in `docs/imagegen-prompts.md` so assets can be regenerated

## Implementation Phases

1. Scaffold Astro, Tailwind, React integration, shadcn/ui, linting, and build scripts.
2. Add content collections and route generation from `reference/`.
3. Add design tokens, theme toggle, layout shell, and navigation.
4. Add data fetch/normalization scripts and committed initial snapshots.
5. Build chart primitives and the homepage hero/impact section.
6. Build content-heavy pages: Characteristics, Narratives, Actions, Core/dev reaction, History, Resources.
7. Generate and integrate standalone infographic assets.
8. Run visual QA against the accepted concept and iterate.
9. Run final build, accessibility checks, link checks, and data provenance checks.

## Visual QA And Acceptance

Use the `$image-design-director` visual QA process during implementation.

Before coding from the concept, copy the accepted image into a stable repo path such as `docs/design/mempool-operations-room.png` so future comparisons do not depend on Codex cache paths.

Required QA captures:

- Desktop dark: `1536x1024`, saved under `artifacts/qa/`
- Desktop light: `1536x1024`, saved under `artifacts/qa/`
- Mobile dark: `390x844`, saved under `artifacts/qa/`
- Mobile light: `390x844`, saved under `artifacts/qa/`

Required checks:

- Open the rendered site with `@Browser` and capture screenshots
- Use `view_image` on the accepted concept and rendered desktop dark screenshot in the same QA pass
- Compare at least these points: copy, nav, hero layout, chart panel proportions, typography scale, palette, spacing, metric rail, component radius/borders, and responsive behavior
- Use Browser/Playwright assertions for key content and controls
- Use a color-sampling or screenshot script to catch blank renders and large palette drift
- Run an accessibility pass for heading order, contrast, keyboard nav, chart fallback text, and reduced-motion behavior

Keep a short fidelity ledger in the implementation summary:

| Mismatch | Concept evidence | Render evidence | Fix or accepted reason |
| --- | --- | --- | --- |

Accepted reasons for divergence:

- shadcn component idioms improve accessibility or maintainability
- real data requires a different chart label or shape
- mobile layout needs different stacking
- generated concept text is illegible or inaccurate and `reference/` has better source copy

Not accepted:

- different palette by taste
- decorative elements not present in the concept
- fake or placeholder metrics
- rasterizing UI copy
- hiding source/provenance for chart data

## Build Verification

Before calling the implementation complete:

- Run formatting and linting commands configured in the project
- Run `astro check` if configured
- Run `astro build`
- Run data normalization tests for Dune, Statoshi, and mempool snapshots
- Run link checks for internal routes and external source URLs where practical
- Verify dark mode is the default in a clean/new `@Browser` session
- Verify light mode persists after toggling and reloading in `@Browser`
- Verify the site works without network access after build, except outbound links
- Do not mark a Codex goal complete until the Goal Mode Definition's Browser confirmation checklist has passed or any failed item is documented as a caveat
