// @ts-check
import {defineConfig} from 'astro/config'
import path from 'path'
import react from '@astrojs/react'

// https://astro.build/config
export default defineConfig({
  i18n: {
    locales: ['es', 'en'],
    defaultLocale: 'es',
    fallback: {
      en: 'es',
    },
    routing: {
      prefixDefaultLocale: true,
    },
  },

  integrations: [react()],

  vite: {
    ssr: {
      noExternal: ['react-resume-kit'],
    },
    resolve: {
      alias: {
        '@': path.resolve('./src'),
      },
    },
  },
})
