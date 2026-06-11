# Bitcoin Core concerns

Source: https://wtfhappenedinfeb2023.com/concerns-about-core

## What this page is and is not

This page is not a claim that every contributor acts in bad faith. It maps concerns around defaults, review power, funding, and whose costs are considered when policy changes are made.

## Issue map

### Documentation narrowed `-datacarriersize`

Concern: documentation changed after inscriptions exposed a gap between user expectations and policy behavior.

What happened: the documented record shows a change from language about the maximum size of data in data-carrier transactions to language scoped to data-carrying raw scriptPubKeys.

Why it matters: changing docs instead of behavior can redefine a policy limit after users notice the implementation did not cover newer data paths.

Primary sources:

- [Bitcoin Core PR 27832](https://github.com/bitcoin/bitcoin/pull/27832)
- [Fixing a bug through documentation change](https://wtfhappenedinfeb2023.com/fixing-a-bug-through-documentation-change)

### PR 29187 and witness data paths

Concern: PR 29187 asked whether `-datacarriersize` should apply to witness-script data paths that inscriptions used to bypass older data-carrier expectations.

What happened: Luke Dashjr opened a Bitcoin Core issue arguing that witness scripts were being abused to bypass the data-carrier-size limit.

Why it matters: the dispute exposed a policy boundary between consensus validity, relay defaults, mining templates, and what costs node runners are expected to absorb.

Primary sources:

- [Bitcoin Core issue 29187](https://github.com/bitcoin/bitcoin/issues/29187)
- [PR 29187: trying to fix datacarriersize](https://wtfhappenedinfeb2023.com/pr-29187-trying-to-fix-datacarriersize)

### Review power and default policy

Concern: Bitcoin Core defaults strongly influence the network even though they are not consensus rules.

What happened: most users keep defaults, miners and relay nodes often inherit defaults, and proposed changes to defaults can shape what transactions propagate before block inclusion.

Why it matters: when defaults favor arbitrary-data relay, the cost is not only carried by the users who choose that policy. Monetary transactions compete in the same blockspace market, and node runners carry the resulting storage and UTXO pressure.

Primary sources:

- [Bitcoin Core issue 29187](https://github.com/bitcoin/bitcoin/issues/29187)
- [Mempool Research OP_RETURN Report](https://research.mempool.space/opreturn-report/)
- [Bitcoin Block Space Weekly Issue #3](https://blockspaceweekly.substack.com/p/issue-3-three-years-of-spam)

### Funding and governance concerns

Concern: external funding, institutional incentives, and informal influence can affect what work is prioritized or treated as out of scope.

What happened: external investigations have raised concerns about contributor pipelines, institutional relationships, and social pressure around independent contributors.

Why it matters: funding context can help readers understand why default-policy choices are contested.

Sources:

- [The Capture: The Network](https://www.citadel21.com/the-network) documents claims about informal power, funding, recruitment, and maintainer paths.
- [The Capture: The Lever](https://www.citadel21.com/the-lever) documents claims about social and institutional pressure affecting independent contributors.
