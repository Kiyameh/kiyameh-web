import { useState } from "react";
import Color from "colorjs.io";
import HexSelector from "./HexSelector";
import RgbaSelector from "./RgbaSelector";
import OklchSelector from "./OklchSelector";
import HslSelector from "./HslSelector";
import styles from "./ColorPicker.module.css";

const availableModes = ["oklch", "hsl", "srgb"];

/**
 * @version 1
 * @description Component for color selection using different color models.
 * @param name - Name of the color.
 * @param onChange - Function to be called when the color changes.
 * @param value - Initial color value.
 */

export default function ColorPicker({
	name,
	onChange,
	value,
}: {
	name?: string;
	onChange: (color: string) => void;
	value?: string;
}) {
	const startColor = value
		? new Color(value)
		: new Color("oklch(0.64 0.25 8/100)");

	const [mode, setMode] = useState<string>("oklch");
	const [color, setColor] = useState<Color>(startColor);

	const handleModeChange = (newMode: string) => {
		setMode(newMode);
		const newColor = color.to(newMode);
		setColor(newColor);
		onChange(newColor.toString({ format: mode }));
	};

	const handleColorChange = (color: Color) => {
		setColor(color);
		onChange(color.toString({ format: mode }));
	};

	return (
		<div className={styles.container}>
			{/* Color Mode buttons */}
			<div className={styles.modes}>
				{availableModes.map((m) => (
					<button
						type="button"
						key={m}
						className={`${styles.badge} ${mode === m ? styles.active : ""}`}
						onClick={() => handleModeChange(m)}
					>
						{m.toUpperCase()}
					</button>
				))}
				{name && <p className={styles.colorName}>{name}</p>}
			</div>

			{/* RGB Color Sliders */}
			{mode === "srgb" && (
				<RgbaSelector onChange={handleColorChange} color={color} />
			)}

			{/* HLS Sliders */}
			{mode === "hsl" && (
				<HslSelector onChange={handleColorChange} color={color} />
			)}

			{/* OKLCH Sliders */}
			{mode === "oklch" && (
				<OklchSelector onChange={handleColorChange} color={color} />
			)}

			{/* Hex Selector */}
			<HexSelector
				onChange={(color) => handleColorChange(new Color(color).to(mode))}
				color={color.toString()}
			/>

			{/* Color Preview and Value */}
			<p className={styles.colorName}>{color.toString()}</p>
		</div>
	);
}
