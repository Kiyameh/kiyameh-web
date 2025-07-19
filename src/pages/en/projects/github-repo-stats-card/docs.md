---
layout: ../../../../layouts/MarkdownLayout.astro
---

# 📊 GitHub Stats Card

A lightweight, dependency-free npm package that allows you to display a card with GitHub repository statistics on any web page.

## ✨ Features

- **🚀 No dependencies**: Works only with native browser APIs
- **🎨 Self-contained styling**: CSS automatically injected, doesn't interfere with existing styles
- **📱 Responsive**: Adapts to different screen sizes with adaptive layout
- **⚡ Lightweight**: Vanilla JavaScript with ES Modules only
- **🛡️ Error handling**: Shows elegant error messages when something fails
- **🔐 Authentication support**: Optional GitHub token to increase API limits
- **💻 Programming languages**: Top 5 most used languages in the repository
- **♿ Accessible**: Complies with WCAG standards and includes screen reader support
- **🌙 Dark theme**: Automatic support for `prefers-color-scheme: dark`
- **📊 Dual charts**: Pie chart on desktop, linear chart on mobile
- **🔄 Separation of concerns**: Data fetching logic separated from rendering

## 📦 Installation

```bash
npm install github-repo-stats-card
```

## 🚀 Usage

### HTML

```html
<div id="github-card"></div>
```

### JavaScript

```javascript
import {getRepoStats, renderRepoCard} from 'github-repo-stats-card'

[!CAUTION]
getRepoStats must always be used on the server side to avoid exposing the token to the client.

// Get repository data
const stats = await getRepoStats('vuejs/vue')

[!NOTE]
renderRepoCard can be safely used on the client or server side.

// Render the card with the obtained data
renderRepoCard('#github-card', stats)

// With authentication token
const stats = await getRepoStats('vuejs/vue', 'ghp_your_token_here')
renderRepoCard('#github-card', stats)
```

### TypeScript

The package includes complete TypeScript support with defined types:

```typescript
import {getRepoStats, renderRepoCard, RepoStats} from 'github-repo-stats-card'

// Get typed data
const stats: RepoStats = await getRepoStats('vuejs/vue')
console.log(stats.stargazersCount) // number
console.log(stats.languages) // Record<string, number>

// Render with typed data
renderRepoCard('#github-card', stats)
```

## 📋 API

### Main Functions

#### `getRepoStats(repoName, githubAuthToken?)`

Gets only the repository data without manipulating the DOM.

[!CAUTION]
getServerStats must always be used on the server side to avoid exposing the token to the client.

- **`repoName`** (string): Repository name in format `'user/repo-name'`
- **`githubAuthToken`** (string, optional): GitHub authentication token
- **Returns**: Promise<RepoStats> - Repository statistics
- **Note**: Programming languages are automatically filtered to show only the 5 most used

#### `renderRepoCard(selector, stats)`

Renders a GitHub statistics card with provided data. This function only handles rendering and should be executed in the browser.

- **`selector`** (string): CSS selector of the container element where the card will be displayed
- **`stats`** (RepoStats): Repository statistics previously obtained with `getRepoStats`

## 📊 Statistics Displayed

The card shows the following repository statistics:

- ⭐ **Stars** (Stargazers)
- 🍴 **Forks**
- ❗ **Open issues**
- 📝 **Repository description**
- 📅 **Repository creation date**
- 🔄 **Last repository update**
- 💻 **Top 5 programming languages** most used
- 🔗 **Direct link** to the repository on GitHub

## ♿ Accessibility and Design

### Accessibility Features

- **ARIA roles**: Appropriate use of roles like `main`, `group`, `img` and `section`
- **Descriptive labels**: `aria-label` and `aria-labelledby` for interactive elements
- **Screen reader text**: Hidden content but accessible to assistive technologies
- **Keyboard navigation**: Links with `target="_blank"` and `rel="noopener noreferrer"`
- **Color contrast**: Complies with WCAG accessibility standards

### Responsive Design

- **Adaptive layout**: Grid on desktop, flexbox on mobile
- **Dual charts**: Pie chart on desktop, linear chart on mobile
- **Scalable typography**: CSS variables for consistent font sizes
- **Responsive spacing**: Margins and padding that adapt to screen size
- **Dark theme**: Automatic support for `prefers-color-scheme: dark`

## 🎨 Customization

The package automatically injects the necessary CSS styles. Styles are encapsulated in classes with `stat-card-` prefix to avoid conflicts with your existing CSS.

The following CSS variables are applied by default and can be overridden:

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

### Generated HTML Structure

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
              repo-name
            </a>
          </h1>
          <p class="stat-card-full-name">user/repository</p>
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
          <!-- More statistics... -->
        </div>

        <p class="stat-card-description">Repository description</p>

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
            <!-- More languages... -->
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

## 🔧 Usage Examples

### With Error Handling

```javascript
import {createRepoCard} from 'github-repo-stats-card'

try {
  await createRepoCard('#my-card', 'user/repository')
} catch (error) {
  console.error('Error loading card:', error)
}
```

## 🛠️ Local Development

1. Clone the repository
2. No dependencies to install (vanilla JavaScript only)
3. Open `index.html` in your browser to see the demo
4. For TypeScript development, run `npm run build` to compile

## 📝 GitHub API

This package uses the [GitHub public API](https://docs.github.com/en/rest/reference/repos#get-a-repository) to obtain repository statistics.

**API Limits:**

- 60 requests per hour for unauthenticated IPs
- 5,000 requests per hour with authentication token
- For higher limits, consider using a GitHub token

### Create a GitHub Token

1. Go to [GitHub Settings > Developer settings > Personal access tokens](https://github.com/settings/tokens)
2. Generate a new token with `public_repo` permissions
3. Use the token as the third parameter in the functions

## 🤝 Contributing

Contributions are welcome. Please open an issue or pull request to suggest improvements.

## 📄 License

MIT License - see the LICENSE file for more details.

## 🙏 Acknowledgments

- [GitHub API](https://docs.github.com/en/rest) for providing the data
- The developer community for ideas and feedback

---

**Did you like this package? Give it a ⭐ on GitHub!**
