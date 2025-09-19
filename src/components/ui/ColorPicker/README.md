# ColorPicker Component

Un componente de selector de color completo y accesible que soporta múltiples espacios de color (OKLCH, HSL, sRGB) con una interfaz visual intuitiva.

## 📋 Tabla de Contenidos

- [Características](#-características)
- [Instalación](#-instalación)
- [Uso Básico](#-uso-básico)
- [Props](#-props)
- [Espacios de Color Soportados](#-espacios-de-color-soportados)
- [Componentes](#-componentes)
- [Accesibilidad](#-accesibilidad)
- [Personalización](#-personalización)
- [Ejemplos](#-ejemplos)
- [API Reference](#-api-reference)

## ✨ Características

- 🎨 **Múltiples espacios de color**: OKLCH, HSL, sRGB
- 🖱️ **Selector visual interactivo**: Canvas con gradientes de color
- ⌨️ **Navegación por teclado**: Completamente accesible
- 🎯 **Sliders precisos**: Control granular de cada canal de color
- 📱 **Responsive**: Se adapta a diferentes tamaños de pantalla
- ♿ **Accesible**: Cumple con estándares WCAG
- 🔄 **Conversión automática**: Entre diferentes espacios de color
- 🎭 **Personalizable**: CSS modules para fácil customización

## 📦 Instalación

```bash
# Dependencias requeridas
npm install colorjs.io
```

## 🚀 Uso Básico

```tsx
import ColorPicker from './components/ui/ColorPicker/ColorPicker';

function App() {
  const handleColorChange = (color: string) => {
    console.log('Color seleccionado:', color);
  };

  return (
    <ColorPicker 
      onChange={handleColorChange}
      initialColor="oklch(0.64 0.25 8)"
    />
  );
}
```

## 🔧 Props

### ColorPicker

| Prop | Tipo | Requerido | Default | Descripción |
|------|------|-----------|---------|-------------|
| `onChange` | `(color: string) => void` | ✅ | - | Callback que se ejecuta cuando el color cambia |
| `value` | `string` | ❌ | `"oklch(0.64 0.25 8/100)"` | Color actual del picker |

### SingleColorPopover

| Prop | Tipo | Requerido | Default | Descripción |
|------|------|-----------|---------|-------------|
| `initialColor` | `string` | ❌ | `"#3b82f6"` | Color inicial del popover |
| `onChange` | `(color: string) => void` | ❌ | - | Callback que se ejecuta cuando el color cambia |

### DualColorPopover

| Prop | Tipo | Requerido | Default | Descripción |
|------|------|-----------|---------|-------------|
| `initialSurfaceColor` | `string` | ❌ | `"#ffffff"` | Color inicial de superficie |
| `initialContentColor` | `string` | ❌ | `"#000000"` | Color inicial de contenido |
| `onSurfaceColorChange` | `(color: string) => void` | ❌ | - | Callback específico para cambios en color de superficie |
| `onContentColorChange` | `(color: string) => void` | ❌ | - | Callback específico para cambios en color de contenido |
| `onChange` | `(colors: {surfaceColor: string, contentColor: string}) => void` | ❌ | - | Callback que recibe ambos colores |

## 🎨 Espacios de Color Soportados

### OKLCH (Recomendado)

- **L**: Lightness (0-1) - Luminosidad
- **C**: Chroma (0-0.37) - Saturación
- **H**: Hue (0-360°) - Matiz
- **A**: Alpha (0-1) - Transparencia

```css
oklch(0.64 0.25 8 / 1)
```

### HSL

- **H**: Hue (0-360°) - Matiz
- **S**: Saturation (0-100%) - Saturación  
- **L**: Lightness (0-100%) - Luminosidad
- **A**: Alpha (0-1) - Transparencia

```css
hsl(8, 25%, 64%)
```

### sRGB

- **R**: Red (0-255) - Rojo
- **G**: Green (0-255) - Verde
- **B**: Blue (0-255) - Azul
- **A**: Alpha (0-1) - Transparencia

```css
rgb(255, 128, 64)
```

## 🧩 Componentes

### ColorPicker (Componente Principal)

Componente principal que orquesta todos los selectores y maneja el estado global.

### SingleColorPopover (Selector de un color)

Componente que combina el ColorPicker con un Popover para una experiencia de selección de color compacta.

**Características:**

- 🎯 **Trigger visual**: Botón que muestra el color seleccionado
- 🚀 **Popover integrado**: Se abre al hacer click, se cierra automáticamente
- 🎨 **ColorPicker completo**: Acceso a todos los modos de color
- ♿ **Accesible**: Labels y navegación por teclado

```tsx
import SingleColorPopover from './components/ui/ColorPicker/SingleColorPopover';

<SingleColorPopover
  initialColor="#3b82f6"
  onChange={(color) => console.log('Color:', color)}
/>
```

### DualColorPopover (Selector de dos colores)

Componente avanzado para seleccionar dos colores relacionados (superficie y contenido) con preview en tiempo real.

**Características:**

- 🎨 **Doble selección**: Surface color y content color
- 👁️ **Preview visual**: Muestra la letra "A" con los colores aplicados
- 🔄 **Tabs dinámicos**: Alterna entre selectores de superficie y contenido
- 🎯 **Callbacks específicos**: Eventos separados para cada color
- 📱 **Responsive**: Interfaz adaptable y moderna

```tsx
import DualColorPopover from './components/ui/ColorPicker/DualColorPopover';

<DualColorPopover
  initialSurfaceColor="#ffffff"
  initialContentColor="#000000"
  onChange={({ surfaceColor, contentColor }) => {
    console.log('Surface:', surfaceColor);
    console.log('Content:', contentColor);
  }}
/>
```

### HexSelector

Selector visual interactivo con canvas que permite seleccionar colores mediante:

- **Click**: Selección directa
- **Drag**: Selección continua
- **Teclado**: Enter/Espacio para seleccionar centro

### RgbaSelector

Sliders para controlar los canales RGB + Alpha con:

- Gradientes visuales dinámicos
- Valores numéricos en tiempo real
- Thumbs coloreados según el canal

### HslSelector  

Sliders para el espacio de color HSL con:

- Gradiente de matiz completo (0-360°)
- Saturación y luminosidad contextuales
- Visualización en porcentajes

### OklchSelector

Sliders para el moderno espacio OKLCH con:

- Gradiente de matiz perceptualmente uniforme
- Control preciso de croma y luminosidad
- Mejor representación de colores

## ♿ Accesibilidad

### Características Implementadas

- ✅ **IDs únicos**: Usando `useId()` para evitar conflictos
- ✅ **Labels asociados**: Todos los inputs tienen labels correctos
- ✅ **Navegación por teclado**: Tab, Enter, Espacio
- ✅ **ARIA attributes**: `role`, `aria-labelledby`, `aria-label`
- ✅ **Focus management**: Indicadores visuales claros

### Navegación por Teclado

- `Tab`: Navegar entre elementos
- `Enter/Espacio`: Activar selector de canvas
- `Flechas`: Ajustar valores de sliders
- `Escape`: Salir del modo de edición

## 🎨 Personalización

### CSS Variables Disponibles

```css
:root {
  --border-soft: #e5e7eb;
  --border: #d1d5db;
  --primary: #3b82f6;
  --surface-100: #f8fafc;
  --surface-300: #cbd5e1;
  --content: #1f2937;
  --font-mono: 'Monaco', 'Menlo', monospace;
  --radius-medium: 8px;
  --radius-large: 12px;
}
```

### Clases CSS Principales

- `.container`: Contenedor principal
- `.modes`: Botones de modo de color
- `.badge`: Estilo de badges de modo
- `.panel`: Panel de controles
- `.slider`: Sliders de color
- `.colorPreview`: Vista previa del color
- `.hexSelectorContainer`: Contenedor del canvas

## 📚 Ejemplos

### ColorPicker - Ejemplo con Color Inicial

```tsx
<ColorPicker 
  onChange={(color) => setBackgroundColor(color)}
  value="#ff6b35"
/>
```

### SingleColorPopover - Selector Compacto

```tsx
const [selectedColor, setSelectedColor] = useState('#3b82f6');

<SingleColorPopover
  initialColor={selectedColor}
  onChange={(color) => {
    setSelectedColor(color);
    // Aplicar color inmediatamente
    document.body.style.backgroundColor = color;
  }}
/>
```

### DualColorPopover - Theme Builder

```tsx
const [theme, setTheme] = useState({
  surface: '#ffffff',
  content: '#1a1a1a'
});

<DualColorPopover
  initialSurfaceColor={theme.surface}
  initialContentColor={theme.content}
  onChange={({ surfaceColor, contentColor }) => {
    setTheme({ surface: surfaceColor, content: contentColor });
    
    // Aplicar tema a CSS variables
    document.documentElement.style.setProperty('--surface', surfaceColor);
    document.documentElement.style.setProperty('--content', contentColor);
  }}
  onSurfaceColorChange={(color) => {
    console.log('Surface color changed:', color);
  }}
  onContentColorChange={(color) => {
    console.log('Content color changed:', color);
  }}
/>
```

### Ejemplo con Callback Complejo

```tsx
const handleColorChange = (color: string) => {
  // Guardar en localStorage
  localStorage.setItem('selectedColor', color);
  
  // Actualizar tema
  document.documentElement.style.setProperty('--theme-color', color);
  
  // Callback personalizado
  onColorUpdate?.(color);
};

<ColorPicker onChange={handleColorChange} />
```

### Ejemplo con Validación

```tsx
const [color, setColor] = useState('#000000');
const [isValid, setIsValid] = useState(true);

const validateAndSetColor = (newColor: string) => {
  try {
    new Color(newColor);
    setColor(newColor);
    setIsValid(true);
  } catch {
    setIsValid(false);
  }
};

<ColorPicker 
  onChange={validateAndSetColor}
  initialColor={color}
/>
{!isValid && <p>Color inválido</p>}
```

## 📖 API Reference

### ColorPicker (API)

```tsx
interface ColorPickerProps {
  onChange: (color: string) => void;
  value?: string;
}
```

### SingleColorPopover (API)

```tsx
interface SingleColorPopoverProps {
  initialColor?: string;
  onChange?: (color: string) => void;
}
```

### DualColorPopover (API)

```tsx
interface DualColorPopoverProps {
  initialSurfaceColor?: string;
  initialContentColor?: string;
  onSurfaceColorChange?: (color: string) => void;
  onContentColorChange?: (color: string) => void;
  onChange?: (colors: { surfaceColor: string; contentColor: string }) => void;
}
```

### Selectores Internos (API)

```tsx
interface SelectorProps {
  onChange: (color: Color) => void;
  color: Color;
}
```

### HexSelector (API)

```tsx
interface HexSelectorProps {
  onChange: (color: string) => void;
  color: string;
}
```

## 🔄 Flujo de Datos

``` text
ColorPicker (estado principal)
    ↓
Mode Selection → Color Conversion
    ↓
Selector Components → Color Updates
    ↓
onChange Callback → External State
```

## 🐛 Problemas Conocidos

1. **Performance**: Los gradientes se recalculan en cada render
2. **Consistencia**: Algunas propiedades de color usan nombres diferentes
3. **Memory**: Event listeners se recrean frecuentemente

## 🚀 Mejoras Futuras

- [ ] Memoización de gradientes
- [ ] Componente AlphaSlider reutilizable  
- [ ] Debouncing de onChange
- [ ] Preset de colores populares
- [ ] Historial de colores recientes
- [ ] Modo de contraste alto
- [ ] Soporte para más espacios de color (LAB, XYZ)

## 📄 Licencia

Este componente forma parte del proyecto kiyameh.dev.

---

**Nota**: Este componente utiliza la librería [colorjs.io](https://colorjs.io/) para las conversiones de color y cálculos precisos entre espacios de color.
