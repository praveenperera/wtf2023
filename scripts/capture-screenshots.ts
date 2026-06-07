import { mkdir } from "node:fs/promises";
import { join } from "node:path";
import { chromium, type Page } from "playwright";

const baseUrl = process.env.QA_URL ?? "http://127.0.0.1:4321/";
const outDir = join(process.cwd(), "artifacts/qa");

const viewports = [
  { name: "desktop", width: 1536, height: 1024 },
  { name: "mobile", width: 390, height: 844 },
];

const routes = [
  "/stats-about-spam/",
  "/characteristics-of-spam/",
  "/common-narratives-around-spam/",
  "/what-you-can-do-about-it/",
  "/core-devs/",
  "/history/",
  "/resources/",
];

await mkdir(outDir, { recursive: true });

const executablePath = process.env.PLAYWRIGHT_CHROMIUM_EXECUTABLE_PATH;
const browser = await chromium.launch(executablePath ? { executablePath } : {});
const errors: string[] = [];

for (const viewport of viewports) {
  const context = await browser.newContext({
    viewport: { width: viewport.width, height: viewport.height },
    deviceScaleFactor: 1,
  });
  const page = await context.newPage();
  page.on("console", (message) => {
    if (
      message.type() === "error" &&
      !message.text().includes("Failed to load resource")
    ) {
      errors.push(`${viewport.name}: ${message.text()}`);
    }
  });
  page.on("pageerror", (error) =>
    errors.push(`${viewport.name}: ${error.message}`),
  );
  page.on("response", (response) => {
    if (response.status() >= 400 && !response.url().endsWith("/favicon.ico")) {
      errors.push(`${viewport.name}: ${response.status()} ${response.url()}`);
    }
  });

  await page.goto(baseUrl, { waitUntil: "networkidle" });
  await assertHomepage(page);
  await assertDark(page);
  await assertNoHorizontalOverflow(page);
  await page.screenshot({
    path: join(outDir, `${viewport.name}-dark.png`),
    fullPage: false,
  });

  if (viewport.name === "mobile") {
    await page.getByRole("button", { name: "Open navigation" }).click();
    await page
      .getByRole("link", { name: /Impact/ })
      .waitFor({ state: "visible" });
    await page.getByRole("button", { name: "Close navigation" }).click();
  }

  await page.getByRole("button", { name: "Switch to light mode" }).click();
  await page.reload({ waitUntil: "networkidle" });
  await assertLight(page);
  await assertNoHorizontalOverflow(page);
  await page.screenshot({
    path: join(outDir, `${viewport.name}-light.png`),
    fullPage: false,
  });

  await context.close();
}

const routeContext = await browser.newContext({
  viewport: { width: 1536, height: 1024 },
});
const routePage = await routeContext.newPage();
for (const route of routes) {
  await routePage.goto(new URL(route, baseUrl).toString(), {
    waitUntil: "networkidle",
  });
  await routePage
    .locator("main")
    .getByRole("heading")
    .first()
    .waitFor({ state: "visible" });
}
await routeContext.close();

await browser.close();

if (errors.length) {
  throw new Error(`console errors:\n${errors.join("\n")}`);
}

console.log(`saved screenshots to ${outDir}`);

async function assertHomepage(page: Page) {
  for (const text of [
    "WTF Happened in Feb 2023?",
    "Bitcoin is money, not a message board",
    "Non-monetary data crowded blockspace",
    "Fee-rate pressure",
    "Blockspace pressure map",
    "Snapshot now",
    "Feb 2023 was the ignition",
  ]) {
    await page
      .getByText(text, { exact: false })
      .first()
      .waitFor({ state: "visible" });
  }
}

async function assertDark(page: Page) {
  const className = await page.locator("html").getAttribute("class");
  if (!className?.split(/\s+/).includes("dark")) {
    throw new Error("expected clean first render to use dark mode");
  }
}

async function assertLight(page: Page) {
  const className = await page.locator("html").getAttribute("class");
  if (className?.split(/\s+/).includes("dark")) {
    throw new Error("expected light mode to persist after reload");
  }
}

async function assertNoHorizontalOverflow(page: Page) {
  const sizes = await page.evaluate(() => ({
    scrollWidth: document.documentElement.scrollWidth,
    clientWidth: document.documentElement.clientWidth,
  }));
  if (sizes.scrollWidth > sizes.clientWidth + 1) {
    throw new Error(
      `horizontal overflow: ${sizes.scrollWidth} > ${sizes.clientWidth}`,
    );
  }
}
