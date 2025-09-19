# Popover Component

Un componente de popover completo y accesible que proporciona una interfaz flotante posicionada inteligentemente cerca de un elemento activador. Ideal para menús desplegables, tooltips, selectores de color y cualquier contenido contextual.

## 📋 Tabla de Contenidos

- [Características](#-características)
- [Instalación](#-instalación)
- [Uso Básico](#-uso-básico)
- [Props](#-props)
- [Posicionamiento](#-posicionamiento)
- [Componentes](#-componentes)
- [Accesibilidad](#-accesibilidad)
- [Personalización](#-personalización)
- [Ejemplos](#-ejemplos)
- [API Reference](#-api-reference)

## ✨ Características

- 🎯 **Posicionamiento inteligente**: Algoritmo automático que evita desbordamientos
- 🖱️ **Click outside to close**: Se cierra automáticamente al hacer click fuera
- ⌨️ **Navegación por teclado**: Soporte completo para Escape
- 🔄 **Estado controlado/no controlado**: Flexible para diferentes casos de uso
- 📱 **Responsive**: Se adapta automáticamente a pantallas pequeñas
- ♿ **Accesible**: Cumple con estándares WCAG y ARIA
- 🎭 **Personalizable**: CSS modules y props de estilo
- 🚀 **Animaciones suaves**: Transiciones fluidas de entrada y salida
- 🎨 **Render props**: Soporte para función como children con callback de cierre

## 📦 Instalación

```bash
# Dependencias requeridas (ya incluidas en React)
npm install react
```

## 🚀 Uso Básico

```tsx
import { Popover } from './components/ui/Popover/Popover';

function App() {
  return (
    <Popover
      trigger={<button>Click me</button>}
      placement="bottom"
    >
      <div>
        <h3>Popover Content</h3>
        <p>This is the content inside the popover.</p>
      </div>
    </Popover>
  );
}
```

## 🔧 Props

### Popover

| Prop | Tipo | Requerido | Default | Descripción |
|------|------|-----------|---------|-------------|
| `trigger` | `ReactNode` | ✅ | - | Elemento que activa el popover al hacer click |
| `children` | `ReactNode \| ((closePopover: () => void) => ReactNode)` | ✅ | - | Contenido del popover o función render prop |
| `placement` | `'top' \| 'bottom' \| 'left' \| 'right' \| 'auto'` | ❌ | `'auto'` | Posición preferida del popover |
| `offset` | `number` | ❌ | `8` | Distancia en píxeles desde el trigger |
| `panelClassName` | `string` | ❌ | `''` | Clase CSS adicional para el panel |
| `panelStyle` | `CSSProperties` | ❌ | `{}` | Estilos inline para el panel |
| `defaultOpen` | `boolean` | ❌ | `false` | Estado inicial de apertura (no controlado) |
| `isOpen` | `boolean` | ❌ | - | Estado controlado de apertura |
| `onOpenChange` | `(isOpen: boolean) => void` | ❌ | - | Callback cuando cambia el estado de apertura |

## 📍 Posicionamiento

### Algoritmo de Posicionamiento Automático

El componente incluye un algoritmo inteligente que:

1. **Evalúa el espacio disponible** en las 4 direcciones
2. **Selecciona la mejor posición** basada en el espacio disponible
3. **Evita desbordamientos** del viewport
4. **Se reposiciona dinámicamente** en scroll y resize

### Posiciones Disponibles

- **`top`**: Panel arriba del trigger
- **`bottom`**: Panel debajo del trigger  
- **`left`**: Panel a la izquierda del trigger
- **`right`**: Panel a la derecha del trigger
- **`auto`**: Posicionamiento automático inteligente (recomendado)

### Comportamiento Responsive

```css
/* Automáticamente se ajusta en móviles */
@media (max-width: 640px) {
  .panel {
    max-width: calc(100vw - 32px);
    max-height: calc(100vh - 64px);
  }
}
```

## 🧩 Componentes

### Popover (Componente Principal)

Componente principal que maneja el estado, posicionamiento y eventos del popover.

**Características:**

- 🎯 **Trigger flexible**: Acepta cualquier ReactNode como activador
- 🔄 **Render props**: Soporte para función como children con callback de cierre
- 📱 **Posicionamiento dinámico**: Se reposiciona automáticamente
- ♿ **Accesibilidad completa**: ARIA attributes y navegación por teclado

```tsx
import { Popover } from './components/ui/Popover/Popover';

<Popover
  trigger={<button>Open Menu</button>}
  placement="bottom"
>
  {(closePopover) => (
    <div>
      <button onClick={closePopover}>Close</button>
    </div>
  )}
</Popover>
```

## ♿ Accesibilidad

### Características Implementadas

- ✅ **ARIA attributes**: `role="dialog"`, `aria-modal="false"`
- ✅ **Navegación por teclado**: Escape para cerrar
- ✅ **Click outside**: Cierre automático al hacer click fuera
- ✅ **Focus management**: Manejo adecuado del foco
- ✅ **Screen reader**: Compatible con lectores de pantalla

### Navegación por Teclado

- `Click`: Abrir/cerrar popover
- `Escape`: Cerrar popover
- `Tab`: Navegar dentro del contenido del popover

### Mejores Prácticas

```tsx
// ✅ Buena práctica: Trigger accesible
<Popover
  trigger={
    <button aria-label="Open color picker">
      🎨
    </button>
  }
>
  <ColorPicker />
</Popover>

// ✅ Buena práctica: Contenido semántico
<Popover trigger={<button>Menu</button>}>
  <nav role="menu">
    <button role="menuitem">Option 1</button>
    <button role="menuitem">Option 2</button>
  </nav>
</Popover>
```

## 🎨 Personalización

### CSS Variables Disponibles

```css
:root {
  --surface-100: #f8fafc;
  --border: #d1d5db;
  --radius-medium: 8px;
  --radius-large: 12px;
  --shadow-large: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
}
```

### Clases CSS Principales

- `.trigger`: Contenedor del elemento activador
- `.panel`: Panel principal del popover

### Personalización Avanzada

```tsx
// Estilo personalizado con className
<Popover
  trigger={<button>Custom</button>}
  panelClassName="my-custom-panel"
>
  <div>Custom content</div>
</Popover>

// Estilo personalizado con inline styles
<Popover
  trigger={<button>Custom</button>}
  panelStyle={{
    backgroundColor: '#1f2937',
    color: 'white',
    borderRadius: '16px'
  }}
>
  <div>Dark themed content</div>
</Popover>
```

## 📚 Ejemplos

### Popover Básico

```tsx
<Popover
  trigger={<button>Click me</button>}
  placement="bottom"
>
  <div style={{ padding: '16px' }}>
    <h3>Hello World!</h3>
    <p>This is a basic popover.</p>
  </div>
</Popover>
```

### Menu Desplegable con Cierre Automático

```tsx
<Popover
  trigger={<button>Open Menu</button>}
  placement="bottom"
>
  {(closePopover) => (
    <div>
      <h3>Menu Options</h3>
      <button onClick={() => {
        console.log('Option 1 selected');
        closePopover();
      }}>
        Option 1
      </button>
      <button onClick={() => {
        console.log('Option 2 selected');
        closePopover();
      }}>
        Option 2
      </button>
    </div>
  )}
</Popover>
```

### Popover Controlado

```tsx
const [isOpen, setIsOpen] = useState(false);

<div>
  <p>Popover is {isOpen ? 'open' : 'closed'}</p>
  <Popover
    trigger={<button>Toggle</button>}
    isOpen={isOpen}
    onOpenChange={setIsOpen}
  >
    <div>
      <p>Controlled popover content</p>
      <button onClick={() => setIsOpen(false)}>
        Close programmatically
      </button>
    </div>
  </Popover>
</div>
```

### Selector de Color con Popover

```tsx
const [selectedColor, setSelectedColor] = useState('#3b82f6');

<Popover
  trigger={
    <div style={{
      width: '40px',
      height: '40px',
      backgroundColor: selectedColor,
      borderRadius: '8px',
      cursor: 'pointer',
      border: '2px solid #e5e7eb'
    }} />
  }
  placement="bottom"
>
  <ColorPicker
    value={selectedColor}
    onChange={setSelectedColor}
  />
</Popover>
```

### Tooltip Informativo

```tsx
<Popover
  trigger={
    <button style={{ position: 'relative' }}>
      Help ℹ️
    </button>
  }
  placement="top"
  panelStyle={{ maxWidth: '250px' }}
>
  <div style={{ padding: '12px' }}>
    <p style={{ margin: 0, fontSize: '14px' }}>
      This is a helpful tooltip that provides additional 
      information about the feature.
    </p>
  </div>
</Popover>
```

## 📖 API Reference

### Popover (API)

```tsx
interface PopoverProps {
  trigger: ReactNode;
  children: ReactNode | ((closePopover: () => void) => ReactNode);
  panelClassName?: string;
  panelStyle?: CSSProperties;
  placement?: 'top' | 'bottom' | 'left' | 'right' | 'auto';
  offset?: number;
  defaultOpen?: boolean;
  isOpen?: boolean;
  onOpenChange?: (isOpen: boolean) => void;
}
```

### Tipos de Posicionamiento

```tsx
type Placement = 'top' | 'bottom' | 'left' | 'right' | 'auto';
```

### Render Props Pattern

```tsx
type ChildrenFunction = (closePopover: () => void) => ReactNode;
```

## 🔄 Flujo de Datos

```text
Trigger Click → Toggle State
    ↓
Position Calculation → Panel Render
    ↓
Event Listeners → Click Outside / Escape
    ↓
State Update → onOpenChange Callback
```

## 🐛 Problemas Conocidos

1. **Performance**: Los event listeners se recrean en cada render
2. **Z-index**: Puede haber conflictos con otros elementos flotantes
3. **Scroll**: En contenedores con scroll complejo puede desposicionarse

## 🚀 Mejoras Futuras

- [ ] Soporte para animaciones de entrada/salida personalizadas
- [ ] Modo tooltip con hover trigger
- [ ] Soporte para múltiples triggers
- [ ] Portal rendering opcional
- [ ] Mejores animaciones basadas en placement
- [ ] Soporte para arrow/pointer
- [ ] Debouncing de reposicionamiento
- [ ] Modo modal con backdrop

## 📄 Licencia

Este componente forma parte del proyecto kiyameh.dev.

---

**Nota**: Este componente está diseñado para ser completamente autónomo y no requiere dependencias externas más allá de React. Es perfecto para crear interfaces de usuario interactivas y accesibles.
