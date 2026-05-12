# What you can do about it

Source: https://wtfhappenedinfeb2023.com/what-you-can-do-about-it

## What can you do about it

[As a node runner](https://wtfhappenedinfeb2023.com/what-you-can-do-about-it/as-a-noderunner)

- Use [Bitcoin Knots](https://github.com/bitcoinknots/bitcoin)

- Run a [BIP-110 node](https://bip110.org/) if you want consensus-level reduced-data enforcement.

- Set the following configuration options: *-permitbaremultisig=0, -datacarrier=0* (if you are using knots 25.1 or later)

A more detailed version of these instructions can be found [here](https://wtfhappenedinfeb2023.com/what-you-can-do-about-it/as-a-noderunner#install-run-knots).

[Running a node on a Raspberry Pi?](https://wtfhappenedinfeb2023.com/what-you-can-do-about-it/as-a-noderunner)

Don't forget that if you don't even use your node to broadcast your transactions and check the state of the chain or TXs of interest to you on-chain, your node plays no role at all in the network.

It is true though that if it's a full node, it could at least help someone synchronize their own node at some point in the future, which is the reason why it is important to keep the ability to run nodes affordable for most users.

- If you're using an Umbrel distribution to run your node, you can install a version of Bitcoin Knots which will filter the inscription related spam.

[As a miner](https://wtfhappenedinfeb2023.com/what-you-can-do-about-it/as-a-miner)

- Point your hashrate to [Ocean](https://ocean.xyz/getstarted) ("ocean" or "core+antispam" block template), or specifically "Monetary use only" ("Data free").

- Use [Rent Some Hash](https://rentsomehash.com/) if you want to rent hashrate and point it at a DATUM/OCEAN setup.

[As a developer](https://wtfhappenedinfeb2023.com/what-you-can-do-about-it/as-a-developer)

- PR for changed defaults ([inscription](https://github.com/bitcoin/bitcoin/pull/28408) or [baremultisig](https://github.com/bitcoin/bitcoin/pull/28217))

- Support Knots

- Encourage other nodes to adopt Knots (or patch Core).

[As a pleb](https://wtfhappenedinfeb2023.com/what-you-can-do-about-it/as-a-pleb)

Be vocal about your concerns, join discussions [[1](https://delvingbitcoin.org/t/bug-spammers-get-bitcoin-blockspace-at-discounted-price-lets-fix-it/327)], [[2](https://github.com/bitcoin/bitcoin/issues/29187)], [[3](https://bitcoin.stackexchange.com/questions/121734/why-cant-nodes-have-the-relay-option-to-disallow-certain-transaction-types)], ask questions, share knowledge. Remember that discussions are not always there to persuade the detractor, but to form an opinion of observers. Your voice **is** the market force.

Make sure to bookmark this resource, and when you see the fallacious line of reasoning — refer to the relevant section.
