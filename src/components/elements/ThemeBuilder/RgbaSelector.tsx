import { useState, useCallback } from "react";
import styles from "./Selector.module.css";

interface RgbaColor {
  red: number; // 0-255
  green: number; // 0-255
  blue: number; // 0-255
  alpha: number; // 0-100
}

interface RgbaSelectorProps {
  onChange: (color: string) => void;
  initialColor?: RgbaColor;
}

export default function RgbaSelector({
  onChange,
  initialColor = { red: 51, green: 102, blue: 204, alpha: 100 },
}: RgbaSelectorProps) {
  const [color, setColor] = useState<RgbaColor>(initialColor);

  const formatRgbaColor = useCallback((rgbaColor: RgbaColor): string => {
    return `rgba(${rgbaColor.red}, ${rgbaColor.green}, ${rgbaColor.blue}, ${(
      rgbaColor.alpha / 100
    ).toFixed(2)})`;
  }, []);

  const handleColorChange = useCallback(
    (property: keyof RgbaColor, value: number) => {
      const newColor = { ...color, [property]: value };
      setColor(newColor);
      onChange(formatRgbaColor(newColor));
    },
    [color, onChange, formatRgbaColor]
  );

  return (
    <div className={styles.panel}>
      {/* Red Slider */}
      <div>
        <label>Red: {color.red}</label>
        <input
          type="range"
          min="0"
          max="255"
          step="1"
          value={color.red}
          onChange={(e) => handleColorChange("red", parseInt(e.target.value))}
          className={styles.slider}
          style={
            {
              background: `linear-gradient(to right, 
                rgb(0, ${color.green}, ${color.blue}), 
                rgb(255, ${color.green}, ${color.blue}))`,
              "--thumb-color": `rgb(${color.red}, ${color.green}, ${color.blue})`,
            } as React.CSSProperties
          }
        />
      </div>

      {/* Green Slider */}
      <div>
        <label>Green: {color.green}</label>
        <input
          type="range"
          min="0"
          max="255"
          step="1"
          value={color.green}
          onChange={(e) => handleColorChange("green", parseInt(e.target.value))}
          className={styles.slider}
          style={
            {
              background: `linear-gradient(to right, 
                rgb(${color.red}, 0, ${color.blue}), 
                rgb(${color.red}, 255, ${color.blue}))`,
              "--thumb-color": `rgb(${color.red}, ${color.green}, ${color.blue})`,
            } as React.CSSProperties
          }
        />
      </div>

      {/* Blue Slider */}
      <div>
        <label>Blue: {color.blue}</label>
        <input
          type="range"
          min="0"
          max="255"
          step="1"
          value={color.blue}
          onChange={(e) => handleColorChange("blue", parseInt(e.target.value))}
          className={styles.slider}
          style={
            {
              background: `linear-gradient(to right, 
                rgb(${color.red}, ${color.green}, 0), 
                rgb(${color.red}, ${color.green}, 255))`,
              "--thumb-color": `rgba(${color.red}, ${color.green}, ${color.blue})`,
            } as React.CSSProperties
          }
        />
      </div>

      {/* Alpha Slider */}
      <div>
        <label>Alpha: {color.alpha}%</label>
        <input
          type="range"
          min="0"
          max="100"
          step="1"
          value={color.alpha}
          onChange={(e) => handleColorChange("alpha", parseInt(e.target.value))}
          className={styles.slider}
          style={
            {
              background: `linear-gradient(to right, 
                rgba(${color.red}, ${color.green}, ${color.blue}, 0), 
                rgba(${color.red}, ${color.green}, ${color.blue}, 1))`,
              "--thumb-color": `rgba(${color.red}, ${color.green}, ${
                color.blue
              }, ${color.alpha / 100})`,
            } as React.CSSProperties
          }
        />
      </div>
    </div>
  );
}
