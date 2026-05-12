# Fallacy: valid transaction can't be abusive

Source: https://wtfhappenedinfeb2023.com/common-narratives-around-spam/a-valid-transaction-is-a-valid-transaction

## A valid transaction is a valid transaction

Spam defenders will often **point to the fact that a spam transaction is valid**, in the eyes of the protocol, because it pays the required fee and respects the structure required by the protocol. Even though the transactor paid a fee, it does not mean that the transaction cannot be a spam transaction. **By definition, spam will always be a valid transaction**; it would otherwise not be relayed through mempools and would not be included in a block. That does not mean that some valid transactions are not violating the two definitions [previously defined](https://wtfhappenedinfeb2023.com/characteristics-of-spam), meaning that the transaction can still waste the shared resources of the network and/or abuse one of Bitcoin's functions for a malicious intent.

Discussing the **validity of the transaction is not the issue** and participants should not let the debate diverge in that direction. Spam will always be valid. The questions that should be discussed are:

- **Are these transactions willingly wasting the shared resources of the network?**

- **Is there a malicious intent behind this wave of transactions?**

- **Can the purpose of these transactions be achieved more efficiently?**

- **Are these transactions abusing some of Bitcoin's functions to circumvent limitations put in place to preserve the network's resources?**

Another important detail is that some of the spam from the current wave, mostly inscription-based spam, can be considered to not be paying a fair fee as it circumvents the fair fee market by injecting data into the segregated witness space in order to benefit from a x0.25 discount. This is not the case for bare multisig based spam or *OP_RETURN* based spam.

> The code is not consensus.
> The code is an attempt to implement the consensus.
> The implementation can be flawed (this isn't the first time).

— Asher Hopp (@AsherHopp), [May 14, 2024](https://twitter.com/AsherHopp/status/1790248103913898010)
