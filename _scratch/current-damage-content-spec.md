# Spec: Keep Feb 2023 Focus, Add Current Damage Snapshot

Date: 2026-06-06
Status: Proposed content and UX changes only
Implementation status: Not started

## Summary

Keep the site centered on the February 2023 spam wave. Do not expand the
event window, do not rename the site, and do not imply that the original event
includes all later activity.

Add a prominent "current verified snapshot" layer that shows the continuing
damage caused by the same class of non-monetary data storage behavior. The
display heading can still use punchier copy, but each card must expose its
measurement range and source date:

- arbitrary data still occupies a large share of recent blockspace
- non-monetary data has added tens of GB to every archival node
- the UTXO set grew sharply after the Feb 2023 onset, with attribution handled
  separately from aggregate growth
- roughly half of UTXOs are low-value dust-like outputs
- Taproot is now the largest UTXO type by count, with most Taproot UTXOs
  carrying less than 1000 sats
- non-action was not neutral; it shifted costs to payment users and node
  runners

The narrative should be:

> Feb 2023 was the ignition. This is the damage now.

## Goals

1. Preserve the existing Feb 2023 event framing.
2. Add a current verified snapshot without extending the historical date range.
3. Make the current damage scannable in the first 1-2 screens.
4. Move the strongest data-backed impact material to the Impact page.
5. Make Narratives more useful as source-backed rebuttal cards.
6. Make Actions feel urgent and concrete.
7. Replace the weak "Concerns about Core" placeholder with a sourced issue map.
8. Add source discipline around all "now" claims so unsupported numbers do not
   ship.

## Non-goals

1. Do not change the site title away from "WTF Happened in Feb 2023?"
2. Do not extend the event label beyond the existing Feb 1 - Mar 15, 2023
   window.
3. Do not make the home page a general anti-spam timeline.
4. Do not add unsupported accusations as factual claims.
5. Do not embed memes, screenshots, or video clips without source and context.
6. Do not replace charts with hand-drawn SVGs. Use existing chart components,
   Recharts, lucide icons, or existing shadcn/base components where available.

## Source-Backed Claims

All public-facing stats need a source, measurement date or range, publication
or fetch date, and caveat where needed. The words "non-financial",
"non-monetary", "arbitrary", "spam", "dust-like", and
"inscription-related" are not interchangeable unless the source defines them
that way.

| Claim | Publishable wording | Source status |
| --- | --- | --- |
| Feb 2023 event window | "Event window: Feb 1 - Mar 15, 2023" | Already in home page. Keep as-is. |
| Current arbitrary/non-monetary blockspace share | "About 40% of recent blockspace is still non-monetary/arbitrary data" | Needs latest Bitcoin Portal/Renaud confirmation before using "40%". Renaud Issue #3 supports 36% over the last 90 days as of 2025-12-22. |
| Arbitrary data stored forever | "At least 76 GB of non-financial data was added over 3.5 years" | Renaud Issue #3 supports 76 GB as of 2025-12-22. User-proposed "90 GB" needs newer source confirmation before publishing. |
| UTXO set growth | "The UTXO database grew from about 4.7 GB in Jan 2023 to about 10.6 GB in the committed May 2026 Statoshi snapshot" | Local `src/data/generated/utxo-set.json`. Mempool Research also reports 11 GB on disk at block 892385 on 2025-04-14. This proves aggregate UTXO set growth, not cause by itself. Attribute spam-related contribution separately using inscription-related UTXO analysis. Do not publish "12 GB" unless refreshed data verifies it. |
| Half of UTXOs are dust-like | "49.1% of all UTXOs contain less than 1000 sats" | Mempool Research UTXO Set Report, 2025-05-18. |
| Taproot is most common output type | "Taproot is the largest UTXO type by count at 34.2%" | Mempool Research UTXO Set Report, 2025-05-18. |
| Most Taproot UTXOs are dust-like | "86% of Taproot UTXOs are under 1000 sats" | Mempool Research UTXO Set Report, 2025-05-18. If using "about 90%", round explicitly and keep exact value in detail copy. |
| Inscription-related UTXO share | "29.6% of all UTXOs are inscription-related" | Mempool Research UTXO Set Report, 2025-05-18. |
| Chain growth accelerated after inscriptions | "Average block size rose from 1.11 MB per block before block 770,000 to 1.69 MB after" | Mempool Research Block Size Report, 2025-02-04. |

Primary sources:

- Renaud Cuny, Bitcoin Block Space Weekly, "Issue #3 - Three Years of Spam"
  https://blockspaceweekly.substack.com/p/issue-3-three-years-of-spam
- The Bitcoin Portal spam analysis dashboard
  https://thebitcoinportal.com/onchain/spam-analysis/overview
- Mempool Research UTXO Set Report
  https://research.mempool.space/utxo-set-report/
- Mempool Research Block Size Report
  https://research.mempool.space/block-size-report/
- Mempool Research OP_RETURN Report
  https://research.mempool.space/opreturn-report/
- BIP-110 site
  https://bip110.org/
- Hodlonaut, "The Capture: The Network"
  https://www.citadel21.com/the-network
- Hodlonaut, "The Capture: The Lever"
  https://www.citadel21.com/the-lever

## Information Architecture

Keep current top-level routes:

- Home
- Impact
- Characteristics
- Narratives
- Actions
- Core devs
- History
- Resources

Recommended label change:

- Change nav label from "Core devs" to "Core concerns" or "Bitcoin Core"
  only if the page is rewritten from a people-focused accusation page into a
  source-backed governance and policy concern page.

Recommended home page order:

1. Hero: unchanged Feb 2023 framing
2. Fast answers: current four cards can stay
3. New "Current verified snapshot" section
4. Existing blockspace pressure map
5. Impact chart section
6. Characteristics
7. Narratives
8. Actions
9. Keep exploring

## Home Page Changes

### Keep the Hero Focused

Do not change:

- H1: "WTF Happened in Feb 2023?"
- Subtitle: "Bitcoin is money, not a message board."
- Event label: "Event window: Feb 1 - Mar 15, 2023"

Recommended small hero copy adjustment:

Current copy says:

> This site is a forensic analysis of that event, its impact, and what we can do to keep Bitcoin for payments.

Proposed:

> This site is a forensic analysis of that event, the damage it exposed, and what users can still do to keep Bitcoin for payments.

Reason:

- Keeps the event historical.
- Opens the door to "still happening" without changing the site scope.

### Add "Current Verified Snapshot"

Placement:

- After the fast-answer cards and before `BlockspacePressureMap`.

Internal section name:

> Current verified snapshot

Display section label:

> Snapshot now

Headline:

> Feb 2023 was the ignition. The damage is still visible.

Intro:

> The event window stays Feb 2023. The current data shows why it still matters:
> arbitrary data continues to compete with payments, and node operators carry
> the permanent cost.

Required per-card metadata:

- measured date or measured range
- source publication date or local fetch date
- source URL
- source-defined classification terms
- caveat if the card is rounded or source-defined

Card 1:

- Label: Recent blockspace
- Value: "~40%" if latest source confirms, otherwise "36%"
- Detail: "non-monetary/arbitrary data in recent blockspace"
- Source detail:
  - "Renaud Cuny reported 36% of blockspace over the last 90 days as of
    2025-12-22. Use live Bitcoin Portal data for the current value."
- Visible date text:
  - "Measured range: last 90 days ending 2025-12-22"

Card 2:

- Label: Permanent chain data
- Value: "76 GB+" until 90 GB is verified
- Detail: "non-financial data added over 3.5 years"
- Source detail:
  - "Renaud Cuny, Issue #3, 2025-12-22"
- Visible date text:
  - "Published: 2025-12-22"

Card 3:

- Label: UTXO set growth
- Value: "4.7 GB -> 10.6 GB"
- Detail: "Jan 2023 to May 2026 Statoshi snapshot"
- Source detail:
  - "Local committed Statoshi data"
- Visible date text:
  - "Measured: 2023-01-01 to 2026-05-04"
- Caveat:
  - "This is aggregate UTXO database growth. Attribute spam-related share using
    inscription-related UTXO data, not this line chart alone."

Card 4:

- Label: Dust-like UTXOs
- Value: "49.1%"
- Detail: "of UTXOs are under 1000 sats"
- Source detail:
  - "Mempool Research UTXO Set Report, 2025-05-18"
- Visible date text:
  - "Snapshot block: 892385, 2025-04-14; report published: 2025-05-18"

Card 5:

- Label: Taproot UTXOs
- Value: "86%"
- Detail: "of Taproot UTXOs are under 1000 sats"
- Source detail:
  - "Mempool Research UTXO Set Report, 2025-05-18"
- Visible date text:
  - "Snapshot block: 892385, 2025-04-14; report published: 2025-05-18"

Design notes:

- Use compact metric cards, not oversized marketing cards.
- Use existing `MetricStat.astro` if it fits.
- Use lucide icons only where they add scan value.
- Avoid decorative images here. This is a data punch section.
- Include a visible "Snapshot date" line.
- Include both measured date/range and source publication/fetch date where
  those differ.
- Link the section to `/stats-about-spam/`.
- Desktop and mobile screenshots must verify that the snapshot appears early
  without displacing the Feb 2023 hero framing.

Suggested CTA:

> Open the current damage data

### Add One Rhetorical Punch Line

Use a site-safe version in the factual section:

> Non-action was not neutral. It moved the cost to payment users and node
> runners.

Do not put this exact sentence in the factual section unless the site owner
wants a harder editorial voice:

> Congrats on letting yourselves be psyopped into non-action by scammers and
> spooks.

Use the harder line only as:

- a share card
- an editorial pull quote
- a meme asset
- or a "voice" option, not as evidence text

Reason:

- "Scammers" can often be supported.
- "Spooks" requires a receipt if presented as a claim.

## Impact Page Changes

Current route:

- `/stats-about-spam/`

Goal:

- Make Impact the canonical place for "then vs now".

Recommended page structure:

1. Masthead: "The impact of spam on Bitcoin"
2. New "At a glance" current snapshot
3. "Then: Feb 2023 onset"
4. "Now: current blockspace and UTXO damage"
5. "Why this matters"
6. "Source methodology"
7. Existing examples of spam transactions

### At a Glance

Use the same metrics as the home snapshot, with more source detail:

- Recent arbitrary/non-monetary blockspace
- Non-financial data added to the chain
- UTXO set DB growth
- UTXOs under 1000 sats
- Taproot UTXOs under 1000 sats
- Inscription-related UTXO share

### Then: Feb 2023 Onset

Keep current February sampled charts:

- Blockspace split
- Fees by use
- Fee-rate pressure

Add short framing:

> The February sample shows the break from the pre-wave baseline: non-payment
> data jumped from negligible levels into a material share of blockspace within
> days.

### Now: Current Damage

Add a section based on Renaud and Mempool Research:

Headline:

> The current problem is not just fees. It is permanent state and storage.

Copy:

> Recent spam analysis shows non-financial data still taking a large share of
> blockspace. UTXO analysis shows that millions of low-value outputs remain in
> the set every validating node must track. The burden persists after the
> transaction confirms.

Recommended visual treatments:

- Recharts bar or stat strip for UTXO script types:
  - p2tr 34.22%
  - p2pkh 28.79%
  - p2wpkh 26.53%
  - p2sh 7.92%
- Recharts stacked bar or stat strip for sub-1000 sat UTXOs:
  - total under 1000 sats: 49.12%
  - 61.4% of those are p2tr
  - 86% of p2tr UTXOs are under 1000 sats
- Existing line chart for UTXO DB size:
  - Jan 2023: about 4.7 GB
  - May 2026 committed snapshot: about 10.6 GB

Required methodology strip:

- Show which data is the Feb 2023 sampled local series.
- Show which data is a later external/current verified snapshot.
- Separate aggregate trend claims from attribution claims.
- Example: UTXO DB size growth is an aggregate trend; inscription-related
  UTXO share is attribution evidence.

### Methodology Notes

Add visible notes:

- "Dust-like" means under 1000 sats for this section, matching the Mempool
  Research UTXO Set Report.
- "Arbitrary/non-financial data" classification varies by source; show source
  definitions and snapshot dates.
- "90 GB" must not be published until a current source is linked.
- Local generated data is a committed snapshot and may lag live sources.

## Narratives Page Changes

Current route:

- `/common-narratives-around-spam/`

Goal:

- Make the page a practical rebuttal index people can use during arguments.

Recommended card model:

Each narrative card should have:

1. Claim
2. Short rebuttal
3. Receipt
4. Link to full section
5. Optional copy/share button

Receipt data requirement:

- Receipts should be typed data objects, not prose-only Markdown.
- Required fields:
  - claim id
  - source title
  - source URL
  - publication date
  - measured date/range when applicable
  - short evidence summary
  - caveat
- Missing source/date fields should fail review before implementation is
  considered complete.

Example card:

- Claim: "There is nothing you can do about it"
- Rebuttal: "Filters, miner policy, software defaults, and user migration all
  change incentives. Non-action is a choice."
- Receipt:
  - Renaud: non-financial data still consumed 36% of recent blockspace as of
    2025-12-22
  - Mempool Research: 49.1% of UTXOs were under 1000 sats as of block 892385
- CTA: "Open rebuttal"

Add or promote these narratives:

1. "There is nothing you can do about it"
2. "High fees will solve spam"
3. "A valid transaction cannot be abusive"
4. "Mempool policy is censorship"
5. "It is just art"
6. "OP_RETURN harm reduction solved it"
7. "Bitcoin can thrive even if miners are high-time-preference actors"

### New Narrative: "It is just art"

Purpose:

- Capture the user feedback about BSV/ordinals/art narratives.
- Avoid overclaiming unless sources are verified.

Claim:

> It is just art.

Rebuttal:

> The issue is not whether art can exist. The issue is whether speculative data
> markets should externalize permanent storage and validation costs onto every
> Bitcoin node.

Receipts:

- Renaud: non-financial data added 76 GB over 3.5 years.
- Mempool Research: inscription-related UTXOs account for 29.6% of the UTXO
  set.
- Protos article on ordinals pump-and-dump and stolen images can be added if
  the site owner wants a scam-market angle:
  https://protos.com/bitcoin-ordinals-pump-and-dump-using-stolen-images-and-copyright/

BSV angle:

- Add only if a direct primary source supports "waging war on Bitcoin with art".
- Otherwise frame more generally as "art branding as a cover for data dumping".

### New Narrative: "OP_RETURN harm reduction solved it"

Claim:

> Larger OP_RETURN redirects spam into a less harmful channel.

Rebuttal:

> OP_RETURN does not enter the UTXO set, but it still consumes blockspace and
> permanent archival storage. The data so far does not prove that inscriptions
> were meaningfully reduced by opening another data channel.

Receipts:

- Mempool Research OP_RETURN Report: recent OP_RETURNs are mostly standard and
  associated with Runes.
- Renaud Issue #3: the "harm reduction" argument was not supported by the data
  available then; OP_RETURN added a channel while inscriptions continued.

## Actions Page Changes

Current route:

- `/what-you-can-do-about-it/`

Goal:

- Make Actions feel like the answer to "they told you nothing can be done".

Recommended top section:

Headline:

> They told you there was nothing to do. There are levers.

Copy:

> Node policy, mining templates, software defaults, and public pressure all
> change incentives. The question is which lever you actually control.

Add a compact "choose your lever" row before the role tabs:

- Node runner: run filtering policy
- Miner: choose templates and pools that reject arbitrary data
- Developer: review defaults, patches, and docs
- Pleb: share receipts and ask concrete policy questions

Freshness requirement:

- Verify current availability and status before publishing operational
  recommendations for BIP-110, Bitcoin Knots install paths, Ocean/DATUM,
  Rent Some Hash, or any mining pool/template route.
- If an operational recommendation cannot be verified, leave it out or label it
  as historical context.

### Clip Integration

User requested:

- clip of Lopp and Petard/Peter Todd saying they are bad actors / what are you
  going to do about it

Spec requirement:

- Do not embed or paraphrase until exact source URL and timestamp are verified.
- Add a "Receipts to clip" slot in Actions that can accept:
  - title
  - speaker
  - exact quote
  - timestamp
  - source URL
  - why it matters
- Keep the slot non-rendered until all fields are present.
- Do not publish paraphrase text based on memory.

## Core Concerns Page Changes

Current route:

- `/core-devs/`

Current issue:

- `reference/concerns-about-core.md` is placeholder-like and makes broad claims
  without enough structure.

Goal:

- Turn it into a source-backed "Bitcoin Core concerns" issue map.

Recommended route label:

- "Core concerns" or "Bitcoin Core"

Recommended page structure:

1. Masthead: "Bitcoin Core concerns"
2. "What this page is and is not"
3. Issue map
4. PR 29187 and datacarriersize dispute
5. Documentation-change dispute
6. Governance and funding concerns
7. Moderation and process concerns
8. Source library

### What This Page Is and Is Not

Add this framing:

> This page is not a claim that every contributor acts in bad faith. It is an
> evidence map of concerns around defaults, review power, moderation, funding,
> and whose costs are considered when policy changes are made.

Reason:

- Keeps the page defensible.
- Lets the evidence carry the critique.

Evidence rule:

- Every issue row must include primary records, or it must be explicitly labeled
  "external allegation" or "open question".
- Hodlonaut articles can contextualize governance concerns, but they must not
  be the only evidence for claims that can be checked through GitHub, IRC,
  mailing-list, funding, or moderation records.
- If a primary record cannot be found, the page should say so instead of
  hardening the claim.

### Issue Map Fields

Each issue should use this shape:

- Concern
- What happened
- Why it matters
- Primary sources
- Open questions

Example:

- Concern: Documentation narrowed `-datacarriersize`
- What happened: documentation changed after inscriptions exposed a gap between
  user expectations and policy behavior
- Why it matters: changing docs instead of behavior can redefine a policy limit
  after the fact
- Primary sources:
  - local `reference/fixing-a-bug-through-documentation-change.md`
  - related Bitcoin Core PRs/issues
- Open questions:
  - was the change intended as clarification, or as justification for inaction?

### Hodlonaut / The Capture Integration

Use Hodlonaut articles as governance evidence, not as the only source.

Recommended subsection:

> External investigation: The Capture

Summarize:

- "The Network" documents claims about informal power, funding, recruitment,
  and maintainer paths.
- "The Lever" documents claims about how social and institutional pressure
  affected independent contributors.

Add caveat:

> These articles should be presented as a sourced external investigation with
> named sources and right-of-reply notes, not as a substitute for primary
> GitHub, IRC, mailing-list, and funding records.

## Resources Page Changes

Current route:

- `/resources/`

Add resource groups:

1. Current blockspace and spam data
   - The Bitcoin Portal
   - Bitcoin Block Space Weekly
   - Renaud Issue #3
2. UTXO and dust analysis
   - Mempool Research UTXO Set Report
   - Statoshi UTXO dashboard
3. Block size and chain growth
   - Mempool Research Block Size Report
4. OP_RETURN and policy
   - Mempool Research OP_RETURN Report
   - Bitcoin Core OP_RETURN policy posts
5. Core governance concerns
   - Hodlonaut The Network
   - Hodlonaut The Lever
   - relevant GitHub/IRC primary records
6. Actions
   - BIP-110
   - Bitcoin Knots
   - Ocean / DATUM / Rent Some Hash
7. Clips and memes
   - only include verified timestamps and source URLs

## Data Model Proposal For Later Implementation

Add a committed generated JSON file only when implementation starts:

Path:

- `src/data/generated/current-damage-snapshot.json`

Shape:

```json
{
  "source": "curated source-backed current damage snapshot",
  "fetchedAt": "2026-06-06T00:00:00.000Z",
  "curatedAt": "2026-06-06T00:00:00.000Z",
  "range": "mixed",
  "columns": [
    "id",
    "label",
    "value",
    "detail",
    "source",
    "sourceUrl",
    "publicationDate",
    "measuredAt",
    "rangeStart",
    "rangeEnd",
    "blockHeight",
    "methodology",
    "classificationDefinition",
    "caveat",
    "status"
  ],
  "rows": [
    {
      "id": "recent-non-monetary-blockspace",
      "label": "Recent blockspace",
      "value": "36%",
      "detail": "non-financial blockspace over last 90 days",
      "source": "Bitcoin Block Space Weekly Issue #3",
      "sourceUrl": "https://blockspaceweekly.substack.com/p/issue-3-three-years-of-spam",
      "publicationDate": "2025-12-22",
      "measuredAt": null,
      "rangeStart": null,
      "rangeEnd": "2025-12-22",
      "blockHeight": null,
      "methodology": "source classification of financial and non-financial blockspace",
      "classificationDefinition": "non-financial per source methodology",
      "caveat": "Use 40% only after a newer source verifies it",
      "status": "verified"
    }
  ],
  "notes": [
    "Use 40% and 90GB only after a newer source verifies them",
    "Different sources classify non-financial activity differently"
  ]
}
```

Do not fetch this live at runtime. Keep the existing project pattern: committed
JSON snapshots, explicit refresh, no deploy-time dependency on external APIs.

## Components To Reuse Or Add Later

Reuse if possible:

- `MetricStat.astro`
- `ChartPanel.tsx`
- existing source page panels
- lucide icons
- Recharts

Potential new components:

- `CurrentDamageSnapshot.astro`
- `ReceiptCard.astro`
- `SourceBackedClaim.astro`

Design constraints:

- No hand-drawn SVGs.
- No decorative cards inside cards.
- No oversized hero typography inside compact panels.
- Cards should stay compact and dense.
- Use exact source dates in small muted text.
- Avoid a one-note color palette. Current palette already has payment/accent/utxo/risk distinctions; keep that.

Rendered output requirements:

- `CurrentDamageSnapshot.astro` must render metric cards from typed data, not
  hardcoded prose.
- `ReceiptCard.astro` must render claim, rebuttal, receipt, source date, and
  caveat fields.
- `SourceBackedClaim.astro` or equivalent must visibly distinguish:
  - measured fact
  - source-defined classification
  - editorial interpretation
- Source page Markdown may still hold long-form copy, but structured cards
  should come from typed objects so missing fields are easy to catch.

## Proposed Copy Bank

Home snapshot headline:

> Feb 2023 was the ignition. The damage is still visible.

Home snapshot intro:

> The event window stays Feb 2023. The current data shows why it still matters:
> arbitrary data continues to compete with payments, and node operators carry
> the permanent cost.

Impact page current section headline:

> The current problem is not just fees. It is permanent state and storage.

Actions page headline:

> They told you there was nothing to do. There are levers.

Actions page copy:

> Node policy, mining templates, software defaults, and public pressure all
> change incentives. The question is which lever you actually control.

Core concerns framing:

> This page is not a claim that every contributor acts in bad faith. It is an
> evidence map of concerns around defaults, review power, moderation, funding,
> and whose costs are considered when policy changes are made.

Narratives card copy:

> A transaction can be consensus-valid and still be abusive to shared resources.

OP_RETURN narrative copy:

> OP_RETURN avoids the UTXO set, but it does not avoid blockspace or permanent
> archival storage.

Site-safe hard line:

> Non-action was not neutral. It moved the cost to payment users and node
> runners.

Optional harder editorial line:

> Congrats on letting yourselves be psyopped into non-action by scammers and
> spooks.

Usage rule for harder line:

- Use only if the site owner wants that voice.
- Prefer as share/meme copy, not as a source-backed factual assertion.
- Do not use "spooks" in an evidence section without receipts.

## Implementation Plan For Later

Phase 1: Source and data pass

1. Verify current Bitcoin Portal/Renaud values for:
   - arbitrary data GB, possibly 90 GB
   - recent arbitrary/non-monetary blockspace, possibly 40%
2. Refresh or confirm Statoshi UTXO data.
3. Decide whether to publish local Statoshi value, Mempool Research value, or
   both.
4. Create `current-damage-snapshot.json` with source dates and caveats.
5. Update `reference/articles-and-content-about-the-issue.md` with new sources.

Phase 2: Home and Impact

1. Add home `Current verified snapshot` section.
2. Add Impact `Then vs now` structure.
3. Add UTXO/dust/Taproot panels.
4. Keep Feb 2023 event charting intact.

Phase 3: Narratives and Actions

1. Convert narrative index cards to claim/rebuttal/receipt shape.
2. Promote "There is nothing you can do about it".
3. Add "It is just art" narrative if sources are sufficient.
4. Add Actions urgency intro.
5. Add clip placeholders only after exact timestamps are verified.

Phase 4: Core concerns

1. Rewrite `reference/concerns-about-core.md` as an evidence map.
2. Add Hodlonaut external investigation section.
3. Link PR 29187 and docs dispute into the issue map.
4. Rename route label only if the page content shifts from "devs" to
   "concerns".

Phase 5: Assets and shareables

1. Identify meme/image assets worth reincorporating.
2. Store source records and alt text.
3. Use assets as evidence/social context, not decoration.
4. Add share cards only where they directly support a narrative or action.

## Verification For Later Implementation

Run:

```sh
npm run data:test
npm run check
npm run build
```

If visual changes are made:

```sh
npm run qa:screenshots
```

If link changes are made:

```sh
npm run qa:links
```

Manual verification:

- Home still says "Event window: Feb 1 - Mar 15, 2023".
- Home does not imply the Feb 2023 event extends to 2026.
- Every current snapshot stat has source URL, measured date/range, and source
  publication/fetch date.
- "90 GB" and "12 GB" are not present unless verified.
- Narratives cards include receipts, not just summaries.
- Actions page has concrete role paths above the fold or near the top.
- Core concerns page distinguishes documented facts, external allegations, and
  open questions.
- Aggregate trend claims and causal/attribution claims are visually and
  textually separated.
- Desktop screenshot confirms the hero still anchors the first viewport and the
  current verified snapshot appears without turning the page into a generic
  2026 spam report.
- Mobile screenshot confirms the snapshot cards do not bury the event window or
  create excessive first-screen density.

## Acceptance Criteria

1. The site remains clearly about the February 2023 event.
2. The home page includes a current snapshot with source dates.
3. The Impact page can answer "non-monetary vs monetary, then and current
   verified snapshot".
4. Unsupported numbers are not published.
5. The UTXO/dust/Taproot claims are sourced to Mempool Research or refreshed
   primary data.
6. The Actions page gives visitors immediate next steps.
7. The Narratives page is easy to use as a rebuttal index.
8. The Core page is defensible and source-backed.
9. Build and Astro checks pass.
10. Structured cards render from typed data with required source/date/caveat
    fields.
11. Operational recommendations are verified as current before publishing.

## Open Questions

1. What exact source verifies "about 90 GB" arbitrary data as of June 2026?
2. What exact source verifies "12 GB" UTXO set size as of June 2026?
3. Should the site use "dust" or "dust-like under 1000 sats" in public copy?
4. Should the nav label change from "Core devs" to "Core concerns"?
5. Are there exact URLs/timestamps for the Lopp and Peter Todd/Petard clips?
6. Which memes/images are approved for reuse, and what source/permission context
   should accompany them?
7. Should the harder editorial voice be used on-page or limited to share cards?
