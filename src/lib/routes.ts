export type RouteId =
  | "home"
  | "impact"
  | "characteristics"
  | "narratives"
  | "actions"
  | "core"
  | "history"
  | "resources";

export type SiteRoute = {
  id: RouteId;
  label: string;
  title: string;
  route: string;
  sourcePaths: string[];
  summary: string;
  metaDescription: string;
  ogImage: string;
  ogImageAlt: string;
  takeaway: string;
  order: number;
};

export const siteRoutes: SiteRoute[] = [
  {
    id: "home",
    label: "Home",
    title: "WTF Happened in Feb 2023?",
    route: "/",
    sourcePaths: ["reference/index.md"],
    summary: "A concise guide to the February 2023 Bitcoin spam wave",
    metaDescription:
      "Learn how the February 2023 Bitcoin spam wave crowded blockspace, pushed users making monetary transactions into higher fees, and made relay policy choices visible.",
    ogImage: "/og/home.png",
    ogImageAlt: "WTF Happened in Feb 2023 home overview",
    takeaway:
      "The wave made shared blockspace harder to use by pushing non-monetary data into the same scarce resource monetary use needs",
    order: 0,
  },
  {
    id: "impact",
    label: "Impact",
    title: "Impact | WTF Happened in Feb 2023?",
    route: "/stats-about-spam/",
    sourcePaths: ["reference/stats-about-spam.md"],
    summary: "Fee pressure, monetary displacement, and UTXO growth",
    metaDescription:
      "See how non-monetary data competed with monetary use for blockspace, shifted fee pressure onto users, and expanded the long-term cost of validation.",
    ogImage: "/og/impact.png",
    ogImageAlt: "Impact of Bitcoin spam on blockspace and fee pressure",
    takeaway:
      "Non-monetary activity took a large share of blockspace while monetary transactions still carried most fee pressure",
    order: 1,
  },
  {
    id: "characteristics",
    label: "Characteristics",
    title: "Characteristics | WTF Happened in Feb 2023?",
    route: "/characteristics-of-spam/",
    sourcePaths: ["reference/characteristics-of-spam.md"],
    summary: "A two-part model for recognizing spam",
    metaDescription:
      "Use a practical two-part test for Bitcoin spam: wasteful shared-resource use plus misuse of transaction features for non-monetary data.",
    ogImage: "/og/characteristics.png",
    ogImageAlt: "Characteristics of Bitcoin spam",
    takeaway:
      "Spam can be recognized by wasteful use of shared resources and misuse of Bitcoin functions",
    order: 2,
  },
  {
    id: "narratives",
    label: "Narratives",
    title: "Narratives | WTF Happened in Feb 2023?",
    route: "/common-narratives-around-spam/",
    sourcePaths: [
      "reference/common-narratives-around-spam.md",
      "reference/common-narratives-around-spam/mempool-policy-is-censorship.md",
      "reference/common-narratives-around-spam/a-valid-transaction-is-a-valid-transaction.md",
      "reference/common-narratives-around-spam/the-fees-were-going-to-be-high-anyways.md",
      "reference/common-narratives-around-spam/satoshi-inscribed-on-chain.md",
      "reference/common-narratives-around-spam/bitcoin-can-thrive-even-if-miners-are-high-time-preference-greedy-actors.md",
      "reference/common-narratives-around-spam/high-fees-will-solve-spam.md",
      "reference/common-narratives-around-spam/it-is-just-art.md",
      "reference/common-narratives-around-spam/op-return-harm-reduction-solved-it.md",
      "reference/common-narratives-around-spam/making-transactions-more-efficient-on-l1-will-solve-spam.md",
      "reference/common-narratives-around-spam/the-100-sats-tx-challenge.md",
      "reference/common-narratives-around-spam/there-s-nothing-you-can-do-about-it.md",
      "reference/common-narratives-around-spam/everything-is-good-for-bitcoin.md",
    ],
    summary: "Common counterarguments and rebuttals",
    metaDescription:
      "Review common pro-spam arguments and evidence-backed rebuttals that separate consensus validity, relay policy, miner incentives, and user choice.",
    ogImage: "/og/narratives.png",
    ogImageAlt: "Common Bitcoin spam narratives and rebuttals",
    takeaway:
      "Most pro-spam narratives confuse consensus validity, miner incentives, and local relay policy",
    order: 3,
  },
  {
    id: "actions",
    label: "Actions",
    title: "Actions | WTF Happened in Feb 2023?",
    route: "/what-you-can-do-about-it/",
    sourcePaths: [
      "reference/what-you-can-do-about-it.md",
      "reference/what-you-can-do-about-it/as-a-noderunner.md",
      "reference/what-you-can-do-about-it/as-a-miner.md",
      "reference/what-you-can-do-about-it/as-a-developer.md",
      "reference/what-you-can-do-about-it/as-a-pleb.md",
    ],
    summary:
      "Role-based action paths for node runners, miners, developers, and plebs",
    metaDescription:
      "Choose concrete actions for node runners, miners, developers, and everyday users who want Bitcoin blockspace kept available for monetary use.",
    ogImage: "/og/actions.png",
    ogImageAlt: "Actions to keep Bitcoin blockspace available for monetary use",
    takeaway:
      "Users can change relay policy, mining template choices, software defaults, and public discussion",
    order: 4,
  },
  {
    id: "core",
    label: "Bitcoin Core misconduct",
    title: "Bitcoin Core misconduct | WTF Happened in Feb 2023?",
    route: "/core-devs/",
    sourcePaths: [
      "reference/pr-29187-trying-to-fix-datacarriersize.md",
      "reference/fixing-a-bug-through-documentation-change.md",
      "reference/concerns-about-core.md",
    ],
    summary:
      "Evidence-backed issue map for Bitcoin Core defaults, process, and policy",
    metaDescription:
      "Follow Bitcoin Core misconduct around PR 29187, data-carrier limits, relay defaults, documentation changes, and who bears the cost of arbitrary data.",
    ogImage: "/og/core-devs.png",
    ogImageAlt:
      "Bitcoin Core misconduct dispute over data-carrier limits and relay policy",
    takeaway:
      "The defensible concern is about defaults, review power, moderation, funding, and whose costs are considered",
    order: 5,
  },
  {
    id: "history",
    label: "History",
    title: "History | WTF Happened in Feb 2023?",
    route: "/history/",
    sourcePaths: [
      "reference/free-relays-whitelists-free-relays.md",
      "reference/the-rise-of-out-of-band-transactions.md",
      "reference/noteworthy-cases-of-massive-broadcasts-of-non-payment-tx.md",
      "reference/history-of-inflation-bugs.md",
    ],
    summary: "Relay policy, private submission paths, and earlier abuse cases",
    metaDescription:
      "Trace earlier free-relay, private-submission, and non-monetary transaction episodes that shaped Bitcoin's spam and policy debates.",
    ogImage: "/og/history.png",
    ogImageAlt: "History of Bitcoin spam and relay policy debates",
    takeaway:
      "The February 2023 wave fits a longer pattern of free relay and non-monetary transaction pressure",
    order: 6,
  },
  {
    id: "resources",
    label: "Resources",
    title: "Resources | WTF Happened in Feb 2023?",
    route: "/resources/",
    sourcePaths: ["reference/articles-and-content-about-the-issue.md"],
    summary: "Articles, videos, and external references",
    metaDescription:
      "Find articles, papers, videos, and public threads for deeper research into Bitcoin spam, inscriptions, relay policy, and fee pressure.",
    ogImage: "/og/resources.png",
    ogImageAlt: "Resources for researching Bitcoin spam and relay policy",
    takeaway:
      "Articles, public threads, videos, and mempool analysis for deeper research",
    order: 7,
  },
];

export const navRoutes = siteRoutes.filter((route) => route.id !== "home");
export const primaryNavRoutes = siteRoutes;

export function routeByPath(pathname: string) {
  return siteRoutes.find((route) => route.route === pathname);
}
