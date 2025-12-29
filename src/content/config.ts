import { defineCollection, z } from 'astro:content';

const blog = defineCollection({
	type: 'content',
	schema: z.object({
		title: z.string(),
		description: z.string().optional(),
		date: z.coerce.date(),
		
        // Tags: Strings "a, b" -> Array ["a", "b"]
        tags: z.union([z.string(), z.array(z.string())])
            .transform((val) => {
                if (Array.isArray(val)) return val;
                return val.split(',').map(t => t.trim()).filter(t => t);
            })
            .default([]),
		
        // Image Logic:
        // 1. "http..." -> Used as is
        // 2. "b46" -> Becomes "/covers/b46.webp"
        image: z.string().optional().nullable().transform((val) => {
            if (!val) return null;
            if (val.startsWith('http') || val.startsWith('/')) {
                return val; // Return external URLs or explicit paths as-is
            }
            // It's just an ID like "b46"
            return `/covers/${val}.webp`;
        }),

		featured: z.boolean().default(false).optional(),
	}),
});

export const collections = { blog };