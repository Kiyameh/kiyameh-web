import { useId } from "react";
import styles from "./ColorPicker.module.css";
import Color from "colorjs.io";

interface RgbaSelectorProps {
	onChange: (color: Color) => void;
	color: Color;
}

export default function RgbaSelector({ onChange, color }: RgbaSelectorProps) {
	const redId = useId();
	const greenId = useId();
	const blueId = useId();
	const alphaId = useId();

	return (
		<div className={styles.selectors}>
			{/* Red Slider */}
			<div>
				<label htmlFor={redId}>Red: {Math.round(color.srgb.r * 255)}</label>
				<input
					id={redId}
					type="range"
					min="0"
					max="1"
					step="0.01"
					value={color.srgb.r}
					onChange={(e) => {
						onChange(
							new Color(
								"srgb",
								[parseFloat(e.target.value), color.srgb.g, color.srgb.blue],
								color.alpha,
							),
						);
					}}
					className={styles.slider}
					style={
						{
							background: `linear-gradient(to right, 
                					rgb(0, ${color.srgb.g}, ${color.srgb.blue}), 
                					rgb(255, ${color.srgb.green}, ${color.srgb.blue}))`,
							"--thumb-color": `rgb( ${color.srgb.red * 255}, 0, 0)`,
						} as React.CSSProperties
					}
				/>
			</div>
			{/* Green Slider */}
			<div>
				<label htmlFor={greenId}>Green: {Math.round(color.srgb.g * 255)}</label>
				<input
					id={greenId}
					type="range"
					min="0"
					max="1"
					step="0.01"
					value={color.srgb.g}
					onChange={(e) => {
						onChange(
							new Color(
								"srgb",
								[color.srgb.r, parseFloat(e.target.value), color.srgb.blue],
								color.alpha,
							),
						);
					}}
					className={styles.slider}
					style={
						{
							background: `linear-gradient(to right, 	
                					rgb(${color.srgb.red}, 0, ${color.srgb.blue}), 
                					rgb(${color.srgb.red}, 255, ${color.srgb.blue}))`,
							"--thumb-color": `rgb( 0, ${color.srgb.green * 255}, 0)`,
						} as React.CSSProperties
					}
				/>
			</div>
			{/* Blue Slider */}
			<div>
				<label htmlFor={blueId}>Blue: {Math.round(color.srgb.b * 255)}</label>
				<input
					id={blueId}
					type="range"
					min="0"
					max="1"
					step="0.01"
					value={color.srgb.b}
					onChange={(e) => {
						onChange(
							new Color(
								"srgb",
								[color.srgb.r, color.srgb.g, parseFloat(e.target.value)],
								color.alpha,
							),
						);
					}}
					className={styles.slider}
					style={
						{
							background: `linear-gradient(to right, 
                					rgb(${color.srgb.red}, ${color.srgb.green}, 0), 
                					rgb(${color.srgb.red}, ${color.srgb.green}, 255))`,
							"--thumb-color": `rgb( 0, 0, ${color.srgb.blue * 255})`,
						} as React.CSSProperties
					}
				/>
			</div>
			{/* Alpha Slider */}
			<div>
				<label htmlFor={alphaId}>Alpha: {color.alpha.toFixed(2)}</label>
				<input
					id={alphaId}
					type="range"
					min="0"
					max="1"
					step="0.01"
					value={color.alpha}
					onChange={(e) => {
						let newColor = color.clone();
						newColor.alpha = parseFloat(e.target.value);
						onChange(newColor);
					}}
					className={styles.slider}
					style={
						{
							background: `linear-gradient(to right, 
											rgba(${color.srgb.red}, ${color.srgb.green}, ${color.srgb.blue}, 0), 
											rgba(${color.srgb.red}, ${color.srgb.green}, ${color.srgb.blue}, 1))`,
							"--thumb-color": `rgba(${color.srgb.red}, ${color.srgb.green}, ${color.srgb.blue}, ${color.alpha})`,
						} as React.CSSProperties
					}
				/>
			</div>
		</div>
	);
}
