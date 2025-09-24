import { useState, useEffect } from "react";
import ColorPicker from "../ColorPicker/ColorPicker";
import styles from "./ShadowPicker.module.css";

interface ShadowValues {
	x: number;
	y: number;
	blur: number;
	spread: number;
	color: string;
	inset: boolean;
}

/**
 * @version 1
 * @description Component for shadow selection with different parameters.
 * @param name - Name of the shadow property.
 * @param onChange - Function to be called when the shadow changes.
 * @param value - Initial shadow value.
 */
export default function ShadowPicker({
	name,
	onChange,
	value,
}: {
	name?: string;
	onChange: (value: string) => void;
	value?: string;
}) {
	const [activeTab, setActiveTab] = useState<"values" | "color">("values");
	const [shadowValues, setShadowValues] = useState<ShadowValues>({
		x: 0,
		y: 4,
		blur: 8,
		spread: 0,
		color: "rgba(0, 0, 0, 0.1)",
		inset: false,
	});

	// Parse initial shadow value
	useEffect(() => {
		if (value) {
			const parsedShadow = parseShadowValue(value);
			if (parsedShadow) {
				setShadowValues(parsedShadow);
			}
		}
	}, [value]);

	// Generate shadow string and call onChange
	useEffect(() => {
		const shadowString = generateShadowString(shadowValues);
		onChange(shadowString);
	}, [shadowValues, onChange]);

	const parseShadowValue = (shadowStr: string): ShadowValues | null => {
		try {
			const isInset = shadowStr.includes("inset");
			const cleanStr = shadowStr.replace("inset", "").trim();

			// Match pattern: x y blur spread color
			const match = cleanStr.match(
				/(-?\d+(?:\.\d+)?px)\s+(-?\d+(?:\.\d+)?px)\s+(-?\d+(?:\.\d+)?px)(?:\s+(-?\d+(?:\.\d+)?px))?\s+(.+)/,
			);

			if (match) {
				return {
					x: parseFloat(match[1]),
					y: parseFloat(match[2]),
					blur: parseFloat(match[3]),
					spread: match[4] ? parseFloat(match[4]) : 0,
					color: match[5].trim(),
					inset: isInset,
				};
			}
		} catch (error) {
			console.warn("Failed to parse shadow value:", error);
		}
		return null;
	};

	const generateShadowString = (values: ShadowValues): string => {
		const { x, y, blur, spread, color, inset } = values;
		const insetStr = inset ? "inset " : "";
		const spreadStr = spread !== 0 ? ` ${spread}px` : "";
		return `${insetStr}${x}px ${y}px ${blur}px${spreadStr} ${color}`;
	};

	const updateShadowValue = (key: keyof ShadowValues, newValue: any) => {
		setShadowValues((prev) => ({
			...prev,
			[key]: newValue,
		}));
	};

	return (
		<div className={styles.container}>
			{/* Tab Navigation */}
			{name && <p className={styles.propertyName}>{name}</p>}
			<div className={styles.tabNavigation}>
				<button
					onClick={() => setActiveTab("values")}
					className={`${styles.tabButton} ${
						activeTab === "values" ? styles.activeTab : ""
					}`}
				>
					Values
				</button>
				<button
					onClick={() => setActiveTab("color")}
					className={`${styles.tabButton} ${
						activeTab === "color" ? styles.activeTab : ""
					}`}
				>
					Color
				</button>
			</div>

			{/* Values Tab */}
			{activeTab === "values" && (
				<div className={styles.valuesTab}>
					{/* Shadow Type Toggle */}
					<div className={styles.shadowType}>
						<label className={styles.toggleLabel}>
							<input
								type="checkbox"
								checked={shadowValues.inset}
								onChange={(e) => updateShadowValue("inset", e.target.checked)}
								className={styles.checkbox}
							/>
							<span className={styles.toggleText}>
								{shadowValues.inset ? "Inner Shadow" : "Outer Shadow"}
							</span>
						</label>
					</div>

					{/* X Offset */}
					<div className={styles.sliderGroup}>
						<label className={styles.sliderLabel}>
							X Offset: {shadowValues.x}px
						</label>
						<input
							type="range"
							min="-50"
							max="50"
							step="1"
							value={shadowValues.x}
							onChange={(e) => updateShadowValue("x", parseInt(e.target.value))}
							className={styles.slider}
							style={
								{
									"--slider-progress": `${((shadowValues.x + 50) / 100) * 100}%`,
								} as React.CSSProperties
							}
						/>
					</div>

					{/* Y Offset */}
					<div className={styles.sliderGroup}>
						<label className={styles.sliderLabel}>
							Y Offset: {shadowValues.y}px
						</label>
						<input
							type="range"
							min="-50"
							max="50"
							step="1"
							value={shadowValues.y}
							onChange={(e) => updateShadowValue("y", parseInt(e.target.value))}
							className={styles.slider}
							style={
								{
									"--slider-progress": `${((shadowValues.y + 50) / 100) * 100}%`,
								} as React.CSSProperties
							}
						/>
					</div>

					{/* Blur Radius */}
					<div className={styles.sliderGroup}>
						<label className={styles.sliderLabel}>
							Blur: {shadowValues.blur}px
						</label>
						<input
							type="range"
							min="0"
							max="50"
							step="1"
							value={shadowValues.blur}
							onChange={(e) =>
								updateShadowValue("blur", parseInt(e.target.value))
							}
							className={styles.slider}
							style={
								{
									"--slider-progress": `${(shadowValues.blur / 50) * 100}%`,
								} as React.CSSProperties
							}
						/>
					</div>

					{/* Spread Radius */}
					<div className={styles.sliderGroup}>
						<label className={styles.sliderLabel}>
							Spread: {shadowValues.spread}px
						</label>
						<input
							type="range"
							min="-20"
							max="20"
							step="1"
							value={shadowValues.spread}
							onChange={(e) =>
								updateShadowValue("spread", parseInt(e.target.value))
							}
							className={styles.slider}
							style={
								{
									"--slider-progress": `${((shadowValues.spread + 20) / 40) * 100}%`,
								} as React.CSSProperties
							}
						/>
					</div>

					{/* Preview */}
					<div className={styles.preview}>
						<div
							className={styles.previewShape}
							style={{
								boxShadow: generateShadowString(shadowValues),
							}}
						/>
						<p className={styles.previewLabel}>Preview</p>
					</div>

					{/* Current value display */}
					<p className={styles.valueOutput}>
						{generateShadowString(shadowValues)}
					</p>
				</div>
			)}

			{/* Color Tab */}
			{activeTab === "color" && (
				<div className={styles.colorTab}>
					<ColorPicker
						name="Shadow Color"
						value={shadowValues.color}
						onChange={(color) => updateShadowValue("color", color)}
					/>
				</div>
			)}
		</div>
	);
}
