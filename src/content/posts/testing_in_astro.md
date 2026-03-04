---
title: "Testear componentes Astro con Testing Library (sin romper nada por el camino)"
description: "Testear componentes Astro con Testing Library parece sencillo hasta que chocas con un conflicto entre jsdom y esbuild que rompe el entorno antes de ejecutar un solo test. En este artículo explico la causa raíz del problema, por qué los enfoques obvios no funcionan y cómo resolverlo con un patrón de 20 líneas."
pubDate: 2026-01-04
author: "Andoni"
tags: ["Vitest", "Astro", "Testing", "Jest"]
draft: false
---

> **TL;DR** — La Container API de Astro no puede convivir con un entorno jsdom global porque ambos necesitan controlar `TextEncoder` de formas incompatibles. La solución es correr los tests en node e instanciar JSDOM de forma local, igual que hace React Testing Library internamente. El resultado: tests semánticos, orientados al usuario y sin fricciones.

---

## Por qué esto importa

Astro es un framework pensado para generar HTML en el servidor. Eso es genial para el rendimiento, pero plantea una pregunta incómoda: **¿cómo testeas algo que, por naturaleza, no se ejecuta en el navegador?**

Si vienes del mundo React, estás acostumbrado a una filosofía de testing muy concreta: la que propone [Testing Library](https://testing-library.com/). La idea central es sencilla —

> _"Cuanto más se parezcan tus tests a la forma en que el software se usa, más confianza te darán."_

En React eso significa buscar un botón por su texto visible, no por su clase CSS o su `data-testid`. Buscar un campo de formulario por su `label`. Verificar que el usuario _ve_ lo que tiene que ver.

En Astro, la comunidad lleva tiempo usando un enfoque diferente: renderizar el componente a string HTML y hacer `expect(html).toContain('<h2>')`. Funciona. Pero no deja de ser una comprobación frágil que mira el _cómo_ se implementa, no el _qué_ experimenta el usuario.

Este artículo explica cómo llegamos a un patrón `renderAstro` que da Testing Library completo para componentes y páginas `.astro`, y los obstáculos —bastante raros— que hubo que sortear para conseguirlo.

---

## El punto de partida: la Container API de Astro

Astro expone desde la versión 3.x una herramienta llamada `experimental_AstroContainer`. Su función es simple: renderizar cualquier componente `.astro` fuera de una petición HTTP real, directamente en un proceso de Node.

```typescript
import { experimental_AstroContainer as Container } from "astro/container";

const container = await Container.create();
const html = await container.renderToString(MiComponente, {
  props: { title: "Hola" },
});

// html = '<article><h2>Hola</h2></article>'
```

Con esto, el enfoque habitual de tests queda así:

```typescript
it("renderiza el título", async () => {
  const html = await renderAstroComponent(FakeCard, {
    props: { title: "Título de prueba" },
  });

  expect(html).toContain("Título de prueba");
  expect(html).toMatch(/<h2[^>]*>.*Título de prueba<\/h2>/s);
});
```

Funciona, y es un buen comienzo. Pero tiene problemas:

- **Las expresiones regulares son frágiles.** Cualquier cambio de estructura rompe el test aunque el usuario siga viendo lo mismo.
- **No hay semántica.** `toContain('<article')` no dice nada sobre si el elemento tiene el rol ARIA correcto.
- **No puedes testear accesibilidad.** ¿Es ese `<h2>` accesible? ¿Tiene el `<ul>` un `aria-label`? Con strings, no sabes.

---

## Qué ofrece Testing Library

Testing Library no es una librería de testing al uso. Es una filosofía de testing implementada como librería. Su núcleo (`@testing-library/dom`) ofrece una serie de _queries_ para buscar elementos en el DOM de la misma forma que lo haría un usuario o un lector de pantalla:

| Query                                      | Qué busca                                                  |
| ------------------------------------------ | ---------------------------------------------------------- |
| `getByRole('heading', { name: 'Título' })` | Un heading cuyo texto accesible es "Título"                |
| `getByRole('link', { name: 'Leer más' })`  | Un enlace con ese texto                                    |
| `getByRole('list', { name: 'Etiquetas' })` | Una lista con ese `aria-label`                             |
| `getByText('Descripción')`                 | Cualquier elemento que contenga ese texto                  |
| `queryByRole(...)`                         | Como `getBy` pero devuelve `null` en lugar de lanzar error |

La diferencia fundamental respecto a `toContain('<h2')` es que estas queries:

1. **Verifican semántica**, no sintaxis HTML.
2. **Lanzan mensajes de error útiles** cuando no encuentran el elemento.
3. **Alientan el uso de atributos de accesibilidad** (`aria-label`, roles ARIA, etc.).
4. **Se complementan con `jest-dom`**, que añade matchers como `toBeInTheDocument()`, `toHaveAttribute()` o `toHaveTextContent()`.

---

## El primer intento: inyectar en jsdom

La idea obvia es: si Testing Library necesita un DOM, le doy un DOM. Vitest permite configurar el entorno de los tests como `jsdom`, que simula un navegador completo (con `document`, `window`, etc.). El plan era:

1. Renderizar con `Container` → HTML string.
2. Inyectar ese HTML en `document.body`.
3. Usar `screen` de Testing Library para hacer queries sobre él.

```typescript
// Primer intento (NO FUNCIONA)
import { screen } from "@testing-library/dom";

export async function renderAstro(Component, props = {}) {
  const container = await Container.create();
  const html = await container.renderToString(Component, { props });

  document.body.innerHTML = html; // ← requiere jsdom
  return { screen };
}
```

Bonito. Limpio. Y completamente roto.

---

## El villano: esbuild y los `instanceof` cross-realm

Al activar `@vitest-environment jsdom` en los tests que usan `renderAstro`, aparece este error:

```
Error: Invariant violation:
"new TextEncoder().encode("") instanceof Uint8Array" is incorrectly false

This indicates that your JavaScript environment is broken.
You cannot use esbuild in this environment because esbuild
relies on this invariant.
```

Para entender qué está pasando, hay que entender tres piezas:

### 1. Realms en JavaScript

En JavaScript, cada contexto de ejecución tiene su propio _realm_: su propia copia de `Array`, `Object`, `Uint8Array`, etc. Un objeto creado en el realm A no pasa la comprobación `instanceof` del realm B, aunque visualmente sean idénticos.

```javascript
// Realm A (Node nativo)
const a = new Uint8Array([1, 2, 3]);
a instanceof Uint8Array; // true en Realm A

// Si Realm B (jsdom) sobreescribe Uint8Array...
a instanceof Uint8Array; // false en Realm B ← ¡problema!
```

### 2. Lo que hace jsdom

Cuando activas el entorno jsdom, jsdom sobreescribe varios globales nativos de Node —incluyendo `TextEncoder`— con versiones propias de su realm. Lo hace para simular un entorno de navegador lo más fielmente posible.

### 3. Lo que hace esbuild

Astro Container usa esbuild internamente para procesar código. Esbuild, al cargarse como módulo, ejecuta esta comprobación de arranque:

```javascript
// node_modules/esbuild/lib/main.js ~línea 201
if (!(new TextEncoder().encode("") instanceof Uint8Array)) {
  throw new Error("Invariant violation: ...");
}
```

Es una sanity check que dice: _"si no puedo crear un Uint8Array como espero, este entorno está roto y no puedo seguir."_

El problema: jsdom ha sobreescrito `TextEncoder` con su versión. El `TextEncoder` del realm de jsdom produce `Uint8Array` de su propio realm, que no pasa el `instanceof` del realm original de Node. Resultado: esbuild explota.

### El intento fallido de parchear

Lo lógico es pensar: restaura `TextEncoder` en el setup file de Vitest.

```typescript
// vitest.setup.ts
import { TextDecoder, TextEncoder } from "node:util";
Object.assign(global, { TextDecoder, TextEncoder });
```

El problema es de _timing_. Cuando Vitest ejecuta el setup file, el worker de jsdom ya ha reemplazado los globales. Y cuando el worker empieza a evaluar los módulos (incluido esbuild, que se carga al importar `astro/container`), el módulo puede evaluarse antes de que el patch surta efecto. El resultado es el mismo error.

---

## La solución: no uses jsdom global, crea uno local

La clave está en cómo funciona React Testing Library por dentro. Su función `render(<Componente />)` **no asume** que hay un jsdom global. Crea su propio `document` y trabaja con él. Así se aisla de cualquier contaminación del entorno.

Podemos hacer exactamente lo mismo con Astro:

```
 ┌─────────────────────────────────────────────┐
 │  Entorno: Node (sin jsdom global)            │
 │                                              │
 │  1. AstroContainer.renderToString()          │
 │         ↓                                    │
 │     HTML string (SSR puro)                   │
 │         ↓                                    │
 │  2. new JSDOM(html)                          │
 │         ↓                                    │
 │     document local (realm aislado)           │
 │         ↓                                    │
 │  3. getQueriesForElement(document.body)      │
 │         ↓                                    │
 │     { getByRole, getByText, ... }            │
 └─────────────────────────────────────────────┘
```

`JSDOM` se crea _después_ de que esbuild ya se ha inicializado correctamente. No hay conflicto de realms porque el `TextEncoder` de Node ya estaba intacto cuando esbuild arrancó.

`@testing-library/dom` expone `getQueriesForElement`, que genera todas las queries de Testing Library acotadas a un elemento DOM concreto. Ese elemento puede ser cualquier `HTMLElement`, incluido el `body` de nuestro JSDOM local.

---

## La implementación: `renderAstro`

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
  // 1. Renderizar a HTML string en entorno Node (esbuild feliz)
  const astroContainer = await Container.create();
  const plainHtml = await astroContainer.renderToString(Component, {
    props,
    ...options,
  });

  // 2. Crear un documento JSDOM local (no contamina el entorno global)
  const dom = new JSDOM(plainHtml);
  const { document } = dom.window;
  const container = document.body;

  // 3. Obtener queries de Testing Library acotadas a este documento
  const queries = getQueriesForElement(container);

  return {
    container, // HTMLBodyElement del documento JSDOM
    document, // El documento completo (útil para document.title)
    within, // Para acotar queries a un subelemento
    plainHtml, // El HTML original por si lo necesitas
    ...queries, // getByRole, getByText, queryByRole, getAllByRole...
  };
}
```

Son 20 líneas. Sin configuración especial. Sin malabarismos con el entorno. Y funciona tanto para **componentes** (fragmentos HTML) como para **páginas completas** (con `<html>`, `<head>`, `<body>`), porque JSDOM parsea ambas situaciones correctamente.

---

## En la práctica: testear un componente

Considera este componente `FakeCard.astro`:

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
  {href && <a href={href}>Leer más</a>}
  {tags.length > 0 && (
    <ul aria-label="Etiquetas">
      {tags.map((tag) => <li>{tag}</li>)}
    </ul>
  )}
</article>
```

El test con el patrón anterior:

```typescript
// FakeCard.test.ts
import { describe, it, expect } from "vitest";
import { within } from "@testing-library/dom";
import { renderAstro } from "@/test/renderAstro";
import FakeCard from "./FakeCard.astro";

describe("FakeCard", () => {
  it("muestra el título en un heading de nivel 2", async () => {
    const { getByRole } = await renderAstro(FakeCard, {
      title: "Título de prueba",
    });

    expect(
      getByRole("heading", { level: 2, name: "Título de prueba" }),
    ).toBeInTheDocument();
  });

  it("no muestra descripción cuando no se pasa", async () => {
    const { queryByText } = await renderAstro(FakeCard, {
      title: "Solo título",
    });

    expect(queryByText(/descripción/i)).not.toBeInTheDocument();
  });

  it("muestra enlace con la href correcta cuando se pasa href", async () => {
    const { getByRole } = await renderAstro(FakeCard, {
      title: "Título",
      href: "/detalle",
    });

    expect(getByRole("link", { name: "Leer más" })).toHaveAttribute(
      "href",
      "/detalle",
    );
  });

  it("muestra las etiquetas en una lista accesible", async () => {
    const { getByRole } = await renderAstro(FakeCard, {
      title: "Título",
      tags: ["tag1", "tag2"],
    });

    const list = getByRole("list", { name: "Etiquetas" });
    expect(within(list).getByText("tag1")).toBeInTheDocument();
    expect(within(list).getByText("tag2")).toBeInTheDocument();
  });

  it("usa article como contenedor semántico", async () => {
    const { getByRole } = await renderAstro(FakeCard, { title: "Título" });

    expect(getByRole("article")).toBeInTheDocument();
  });
});
```

Fíjate en lo que estamos verificando:

- **`getByRole("heading", { level: 2 })`** — no `toContain('<h2')`. Verificamos que _existe un heading de nivel 2_, lo que implica que el HTML semántico es correcto.
- **`getByRole("link", { name: "Leer más" })`** — no `toContain('href')`. Verificamos que el enlace tiene un texto accesible correcto, que es lo que vería un lector de pantalla.
- **`getByRole("list", { name: "Etiquetas" })`** — verificamos que la lista tiene un `aria-label` que la identifica para usuarios de tecnologías asistivas.

---

## En la práctica: testear una página completa

Esto es donde la solución brilla de verdad. Una página `FakePage.astro` con estructura `<html>` completa:

```astro
---
import FakeCard from "./FakeCard.astro";

interface Props {
  title: string;
  cards: { title: string; description?: string }[];
}
const { title, cards } = Astro.props;
---
<html lang="es">
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

El test:

```typescript
// FakePage.test.ts
import { describe, it, expect } from "vitest";
import { within } from "@testing-library/dom";
import { renderAstro } from "@/test/renderAstro";
import FakePage from "./FakePage.astro";

describe("FakePage", () => {
  it("establece el título del documento en el <title>", async () => {
    const { document } = await renderAstro(FakePage, {
      title: "Título de prueba",
      cards: [],
    });

    expect(document.title).toBe("Título de prueba");
  });

  it("contiene una región main", async () => {
    const { getByRole } = await renderAstro(FakePage, {
      title: "Título",
      cards: [],
    });

    expect(getByRole("main")).toBeInTheDocument();
  });

  it("renderiza las cards dentro del main", async () => {
    const { getByRole } = await renderAstro(FakePage, {
      title: "Página",
      cards: [{ title: "Card 1", description: "Desc 1" }, { title: "Card 2" }],
    });

    const main = getByRole("main");
    expect(
      within(main).getByRole("heading", { name: "Card 1" }),
    ).toBeInTheDocument();
    expect(within(main).getByText("Desc 1")).toBeInTheDocument();
  });

  it("renderiza tantos articles como cards se pasan", async () => {
    const { getAllByRole } = await renderAstro(FakePage, {
      title: "Página",
      cards: [{ title: "A" }, { title: "B" }, { title: "C" }],
    });

    expect(getAllByRole("article")).toHaveLength(3);
  });
});
```

`document.title` nos da acceso al `<title>` del `<head>`, lo que era imposible con el enfoque de inyectar en `document.body`.

---

## Configuración mínima necesaria

Para que todo esto funcione solo necesitas tres dependencias (probablemente ya las tienes si usas Vitest):

```bash
npm install -D @testing-library/dom @testing-library/jest-dom jsdom
```

Y un `vitest.setup.ts` con una sola línea:

```typescript
// vitest.setup.ts
import "@testing-library/jest-dom/vitest";
```

Esto activa los matchers de jest-dom (`toBeInTheDocument`, `toHaveAttribute`, `toHaveTextContent`, etc.) en todos tus tests. Sin más.

Los tests de Astro con `renderAstro` **corren en entorno node** (el predeterminado de Vitest), por lo que no necesitas ningún directive `@vitest-environment jsdom` ni configuración especial de entorno.

---

## Comparativa: antes y después

### Antes — test de strings

```typescript
it("renderiza el título", async () => {
  const html = await renderAstroComponent(FakeCard, {
    props: { title: "Título" },
  });

  expect(html).toContain("Título");
  expect(html).toMatch(/<h2[^>]*>.*Título.*<\/h2>/s); // regex frágil
  expect(html).toContain("<article"); // no verifica semántica
});
```

### Después — test semántico

```typescript
it("renderiza el título en un heading de nivel 2", async () => {
  const { getByRole } = await renderAstro(FakeCard, { title: "Título" });

  expect(
    getByRole("heading", { level: 2, name: "Título" }),
  ).toBeInTheDocument();

  expect(getByRole("article")).toBeInTheDocument(); // verifica el rol ARIA
});
```

La segunda versión:

- Es más legible.
- Falla con mensajes de error descriptivos.
- Verifica semántica y accesibilidad, no sintaxis.
- No se rompe si cambias la estructura interna mientras el output semántico es el mismo.

---

## Limitaciones actuales

Es justo mencionar lo que este patrón **no** cubre todavía:

- **Interactividad**: `renderAstro` renderiza el HTML estático de Astro. Los componentes de islas (React, Vue, Svelte) se renderizan sin hidratación. Para testear interacciones en islas usa directamente las herramientas de cada framework (`@testing-library/react`, etc.).
- **Fetching de datos**: si tu componente hace `getCollection()` u otras llamadas a la capa de datos, necesitarás mockear esas dependencias. Eso es independiente de este patrón.
- **API en evolución**: `experimental_AstroContainer` es, como indica su nombre, experimental. La API puede cambiar en futuras versiones de Astro.

---

## Propuesta para la comunidad

La Container API de Astro es una herramienta poderosa que todavía no se usa al máximo. La barrera de entrada —el conflicto con jsdom— disuade a muchos de intentar Testing Library con componentes `.astro`.

El patrón `renderAstro` resuelve esa barrera con muy poco código. Lo que propongo como punto de partida para cualquier proyecto:

```typescript
// src/test/renderAstro.ts — cópialo y adáptalo
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

Si lo usas, si lo mejoras, o si encuentras casos donde falla, compártelo. La comunidad de Astro es activa y este tipo de utilidades mejoran con más ojos encima.

---

## Conclusión

La filosofía _"testea como usa el usuario"_ de Testing Library es aplicable a Astro. Solo había que encontrar el camino para evitar el conflicto entre esbuild y jsdom global. La clave —instanciar JSDOM localmente en lugar de asumir un entorno global— es elegante, mínima y sin efectos secundarios.

No es un workaround. Es el mismo patrón que usa React Testing Library desde su primer día. Solo que nadie lo había aplicado a `.astro`.

---

_Probado con: Astro 5.16.4 · Vitest 4.0.9 · @testing-library/dom 10.4.1 · jsdom (incluido como peer dep de Vitest)_
