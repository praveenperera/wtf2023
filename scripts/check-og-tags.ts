import { access, readFile } from "node:fs/promises";
import { join, normalize, relative } from "node:path";

const siteOrigin = "https://wtfhappenedinfeb2023.com";
const distDir = join(process.cwd(), "dist");

const routes = [
  "/",
  "/stats-about-spam/",
  "/characteristics-of-spam/",
  "/common-narratives-around-spam/",
  "/what-you-can-do-about-it/",
  "/core-devs/",
  "/history/",
  "/resources/",
];

type PageMeta = {
  route: string;
  filePath: string;
  html: string;
  title: string;
  description: string;
  canonicalUrl: string;
};

type PngDimensions = {
  width: number;
  height: number;
};

const requiredOgProperties = [
  "og:title",
  "og:site_name",
  "og:description",
  "og:type",
  "og:url",
  "og:image",
  "og:image:width",
  "og:image:height",
  "og:image:alt",
];

const requiredTwitterNames = [
  "twitter:card",
  "twitter:title",
  "twitter:description",
  "twitter:image",
  "twitter:image:width",
  "twitter:image:height",
  "twitter:image:alt",
];

const htmlEntityReplacements: Record<string, string> = {
  amp: "&",
  gt: ">",
  lt: "<",
  quot: '"',
  apos: "'",
  "#39": "'",
};

const routeToHtmlPath = (route: string) => {
  if (route === "/") return join(distDir, "index.html");
  return join(distDir, route.slice(1), "index.html");
};

const expectedUrlForRoute = (route: string) => `${siteOrigin}${route}`;

const getAttributes = (tag: string) => {
  const attributes = new Map<string, string>();
  const attributeRegex = /([^\s"'=<>`]+)\s*=\s*(?:"([^"]*)"|'([^']*)')/g;

  for (const match of tag.matchAll(attributeRegex)) {
    attributes.set(
      match[1].toLowerCase(),
      decodeHtml(match[2] ?? match[3] ?? ""),
    );
  }

  return attributes;
};

const decodeHtml = (value: string) =>
  value.replace(/&([a-zA-Z]+|#[0-9]+);/g, (entity, name: string) => {
    if (name.startsWith("#")) {
      return String.fromCodePoint(Number(name.slice(1)));
    }

    return htmlEntityReplacements[name] ?? entity;
  });

const findTag = (
  html: string,
  tagName: "link" | "meta",
  attributeName: string,
  attributeValue: string,
) => {
  const tagRegex = new RegExp(`<${tagName}\\b[^>]*>`, "gi");

  for (const match of html.matchAll(tagRegex)) {
    const attributes = getAttributes(match[0]);
    if (attributes.get(attributeName) === attributeValue) return attributes;
  }

  return undefined;
};

const requireValue = (
  page: PageMeta,
  label: string,
  value: string | undefined,
) => {
  if (!value) throw new Error(`${page.route} missing ${label}`);
  return value;
};

const requireEqual = (
  page: PageMeta,
  label: string,
  actual: string | undefined,
  expected: string,
) => {
  if (actual !== expected) {
    throw new Error(
      `${page.route} ${label} must be ${expected}, got ${actual ?? "missing"}`,
    );
  }
};

const requireAbsoluteSiteUrl = (
  page: PageMeta,
  label: string,
  value: string,
) => {
  let url: URL;

  try {
    url = new URL(value);
  } catch {
    throw new Error(
      `${page.route} ${label} must be an absolute URL, got ${value}`,
    );
  }

  if (url.protocol !== "https:" || url.origin !== siteOrigin) {
    throw new Error(
      `${page.route} ${label} must use ${siteOrigin}, got ${value}`,
    );
  }

  return url;
};

const requireLocalDistPath = (page: PageMeta, label: string, url: URL) => {
  const pathname = decodeURIComponent(url.pathname);
  const filePath = normalize(join(distDir, pathname));
  const relativePath = relative(distDir, filePath);

  if (relativePath.startsWith("..")) {
    throw new Error(`${page.route} ${label} points outside dist: ${url.href}`);
  }

  return filePath;
};

const requireFileExists = async (
  page: PageMeta,
  label: string,
  filePath: string,
) => {
  try {
    await access(filePath);
  } catch {
    throw new Error(
      `${page.route} ${label} image does not exist in dist: ${filePath}`,
    );
  }
};

const readPngDimensions = async (filePath: string): Promise<PngDimensions> => {
  const png = await readFile(filePath);
  const signature = Buffer.from([
    0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a,
  ]);

  if (png.length < 24 || !png.subarray(0, 8).equals(signature)) {
    throw new Error(`${filePath} is not a PNG`);
  }

  const chunkType = png.subarray(12, 16).toString("ascii");
  if (chunkType !== "IHDR") {
    throw new Error(`${filePath} missing PNG IHDR chunk`);
  }

  return {
    width: png.readUInt32BE(16),
    height: png.readUInt32BE(20),
  };
};

const loadPageMeta = async (route: string): Promise<PageMeta> => {
  const filePath = routeToHtmlPath(route);
  const html = await readFile(filePath, "utf8");
  const title = decodeHtml(
    requireValue(
      { route, filePath, html } as PageMeta,
      "title",
      html.match(/<title>(.*?)<\/title>/i)?.[1],
    ),
  );
  const description = requireValue(
    { route, filePath, html, title } as PageMeta,
    "meta description",
    findTag(html, "meta", "name", "description")?.get("content"),
  );
  const canonicalUrl = requireValue(
    { route, filePath, html, title, description } as PageMeta,
    "canonical link",
    findTag(html, "link", "rel", "canonical")?.get("href"),
  );

  return { route, filePath, html, title, description, canonicalUrl };
};

const validateSocialImage = async (
  page: PageMeta,
  label: "og:image" | "twitter:image",
  imageUrl: string,
) => {
  const url = requireAbsoluteSiteUrl(page, label, imageUrl);
  const imagePath = requireLocalDistPath(page, label, url);
  await requireFileExists(page, label, imagePath);

  const { width, height } = await readPngDimensions(imagePath);
  const isExpectedSize =
    (width === 2400 && height === 1260) || (width === 1200 && height === 630);

  if (!isExpectedSize) {
    throw new Error(
      `${page.route} ${label} PNG must be 2400x1260 or 1200x630, got ${width}x${height}`,
    );
  }
};

const validatePage = async (route: string) => {
  const page = await loadPageMeta(route);
  const expectedUrl = expectedUrlForRoute(route);

  requireEqual(page, "canonical link", page.canonicalUrl, expectedUrl);
  requireAbsoluteSiteUrl(page, "canonical link", page.canonicalUrl);

  const og = new Map<string, string>();
  const twitter = new Map<string, string>();

  for (const property of requiredOgProperties) {
    og.set(
      property,
      requireValue(
        page,
        property,
        findTag(page.html, "meta", "property", property)?.get("content"),
      ),
    );
  }

  for (const name of requiredTwitterNames) {
    twitter.set(
      name,
      requireValue(
        page,
        name,
        findTag(page.html, "meta", "name", name)?.get("content"),
      ),
    );
  }

  requireEqual(page, "og:title", og.get("og:title"), page.title);
  requireEqual(
    page,
    "og:site_name",
    og.get("og:site_name"),
    "WTF Happened in Feb 2023?",
  );
  requireEqual(
    page,
    "og:description",
    og.get("og:description"),
    page.description,
  );
  requireEqual(page, "og:type", og.get("og:type"), "website");
  requireEqual(page, "og:url", og.get("og:url"), expectedUrl);
  requireEqual(page, "og:image:width", og.get("og:image:width"), "1200");
  requireEqual(page, "og:image:height", og.get("og:image:height"), "630");
  requireValue(page, "og:image:alt", og.get("og:image:alt"));

  requireEqual(
    page,
    "twitter:card",
    twitter.get("twitter:card"),
    "summary_large_image",
  );
  requireEqual(page, "twitter:title", twitter.get("twitter:title"), page.title);
  requireEqual(
    page,
    "twitter:description",
    twitter.get("twitter:description"),
    page.description,
  );
  requireEqual(
    page,
    "twitter:image:width",
    twitter.get("twitter:image:width"),
    "1200",
  );
  requireEqual(
    page,
    "twitter:image:height",
    twitter.get("twitter:image:height"),
    "630",
  );
  requireValue(page, "twitter:image:alt", twitter.get("twitter:image:alt"));

  const ogImage = requireValue(page, "og:image", og.get("og:image"));
  const twitterImage = requireValue(
    page,
    "twitter:image",
    twitter.get("twitter:image"),
  );

  requireEqual(page, "twitter:image", twitterImage, ogImage);
  requireEqual(
    page,
    "twitter:image:alt",
    twitter.get("twitter:image:alt"),
    og.get("og:image:alt")!,
  );
  requireAbsoluteSiteUrl(page, "og:url", og.get("og:url")!);
  await validateSocialImage(page, "og:image", ogImage);
  await validateSocialImage(page, "twitter:image", twitterImage);
};

const errors: string[] = [];

for (const route of routes) {
  try {
    await validatePage(route);
  } catch (error) {
    errors.push(error instanceof Error ? error.message : String(error));
  }
}

if (errors.length > 0) {
  throw new Error(`OG metadata validation failed:\n${errors.join("\n")}`);
}

console.log(`validated ${routes.length} pages with OG and Twitter metadata`);
