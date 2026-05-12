# The impact of spam on Bitcoin

Source: https://wtfhappenedinfeb2023.com/stats-about-spam

## The impact of spam

Mempool.space's transactions by fee rate since 2020

*A clear increase in transactions entering mempool.space can be seen starting February 2023. Until today, such increases are usually only experienced by the network during the so-called "bull runs", making this one a noticeable anomaly.*

Want to see what a spam-free mempool looks like? Take a look at this one, hosted by @[leo_haf](https://twitter.com/leo_haf).

This mempool does not contain this kind of spam:

- "inscriptions"

- (fake) bare multisig

- (fake) bare pubkey

- *OP_RETURN*

Space occupied by non-payments VS payments on the timechain since January 2023

*Soon after the beginning of the 2023 spam wave, non-financial transactions have been occupying about 50% of the available blockspace, except during short breaks. This chart does not consider data storage transactions that use bare multisig.* [*BTC spam analysis*](https://dune.com/piratebiscuit/btc-spam-analysis)

Fees paid by non-payments VS payments on the timechain since January 2023

*Although non-payment related transactions occupy about 50% of each block, the majority of the fees paid in each block are still coming from payments. This data shows how non-payment transactions (spam) are displacing payment transactions, this is forcing payment transactions to pay a much higher fee to be included in blocks.* [*BTC spam analysis*](https://dune.com/piratebiscuit/btc-spam-analysis)

Size of UTXO since January 2023

*The size of the UTXO set, number of unspent UTXO outputs, has seen a drastic increase since the beginning of the 2023 spam wave. This is partially due to Inscriptions/BRC-20 but mainly due to spam that relies on bare-multisig data to store data on the timechain.* [*UTXO set size*](https://statoshi.info:3000/d/000000009/unspent-transaction-output-set?orgId=1&from=2023-01-01T00:00:00.000Z&to=now&refresh=10m&viewPanel=panel-8)

Examples of spam in Bitcoin

These are the examples of the spam in Bitcoin:

- [Inscription without any input or output](https://mempool.space/tx/99e70421ab229d1ccf356e594512da6486e2dd1abdf6c2cb5014875451ee8073)

- [Inscription with input and output](https://mempool.space/tx/3e35e0c6f33c47a77dc4639a7c9ff256db51ab7687c39d1b67f8e356410c5249)

- [Spam with OP_RETURN method](https://web.archive.org/web/20240502132540/https://blockstream.info/tx/bce0d6c9128064ff1f5e1c8baf1f85e5444d8a4870cba6a840ef7b00f9c7a7e1)
