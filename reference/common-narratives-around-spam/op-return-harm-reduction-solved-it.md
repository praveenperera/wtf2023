# Fallacy: OP_RETURN harm reduction solved it

Source: https://wtfhappenedinfeb2023.com/common-narratives-around-spam/op-return-harm-reduction-solved-it

## OP_RETURN harm reduction solved it

OP_RETURN does not enter the UTXO set, but it still consumes blockspace and permanent archival storage. That makes it less harmful for node state than spendable low-value outputs, not harmless.

The harm-reduction argument says opening a larger OP_RETURN path redirects spam away from worse channels. The current evidence does not prove that. Mempool Research's OP_RETURN Report, published 2026-02-16, says the overwhelming majority of recent OP_RETURNs are standard and associated with Runes. Renaud Cuny's Issue #3 argues that opening another channel did not meaningfully reduce inscription activity in the data available then.

The better distinction is specific: OP_RETURN avoids UTXO-set bloat, but it does not avoid blockspace competition, archival storage, or the incentive problem created by normalizing Bitcoin as a general data store.
