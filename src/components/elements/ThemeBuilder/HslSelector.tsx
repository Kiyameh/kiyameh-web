import { useState, useCallback } from "react";
import styles from "./Selector.module.css";

interface HslColor {
  hue: number; // 0-360
  saturation: number; // 0-100
  lightness: number; // 0-100
}

interface HslSelectorProps {
  onChange: (color: string) => void;
  initialColor?: HslColor;
}

export default function HslSelector({
  onChange,
  initialColor = { hue: 210, saturation: 60, lightness: 50 },
}: HslSelectorProps) {
  const [color, setColor] = useState<HslColor>(initialColor);

  const formatHslColor = useCallback((hslColor: HslColor): string => {
    return `hsl(${hslColor.hue}, ${hslColor.saturation}%, ${hslColor.lightness}%)`;
  }, []);

  const handleColorChange = useCallback(
    (property: keyof HslColor, value: number) => {
      const newColor = { ...color, [property]: value };
      setColor(newColor);
      onChange(formatHslColor(newColor));
    },
    [color, onChange, formatHslColor]
  );

  return (
    <div className={styles.panel}>
      {/* Hue Slider */}
      <div>
        <label>Hue: {color.hue}°</label>
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
                hsl(0, ${color.saturation}%, ${color.lightness}%),
                hsl(60, ${color.saturation}%, ${color.lightness}%),
                hsl(120, ${color.saturation}%, ${color.lightness}%),
                hsl(180, ${color.saturation}%, ${color.lightness}%),
                hsl(240, ${color.saturation}%, ${color.lightness}%),
                hsl(300, ${color.saturation}%, ${color.lightness}%),
                hsl(360, ${color.saturation}%, ${color.lightness}%))`,
              "--thumb-color": `hsl(${color.hue}, ${color.saturation}%, ${color.lightness}%)`,
            } as React.CSSProperties
          }
        />
      </div>

      {/* Saturation Slider */}
      <div>
        <label>Saturation: {color.saturation}%</label>
        <input
          type="range"
          min="0"
          max="100"
          step="1"
          value={color.saturation}
          onChange={(e) =>
            handleColorChange("saturation", parseInt(e.target.value))
          }
          className={styles.slider}
          style={
            {
              background: `linear-gradient(to right, 
                hsl(${color.hue}, 0%, ${color.lightness}%), 
                hsl(${color.hue}, 100%, ${color.lightness}%))`,
              "--thumb-color": `hsl(${color.hue}, ${color.saturation}%, ${color.lightness}%)`,
            } as React.CSSProperties
          }
        />
      </div>

      {/* Lightness Slider */}
      <div>
        <label>Lightness: {color.lightness}%</label>
        <input
          type="range"
          min="0"
          max="100"
          step="1"
          value={color.lightness}
          onChange={(e) =>
            handleColorChange("lightness", parseInt(e.target.value))
          }
          className={styles.slider}
          style={
            {
              background: `linear-gradient(to right, 
                hsl(${color.hue}, ${color.saturation}%, 0%), 
                hsl(${color.hue}, ${color.saturation}%, 50%), 
                hsl(${color.hue}, ${color.saturation}%, 100%))`,
              "--thumb-color": `hsl(${color.hue}, ${color.saturation}%, ${color.lightness}%)`,
            } as React.CSSProperties
          }
        />
      </div>
    </div>
  );
}
