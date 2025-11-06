import { defineCollection, z } from "astro:content";

export const projectCategories = [
	"webpage",
	"tool",
	"package",
	"design",
	"other",
] as const;

export type ProjectCategory = (typeof projectCategories)[number];

// Definición de la colección de proyectos
const projectsSchema = z.object({
	name: z.string(),
	slug: z.string(),
	logo: z.string().optional(),
	logo_dark: z.string().optional(),
	url: z.string().url().optional(),
	repository: z.string().url().optional(),
	documentation: z.string().url().optional(),
	type: z.enum(projectCategories),
	description: z.string(),
	description_en: z.string(),
	technologies: z.array(z.string()),
	features: z.array(z.string()),
	features_en: z.array(z.string()),
	images: z.array(z.string()).optional(),
	relevancy: z.number().optional(),
	state: z
		.enum(["planned", "designing", "development", "completed", "upgrading"])
		.optional(),
	version: z.string().optional(),
	date: z
		.string()
		.or(z.date())
		.transform((val) => (typeof val === "string" ? new Date(val) : val))
		.optional(),
});

export type Project = {
	id: string;
	collection: string;
	data: z.infer<typeof projectsSchema>;
	body?: string;
	rendered?: {
		html: string;
		metadata?: Record<string, unknown>;
	};
	filePath?: string;
	digest?: string;
};

const posts = defineCollection({
	type: "content",
	schema: ({ image }) =>
		z.object({
			title: z.string(),
			description: z.string(),
			pubDate: z.date(),
			author: z.string().default("Tu Nombre"),
			heroImage: image().optional(),
			tags: z.array(z.string()).default([]),
			draft: z.boolean().default(false),
		}),
});

const tags = defineCollection({
	type: "data",
	schema: z.object({
		name: z.string(),
		description: z.string().optional(),
		color: z.string().optional(),
	}),
});

const projects = defineCollection({
	type: "data",
	schema: projectsSchema,
});

export const collections = {
	projects,
	posts,
	tags,
};
