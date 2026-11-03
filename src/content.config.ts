import { defineCollection } from "astro:content";
import { docsLoader } from "@astrojs/starlight/loaders";
import { docsSchema } from "@astrojs/starlight/schema";
import { z } from "astro/zod";

export const collections = {
  docs: defineCollection({
    loader: docsLoader(),
    schema: docsSchema({
      extend: z.object({
        type: z.enum(["tutorial", "how-to", "reference", "explanation"]).optional(),
        audience: z.enum(["user", "operator", "contributor"]).optional(),
        status: z
          .enum(["tested", "untested", "unsupported", "pending", "deprecated"])
          .optional(),
        appliesTo: z.string().min(1).optional(),
        reviewed: z.coerce.date().optional(),
        source: z.string().optional(),
        generated: z.boolean().default(false),
      }),
    }),
  }),
};
