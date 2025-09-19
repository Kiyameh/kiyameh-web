import { useId } from "react";
import styles from "./ColorPicker.module.css";
import Color from "colorjs.io";

interface OklchSelectorProps {
	onChange: (color: Color) => void;
	color: Color;
}

export default function OklchSelector({ onChange, color }: OklchSelectorProps) {
	const hueId = useId();
	const chromaId = useId();
	const lightnessId = useId();
	const alphaId = useId();

	return (
		<div className={styles.selectors}>
			{/* Hue Slider */}
			<div>
				<label htmlFor={hueId}>Hue: {color.oklch.hue.toFixed(0)}°</label>
				<input
					id={hueId}
					type="range"
					min="0"
					max="360"
					step="1"
					value={color.oklch.hue}
					onChange={(e) =>
						onChange(
							new Color(
								"oklch",
								[
									color.oklch.lightness,
									color.oklch.chroma,
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
                oklch(${color.oklch.lightness} ${color.oklch.chroma} 0),
                oklch(${color.oklch.lightness} ${color.oklch.chroma} 60),
                oklch(${color.oklch.lightness} ${color.oklch.chroma} 120),
                oklch(${color.oklch.lightness} ${color.oklch.chroma} 180),
                oklch(${color.oklch.lightness} ${color.oklch.chroma} 240),
                oklch(${color.oklch.lightness} ${color.oklch.chroma} 300),
                oklch(${color.oklch.lightness} ${color.oklch.chroma} 360))`,
							"--thumb-color": `oklch(${color.oklch.lightness} ${color.oklch.chroma} ${color.oklch.hue})`,
						} as React.CSSProperties
					}
				/>
			</div>

			{/* Chroma Slider */}
			<div>
				<label htmlFor={chromaId}>
					Chroma: {color.oklch.chroma.toFixed(2)}
				</label>
				<input
					id={chromaId}
					type="range"
					min="0"
					max="0.37"
					step="0.01"
					value={color.oklch.chroma}
					onChange={(e) =>
						onChange(
							new Color(
								"oklch",
								[
									color.oklch.lightness,
									parseFloat(e.target.value),
									color.oklch.hue,
								],
								color.alpha,
							),
						)
					}
					className={styles.slider}
					style={
						{
							background: `linear-gradient(to right, 
											 oklch(${color.oklch.lightness} 0 ${color.oklch.hue}), 
											oklch(${color.oklch.lightness} 0.37 ${color.oklch.hue}))`,
							"--thumb-color": `oklch(${color.oklch.lightness} ${color.oklch.chroma} ${color.oklch.hue})`,
						} as React.CSSProperties
					}
				/>
			</div>

			{/* Lightness Slider */}
			<div>
				<label htmlFor={lightnessId}>
					Lightness: {color.oklch.lightness.toFixed(2)}
				</label>
				<input
					id={lightnessId}
					type="range"
					min="0"
					max="1"
					step="0.01"
					value={color.oklch.lightness}
					onChange={(e) =>
						onChange(
							new Color(
								"oklch",
								[
									parseFloat(e.target.value),
									color.oklch.chroma,
									color.oklch.hue,
								],
								color.alpha,
							),
						)
					}
					className={styles.slider}
					style={
						{
							background: `linear-gradient(to right, 
											oklch(0 ${color.oklch.chroma} ${color.oklch.hue}), 
											oklch(1 ${color.oklch.chroma} ${color.oklch.hue}))`,
							"--thumb-color": `oklch(${color.oklch.lightness} ${color.oklch.chroma} ${color.oklch.hue})`,
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
