---
layout: ../../../../layouts/MarkdownLayout.astro
---

# 📊 GitHub Stats Card

Un paquete de npm ligero y sin dependencias que permite mostrar una tarjeta con estadísticas de un repositorio de GitHub en cualquier página web.

## ✨ Características

- **🚀 Sin dependencias**: Funciona únicamente con APIs nativas del navegador
- **🎨 Estilo autocontenido**: CSS inyectado automáticamente, no interfiere con estilos existentes
- **📱 Responsivo**: Se adapta a diferentes tamaños de pantalla con layout adaptativo
- **⚡ Ligero**: Solo JavaScript vanilla con ES Modules
- **🛡️ Manejo de errores**: Muestra mensajes de error elegantes cuando algo falla
- **🔐 Soporte para autenticación**: Opcional token de GitHub para aumentar límites de API
- **💻 Lenguajes de programación**: Top 5 lenguajes más utilizados en el repositorio
- **♿ Accesible**: Cumple con estándares WCAG y incluye soporte para lectores de pantalla
- **🌙 Tema oscuro**: Soporte automático para `prefers-color-scheme: dark`
- **📊 Gráficos duales**: Gráfico de torta en desktop, gráfico lineal en móvil
- **🔄 Separación de responsabilidades**: Lógica de obtención de datos separada del renderizado

## 📦 Instalación

```bash
npm install github-repo-stats-card
```

## 🚀 Uso

### HTML

```html
<div id="github-card"></div>
```

### JavaScript

```javascript
import {getRepoStats, renderRepoCard} from 'github-repo-stats-card'

[!CAUTION]
getRepoStats debe de utilizarse siempre en el lado del servidor para evitar exponer el token al cliente.

// Obtener datos del repositorio
const stats = await getRepoStats('vuejs/vue')

[!NOTE]
renderRepoCard puede emplearse con seguridad en el cliente o en el servidor.

// Renderizar la tarjeta con los datos obtenidos
renderRepoCard('#github-card', stats)

// Con token de autenticación
const stats = await getRepoStats('vuejs/vue', 'ghp_your_token_here')
renderRepoCard('#github-card', stats)
```

### TypeScript

El paquete incluye soporte completo para TypeScript con tipos definidos:

```typescript
import {getRepoStats, renderRepoCard, RepoStats} from 'github-repo-stats-card'

// Obtener datos tipados
const stats: RepoStats = await getRepoStats('vuejs/vue')
console.log(stats.stargazersCount) // number
console.log(stats.languages) // Record<string, number>

// Renderizar con datos tipados
renderRepoCard('#github-card', stats)
```

## 📋 API

### Funciones Principales

#### `getRepoStats(repoName, githubAuthToken?)`

Obtiene solo los datos del repositorio sin manipular el DOM.

[!CAUTION]
getServerStats debe de utilizarse siempre en el lado del servidor para evitar exponer el token al cliente.

- **`repoName`** (string): Nombre del repositorio en formato `'usuario/nombre-del-repo'`
- **`githubAuthToken`** (string, opcional): Token de autenticación de GitHub
- **Returns**: Promise<RepoStats> - Estadísticas del repositorio
- **Nota**: Los lenguajes de programación se filtran automáticamente para mostrar solo los 5 más utilizados

#### `renderRepoCard(selector, stats)`

Renderiza una tarjeta de estadísticas de GitHub con datos proporcionados. Esta función solo se encarga del renderizado y debe ejecutarse en el navegador.

- **`selector`** (string): Selector CSS del elemento contenedor donde se mostrará la tarjeta
- **`stats`** (RepoStats): Estadísticas del repositorio obtenidas previamente con `getRepoStats`

## 📊 Estadísticas Mostradas

La tarjeta muestra las siguientes estadísticas del repositorio:

- ⭐ **Estrellas** (Stargazers)
- 🍴 **Forks**
- ❗ **Issues abiertos**
- 📝 **Descripción** del repositorio
- 📅 **Fecha de creación** del repositorio
- 🔄 **Última actualización** del repositorio
- 💻 **Top 5 lenguajes de programación** más utilizados
- 🔗 **Enlace directo** al repositorio en GitHub

## ♿ Accesibilidad y Diseño

### Características de Accesibilidad

- **Roles ARIA**: Uso apropiado de roles como `main`, `group`, `img` y `section`
- **Etiquetas descriptivas**: `aria-label` y `aria-labelledby` para elementos interactivos
- **Texto para lectores de pantalla**: Contenido oculto pero accesible para tecnologías asistivas
- **Navegación por teclado**: Enlaces con `target="_blank"` y `rel="noopener noreferrer"`
- **Contraste de colores**: Cumple con estándares de accesibilidad WCAG

### Diseño Responsivo

- **Layout adaptativo**: Grid en desktop, flexbox en móvil
- **Gráficos duales**: Gráfico de torta en desktop, gráfico lineal en móvil
- **Tipografía escalable**: Variables CSS para tamaños de fuente consistentes
- **Espaciado responsivo**: Márgenes y padding que se adaptan al tamaño de pantalla
- **Tema oscuro**: Soporte automático para `prefers-color-scheme: dark`

## 🎨 Personalización

El paquete inyecta automáticamente los estilos CSS necesarios. Los estilos están encapsulados en clases con prefijo `stat-card-` para evitar conflictos con tu CSS existente.

Se aplican las siguientes variables css por defecto que se pueden sobreescribir:

      --stat-card-surface: #ffffff;
      --stat-card-border: #e1e5e9;
      --stat-card-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
      --stat-card-radius: 12px;
      --stat-card-text-primary: #24292f;
      --stat-card-text-secondary: #656d76;
      --stat-card-text-muted: #8b949e;
      --stat-card-accent: #0969da;
      --stat-card-accent-hover: #0860ca;
      --stat-card-spacing-xs: 4px;
      --stat-card-spacing-sm: 8px;
      --stat-card-spacing-md: 16px;
      --stat-card-spacing-lg: 24px;
      --stat-card-font-sm: 0.875rem;
      --stat-card-font-base: 1rem;
      --stat-card-font-lg: 1.125rem;

### Estructura HTML Generada

```html
<div class="stat-card-container">
  <article
    class="stat-card"
    role="main"
  >
    <div class="stat-card-layout">
      <!-- Main Content -->
      <div class="stat-card-main">
        <header class="stat-card-header">
          <h1 class="stat-card-title">
            <a
              href="..."
              class="stat-card-link"
              target="_blank"
              rel="noopener noreferrer"
            >
              nombre-del-repo
            </a>
          </h1>
          <p class="stat-card-full-name">usuario/repositorio</p>
        </header>

        <div
          class="stat-card-stats"
          role="group"
          aria-label="Repository statistics"
        >
          <div class="stat-card-stat">
            <svg
              class="stat-card-stat-icon"
              viewBox="0 0 16 16"
              aria-hidden="true"
            >
              <!-- Star icon -->
            </svg>
            <span class="stat-card-stat-value">1.2K</span>
            <span>stars</span>
          </div>
          <!-- Más estadísticas... -->
        </div>

        <p class="stat-card-description">Descripción del repositorio</p>

        <div class="stat-card-dates">
          <div class="stat-card-date">
            <span class="stat-card-date-label">Created</span>
            <time datetime="...">January 15, 2024</time>
          </div>
          <div class="stat-card-date">
            <span class="stat-card-date-label">Updated</span>
            <time datetime="...">March 20, 2024</time>
          </div>
        </div>
      </div>

      <!-- Chart Section -->
      <div class="stat-card-chart-section">
        <section aria-labelledby="languages-title">
          <h2
            class="stat-card-languages-title"
            id="languages-title"
          >
            Languages
          </h2>

          <!-- Desktop Pie Chart -->
          <svg
            class="stat-card-pie-chart"
            viewBox="0 0 100 100"
            role="img"
            aria-label="Programming languages distribution pie chart"
          >
            <!-- Pie chart segments -->
          </svg>

          <!-- Mobile Linear Chart -->
          <div
            class="stat-card-linear-chart"
            role="img"
            aria-label="Programming languages distribution chart"
          >
            <div class="stat-card-languages-bar">
              <!-- Linear chart segments -->
            </div>
          </div>

          <ul class="stat-card-languages-list">
            <li class="stat-card-language-item">
              <span
                class="stat-card-language-dot"
                style="background-color: #f1e05a;"
                aria-hidden="true"
              ></span>
              <span>JavaScript</span>
              <span class="stat-card-language-percentage">45.2%</span>
            </li>
            <!-- Más lenguajes... -->
          </ul>
        </section>
      </div>
    </div>

    <span class="stat-card-sr-only">
      Repository statistics: 1.2K stars, 234 forks, 45 open issues. Main
      languages: JavaScript 45.2%, TypeScript 32.1%, CSS 22.7%.
    </span>
  </article>
</div>
```

## 🔧 Ejemplos de Uso

### Con Manejo de Errores

```javascript
import {createRepoCard} from 'github-repo-stats-card'

try {
  await createRepoCard('#my-card', 'usuario/repositorio')
} catch (error) {
  console.error('Error al cargar la tarjeta:', error)
}
```

## 🛠️ Desarrollo Local

1. Clona el repositorio
2. No hay dependencias que instalar (solo JavaScript vanilla)
3. Abre `index.html` en tu navegador para ver la demostración
4. Para desarrollo con TypeScript, ejecuta `npm run build` para compilar

## 📝 API de GitHub

Este paquete utiliza la [API pública de GitHub](https://docs.github.com/en/rest/reference/repos#get-a-repository) para obtener las estadísticas del repositorio.

**Límites de la API:**

- 60 requests por hora para IPs no autenticadas
- 5,000 requests por hora con token de autenticación
- Para mayor límite, considera usar un token de GitHub

### Crear un Token de GitHub

1. Ve a [GitHub Settings > Developer settings > Personal access tokens](https://github.com/settings/tokens)
2. Genera un nuevo token con permisos `public_repo`
3. Usa el token como tercer parámetro en las funciones

## 🤝 Contribuir

Las contribuciones son bienvenidas. Por favor, abre un issue o pull request para sugerir mejoras.

## 📄 Licencia

MIT License - ver el archivo LICENSE para más detalles.

## 🙏 Agradecimientos

- [GitHub API](https://docs.github.com/en/rest) por proporcionar los datos
- La comunidad de desarrolladores por las ideas y feedback

---

**¿Te gustó este paquete? ¡Dale una ⭐ en GitHub!**
