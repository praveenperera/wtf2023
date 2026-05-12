# Characteristics of spam

Source: https://wtfhappenedinfeb2023.com/characteristics-of-spam

## Characteristics of spam

During waves of spam, spam is always defended by spam supporters/defenders by claiming that **spam is subjective** and that what is spam for you might not be spam for someone else, as they might have a use for it. This section aims at addressing this mischaracterization.

Spam opponents often tend to define or characterize spam by defining it based on the **purpose of the network (_Peer-to-peer Electronic Cash system_)**, although there is truth in this characterization, it is an argument that can be hard to defend as the purpose of the network is a concept that can be seen as **subjective**. However, spam can also be **recognized by anyone**, even intellectually honest spammers, thanks to **two main characteristics**:

1. **Wastefulness of the shared network resources**

2. **Obvious misuse of Bitcoin's functions for a malicious purpose.** In addition, these transactions are also often sent in large volumes.

Transactions with **no practical value or purpose**, such as those submitted by supporters of big blocks during the Blocksize wars for example, are characterized by wastefulness as their output was too small to spend. Other examples of wastefulness are transactions that are sent back and forth repeatedly to the same addresses, transactions which carry no state information, transactions purposelessly split into hundreds of tiny outputs that are then recombined in the next transaction, etc... These transactions are malicious partly because they are wasteful, creating a backlog in the mempool that **drives up transaction costs unnecessarily**. The 2023 wave of spam is especially egregious because it involves **storing obscenely large and unoptimized state data using methods that abuse several of Bitcoin's functions**, such as the segregated witness script discount, *OP_IF OP_FALSE* codes, and bare multi-signatures.

> (...) There's a reasonable argument that this sort of data is toxic to the network, since even though "the market is willing to bear" the price of scares blockspace, if people were storing NFTs and other crap on the chain, then the Bitcoin fee market would become entangled with random pump & dump markets, undermining legitimate use cases and potentially preventing new technology like LN from gaining a strong foothold. (...)

— Andrew Poelstra, 2023 January 27, [Bitcoin-dev mailing list](https://lists.linuxfoundation.org/pipermail/bitcoin-dev/2023-January/021372.html)

These transactions can be classified as spam due to their ignorance or malice, they could also occur off-chain relatively easily through NFTs with reference hashes or *BRC-20* tokens with reference hashes much more efficiently and this was already proposed several times. Functionally, the result would be the same as it would allow users of this "standard" to verify the data **without overwhelming the chain**. *BRC-20* tokens are **not optimized at all** for example and use clear JSON (!) instead of *HEX* or *base64* encoding, demonstrating a **complete disregard for the shared resource of the timechain**. This failure is particularly concerning since they account for more than 50% of the average block's size, as shown in the BTC spam analysis blocksize graph despite being avoidable with a more responsible usage.

> "(...) people really don't like this [NFT, Ordinals] and I apologize because they are kind of my fault that all that script limit relaxation I was talking about for TapRoot - that's why we can do it. (...) relaxing this script limits (...) makes one particular form of data stuffing possible."

— Andrew Poelstra, 2023 August 28, [Stephan Livera Podcast episode 507](https://youtu.be/PrUr2zwff_0?t=3040)

The two characteristics presented above are a simple way to recognize spam that most likely violates the purpose of the network and the desired behavior, and Bitcoin actually supports other protocols that submit non-payment transactions which are not considered as spam by most participants. A good example is the [OpentimeStamps protocol](https://opentimestamps.org/) (there are also many bad examples), which uses Bitcoin for blockchain timestamping and is not considered as spam by most participants in the network as it generally does not present the two characteristics presented above: it uses shared resources efficiently and does not misuse Bitcoin's functions.
