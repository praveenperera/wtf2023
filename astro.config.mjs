import react from "@astrojs/react";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "astro/config";

const legacyPathRedirects = {
  "/articles-and-content-about-the-issue": "/resources/",
  "/common-narratives-around-spam/a-valid-transaction-is-a-valid-transaction":
    "/common-narratives-around-spam/",
  "/common-narratives-around-spam/bitcoin-can-thrive-even-if-miners-are-high-time-preference-greedy-actors":
    "/common-narratives-around-spam/",
  "/common-narratives-around-spam/everything-is-good-for-bitcoin":
    "/common-narratives-around-spam/",
  "/common-narratives-around-spam/high-fees-will-solve-spam":
    "/common-narratives-around-spam/",
  "/common-narratives-around-spam/it-is-just-art":
    "/common-narratives-around-spam/",
  "/common-narratives-around-spam/making-transactions-more-efficient-on-l1-will-solve-spam":
    "/common-narratives-around-spam/",
  "/common-narratives-around-spam/mempool-policy-is-censorship":
    "/common-narratives-around-spam/",
  "/common-narratives-around-spam/op-return-harm-reduction-solved-it":
    "/common-narratives-around-spam/",
  "/common-narratives-around-spam/satoshi-inscribed-on-chain":
    "/common-narratives-around-spam/",
  "/common-narratives-around-spam/the-100-sats-tx-challenge":
    "/common-narratives-around-spam/",
  "/common-narratives-around-spam/the-fees-were-going-to-be-high-anyways":
    "/common-narratives-around-spam/",
  "/common-narratives-around-spam/there-s-nothing-you-can-do-about-it":
    "/common-narratives-around-spam/",
  "/concerns-about-core": "/core-devs/",
  "/fixing-a-bug-through-documentation-change": "/core-devs/",
  "/free-relays-whitelists-free-relays": "/history/",
  "/history-of-inflation-bugs": "/history/",
  "/noteworthy-cases-of-massive-broadcasts-of-non-payment-tx": "/history/",
  "/pr-29187-trying-to-fix-datacarriersize": "/core-devs/",
  "/the-rise-of-out-of-band-transactions": "/history/",
  "/what-you-can-do-about-it/as-a-developer": "/what-you-can-do-about-it/",
  "/what-you-can-do-about-it/as-a-miner": "/what-you-can-do-about-it/",
  "/what-you-can-do-about-it/as-a-noderunner": "/what-you-can-do-about-it/",
  "/what-you-can-do-about-it/as-a-pleb": "/what-you-can-do-about-it/",
};

export default defineConfig({
  output: "static",
  site: "https://wtfhappenedinfeb2023.com",
  redirects: legacyPathRedirects,
  integrations: [react()],
  vite: {
    plugins: [tailwindcss()],
  },
});
