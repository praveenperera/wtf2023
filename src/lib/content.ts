import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { ChevronRight } from "lucide-react";
import { marked } from "marked";
import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { siteRoutes, type SiteRoute } from "./routes";

export type SourceDocument = {
  path: string;
  title: string;
  sourceUrl?: string;
  body: string;
  html: string;
  contentHtml: string;
  sections: ContentSection[];
  links: Array<{ text: string; href: string }>;
  media: Array<{ text: string; href: string }>;
};

export type ContentSection = {
  id: string;
  title: string;
  html: string;
  intro: string;
};

export type ResourceItem = {
  title: string;
  href: string;
  group: string;
  type: "article" | "video" | "audio" | "paper" | "thread" | "site";
  note?: string;
};

export type RouteContent = SiteRoute & {
  documents: SourceDocument[];
};

const repoRoot = resolve(import.meta.dirname, "../..");
const inlineStepArrow = renderToStaticMarkup(
  createElement(ChevronRight, {
    "aria-hidden": "true",
    className: "inline-step-arrow-icon",
    strokeWidth: 2,
  }),
);

marked.setOptions({
  async: false,
  gfm: true,
  breaks: false,
});

export function readSourceDocument(path: string): SourceDocument {
  const raw = readFileSync(resolve(repoRoot, path), "utf8");
  const cleaned = normalizeMarkdown(raw);
  const title = cleaned.match(/^#\s+(.+)$/m)?.[1]?.trim() ?? path;
  const sourceUrl = cleaned.match(/^Source:\s+(\S+)/m)?.[1];
  const links = [...cleaned.matchAll(/\[([^\]]+)\]\(([^)]+)\)/g)]
    .map((match) => ({
      text: match[1].trim(),
      href: normalizeHref(match[2].trim()),
    }))
    .filter((link) => link.href.length > 0);
  const mediaIndex = cleaned.indexOf("## Media");
  const media =
    mediaIndex >= 0
      ? links
          .filter(
            (link) =>
              !isSourceMediaAsset(link.href) &&
              (/video/i.test(link.text) ||
                /youtu|fountain|spotify/i.test(link.href)),
          )
          .map((link, index) => enrichMediaLink(link, index))
      : [];

  return {
    path,
    title,
    sourceUrl,
    body: cleaned,
    html: renderMarkdown(cleaned),
    contentHtml: renderMarkdown(stripMetadataAndMedia(cleaned)),
    sections: extractContentSections(cleaned, title, path),
    links,
    media,
  };
}

export function getRouteContents(): RouteContent[] {
  return siteRoutes.map((route) => ({
    ...route,
    documents: route.sourcePaths.map(readSourceDocument),
  }));
}

export function getRouteContent(route: SiteRoute): RouteContent {
  return {
    ...route,
    documents: route.sourcePaths.map(readSourceDocument),
  };
}

export function extractPlainText(markdown: string, limit = 180) {
  const text = markdown
    .replace(/^Source:\s+\S+/gm, "")
    .replace(/```[\s\S]*?```/g, "")
    .replace(/\[([^\]]+)\]\([^)]+\)/g, "$1")
    .replace(/[#>*_`•● ]/g, " ")
    .replace(/\s+/g, " ")
    .trim();

  return text.length > limit ? `${text.slice(0, limit).trim()}...` : text;
}

export function extractResourceItems(document: SourceDocument): ResourceItem[] {
  let group = "Articles and content";

  return document.body
    .split("\n## Media")[0]
    .split("\n")
    .map((line) => {
      const heading = line.match(/^([^#\-\n][^[]+)$/)?.[1]?.trim();
      if (
        heading &&
        /quality clips|other references|acknowledgements/i.test(heading)
      ) {
        group = heading;
        return null;
      }

      const match = line.match(/^\s*-\s+\[([^\]]+)\]\(([^)]+)\)(.*)$/);
      if (!match) return null;

      const title = match[1].trim();
      const href = normalizeHref(match[2].trim());
      const note = cleanResourceNote(match[3]);
      if (isSourceMediaAsset(href)) return null;

      const item: ResourceItem = {
        title,
        href,
        group,
        type: inferResourceType(title, href),
      };

      if (note) item.note = note;
      return item;
    })
    .filter((item): item is ResourceItem => item !== null);
}

export function extractContentSections(
  markdown: string,
  fallbackTitle: string,
  path: string,
): ContentSection[] {
  const content = stripMetadataAndMedia(markdown);
  const withoutTitle = content.replace(/^#\s+.+(?:\n+|$)/, "").trim();
  if (!withoutTitle) return [];

  const parts = withoutTitle
    .split(/\n(?=##\s+)/)
    .map((part) => part.trim())
    .filter(Boolean);

  const sections = parts.length ? parts : [withoutTitle];

  return sections.map((section, index) => {
    const heading = section.match(/^##\s+(.+)$/m)?.[1]?.trim();
    const title = heading ?? (index === 0 ? fallbackTitle : `Section ${index}`);
    const body = heading ? section.replace(/^##\s+.+\n*/, "").trim() : section;
    const idBase = sections.length > 1 ? `${fallbackTitle}-${title}` : title;

    return {
      id: idBase.replace(/[^a-z0-9]+/gi, "-").toLowerCase(),
      title,
      html: renderMarkdown(promoteSectionHeadings(body, path)),
      intro: extractPlainText(body, 150),
    };
  });
}

function normalizeMarkdown(raw: string) {
  return raw
    .replace(/http:\/\/\s+https:\/\//g, "https://")
    .replace(/● /g, "- ")
    .replace(/​​​​​​​/g, "")
    .trim();
}

function normalizeHref(href: string) {
  return href
    .replace(/^http:\/\/\s+https:\/\//, "https://")
    .replace(/^https:\/\/wtfhappenedinfeb2023\.com/, "");
}

function renderMarkdown(markdown: string) {
  return marked.parse(
    rewriteInstructionArrows(rewriteInternalLinks(markdown)),
  ) as string;
}

function promoteSectionHeadings(markdown: string, path: string) {
  if (
    path !==
    "reference/noteworthy-cases-of-massive-broadcasts-of-non-payment-tx.md"
  ) {
    return markdown;
  }

  return markdown.replace(
    /^###\s+(BitDNS|Counterparty|SatoshiDice|Omni|Veriblock)\s*$/gm,
    "## $1",
  );
}

function rewriteInternalLinks(markdown: string) {
  return markdown
    .replace(/https:\/\/wtfhappenedinfeb2023\.com/g, "")
    .replace(/http:\/\/wtfhappenedinfeb2023\.com/g, "");
}

function rewriteInstructionArrows(markdown: string) {
  return markdown.replace(
    /(\s)->(\s)/g,
    `$1<span class="inline-step-arrow" aria-hidden="true">${inlineStepArrow}</span><span class="sr-only"> then </span>$2`,
  );
}

function stripMetadataAndMedia(markdown: string) {
  return markdown
    .replace(/^Source:\s+\S+\s*$/gm, "")
    .replace(/\n## Media[\s\S]*$/m, "")
    .trim();
}

function enrichMediaLink(link: { text: string; href: string }, index: number) {
  const knownTitle = mediaTitlesByUrl[link.href.split("?")[0]];
  if (knownTitle) return { text: knownTitle, href: link.href };
  if (!/^(video|image)$/i.test(link.text)) return link;

  const host = mediaHostLabel(link.href);
  return {
    text: `${host} clip ${String(index + 1).padStart(2, "0")}`,
    href: link.href,
  };
}

function mediaHostLabel(href: string) {
  if (/youtu/i.test(href)) return "YouTube";
  if (/fountain/i.test(href)) return "Fountain";
  if (/spotify/i.test(href)) return "Spotify";
  return "Media";
}

function isSourceMediaAsset(href: string) {
  return /res2\.weblium/i.test(href);
}

function inferResourceType(title: string, href: string): ResourceItem["type"] {
  if (/youtu|fountain|spotify/i.test(href))
    return href.includes("spotify") ? "audio" : "video";
  if (/pdf|digitalcommons|cl\.cam|bip/i.test(href)) return "paper";
  if (/delvingbitcoin|twitter|x\.com/i.test(href)) return "thread";
  if (/notion|portal|spambusters/i.test(href)) return "site";
  if (/cve|nvd/i.test(title) || /nvd\.nist/i.test(href)) return "site";
  return "article";
}

function cleanResourceNote(value: string) {
  const note = value.replace(/^,\s*/, "").trim();
  return note && note !== "?" ? note : undefined;
}

const mediaTitlesByUrl: Record<string, string> = {
  "https://youtu.be/bCJR7v73r3Q":
    "The Battle for Bitcoin with Bitcoin Mechanic",
  "https://youtu.be/w6G3DDyccdA": "Ordinals, Inscriptions, and Bitcoin Spam",
  "https://youtu.be/iK5eny26vVk":
    "Are Ordinals an Attack on Bitcoin? with Luke Dash Jr.",
  "https://youtu.be/zXccoOlmtMY":
    "Decentralizing Bitcoin Mining Pools with Bitcoin Mechanic",
  "https://youtu.be/ZwSN5lKeNEY": "Bitcoin Runes Explained",
  "https://youtu.be/HzTNk_0MC24": "Is Bitcoin A Good File Storage Solution?",
  "https://youtu.be/wdGQ2T7J7XI": "Bitcoin Halving Spam Attack",
  "https://youtu.be/aH5gVEpVZAg": "Regarding Ordinals with Giacomo Zucco",
  "https://youtu.be/1hUEORYzgLQ":
    "Spamming, Scamming, and Incentives in the Free Market",
};
