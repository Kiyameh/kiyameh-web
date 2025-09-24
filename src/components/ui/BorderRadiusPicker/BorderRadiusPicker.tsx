import { useState, useEffect } from "react";
import styles from "./BorderRadiusPicker.module.css";

const availableUnits = ["px", "rem"];

/**
 * @version 1
 * @description Component for border radius selection with different units.
 * @param name - Name of the border radius property.
 * @param onChange - Function to be called when the border radius changes.
 * @param value - Initial border radius value.
 */
export default function BorderRadiusPicker({
	name,
	onChange,
	value,
}: {
	name?: string;
	onChange: (value: string) => void;
	value?: string;
}) {
	const [unit, setUnit] = useState<string>("px");
	const [numericValue, setNumericValue] = useState<number>(8);

	// Parse initial value
	useEffect(() => {
		if (value) {
			const match = value.match(/^(\d+(?:\.\d+)?)(px|rem)$/);
			if (match) {
				setNumericValue(parseFloat(match[1]));
				setUnit(match[2]);
			}
		}
	}, [value]);

	const handleUnitChange = (newUnit: string) => {
		setUnit(newUnit);
		const newValue = `${numericValue}${newUnit}`;
		onChange(newValue);
	};

	const handleValueChange = (newValue: number) => {
		setNumericValue(newValue);
		const formattedValue = `${newValue}${unit}`;
		onChange(formattedValue);
	};

	const maxValue = unit === "px" ? 50 : 3;
	const step = unit === "px" ? 1 : 0.1;

	return (
		<div className={styles.container}>
			{/* Unit badges */}
			<div className={styles.units}>
				{availableUnits.map((u) => (
					<button
						type="button"
						key={u}
						className={`${styles.badge} ${unit === u ? styles.active : ""}`}
						onClick={() => handleUnitChange(u)}
					>
						{u.toUpperCase()}
					</button>
				))}
				{name && <p className={styles.propertyName}>{name}</p>}
			</div>

			{/* Border radius slider */}
			<div className={styles.sliderContainer}>
				<label htmlFor="radius-slider" className={styles.label}>
					Border Radius
				</label>
				<input
					id="radius-slider"
					type="range"
					min="0"
					max={maxValue}
					step={step}
					value={numericValue}
					onChange={(e) => handleValueChange(parseFloat(e.target.value))}
					className={styles.slider}
					style={
						{
							"--slider-progress": `${(numericValue / maxValue) * 100}%`,
						} as React.CSSProperties
					}
				/>
				<div className={styles.valueDisplay}>
					<span>0{unit}</span>
					<span className={styles.currentValue}>
						{numericValue}
						{unit}
					</span>
					<span>
						{maxValue}
						{unit}
					</span>
				</div>
			</div>

			{/* Preview rectangle */}
			<div className={styles.preview}>
				<div
					className={styles.previewShape}
					style={{
						borderRadius: `${numericValue}${unit}`,
					}}
				/>
				<p className={styles.previewLabel}>Preview</p>
			</div>
		</div>
	);
}
