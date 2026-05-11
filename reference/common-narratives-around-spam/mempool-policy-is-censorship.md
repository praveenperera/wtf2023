# Mempool policy is CenSorShIp

Source: https://wtfhappenedinfeb2023.com/common-narratives-around-spam/mempool-policy-is-censorship

Common narratives around spam

## Mempool policy is censorship

First of all, it's important to understand that each node runs there own sovereign mempool, there is no such thing as a single mempool, although we often refer to *the* mempool.

The statement*"mempool policy is censorship"*implies that any policy applied to your mempool, which temporarily stores unconfirmed transactions in your Bitcoin node before they're added to blocks, is a form of censorship. However, this argument is wrong because**mempool and relay are not forced on you by anyone and are not enforced over the whole network under threat**; instead, they only allow you to**take control over your own mempool**and relay policies to prioritize or refuse to store or relay certain types of transactions. This is the**opposite of censorship**, this is what sovereignty means. This set of rules can be defined through your bitcoin.conf file to describe**what a valid transaction is from the point of view of your own mempool.**
**Policy is everything that is not consensus.** Modifying your mempool and relay policies**does not go against consensus**as you're only affecting what happens before transactions are included in a block. Your node will still receive, record and relay all blocks that are mined by the network and your node will remain within consensus.

Mempool policies are necessary for ensuring **efficient and effective usage of the limited resources in the Bitcoin network**during periods of high traffic or congestion while also prioritizing critical transaction needs like payments. Nodes are responsible for enforcing their belief of the purpose of the network,**these policies are your voice on the network.**
**Censorship is defined as the suppression of speech, public communication, or other information, and is enforced by a central authority that will rely on violence or punishment to force everyone to delete and suppress said information.**In the case of mempool and relay policies, since each actor is free to set their own rules without being forced to apply a specific set of rules (default rules are often kept by most users but that is a different subject), it is thus obvious that these policies are the opposite of censorship.

In the case of spam, **refusing to store or relay it with your node can be defined as resource management or moderation, not censorship.**Refusing to relay information that is not aligned with that purpose is a form of moderation, the same way an academic journal about physics will refuse a publication submitted about psychology. Publishing it would otherwise inconvenience most of the readers of that journal who are subscribing and reading that journal because they are interested in advancements in physics.**The main difference in the case of Bitcoin is that the moderation and its enforcement is decentralized over all nodes through mempool and relay policies.**

In addition, other users are not entitled to your node's resources. If you choose to not store or relay some transactions with your node, that is well within your property rights.

**Running a node is an active process.**You might have been told that if *"you're running a node, you're good",*that is just the first step. [Noderunners](https://wtfhappenedinfeb2023.com/what-you-can-do-about-it/as-a-noderunner) must remain ever vigilant and ready to act in case of attack. This is effectively what makes Bitcoin anti-fragile.
