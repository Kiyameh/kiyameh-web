import { useState, useCallback } from "react";
import styles from "./Selector.module.css";

interface OklchColor {
  lightness: number; // 0-1
  chroma: number; // 0-0.37
  hue: number; // 0-360
  alpha: number; // 0-100
}

interface OklchSelectorProps {
  onChange: (color: string) => void;
  initialColor?: OklchColor;
}

export default function OklchSelector({
  onChange,
  initialColor = { lightness: 0.65, chroma: 0.15, hue: 180, alpha: 100 },
}: OklchSelectorProps) {
  const [color, setColor] = useState<OklchColor>(initialColor);

  const formatOklchColor = useCallback((oklchColor: OklchColor): string => {
    return `oklch(${oklchColor.lightness.toFixed(
      2
    )} ${oklchColor.chroma.toFixed(2)} ${oklchColor.hue} / ${
      oklchColor.alpha
    }%)`;
  }, []);

  const handleColorChange = useCallback(
    (property: keyof OklchColor, value: number) => {
      const newColor = { ...color, [property]: value };
      setColor(newColor);
      onChange(formatOklchColor(newColor));
    },
    [color, onChange, formatOklchColor]
  );

  const colorString = formatOklchColor(color);

  return (
    <div className={styles.panel}>
      {/* Hue Slider */}
      <div>
        <label>Hue: {color.hue.toFixed(0)}°</label>
        <input
          type="range"
          min="0"
          max="360"
          step="1"
          value={color.hue}
          onChange={(e) => handleColorChange("hue", parseInt(e.target.value))}
          className={styles.slider}
          style={
            {
              background: `linear-gradient(to right, 
                oklch(${color.lightness} ${color.chroma} 0),
                oklch(${color.lightness} ${color.chroma} 60),
                oklch(${color.lightness} ${color.chroma} 120),
                oklch(${color.lightness} ${color.chroma} 180),
                oklch(${color.lightness} ${color.chroma} 240),
                oklch(${color.lightness} ${color.chroma} 300),
                oklch(${color.lightness} ${color.chroma} 360))`,
              "--thumb-color": `oklch(${color.lightness} ${color.chroma} ${color.hue})`,
            } as React.CSSProperties
          }
        />
      </div>
      {/* Chroma Slider */}
      <div>
        <label>Chroma: {color.chroma.toFixed(2)}</label>
        <input
          type="range"
          min="0"
          max="0.37"
          step="0.01"
          value={color.chroma}
          onChange={(e) =>
            handleColorChange("chroma", parseFloat(e.target.value))
          }
          className={styles.slider}
          style={
            {
              background: `linear-gradient(to right, 
                oklch(${color.lightness} 0 ${color.hue}), 
                oklch(${color.lightness} 0.37 ${color.hue}))`,
              "--thumb-color": `oklch(${color.lightness} ${color.chroma} ${color.hue})`,
            } as React.CSSProperties
          }
        />
      </div>

      {/* Lightness Slider */}
      <div>
        <label>Lightness: {color.lightness.toFixed(2)}</label>
        <input
          type="range"
          min="0"
          max="1"
          step="0.01"
          value={color.lightness}
          onChange={(e) =>
            handleColorChange("lightness", parseFloat(e.target.value))
          }
          className={styles.slider}
          style={
            {
              background: `linear-gradient(to right, 
                oklch(0 ${color.chroma} ${color.hue}), 
                oklch(1 ${color.chroma} ${color.hue}))`,
              "--thumb-color": `oklch(${color.lightness} ${color.chroma} ${color.hue})`,
            } as React.CSSProperties
          }
        />
      </div>

      {/* Alpha Slider */}
      <div>
        <label>Alpha: {color.alpha.toFixed(0)}%</label>
        <input
          type="range"
          min="0"
          max="100"
          step="1"
          value={color.alpha}
          onChange={(e) =>
            handleColorChange("alpha", parseFloat(e.target.value))
          }
          className={styles.slider}
          style={
            {
              background: `linear-gradient(to right, 
                oklch(${color.lightness} ${color.chroma} ${color.hue} / 0%), 
                oklch(${color.lightness} ${color.chroma} ${color.hue} / 100%))`,
              "--thumb-color": `oklch(${color.lightness} ${color.chroma} ${color.hue} )`,
            } as React.CSSProperties
          }
        />
      </div>
    </div>
  );
}
