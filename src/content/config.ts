import {defineCollection, z} from 'astro:content'
import {version} from 'react'

export const projectCategories = [
  'webpage',
  'tool',
  'package',
  'design',
  'other',
] as const
export type ProjectCategory = (typeof projectCategories)[number]

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
    .enum(['planned', 'designing', 'development', 'completed', 'upgrading'])
    .optional(),
  version: z.string().optional(),
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
