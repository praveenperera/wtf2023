# Filters experiment

Source: https://wtfhappenedinfeb2023.com/common-narratives-around-spam/the-100-sats-tx-challenge

Common narratives around spam

## The 100 sats TX challenge

[Francis Pouliot](https://twitter.com/francispouliot) proposed a simple challenge to prove that **some things can be done and that one of those things is simply introducing filters**. In a tweet, he challenged someone claiming that*"spam filters don't work",*meaning that mempool policies don't work - see [Mempool policy is censorship](https://wtfhappenedinfeb2023.com/common-narratives-around-spam/mempool-policy-is-censorship), **to send 100 sats to a specific address**.

*Please send 100 sats to this address*

*bc1qc3qlmus3udzwrfxtkja8upe33jvlydwy2cjr96*

*— FRANCIS - BULLBITCOIN.COM (@francispouliot_) January 6, 2024*

This challenge aims at showing that filters do work because Bitcoin Core currently has a default dust filter that makes it very hard to get a 100 sats transaction relayed.

One of the participants to the conversation who accepted to take on the challenge has explicitly stated that they submitted such a transaction to a miner, allegedly Luxor, to mine this transaction as they know it won't be relayed by the network because of mempool policies. This action simply proves that mempool filters do work as they had to collude with a miner to get their transaction in a block, which didn't happen yet more than 4 hours after the challenge started because they need to wait for the miner they colluded with to find a block. This also means that the miner will have to continuously include this 100 sats transaction in their templates and that chances of this transaction making it through are as high as the hashrate share represented by the pool of that miner. This will of course mean that if transactions ready to pay a higher fee present themselves meanwhile, they might have to reject them to keep the 100 sats transaction if the block is already full. One of the participants who tried to do so actually explained that they [tried sending a 100 sats transaction to a larger pool, ViaBTC, which would maybe get it through faster, but that it got rejected](https://x.com/benthecarman/status/1743761650430181581?s=20) - most likely because of mempool policy (filters.)

The transaction will eventually make it through, but it required colluding with a miner that's willing to take it Out of Band, outside of the mempool, and that strongly limited the reach of the transaction since only a single pool is working on it which relegates it to the next block found by that pool. Currently, spam is mined by all miners which makes it present in blocks.

Miners can try to put whatever they want in blocks, the only workaround nodes have against that is to reject a valid block (meaning that it has a valid Proof-of-Work that answers the Difficulty condition) that contains some transactions or data proposed by a miner.

## Media

- [Image](https://res2.weblium.site/res/6627b42175a2700010093916/6649ed6d24f30d07ba18b0d9_optimized_602_e720x221-59x18)
- [Image](https://res2.weblium.site/res/6627b42175a2700010093916/6649ee58a3998e710e3fec64_optimized)
