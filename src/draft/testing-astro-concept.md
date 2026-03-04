# Blueprint: La Guía Definitiva de Testing en Astro 🚀

**Estado del documento:** Borrador Inicial / Iteración 1
**Objetivo:** Crear la referencia estándar (actualmente inexistente) para implementar una estrategia de testing robusta en proyectos Astro.
**Audiencia:** Desarrolladores Astro intermedios/avanzados que ya conocen el framework pero sufren la falta de documentación sobre QA.

---

## 📝 Estructura de la Serie (4 Artículos)

La guía se dividirá en 4 entregas para no saturar al lector y segmentar el conocimiento por capas de abstracción.

### Artículo 1: Los Cimientos y la Configuración

**Concepto:** Preparar el terreno. Entender por qué testear Astro es diferente y configurar el entorno de desarrollo.

**Puntos Clave a tratar:**

- [ ] **El Problema:** Explicar la arquitectura de "Islas". ¿Por qué Jest no sirve aquí? Diferencia entre Server-side (build) y Client-side (hidratación).
- [ ] **La Pila Tecnológica:**
  - `Vitest`: Por su integración nativa con Vite.
  - `Playwright`: Para E2E (más ligero y rápido que Cypress para este caso).
- [ ] **Configuración Práctica:**
  - Instalación de dependencias.
  - Archivo `vitest.config.ts` (explicar la propiedad `environment`).
  - Configurar soporte de TypeScript (`tsconfig.json` para tests).
- [ ] **Hola Mundo:** Un test trivial (`1 + 1 = 2`) para confirmar que el runner funciona.

> **Instrucción de Redacción:** Mantener un tono pragmático. No perder tiempo en teoría de testing general, enfocarse en las peculiaridades de Vite/Astro.

---

### Artículo 2: Unit Testing - Domando los Componentes `.astro`

**Concepto:** El núcleo de la guía. Cómo testear archivos que no son ni JS puro ni componentes de UI estándar.

**Puntos Clave a tratar:**

- [ ] **La Revolución: `Astro Container API`:**
  - Explicar qué es y por qué cambia las reglas del juego (ya no hace falta hackear el build).
  - Ejemplo de setup del contenedor.
- [ ] **Testing de Componentes `.astro`:**
  - **Props:** Verificar que pasar `{ title: "Hola" }` renderiza `<h1>Hola</h1>`.
  - **Slots:** Testear inyección de contenido en `<slot />` y Named Slots.
  - **Renderizado condicional:** Verificar que elementos HTML aparecen o desaparecen según las props.
- [ ] **Componentes de UI (Framework Islands):**
  - Cómo testear un componente React/Vue dentro del contexto de Astro usando `testing-library`.
  - Mocking de props que vendrían del servidor Astro.
- [ ] **Testing de Layouts:**
  - Verificar inyección de metadatos (Title, OG tags).

> **Instrucción de Redacción:** Muchos ejemplos de código aquí. El lector va a copiar y pegar estos snippets. Usar la API experimental/estable `astro/container`.

---

### Artículo 3: Data-Driven Testing (Colecciones y Esquemas)

**Concepto:** Astro brilla por su manejo de contenido. Tratar el contenido como código testeable.

**Puntos Clave a tratar:**

- [ ] **Zod como herramienta de Testing:**
  - Explicar que `defineCollection` ya es una forma de test de tipos.
  - Crear tests unitarios para validaciones personalizadas de Zod (ej: validar que una fecha de post no sea futura).
- [ ] **Integridad de Datos:**
  - Testear que las referencias (`reference()`) apuntan a contenidos existentes.
  - Verificar la generación de slugs.
- [ ] **Helpers y Utils:**
  - Testear las funciones de utilidad que procesan datos (ej: formateadores de fecha, filtros de tags) que viven en la carpeta `utils/`.

> **Instrucción de Redacción:** Enfatizar que en sitios de contenido estático, un error en el Markdown rompe el build. El testing aquí previene "pantallas blancas de la muerte" en producción.

---

### Artículo 4: E2E y la Verdad en el Navegador

**Concepto:** Salir del entorno simulado y probar la web real construida.

**Puntos Clave a tratar:**

- [ ] **Playwright Setup:** Configuración básica para levantar el servidor local (`astro preview`) antes de los tests.
- [ ] **Prueba de Hidratación (Crítico):**
  - El test más importante: Verificar que una isla interactiva funciona *después* de cargar. (ej: un contador, un menú móvil).
- [ ] **Navegación y Rutas:**
  - Smoke testing: Recorrer las rutas principales y buscar status 200.
  - Verificar View Transitions (si aplica).
- [ ] **Accesibilidad (a11y):**
  - Integrar `axe-core` en Playwright para auditar el HTML generado automáticamente.

> **Instrucción de Redacción:** Cerrar la serie explicando cuándo usar E2E vs Unit. (E2E es más lento, usar con moderación para flujos críticos).

---

## 🎨 Guía de Estilo y Código

1. **Stack:** TypeScript estricto en todos los ejemplos.
2. **Tooling:** Usar `pnpm` para los comandos de instalación (o aclarar que es agnóstico).
3. **Filosofía de Ejemplo:** Usar un proyecto ficticio de "Blog con Carrito de Compras" para los ejemplos, así cubrimos contenido estático y estado dinámico.

## 🔄 Flujo de Trabajo (Para ti y la IA)

1. Seleccionar un Artículo (ej: Artículo 2).
2. Expandir los "Puntos Clave" en un esquema detallado (h2, h3).
3. Generar los snippets de código *primero* para validarlos.
4. Redactar el texto explicativo alrededor del código.
