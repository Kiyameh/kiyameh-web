import { useState } from "react";
import styles from "./ColorPicker.module.css";
import OklchSelector from "./OklchSelector";
import HexSelector from "./HexSelector";
import HslSelector from "./HslSelector";
import RgbaSelector from "./RgbaSelector";

type ColorMode = "hex" | "rgba" | "hsl" | "oklch";

interface ColorPickerProps {
	onChange: (color: string) => void;
}

export default function ColorPicker({ onChange }: ColorPickerProps) {
	const [open, setOpen] = useState(true);
	const [mode, setMode] = useState<ColorMode>("hex");
	const [color, setColor] = useState("oklch(0.65 0.15 180 / 100%)");

	const handleColorChange = (color: string) => {
		setColor(color);
		onChange(color);
	};

	const handleModeChange = (newMode: ColorMode) => {
		setMode(newMode);
		// Set default color for each mode
		switch (newMode) {
			case "hex":
				handleColorChange("#3366cc");
				break;
			case "rgba":
				handleColorChange("rgba(51, 102, 204, 1.00)");
				break;
			case "hsl":
				handleColorChange("hsl(210, 60%, 50%)");
				break;
			case "oklch":
				handleColorChange("oklch(0.65 0.15 180 / 100%)");
				break;
		}
	};

	return (
		<div className={styles.container}>
			<button
				type="button"
				className={styles.addButton}
				onClick={() => setOpen(!open)}
			>
				+
			</button>

			{open && (
				<div className={styles.popup}>
					<div className={styles.modes}>
						{(["hex", "rgba", "hsl", "oklch"] as ColorMode[]).map((m) => (
							<button
								type="button"
								key={m}
								className={`${styles.badge} ${mode === m ? styles.active : ""}`}
								onClick={() => handleModeChange(m)}
							>
								{m.toUpperCase()}
							</button>
						))}
					</div>

					{mode === "hex" && <HexSelector onChange={handleColorChange} />}
					{mode === "rgba" && <RgbaSelector onChange={handleColorChange} />}
					{mode === "hsl" && <HslSelector onChange={handleColorChange} />}
					{mode === "oklch" && <OklchSelector onChange={handleColorChange} />}

					{/* Color Preview and Value */}
					<div className={styles.colorPreview}>
						<div
							className={styles.colorBox}
							style={{
								backgroundColor: color,
							}}
						/>
						<input
							className={styles.colorName}
							type="text"
							value={color}
							onChange={(e) => handleColorChange(e.target.value)}
						/>
					</div>
				</div>
			)}
		</div>
	);
}
