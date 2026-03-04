---
title: "Testing Astro Components with Testing Library (Without Breaking Everything Along the Way)"
description: "Testing Astro components with Testing Library seems straightforward until you hit a conflict between jsdom and esbuild that crashes the environment before a single test runs. In this article I explain the root cause, why the obvious fixes don't work, and how to solve it with a 20-line pattern that instantiates JSDOM locally — just like React Testing Library does internally."
pubDate: 2026-01-04
author: "Andoni"
tags: ["Vitest", "Astro", "Testing", "Jest"]
draft: false
---

> **TL;DR** — Astro's Container API cannot coexist with a global jsdom environment because both need to control `TextEncoder` in incompatible ways. The solution is to run tests in node and instantiate JSDOM locally, exactly like React Testing Library does internally. The result: semantic, user-first tests with zero friction.

---

## Why This Matters

Astro is a framework designed to generate HTML on the server. That's great for performance, but it raises an uncomfortable question: **how do you test something that, by nature, doesn't run in the browser?**

If you come from the React world, you're used to a very specific testing philosophy: the one proposed by [Testing Library](https://testing-library.com/). The core idea is simple —

> _"The more your tests resemble the way your software is used, the more confidence they can give you."_

In React that means finding a button by its visible text, not by its CSS class or `data-testid`. Finding a form field by its `label`. Verifying that the user _sees_ what they're supposed to see.

In Astro, the community has long been using a different approach: render the component to an HTML string and do `expect(html).toContain('<h2>')`. It works. But it's still a brittle check that looks at _how_ something is implemented, not _what_ the user experiences.

This article explains how we arrived at a `renderAstro` pattern that gives you full Testing Library support for `.astro` components and pages, and the — rather unusual — obstacles that had to be overcome to get there.

---

## The Starting Point: Astro's Container API

Since version 3.x, Astro exposes a tool called `experimental_AstroContainer`. Its purpose is simple: render any `.astro` component outside of a real HTTP request, directly in a Node process.

```typescript
import { experimental_AstroContainer as Container } from "astro/container";

const container = await Container.create();
const html = await container.renderToString(MyComponent, {
  props: { title: "Hello" },
});

// html = '<article><h2>Hello</h2></article>'
```

With this, the typical test approach looks like:

```typescript
it("renders the title", async () => {
  const html = await renderAstroComponent(FakeCard, {
    props: { title: "Test title" },
  });

  expect(html).toContain("Test title");
  expect(html).toMatch(/<h2[^>]*>.*Test title<\/h2>/s);
});
```

It works, and it's a good start. But it has problems:

- **Regular expressions are fragile.** Any structural change breaks the test even if the user still sees the same thing.
- **No semantics.** `toContain('<article')` says nothing about whether the element has the correct ARIA role.
- **You can't test accessibility.** Is that `<h2>` accessible? Does the `<ul>` have an `aria-label`? With strings, you just don't know.

---

## What Testing Library Offers

Testing Library is not a testing library in the traditional sense. It's a testing philosophy implemented as a library. Its core (`@testing-library/dom`) provides a set of _queries_ to find elements in the DOM the same way a user or screen reader would:

| Query                                       | What it finds                                               |
| ------------------------------------------- | ----------------------------------------------------------- |
| `getByRole('heading', { name: 'Title' })`   | A heading whose accessible name is "Title"                  |
| `getByRole('link', { name: 'Read more' })`  | A link with that text                                       |
| `getByRole('list', { name: 'Tags' })`       | A list with that `aria-label`                               |
| `getByText('Description')`                  | Any element containing that text                            |
| `queryByRole(...)`                          | Like `getBy` but returns `null` instead of throwing         |

The fundamental difference compared to `toContain('<h2')` is that these queries:

1. **Verify semantics**, not HTML syntax.
2. **Throw useful error messages** when the element is not found.
3. **Encourage the use of accessibility attributes** (`aria-label`, ARIA roles, etc.).
4. **Pair with `jest-dom`**, which adds matchers like `toBeInTheDocument()`, `toHaveAttribute()` or `toHaveTextContent()`.

---

## The First Attempt: Injecting into jsdom

The obvious idea is: if Testing Library needs a DOM, give it a DOM. Vitest lets you configure the test environment as `jsdom`, which simulates a full browser (with `document`, `window`, etc.). The plan was:

1. Render with `Container` → HTML string.
2. Inject that HTML into `document.body`.
3. Use Testing Library's `screen` to query it.

```typescript
// First attempt (DOES NOT WORK)
import { screen } from "@testing-library/dom";

export async function renderAstro(Component, props = {}) {
  const container = await Container.create();
  const html = await container.renderToString(Component, { props });

  document.body.innerHTML = html; // ← requires jsdom
  return { screen };
}
```

Clean. Elegant. And completely broken.

---

## The Villain: esbuild and Cross-Realm `instanceof`

When you enable `@vitest-environment jsdom` in tests that use `renderAstro`, this error appears:

```
Error: Invariant violation:
"new TextEncoder().encode("") instanceof Uint8Array" is incorrectly false

This indicates that your JavaScript environment is broken.
You cannot use esbuild in this environment because esbuild
relies on this invariant.
```

To understand what's happening, you need to understand three pieces:

### 1. Realms in JavaScript

In JavaScript, every execution context has its own _realm_: its own copy of `Array`, `Object`, `Uint8Array`, etc. An object created in realm A does not pass the `instanceof` check of realm B, even if they look visually identical.

```javascript
// Realm A (native Node)
const a = new Uint8Array([1, 2, 3]);
a instanceof Uint8Array; // true in Realm A

// If Realm B (jsdom) overwrites Uint8Array...
a instanceof Uint8Array; // false in Realm B ← problem!
```

### 2. What jsdom Does

When you activate the jsdom environment, jsdom overwrites several native Node globals — including `TextEncoder` — with versions from its own realm. It does this to simulate a browser environment as faithfully as possible.

### 3. What esbuild Does

Astro Container uses esbuild internally to process code. When esbuild loads as a module, it runs this startup sanity check:

```javascript
// node_modules/esbuild/lib/main.js ~line 201
if (!(new TextEncoder().encode("") instanceof Uint8Array)) {
  throw new Error("Invariant violation: ...");
}
```

It's a sanity check that says: _"if I can't create a Uint8Array as expected, this environment is broken and I can't continue."_

The problem: jsdom has overwritten `TextEncoder` with its own version. The `TextEncoder` from jsdom's realm produces `Uint8Array` from its own realm, which doesn't pass the `instanceof` check from Node's original realm. Result: esbuild explodes.

### The Failed Patching Attempt

The logical fix is to think: restore `TextEncoder` in Vitest's setup file.

```typescript
// vitest.setup.ts
import { TextDecoder, TextEncoder } from "node:util";
Object.assign(global, { TextDecoder, TextEncoder });
```

The problem is _timing_. By the time Vitest runs the setup file, the jsdom worker has already replaced the globals. And when the worker starts evaluating modules (including esbuild, which loads when `astro/container` is imported), the module can be evaluated before the patch takes effect. Same error.

---

## The Solution: Don't Use a Global jsdom, Create a Local One

The key lies in how React Testing Library works under the hood. Its `render(<Component />)` function **does not assume** there is a global jsdom. It creates its own `document` and works with it. This isolates it from any environment contamination.

We can do exactly the same with Astro:

```
 ┌─────────────────────────────────────────────┐
 │  Environment: Node (no global jsdom)         │
 │                                              │
 │  1. AstroContainer.renderToString()          │
 │         ↓                                    │
 │     HTML string (pure SSR)                   │
 │         ↓                                    │
 │  2. new JSDOM(html)                          │
 │         ↓                                    │
 │     local document (isolated realm)          │
 │         ↓                                    │
 │  3. getQueriesForElement(document.body)      │
 │         ↓                                    │
 │     { getByRole, getByText, ... }            │
 └─────────────────────────────────────────────┘
```

`JSDOM` is created _after_ esbuild has already initialized correctly. There's no realm conflict because Node's `TextEncoder` was intact when esbuild started.

`@testing-library/dom` exposes `getQueriesForElement`, which generates all Testing Library queries scoped to a specific DOM element. That element can be any `HTMLElement`, including the `body` of our local JSDOM.

---

## The Implementation: `renderAstro`

```typescript
// src/test/renderAstro.ts
import { experimental_AstroContainer as Container } from "astro/container";
import { type ContainerRenderOptions } from "astro/container";
import { JSDOM } from "jsdom";
import { getQueriesForElement, within } from "@testing-library/dom";

type AstroComponent = Parameters<Container["renderToString"]>[0];

export async function renderAstro(
  Component: AstroComponent,
  props: Record<string, unknown> = {},
  options: ContainerRenderOptions = {},
) {
  // 1. Render to HTML string in Node environment (esbuild happy)
  const astroContainer = await Container.create();
  const plainHtml = await astroContainer.renderToString(Component, {
    props,
    ...options,
  });

  // 2. Create a local JSDOM document (does not pollute the global environment)
  const dom = new JSDOM(plainHtml);
  const { document } = dom.window;
  const container = document.body;

  // 3. Get Testing Library queries scoped to this document
  const queries = getQueriesForElement(container);

  return {
    container, // HTMLBodyElement of the JSDOM document
    document,  // The full document (useful for document.title)
    within,    // To scope queries to a sub-element
    plainHtml, // The original HTML in case you need it
    ...queries, // getByRole, getByText, queryByRole, getAllByRole...
  };
}
```

20 lines. No special configuration. No environment juggling. And it works for both **components** (HTML fragments) and **full pages** (with `<html>`, `<head>`, `<body>`), because JSDOM parses both situations correctly.

---

## In Practice: Testing a Component

Consider this `FakeCard.astro` component:

```astro
---
interface Props {
  title: string;
  description?: string;
  href?: string;
  tags?: string[];
}
const { title, description, href, tags = [] } = Astro.props;
---
<article>
  <h2>{title}</h2>
  {description && <p>{description}</p>}
  {href && <a href={href}>Read more</a>}
  {tags.length > 0 && (
    <ul aria-label="Tags">
      {tags.map((tag) => <li>{tag}</li>)}
    </ul>
  )}
</article>
```

The test with this pattern:

```typescript
// FakeCard.test.ts
import { describe, it, expect } from "vitest";
import { within } from "@testing-library/dom";
import { renderAstro } from "@/test/renderAstro";
import FakeCard from "./FakeCard.astro";

describe("FakeCard", () => {
  it("shows the title in a level 2 heading", async () => {
    const { getByRole } = await renderAstro(FakeCard, {
      title: "Test title",
    });

    expect(
      getByRole("heading", { level: 2, name: "Test title" }),
    ).toBeInTheDocument();
  });

  it("does not show description when not provided", async () => {
    const { queryByText } = await renderAstro(FakeCard, {
      title: "Title only",
    });

    expect(queryByText(/description/i)).not.toBeInTheDocument();
  });

  it("shows link with correct href when href is provided", async () => {
    const { getByRole } = await renderAstro(FakeCard, {
      title: "Title",
      href: "/detail",
    });

    expect(getByRole("link", { name: "Read more" })).toHaveAttribute(
      "href",
      "/detail",
    );
  });

  it("shows tags in an accessible list", async () => {
    const { getByRole } = await renderAstro(FakeCard, {
      title: "Title",
      tags: ["tag1", "tag2"],
    });

    const list = getByRole("list", { name: "Tags" });
    expect(within(list).getByText("tag1")).toBeInTheDocument();
    expect(within(list).getByText("tag2")).toBeInTheDocument();
  });

  it("uses article as the semantic container", async () => {
    const { getByRole } = await renderAstro(FakeCard, { title: "Title" });

    expect(getByRole("article")).toBeInTheDocument();
  });
});
```

Notice what we're actually verifying:

- **`getByRole("heading", { level: 2 })`** — not `toContain('<h2')`. We verify that _a level 2 heading exists_, which implies the semantic HTML is correct.
- **`getByRole("link", { name: "Read more" })`** — not `toContain('href')`. We verify the link has the correct accessible text, which is what a screen reader would announce.
- **`getByRole("list", { name: "Tags" })`** — we verify the list has an `aria-label` that identifies it for users of assistive technologies.

---

## In Practice: Testing a Full Page

This is where the solution really shines. A `FakePage.astro` page with a full `<html>` structure:

```astro
---
import FakeCard from "./FakeCard.astro";

interface Props {
  title: string;
  cards: { title: string; description?: string }[];
}
const { title, cards } = Astro.props;
---
<html lang="en">
  <head>
    <title>{title}</title>
  </head>
  <body>
    <main>
      <h1>{title}</h1>
      {cards.map((card) => (
        <FakeCard title={card.title} description={card.description} />
      ))}
    </main>
  </body>
</html>
```

The test:

```typescript
// FakePage.test.ts
import { describe, it, expect } from "vitest";
import { within } from "@testing-library/dom";
import { renderAstro } from "@/test/renderAstro";
import FakePage from "./FakePage.astro";

describe("FakePage", () => {
  it("sets the document title in the <title> tag", async () => {
    const { document } = await renderAstro(FakePage, {
      title: "Test title",
      cards: [],
    });

    expect(document.title).toBe("Test title");
  });

  it("contains a main region", async () => {
    const { getByRole } = await renderAstro(FakePage, {
      title: "Title",
      cards: [],
    });

    expect(getByRole("main")).toBeInTheDocument();
  });

  it("renders cards inside main", async () => {
    const { getByRole } = await renderAstro(FakePage, {
      title: "Page",
      cards: [{ title: "Card 1", description: "Desc 1" }, { title: "Card 2" }],
    });

    const main = getByRole("main");
    expect(
      within(main).getByRole("heading", { name: "Card 1" }),
    ).toBeInTheDocument();
    expect(within(main).getByText("Desc 1")).toBeInTheDocument();
  });

  it("renders as many articles as cards passed", async () => {
    const { getAllByRole } = await renderAstro(FakePage, {
      title: "Page",
      cards: [{ title: "A" }, { title: "B" }, { title: "C" }],
    });

    expect(getAllByRole("article")).toHaveLength(3);
  });
});
```

`document.title` gives us access to the `<title>` in `<head>`, which was impossible with the approach of injecting into `document.body`.

---

## Minimal Required Setup

For all of this to work you only need three dependencies (you probably already have them if you use Vitest):

```bash
npm install -D @testing-library/dom @testing-library/jest-dom jsdom
```

And a `vitest.setup.ts` with a single line:

```typescript
// vitest.setup.ts
import "@testing-library/jest-dom/vitest";
```

This enables jest-dom matchers (`toBeInTheDocument`, `toHaveAttribute`, `toHaveTextContent`, etc.) across all your tests. That's it.

Astro tests using `renderAstro` **run in node environment** (Vitest's default), so you don't need any `@vitest-environment jsdom` directive or special environment configuration.

---

## Before and After

### Before — string-based test

```typescript
it("renders the title", async () => {
  const html = await renderAstroComponent(FakeCard, {
    props: { title: "Title" },
  });

  expect(html).toContain("Title");
  expect(html).toMatch(/<h2[^>]*>.*Title.*<\/h2>/s); // fragile regex
  expect(html).toContain("<article");                 // doesn't verify semantics
});
```

### After — semantic test

```typescript
it("renders the title in a level 2 heading", async () => {
  const { getByRole } = await renderAstro(FakeCard, { title: "Title" });

  expect(
    getByRole("heading", { level: 2, name: "Title" }),
  ).toBeInTheDocument();

  expect(getByRole("article")).toBeInTheDocument(); // verifies ARIA role
});
```

The second version:

- Is more readable.
- Fails with descriptive error messages.
- Verifies semantics and accessibility, not syntax.
- Doesn't break if you change the internal structure as long as the semantic output remains the same.

---

## Current Limitations

It's only fair to mention what this pattern does **not** cover yet:

- **Interactivity**: `renderAstro` renders Astro's static HTML. Island components (React, Vue, Svelte) are rendered without hydration. To test interactions in islands, use the tools from each framework directly (`@testing-library/react`, etc.).
- **Data fetching**: if your component calls `getCollection()` or other data layer functions, you'll need to mock those dependencies. That's independent of this pattern.
- **Evolving API**: `experimental_AstroContainer` is, as the name suggests, experimental. The API may change in future versions of Astro.

---

## A Proposal for the Community

Astro's Container API is a powerful tool that's still underused. The entry barrier — the conflict with jsdom — discourages many from even trying Testing Library with `.astro` components.

The `renderAstro` pattern removes that barrier with very little code. Here's what I propose as a starting point for any project:

```typescript
// src/test/renderAstro.ts — copy and adapt it
import { experimental_AstroContainer as Container } from "astro/container";
import { type ContainerRenderOptions } from "astro/container";
import { JSDOM } from "jsdom";
import { getQueriesForElement, within } from "@testing-library/dom";

type AstroComponent = Parameters<Container["renderToString"]>[0];

export async function renderAstro(
  Component: AstroComponent,
  props: Record<string, unknown> = {},
  options: ContainerRenderOptions = {},
) {
  const astroContainer = await Container.create();
  const plainHtml = await astroContainer.renderToString(Component, {
    props,
    ...options,
  });
  const dom = new JSDOM(plainHtml);
  const { document } = dom.window;
  const queries = getQueriesForElement(document.body);

  return { container: document.body, document, within, plainHtml, ...queries };
}
```

If you use it, improve it, or find cases where it breaks — share it. The Astro community is active and utilities like this only get better with more eyes on them.

---

## Conclusion

Testing Library's _"test the way the user uses it"_ philosophy applies to Astro. You just needed to find the path around the conflict between esbuild and global jsdom. The key — instantiating JSDOM locally rather than assuming a global environment — is elegant, minimal, and side-effect free.

It's not a workaround. It's the same pattern React Testing Library has used from day one. It just hadn't been applied to `.astro` yet.

---

_Tested with: Astro 5.16.4 · Vitest 4.0.9 · @testing-library/dom 10.4.1 · jsdom (included as a peer dep of Vitest)_
