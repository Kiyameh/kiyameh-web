import {defineCollection, z} from 'astro:content'

// Definición de la colección de proyectos
const projectsSchema = z.object({
  name: z.string(),
  slug: z.string(),
  logo: z.string().optional(),
  url: z.string().url().optional(),
  repository: z.string().url().optional(),
  type: z.enum(['webpage', 'tool', 'package', 'design', 'other']),
  description: z.string(),
  description_en: z.string(),
  technologies: z.array(z.string()),
  features: z.array(z.string()),
  features_en: z.array(z.string()),
  mainImage: z.string().optional(),
  images: z.array(z.string()).optional(),
  featured: z.boolean().default(false),
  date: z
    .string()
    .or(z.date())
    .transform((val) => (typeof val === 'string' ? new Date(val) : val))
    .optional(),
})

// Inferir automáticamente el tipo en TypeScript
export type Project = {
  id: string
  collection: string
  data: z.infer<typeof projectsSchema>
  body?: string
  rendered?: any
  filePath?: string
  digest?: string
}

const projects = defineCollection({
  type: 'data',
  schema: projectsSchema,
})

export const collections = {
  projects,
}
