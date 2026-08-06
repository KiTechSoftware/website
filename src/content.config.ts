import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

const legal = defineCollection({
  loader: glob({
    base: './src/content/legal',
    pattern: '**/*.{md,mdx}',
  }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    version: z.string(),
    lastUpdated: z.coerce.date(),
    effectiveDate: z.coerce.date(),
    draft: z.boolean().default(false),
  }),
});

export const collections = { legal };
