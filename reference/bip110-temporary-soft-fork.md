# BIP-110 temporary soft fork

Source: https://bip110.org

## BIP-110 is the proposed answer

The Core dispute does not end at PR 29187 or the `-datacarriersize` wording fight. It points directly at [BIP-110](https://bip110.org): a temporary consensus soft fork that says Bitcoin is money, not a subsidized data warehouse.

BIP-110 is the line Core refused to draw at relay policy. It temporarily limits the worst arbitrary-data surfaces at consensus level, so miners cannot bypass public relay policy by placing oversized data directly into blocks.

The proposal is deliberately narrow. It does not confiscate existing UTXOs, does not retroactively invalidate old coins, and does not try to make every possible steganographic trick impossible. It makes the obvious abuse paths invalid for roughly one year, gives wallets and miners a known deployment window, and then expires unless the network chooses a later replacement.

In plain terms, BIP-110 limits:

- new `scriptPubKey` outputs above 34 bytes, except `OP_RETURN` up to 83 bytes
- `OP_PUSHDATA*` payloads and witness stack elements above 256 bytes, with the BIP16 redeemScript exception
- spends from undefined witness and Tapleaf versions during the deployment
- Taproot annexes, oversized control blocks, `OP_SUCCESS*`, and `OP_IF` or `OP_NOTIF` inside Tapscripts

That is not a ban on Bitcoin payments. It is a refusal to make every node runner underwrite file storage forever.

## Activation mechanics

BIP-110 uses miner signaling first, then mandatory lock-in if voluntary signaling fails.

Signaling began on December 1, 2025. Miners signal readiness with bit 4. If 55% of blocks in a difficulty retarget period signal support, the soft fork locks in early. That threshold is 1,109 of 2,016 blocks.

If miners do not reach that threshold before the deadline, mandatory signaling begins around August 2026. At that point, blocks that fail to signal are rejected by enforcing nodes. After lock-in, there is a two-week grace period before activation.

Once activated, blocks that violate the new temporary data limits are invalid to enforcing nodes. Inputs spending UTXOs created before activation remain permanently exempt, so existing funds do not have to move before a deadline. After 52,416 blocks, roughly one year, the restrictions expire automatically.

The activation design is the point: BIP-110 does not ask miners whether node operators deserve protection forever. It gives them a signaling path, then forces the question if they refuse to price the damage they impose on everyone else.

## Economics and game theory

The fee-market objection fails because it prices the wrong party.

A miner can accept a one-time fee for arbitrary data. Every full node then stores, validates, relays, indexes, backs up, and legally carries that data without being paid. The miner sells the externality. Node runners eat it.

That is not a market outcome. It is a cost shift.

BIP-110 changes the game by making the worst data-storage blocks invalid, not merely non-standard. Relay policy can slow abuse when miners cooperate. Consensus rules are what matter when miners or direct-to-miner paths decide to ignore relay policy.

The temporary design also answers the claim that a soft fork must be perfect to be justified. BIP-110 does not need to make arbitrary data impossible. It needs to stop treating cheap, contiguous, consensus-valid storage as a right, raise the cost of abuse, and remove the expectation that Bitcoin Core defaults must accommodate the spam business model.

## Legal exposure

The legal problem is not theoretical comfort. It is involuntary carriage.

Arbitrary data can include material that node operators did not create, did not request, cannot selectively remove, and may still be forced to store if they want to validate Bitcoin independently. That is a dangerous attack surface because it turns ordinary node operation into permanent hosting for unknown third-party content.

BIP-110 reduces that exposure by limiting the data channels most useful for stuffing large payloads into the chain. It does not pretend law is settled. It treats uncertainty as a reason to shrink the attack surface before hostile actors, prosecutors, regulators, or civil litigants get to define it for Bitcoin users.

The burden should be on people who want to use Bitcoin as a publication system. It should not be on every user who wants to run a node.

## The objections are not principled objections

The common objections do not survive contact with the actual proposal.

"This freezes funds" ignores the permanent exemption for UTXOs created before activation and the narrow conditions required for a future Taproot script path to be affected.

"This breaks Lightning or multisig" ignores that standard Lightning channels and normal multisig stay within the limits. The edge cases are advanced Taproot scripts using patterns that can be rewritten, such as splitting conditional branches into separate tapleaves.

"Spam will just split into chunks" concedes the point. BIP-110 raises cost and destroys the easy, contiguous storage path. A defense does not fail because attackers can still waste money trying harder.

"Relay policy is enough" ignores direct miner submission and the fact that policy is only a local default. If a miner includes the transaction in a valid block, policy already lost.

"This is censorship" confuses monetary validity with a claimed right to make everyone else store arbitrary data. Bitcoin has always had limits. BIP-110 makes the limit explicit where the abuse is happening now.

The principled position is simple: people using Bitcoin as money should not be forced to subsidize people using Bitcoin as a landfill. BIP-110 is the temporary soft fork that finally says so.
