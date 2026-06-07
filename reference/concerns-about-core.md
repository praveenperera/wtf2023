# Bitcoin Core concerns

Source: https://wtfhappenedinfeb2023.com/concerns-about-core

## What this page is and is not

This page is not a claim that every contributor acts in bad faith. It is an evidence map of concerns around defaults, review power, moderation, funding, and whose costs are considered when policy changes are made.

The standard for this page is simple: each issue should point to primary records when those records are available. External investigations and commentary can add context, but they should not replace GitHub, mailing-list, IRC, funding, or moderation records when those records can be checked directly.

## Issue map

### Documentation narrowed `-datacarriersize`

Concern: documentation changed after inscriptions exposed a gap between user expectations and policy behavior.

What happened: local source material documents a change from language about the maximum size of data in data-carrier transactions to language scoped to data-carrying raw scriptPubKeys.

Why it matters: changing docs instead of behavior can redefine a policy limit after users notice the implementation did not cover newer data paths.

Primary sources:

- [Bitcoin Core PR 27832](https://github.com/bitcoin/bitcoin/pull/27832)
- [Fixing a bug through documentation change](https://wtfhappenedinfeb2023.com/fixing-a-bug-through-documentation-change)

Open question: was the change intended as a clarification, or as justification for leaving witness data paths outside the policy limit?

### PR 29187 and witness data paths

Concern: PR 29187 asked whether `-datacarriersize` should apply to witness-script data paths that inscriptions used to bypass older data-carrier expectations.

What happened: Luke Dashjr opened a Bitcoin Core issue arguing that witness scripts were being abused to bypass the data-carrier-size limit.

Why it matters: the dispute exposed a policy boundary between consensus validity, relay defaults, mining templates, and what costs node runners are expected to absorb.

Primary sources:

- [Bitcoin Core issue 29187](https://github.com/bitcoin/bitcoin/issues/29187)
- [PR 29187: trying to fix datacarriersize](https://wtfhappenedinfeb2023.com/pr-29187-trying-to-fix-datacarriersize)

Open question: should relay policy defend only against resource exhaustion narrowly defined by existing code paths, or also against new arbitrary-data paths that create the same user-facing cost?

### Review power and default policy

Concern: Bitcoin Core defaults strongly influence the network even though they are not consensus rules.

What happened: most users keep defaults, miners and relay nodes often inherit defaults, and proposed changes to defaults can shape what transactions propagate before block inclusion.

Why it matters: when defaults favor arbitrary-data relay, the cost is not only carried by the users who choose that policy. Payment users compete in the same blockspace market, and node runners carry the resulting storage and UTXO pressure.

Primary sources:

- [Bitcoin Core issue 29187](https://github.com/bitcoin/bitcoin/issues/29187)
- [Mempool Research OP_RETURN Report](https://research.mempool.space/opreturn-report/)
- [Bitcoin Block Space Weekly Issue #3](https://blockspaceweekly.substack.com/p/issue-3-three-years-of-spam)

Open question: how should default-policy decisions weigh miner convenience, relay predictability, payment usability, and node resource costs?

### Moderation and process concerns

Concern: participants have alleged that some public technical discussions were narrowed, shut down, or moderated in ways that shaped the policy debate.

What happened: this site has not yet reduced those allegations to a complete primary-source timeline.

Why it matters: moderation can be legitimate, but process legitimacy matters when policy defaults decide who bears network costs.

Primary source status: no complete primary-source timeline has been added for this concern yet.

Open question: which specific GitHub, mailing-list, IRC, Delving Bitcoin, or moderation records support each allegation?

### Funding and governance concerns

Concern: external funding, institutional incentives, and informal influence can affect what work is prioritized or treated as out of scope.

What happened: external investigations have raised concerns about contributor pipelines, institutional relationships, and social pressure around independent contributors.

Why it matters: funding context can help readers understand why default-policy choices are contested, but it should not be used as a substitute for evidence about a specific code or moderation decision.

Primary source status: no complete funding and governance record map has been added for this concern yet.

Open question: which concrete funding, employment, grant, maintainer, or review records connect to the spam-policy decisions discussed here?

## External investigation: The Capture

Hodlonaut's "The Capture" articles can be used as external investigation context.

- [The Capture: The Network](https://www.citadel21.com/the-network) documents claims about informal power, funding, recruitment, and maintainer paths.
- [The Capture: The Lever](https://www.citadel21.com/the-lever) documents claims about social and institutional pressure affecting independent contributors.

These articles should be presented as sourced external investigations with named sources and right-of-reply notes, not as a substitute for primary GitHub, IRC, mailing-list, funding, and moderation records.
