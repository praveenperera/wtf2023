# Bitcoin Core devs: fixing a bug by updating the documentation

Source: https://wtfhappenedinfeb2023.com/fixing-a-bug-through-documentation-change

Bitcoin core devs reaction

## "Fixing" a bug through documentation change

Bitcoin needs a large number of nodes to be decentralized. It is therefore vital to contain the growth of the blockchain and the UTXO set as much as possible. A blockchain cannot be a parking lot for arbitrary data. Unfortunately, Bitcoin Core's maintainers refused to send a strong message by updating the filters. Maintainers Andrew Chow, Gloria Zhao and Marco Falke have been criticized since noderunner [Unhosted Marcellus](https://x.com/oomahq) discovered a**stealth modification to Bitcoin Core's documentation**. Marcellus realized that maintainer Marco Falke rewrote the documentation about**-Datacarriersize just after** the Inscription craze began to redefine its definition from:

*« Maximum size of****data in data carrier transactions****we relay and mine. »*

to

*« Relay and mine transactions whose data-carrying****raw scriptPubKey****is of this size or less (80 bytes). »*

AJ Towns and Gibbs ACKed the redefinition ([https://github.com/bitcoin/bitcoin/pull/27832](https://github.com/bitcoin/bitcoin/pull/27832)).

For non-technical plebs: Bitcoin Core v26 vandalized the description -datacarriersize so that it leaves out the spam, instead of fixing the eklaFocraM%40.gub made the change, @ajtowns and @theinstagibbs gave their ekauqnaf%40.SKCA merged it. @achow101 defends the change.

— Unhosted Marcellus 🚫👻 (@oomahq) January 3, 2024

This was around the same time Luke proposed to extend the applicability of **datacarriersize**to also catch inscriptions. Then Gloria Zhao and Ava Chow (Bitcoin Core maintainers with commit access and merge rights)**used that new meaning** of datacarriersize as an argument to reject the fix.

In other words, **it was realized quite early on that the Bitcoin Core code did not behave according to the description in the documentation but instead of fixing the code, maintainers chose to change the documentation.**Several noderunners have accused maintainers of insidiously reducing the scope of**-Datacarriersize this way.**The aim was to justify inaction on new techniques of data injection into transactions. After the discovery of this stealth change, maintainer Achow made the claim that changing the documentation was somehow a way of eliminating the bug...

This help text only started specifying "raw scriptP*ubKey" in v26, while the exploit has been known since January.*

*Honestly, it's pretty disingenuous to change the description months after the fact to avoid admitting there is a bug. pic.twitter.com/XhH6w4p034*

This contortionism aimed at protecting the inscriptions’ circus is worrying. Faced with this *Commedia dell'arte*, Luke has taken the lead by developing the "ordirespector" patch. Head to the [Install page](https://wtfhappenedinfeb2023.com/what-you-can-do-about-it/as-a-noderunner) to learn more about running this patch or even running an alternative Bitcoin Core client, Bitcoin Knots, that does not relay spammy transactions.

## Media

- [Image](https://res2.weblium.site/res/6627b42175a2700010093916/664a02edf81f5622bbffaaaa_optimized)
- [Image](https://res2.weblium.site/res/6627b42175a2700010093916/664a0460a3998e710e401e04_optimized)
- [Image](https://res2.weblium.site/res/6627b42175a2700010093916/665210de2a383a6015f8f6e3_optimized)
