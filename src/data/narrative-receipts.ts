export type NarrativeReceipt = {
  id: string;
  claim: string;
  rebuttal: string;
  href: string;
  receipt: {
    sourceTitle: string;
    sourceUrl: string;
    publicationDate: string;
    measuredRange: string;
    evidenceSummary: string;
    caveat: string;
  };
};

export const narrativeReceipts = [
  {
    id: "there-is-nothing-you-can-do-about-it",
    claim: "There is nothing you can do about it",
    rebuttal:
      "Filters, miner policy, software defaults, and users changing software all change incentives. Non-action is a choice.",
    href: "#there-s-nothing-you-can-do-about-it",
    receipt: {
      sourceTitle: "Bitcoin Block Space Weekly Issue #26",
      sourceUrl:
        "https://blockspaceweekly.substack.com/p/issue-26-block-space-health-structurally",
      publicationDate: "2026-05-26",
      measuredRange: "last 90 days ending 2026-05-26",
      evidenceSummary:
        "Renaud Cuny reported 46% non-monetary blockspace over the last 90 days, up from 37% six months earlier.",
      caveat:
        "This source uses its own non-monetary classification, so compare it with other spam estimates cautiously.",
    },
  },
  {
    id: "high-fees-will-solve-spam",
    claim: "High fees will solve spam",
    rebuttal:
      "The issue is not only fee level. It is whether users making monetary transactions and node runners are forced to carry wasteful permanent data.",
    href: "#high-fees-will-solve-spam",
    receipt: {
      sourceTitle: "Bitcoin Block Space Weekly Issue #3",
      sourceUrl:
        "https://blockspaceweekly.substack.com/p/issue-3-three-years-of-spam",
      publicationDate: "2025-12-22",
      measuredRange: "~4 years ending 2026-06-07",
      evidenceSummary:
        "The report attributes 76 GB+ of added chain data to non-monetary transactions while estimating about 1% miner revenue contribution.",
      caveat:
        "Miner revenue and blockspace share come from the same source methodology, not independent audits.",
    },
  },
  {
    id: "a-valid-transaction-is-a-valid-transaction",
    claim: "A valid transaction cannot be abusive",
    rebuttal:
      "A transaction can be consensus-valid and still be abusive to shared resources. Consensus validity is not the same as relay policy.",
    href: "#a-valid-transaction-is-a-valid-transaction",
    receipt: {
      sourceTitle: "Mempool Research UTXO Set Report",
      sourceUrl: "https://research.mempool.space/utxo-set-report/",
      publicationDate: "2025-05-18",
      measuredRange: "block 892385, 2025-04-14",
      evidenceSummary:
        "The report found 49.1% of all UTXOs under 1000 sats and 29.6% inscription-related UTXOs.",
      caveat:
        "This evidence supports resource impact, not intent for every individual transaction.",
    },
  },
  {
    id: "mempool-policy-is-censorship",
    claim: "Mempool policy is censorship",
    rebuttal:
      "Relay policy is local node behavior before confirmation. It lets node operators manage their own resources while still accepting valid blocks.",
    href: "#mempool-policy-is-censorship",
    receipt: {
      sourceTitle: "Mempool Research OP_RETURN Report",
      sourceUrl: "https://research.mempool.space/opreturn-report/",
      publicationDate: "2026-02-16",
      measuredRange: "historic OP_RETURN outputs through early 2026",
      evidenceSummary:
        "The report separates standard and nonstandard OP_RETURN policy categories and discusses policy default changes around Bitcoin Core v30.",
      caveat:
        "This evidence explains policy categories; it is not a general legal definition of censorship.",
    },
  },
  {
    id: "it-is-just-art",
    claim: "It is just art",
    rebuttal:
      "The issue is not whether art can exist. The issue is whether speculative data markets should externalize permanent storage and validation costs onto every Bitcoin node.",
    href: "#it-is-just-art",
    receipt: {
      sourceTitle: "Bitcoin Block Space Weekly Issue #3",
      sourceUrl:
        "https://blockspaceweekly.substack.com/p/issue-3-three-years-of-spam",
      publicationDate: "2025-12-22",
      measuredRange: "~4 years ending 2026-06-07",
      evidenceSummary:
        "The report states that non-monetary data added 76 GB+ to the blockchain over ~4 years.",
      caveat:
        "This evidence supports storage impact. It does not substantiate separate claims about scam markets.",
    },
  },
  {
    id: "op-return-harm-reduction-solved-it",
    claim: "OP_RETURN harm reduction solved it",
    rebuttal:
      "OP_RETURN avoids the UTXO set, but it does not avoid blockspace or permanent archival storage.",
    href: "#op-return-harm-reduction-solved-it",
    receipt: {
      sourceTitle: "Mempool Research OP_RETURN Report",
      sourceUrl: "https://research.mempool.space/opreturn-report/",
      publicationDate: "2026-02-16",
      measuredRange: "historic OP_RETURN outputs through early 2026",
      evidenceSummary:
        "The report says almost all recent OP_RETURN transactions are associated with Runes and were standard under pre-v30 rules.",
      caveat:
        "OP_RETURN is less harmful for UTXO state than spendable outputs, but still consumes blockspace and archival storage.",
    },
  },
  {
    id: "bitcoin-can-thrive-even-if-miners-are-high-time-preference-actors",
    claim: "Bitcoin can thrive even if miners are high-time-preference actors",
    rebuttal:
      "Miner incentives include Bitcoin's long-term value, not only extracting every short-term fee from every block.",
    href: "#bitcoin-can-thrive-even-if-miners-are-high-time-preference-greedy-actors",
    receipt: {
      sourceTitle: "Mempool Research Block Size Report",
      sourceUrl: "https://research.mempool.space/block-size-report/",
      publicationDate: "2025-02-04",
      measuredRange: "pre-770,000 and post-770,000 block ranges",
      evidenceSummary:
        "The report shows average block size increased from 1.11 MB before block 770,000 to 1.69 MB after.",
      caveat:
        "This evidence supports network-resource pressure; miner intent requires separate evidence.",
    },
  },
] satisfies NarrativeReceipt[];

for (const receipt of narrativeReceipts) {
  const missing = [
    receipt.id,
    receipt.claim,
    receipt.rebuttal,
    receipt.href,
    receipt.receipt.sourceTitle,
    receipt.receipt.sourceUrl,
    receipt.receipt.publicationDate,
    receipt.receipt.measuredRange,
    receipt.receipt.evidenceSummary,
    receipt.receipt.caveat,
  ].some((value) => value.trim().length === 0);

  if (missing) {
    throw new Error(
      `narrative receipt ${receipt.id} is missing a required field`,
    );
  }
}
