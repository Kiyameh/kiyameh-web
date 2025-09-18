import path from "path";
import { defineConfig } from "astro/config";
import react from "@astrojs/react";
import netlify from "@astrojs/netlify";

// Configuración oficial de Astro - https://astro.build/config
export default defineConfig({
	// Configuración de internacionalización (i18n) para sitio multiidioma
	i18n: {
		// Idiomas soportados: español e inglés
		locales: ["es", "en"],
		// Idioma por defecto del sitio
		defaultLocale: "es",
		// Configuración de fallback: si una página no existe en inglés, mostrar la versión en español
		fallback: {
			en: "es",
		},
		// Configuración de enrutamiento
		routing: {
			// Incluir prefijo de idioma en las URLs, incluso para el idioma por defecto (/es/pagina)
			prefixDefaultLocale: true,
		},
	},

	// Integraciones habilitadas en el proyecto
	integrations: [react()], // Habilita el uso de componentes React

	// Configuración específica de Vite (bundler usado por Astro)
	vite: {
		// Configuración para Server-Side Rendering (SSR)
		ssr: {
			// Paquetes que no deben ser externalizados durante el SSR (se incluyen en el bundle)
			noExternal: ["react-resume-kit"],
		},
		// Configuración de resolución de módulos
		resolve: {
			// Alias para importaciones más limpias
			alias: {
				// Permite usar '@' como alias para la carpeta './src'
				"@": path.resolve("./src"),
			},
		},
	},
	// Adaptador para el despliegue - configura el proyecto para Netlify
	adapter: netlify(),
	// Tipo de salida del build - static
	output: "estatic",
});
