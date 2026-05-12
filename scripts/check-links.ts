import { readFile } from "node:fs/promises";
import { join } from "node:path";

const html = await readFile(join(process.cwd(), "dist", "index.html"), "utf8");
const routes = [
  "/stats-about-spam/",
  "/characteristics-of-spam/",
  "/common-narratives-around-spam/",
  "/what-you-can-do-about-it/",
  "/core-devs/",
  "/history/",
  "/resources/",
];

for (const route of routes) {
  if (!html.includes(`href="${route}"`)) {
    throw new Error(`homepage missing link to ${route}`);
  }
}

console.log(`validated ${routes.length} canonical homepage links`);
