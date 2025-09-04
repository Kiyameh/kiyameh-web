# CONTEXT.md - kiyameh.dev

## Concepto

Portfolio personal de Andoni Abarzuza, desarrollador web y diseñador de interfaces. El proyecto combina diseño UI/UX con desarrollo web.

## Características

- Portfolio multilingüe (ES/EN)
- Diseño responsive y accesible
- Componentes reutilizables
- Sistema de temas claro/oscuro
- Optimización de imágenes con Astro Assets
- Componentes React con hidratación selectiva

## Tecnologías

- **Framework principal**: Astro 5.13.5
- **React**: 19.1.0 (integración con @astrojs/react)
- **TypeScript**: Configurado para todo el proyecto
- **Estilos**: CSS nativo con variables CSS personalizadas
- **Deployment**: Netlify (@astrojs/netlify)
- **Internacionalización**: Soporte para español (es) e inglés (en) mediante estructura de carpetas
- **Animaciones**: Framer Motion
- **Iconos**: Lucide React, React Simple Icons
- **Fuentes**: Outfit Variable, JetBrains Mono, Baskervville

## Estructura de Carpetas

```
src/
├── assets/          # Imágenes, fondos y recursos
├── components/      # Componentes reutilizables
│   ├── ui/         # Componentes de interfaz reutilizables
│   ├── elements/   # Elementos específicos de paginas
│   └── package/    # Componentes de paquetes propios npm
├── content/         # Contenido del sitio
├── functions/       # Funciones utilitarias
├── layouts/         # Layouts de Astro
├── pages/          # Páginas del sitio (Astro)
├── styles/         # Estilos globales y variables CSS
└── templates/      # Paneles y secciones de las paginas
```

## Estilos

### Variables CSS (theme.css)

- **Superficies**: `--surface-100`, `--surface-200`, `--surface-300`
- **Contenido**: `--content`, `--emphasis`, `--focus`
- **border**: `--border`, `--border-soft`
- **Gradientes**: `--gradient-100`, `--gradient-200`, `--gradient-300`, `--gradient-content`
- **Primarios**: `--primary`, `--primary-content`, `--accent`,`--accent-content`, `--neutral`, `--neutral-content`
- **Feedback**: `--info`,`--info-content`, `--success`,`--succes-content`, `--warning`, `--warning-content`, `--error`, `--error-content`
- **Radios**: `--radius-small`, `--radius-medium`, `--radius-large`
- **Sombras**: `--shadow-small`, `--shadow-medium`, `--shadow-large`
- **Fuentes**: `--font-sans`, `--font-mono`, `--font-fantasy`

### Tema

- Soporte para modo claro y oscuro
- Transiciones fluidas en colores y fondos
- Scrollbar personalizada
- Focus visible para accesibilidad

## Reglas

### Components

- **OBLIGATORIO**: Cada componente dentro de una carpeta
- **OBLIGATORIO**: Cada componente documentado en su readme.md
- **OBLIGATORIO**: Cada subcomponente, typo o archivo necesario por un componente dentro de su propia carpeta
- **OBLIGATORIO**: Cada componente con un index.ts con las exportaciones

### React Components

- **OBLIGATORIO**: Usar CSS Modules (.module.css)
- Ejemplo: `import styles from './Component.module.css'`
- Aplicar estilos: `className={styles.componentName}`

### Astro Components

- **OBLIGATORIO**: Estilos CSS en el mismo archivo
- Usar `<style>` tag al final del componente
- Aplicar clases directamente: `class="nombre-clase"`

## Configuración

- **Output**: Static (SSG)
- **SSR**: Deshabilitado
- **Alias**: `@` apunta a `./src`
- **i18n**: Español como idioma por defecto
- **Integraciones**: React habilitado para componentes interactivos
