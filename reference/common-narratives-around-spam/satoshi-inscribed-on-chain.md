# Satoshi inscribed on-chain so... | WTF Happened Feb 23

Source: https://wtfhappenedinfeb2023.com/common-narratives-around-spam/satoshi-inscribed-on-chain

Common narratives around spam

## Satoshi inscribed on-chain so I should be able to do it too

A common argument presented by inscription supporters is that Satoshi started the trends of injecting data in the timechain with the Genesis block message. **This argument is simply wrong since Satoshi did not subvert (2nd characteristic of spam) the protocol to "inscribe" data.**As a matter of fact, he**hardcoded**the short text (along with the rest of the block) in [the source code](https://github.com/bitcoin/bitcoin/blob/8dca7864f793072701f810e4c5ea12a6e1087085/main.cpp#L1484) of the computer program (for the purpose of authentication of the start-date of the chain; had the chain started at another day then the text would have been a copy of a different headline of a newspaper). The text is placed in a small field that allows only a miner to input up to [100 bytes](https://github.com/bitcoin/bitcoin/blob/master/src/consensus/tx_check.cpp#L49) of arbitrary data in a block they find.**It's always been part of Bitcoin and didn't introduce any wastefulness.**

[More information here.](https://www.oreilly.com/library/view/mastering-bitcoin/9781491902639/ch08.html)

Satoshi disapproved spam in Bitcoin and wrote:

"*That's one of the reasons for transaction fees. There are other things we can do if necessary.*" ("[https://bitcointalk.org/index.php?topic=195.msg1617#msg1617](https://bitcointalk.org/index.php?topic=195.msg1617#msg1617)")

in response to the risk that Lady Gaga video might have been transferred through the Bitcoin network.

Similarly, he wrote:

"*If there's going to be a message system, it should be a separate system parallel to the bitcoin network. Messages should not be recorded in the block chain.*" ("[https://bitcointalk.org/index.php?topic=1545.msg18250#msg18250](https://bitcointalk.org/index.php?topic=1545.msg18250#msg18250)"). Satoshi didn't put a message in any of the many blocks that he mined.

In addition, this argument does not really matter as Satoshi's initial actions should not be blindly followed and used to justify your actions. Everybody can make mistakes, and no one can plan for all future scenarios, especially in a complex system such as Bitcoin that is highly unpredictable.

This event, instead of being taken as a justification that Bitcoin should be used as a perpetual highly-replicated database, should be **considered as a celebration of the right ways you can post data on chain in a responsible way** as it uses an existing method to store arbitrary data by miners that doesn't obviously circumvent a Bitcoin function.

OP_RETURN

If you're curious, you can explore these messages on opreturnbot.com. Learn more from the [Bitcoin Explained Podcast](https://youtu.be/NYj80OGlWGg).

It's still important to highlight that when the*OP_RETURN*[code was released](https://bitcoin.org/en/release/v0.9.0#downgrading-warnings), it was clearly specified that *"Storing arbitrary data in the blockchain is still a bad idea; it is less costly and far more efficient to store non-currency data elsewhere."*Another extremely important point is that *OP_RETURN*data is still stored on nodes forever, that is the reason why they are limited (to 40 bytes in Bitcoin Knots) by default.*OP_RETURN*data does not benefit from the segregated witness discount.

Inscriptions that are omni-present in the 2023 wave of spam basically have the same impact on the network as *OP_RETURN*data except that they benefit from the segregated witness discount and manage to go above the 80 bytes limit using the*OP_IF OP_FALSE*injection scheme.

What's next?

● Want to take control over your mempool's policies? You can easily do that by running [Bitcoin Knots](https://wtfhappenedinfeb2023.com/what-you-can-do-about-it/as-a-noderunner#install-run-knots).

● [More information about mempool policy and its role](https://bitcoin.stackexchange.com/questions/120269/what-is-mempool-policy)

## Media

- [Image](https://res2.weblium.site/res/6627b42175a2700010093916/6628f8512df0cc000e536328_optimized)
