import { useId } from "react";
import styles from "./ColorPicker.module.css";
import Color from "colorjs.io";

interface HslSelectorProps {
	onChange: (color: Color) => void;
	color: Color;
}

export default function HslSelector({ onChange, color }: HslSelectorProps) {
	const hueId = useId();
	const saturationId = useId();
	const lightnessId = useId();
	const alphaId = useId();

	return (
		<div className={styles.selectors}>
			{/* Hue Slider */}
			<div>
				<label htmlFor={hueId}>Hue: {color.hsl.hue.toFixed(0)}°</label>
				<input
					id={hueId}
					type="range"
					min="0"
					max="360"
					step="1"
					value={color.hsl.hue}
					onChange={(e) =>
						onChange(
							new Color(
								"hsl",
								[
									parseFloat(e.target.value),
									color.hsl.saturation,
									color.hsl.lightness,
								],
								color.alpha,
							),
						)
					}
					className={styles.slider}
					style={
						{
							background: `linear-gradient(to right, 
											hsl(0, ${color.hsl.saturation}%, ${color.hsl.lightness}%),
											hsl(60, ${color.hsl.saturation}%, ${color.hsl.lightness}%),
											hsl(120, ${color.hsl.saturation}%, ${color.hsl.lightness}%),
											hsl(180, ${color.hsl.saturation}%, ${color.hsl.lightness}%),
											hsl(240, ${color.hsl.saturation}%, ${color.hsl.lightness}%),
											hsl(300, ${color.hsl.saturation}%, ${color.hsl.lightness}%),
											hsl(360, ${color.hsl.saturation}%, ${color.hsl.lightness}%))`,
							"--thumb-color": `hsl(${color.hsl.hue}, ${color.hsl.saturation}%, ${color.hsl.lightness}%)`,
						} as React.CSSProperties
					}
				/>
			</div>

			{/* Saturation Slider */}
			<div>
				<label htmlFor={saturationId}>
					Saturation: {color.hsl.saturation.toFixed(0)}%
				</label>
				<input
					id={saturationId}
					type="range"
					min="0"
					max="100"
					step="1"
					value={color.hsl.saturation}
					onChange={(e) =>
						onChange(
							new Color(
								"hsl",
								[
									color.hsl.hue,
									parseFloat(e.target.value),
									color.hsl.lightness,
								],
								color.alpha,
							),
						)
					}
					className={styles.slider}
					style={
						{
							background: `linear-gradient(to right, 
              				hsl(${color.hsl.hue}, 0%, ${color.hsl.lightness}%), 
              			  hsl(${color.hsl.hue}, 100%, ${color.hsl.lightness}%))`,
							"--thumb-color": `hsl(${color.hsl.hue}, ${color.hsl.saturation}%, ${color.hsl.lightness}%)`,
						} as React.CSSProperties
					}
				/>
			</div>

			{/* Lightness Slider */}
			<div>
				<label htmlFor={lightnessId}>
					Lightness: {color.hsl.lightness.toFixed(0)}%
				</label>
				<input
					id={lightnessId}
					type="range"
					min="0"
					max="100"
					step="1"
					value={color.hsl.lightness}
					onChange={(e) =>
						onChange(
							new Color(
								"hsl",
								[
									color.hsl.hue,
									color.hsl.saturation,
									parseFloat(e.target.value),
								],
								color.alpha,
							),
						)
					}
					className={styles.slider}
					style={
						{
							background: `linear-gradient(to right, 
														 hsl(${color.hsl.hue}, ${color.hsl.saturation}%, 0%), 
														 hsl(${color.hsl.hue}, ${color.hsl.saturation}%, 50%), 
														 hsl(${color.hsl.hue}, ${color.hsl.saturation}%, 100%))`,
							"--thumb-color": `hsl(${color.hsl.hue}, ${color.hsl.saturation}%, ${color.hsl.lightness}%)`,
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
