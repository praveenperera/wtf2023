import react from "@astrojs/react";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "astro/config";

export default defineConfig({
  output: "static",
  site: "https://wtfhappenedinfeb2023.com",
  redirects: {
    "/articles-and-content-about-the-issue/": "/resources/",
    "/pr-29187-trying-to-fix-datacarriersize/": "/core-devs/",
    "/free-relays-whitelists-free-relays/": "/history/",
  },
  integrations: [react()],
  vite: {
    plugins: [tailwindcss()],
  },
});
