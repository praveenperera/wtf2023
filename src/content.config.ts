import { defineCollection } from "astro:content";
import { glob } from "astro/loaders";
import { z } from "astro/zod";

const reference = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./reference" }),
  schema: z.object({
    title: z.string().optional(),
    slug: z.string().optional(),
    section: z.string().optional(),
    summary: z.string().optional(),
    sourceUrl: z.url().optional(),
    order: z.number().optional(),
    navLabel: z.string().optional(),
    links: z.array(z.string()).optional(),
    media: z.array(z.string()).optional(),
    takeaway: z.string().optional(),
    detailLevel: z.enum(["overview", "deep"]).optional(),
  }),
});

export const collections = { reference };
