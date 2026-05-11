# Sham maintenance fix - pull request 29187

Source: https://wtfhappenedinfeb2023.com/pr-29187-trying-to-fix-datacarriersize

Bitcoin core devs reaction

## PR 29187: trying to fix datacarriersize

This section is a collaboration with @[NTeterel](https://x.com/NTeterel) and was adapted from this [article](https://www.cointribune.com/les-devs-de-bitcoin-core-soupconnes-de-corruption/) he previously wrote.

Several developers in charge of the most popular Bitcoin client, Bitcoin Core, were being heckled for their passivity towards Inscriptions such as ordinals and other arbitrary data backed used to build ponzis. Bitcoin Core is the most used implementation of the Bitcoin protocol. It is the direct descendant of Satoshi Nakamoto's work. It is both a node and a wallet. Its code is maintained by hundreds of contributors. This is not the only available client (see Detailed installation instructions to learn more about alternatives, and mainly the Bitcoin Knots client, that are not as spam friendly as Core).

Since Bitcoin Core is the most used node client, its default parameters and settings can be considered to be de facto the consensus rules of the network. Code changes to the Bitcoin Core client are proposed via Pull Requests. Most are minor, but some can be major and these are often accompanied by [BIPs (Bitcoin Improvement Proposals)](https://github.com/bitcoin/bips) that can sometimes lead to soft forks.

A handful of developers known as « maintainers » have the power to authorize (« merge ») code modifications. This small conclave has the final say on the Bitcoin Core implementation, which represents 98% of all nodes. Since the recent departure of the veteran Van der Laan, the five maintainers are Michael Ford, Ava Chow, Russ Yanofsky, Gloria Zhao and Hennadii Stepanov.

However, here's the ranking of contributors ranked by the number of BIPs, improvement proposals, they spearheaded ([source](https://x.com/lopp/status/1743992730982756555)):

[Luke Dashjr](https://twitter.com/lukedashjr) - the second largest contributor - sparked a controversy by inviting Bitcoin Core to act to stop Inscriptions and other wasteful transactions from attacking the network. Luke Dashjr did so through a Pull Request, dated the 5th of January 05 2023. It is entitled: *"*[***Witness scripts being abused to bypass datacarriersize limit***](https://github.com/bitcoin/bitcoin/issues/29187)*"*.

The description of the Pull Request goes as follow:

### The datacarriersize policy option is meant to limit the size of extra data allowed in transactions for relaying and mining. Since the end of 2022, however, attackers have found a way to bypass this limit by obfuscating their spam inside OP_FALSE OP_IF patterns instead of using the standardized OP_RETURN. This remains under active exploitation to a degree very harmful to Bitcoin even today.

Explanation:

[As previously explained](https://wtfhappenedinfeb2023.com/common-narratives-around-spam/mempool-policy-is-censorship), filters (policy rules) hinders transactions undesirable by noderunners (each node runner decides for themselves their own policy) from being relayed by nodes into a block. For example, **Bitcoin Core does not relay by default transactions weighing more than 100,000 vbytes, or those paying less than 1 sat/vbytes in transaction fees.** This is enforced by default policy rules, aka «filters ». And yes, you have been running these filters if you've been running the Bitcoin Core client with default settings.

In Luke's PR,**Datacarriersize** refers to the "***OP_RETURN***" opcode (discussed in [Satoshi inscribed on-chain so I should be able to do it too](https://wtfhappenedinfeb2023.com/common-narratives-around-spam/satoshi-inscribed-on-chain)).***OP_RETURN***is an OP_CODE that was created in 2014 to offer an alternative to the more harmful techniques used at the time to insert arbitrary data on chain. It offers a limited space of 83 bytes per transaction that transaction emitters can use to add arbitrary data. That's enough to enter a SHA-256 hash (32 bytes) as well as an identification tag.**OP_RETURN**data will not be stored in the UTXO set (which is very harmful to the whole network) but**it will still be stored on nodes forever**.

What Luke means here is that he considers it a bug that **Datacarriersize**was not applied to all types of transaction data in the Segwit and Taproot soft forks. Basically, he is saying that**Datacarriersize** should have been updated to consider the new structures of data allowed by the Segwit and Taproot updates.

Fingers are often pointed at the SegWit and Taproot soft forks, which have increased and then eliminated the maximum size of transaction scripts. But that's a bit of a leap:

### [The maximum size of transaction scripts] was not lifted for purposes of exploiting it for data injection. Data injection could always exceed the limit, at the consensus level. If the script was too big, it would simply not be executed. Spam filters have always been at the policy level, and that's where they ideally belong.

In the absence of filters, **arbitrary data can easily be injected by anyone for any purpose through transactions that would have otherwise been rejected by default mempool policies**. This attack vector is what has been exploited by BRC-20 and Inscriptions to circumvent protocol limitations and subvert the purpose of the Bitcoin protocol for token and storage purposes. The whole DoS operation is being payed for by those being lured into buying all these so-called "*projects*".

This can be considered as an **attack because these hundreds of thousands of voluminous transactions** lengthen the initial synchronization time of a node or the IBD (Initial Blockchain Download), which already takes between 2 days and 3 weeks! Not to mention the premature rise in transaction fees and the cost of the quickly growing memory required to run a node.

## Media

- [Image](https://res2.weblium.site/res/6627b42175a2700010093916/662a61786ca658000f12fae2_optimized)
