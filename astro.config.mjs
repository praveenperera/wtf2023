import react from "@astrojs/react";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "astro/config";

export default defineConfig({
  output: "static",
  site: "https://wtfhappenedinfeb2023.com",
  integrations: [react()],
  vite: {
    plugins: [tailwindcss()],
  },
});
