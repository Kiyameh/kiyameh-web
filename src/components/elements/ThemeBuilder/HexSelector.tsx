import { useState, useCallback, useRef, useEffect } from "react";
import styles from "./Selector.module.css";

interface HexSelectorProps {
  onChange: (color: string) => void;
  initialColor?: string;
}

export default function HexSelector({
  onChange,
  initialColor = "#3366cc",
}: HexSelectorProps) {
  const [color, setColor] = useState(initialColor);

  const handleColorChange = useCallback(
    (color: string) => {
      setColor(color);
      onChange(color);
    },
    [onChange]
  );

  return (
    <div className={styles.panel}>
      <div>
        <label>Hex Color</label>
        <HexBox onColorChange={handleColorChange} initialColor={color} />
      </div>
    </div>
  );
}

interface HexBoxProps {
  onColorChange: (color: string) => void;
  initialColor?: string;
}

const HexBox = ({ onColorChange, initialColor }: HexBoxProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [selectedColor, setSelectedColor] = useState(initialColor || "#3366cc");
  const [baseColor, setBaseColor] = useState({ r: 51, g: 102, b: 204 });

  const rgbToHex = (r: number, g: number, b: number): string => {
    const toHex = (n: number) => {
      const hex = n.toString(16);
      return hex.length === 1 ? "0" + hex : hex;
    };
    return `#${toHex(r)}${toHex(g)}${toHex(b)}`;
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");

    if (!canvas || !ctx) return;

    const drawColorPanel = () => {
      // Lógica para dibujar el gradiente de color en el canvas
      const gradientHorizontal = ctx.createLinearGradient(
        0,
        0,
        canvas.width,
        0
      );
      gradientHorizontal.addColorStop(0, "rgb(255, 0, 0)");
      gradientHorizontal.addColorStop(0.15, "rgb(255, 255, 0)");
      gradientHorizontal.addColorStop(0.33, "rgb(0, 255, 0)");
      gradientHorizontal.addColorStop(0.49, "rgb(0, 255, 255)");
      gradientHorizontal.addColorStop(0.67, "rgb(0, 0, 255)");
      gradientHorizontal.addColorStop(0.84, "rgb(255, 0, 255)");
      gradientHorizontal.addColorStop(1, "rgb(255, 0, 0)");
      ctx.fillStyle = gradientHorizontal;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      const gradientVertical = ctx.createLinearGradient(0, 0, 0, canvas.height);
      gradientVertical.addColorStop(0, "rgba(255, 255, 255, 1)");
      gradientVertical.addColorStop(0.5, "rgba(255, 255, 255, 0)");
      gradientVertical.addColorStop(0.5, "rgba(0, 0, 0, 0)");
      gradientVertical.addColorStop(1, "rgba(0, 0, 0, 1)");
      ctx.fillStyle = gradientVertical;
      ctx.fillRect(0, 0, canvas.width, canvas.height);
    };

    const updateSelectedColor = (x: number, y: number) => {
      const imageData = ctx.getImageData(x, y, 1, 1).data;
      const r = imageData[0];
      const g = imageData[1];
      const b = imageData[2];

      // Update base color for opacity slider gradient
      setBaseColor({ r, g, b });

      // Convert RGB to HEX format
      const hexColor = rgbToHex(r, g, b);
      setSelectedColor(hexColor);
      onColorChange(hexColor);
    };

    const handleCanvasClick = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      updateSelectedColor(x, y);
    };

    drawColorPanel();
    canvas.addEventListener("click", handleCanvasClick);

    return () => {
      canvas.removeEventListener("click", handleCanvasClick);
    };
  }, [onColorChange]);

  return (
    <div className={styles.colorPickerContainer}>
      <canvas ref={canvasRef} width="250" height="150"></canvas>
    </div>
  );
};
