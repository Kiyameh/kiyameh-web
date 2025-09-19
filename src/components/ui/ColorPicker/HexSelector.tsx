import { useState, useCallback, useRef, useEffect, useId } from "react";
import styles from "./ColorPicker.module.css";


interface HexSelectorProps {
	onChange: (color: string) => void;
	color: string;
}

export default function HexSelector({
	onChange,
	color,
}: HexSelectorProps) {
	const canvasRef = useRef<HTMLCanvasElement>(null);
	const [selectedColor, setSelectedColor] = useState<string>(color);
	const labelId = useId();

	// Optimized RGB to HEX conversion using bitwise operations
	const rgbToHex = useCallback((r: number, g: number, b: number): string => {
		return `#${((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1)}`;
	}, []);

	// Memoized color panel drawing function
	const drawColorPanel = useCallback(
		(ctx: CanvasRenderingContext2D, canvas: HTMLCanvasElement) => {
			// Create horizontal rainbow gradient
			const gradientHorizontal = ctx.createLinearGradient(
				0,
				0,
				canvas.width,
				0,
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

			// Create vertical brightness/saturation gradient
			const gradientVertical = ctx.createLinearGradient(0, 0, 0, canvas.height);
			gradientVertical.addColorStop(0, "rgba(255, 255, 255, 1)");
			gradientVertical.addColorStop(0.5, "rgba(255, 255, 255, 0)");
			gradientVertical.addColorStop(0.5, "rgba(0, 0, 0, 0)");
			gradientVertical.addColorStop(1, "rgba(0, 0, 0, 1)");

			ctx.fillStyle = gradientVertical;
			ctx.fillRect(0, 0, canvas.width, canvas.height);
		},
		[],
	);

	// Optimized color update function
	const updateSelectedColor = useCallback(
		(x: number, y: number) => {
			const canvas = canvasRef.current;
			const ctx = canvas?.getContext("2d");

			if (!canvas || !ctx) return;

			const imageData = ctx.getImageData(x, y, 1, 1).data;
			const [r, g, b] = imageData;

			const hexColor = rgbToHex(r, g, b);
			setSelectedColor(hexColor);
			onChange(hexColor);
		},
		[rgbToHex, onChange],
	);

	// Handle canvas interactions (click and drag)
	const handleCanvasInteraction = useCallback(
		(e: MouseEvent) => {
			const canvas = canvasRef.current;
			if (!canvas) return;

			const rect = canvas.getBoundingClientRect();
			const x = Math.max(0, Math.min(canvas.width - 1, e.clientX - rect.left));
			const y = Math.max(0, Math.min(canvas.height - 1, e.clientY - rect.top));

			updateSelectedColor(x, y);
		},
		[updateSelectedColor],
	);

	// Handle keyboard navigation
	const handleKeyDown = useCallback(
		(e: KeyboardEvent) => {
			if (e.key === "Enter" || e.key === " ") {
				e.preventDefault();
				const canvas = canvasRef.current;
				if (!canvas) return;

				// Select center color on keyboard activation
				updateSelectedColor(canvas.width / 2, canvas.height / 2);
			}
		},
		[updateSelectedColor],
	);

	useEffect(() => {
		const canvas = canvasRef.current;
		const ctx = canvas?.getContext("2d");

		if (!canvas || !ctx) return;

		let isMouseDown = false;

		// Draw the color panel
		drawColorPanel(ctx, canvas);

		// Event handlers
		const handleMouseDown = (e: MouseEvent) => {
			isMouseDown = true;
			handleCanvasInteraction(e);
		};

		const handleMouseMove = (e: MouseEvent) => {
			if (isMouseDown) {
				handleCanvasInteraction(e);
			}
		};

		const handleMouseUp = () => {
			isMouseDown = false;
		};

		// Add event listeners
		canvas.addEventListener("mousedown", handleMouseDown);
		canvas.addEventListener("mousemove", handleMouseMove);
		canvas.addEventListener("mouseup", handleMouseUp);
		canvas.addEventListener("keydown", handleKeyDown);

		// Cleanup
		return () => {
			canvas.removeEventListener("mousedown", handleMouseDown);
			canvas.removeEventListener("mousemove", handleMouseMove);
			canvas.removeEventListener("mouseup", handleMouseUp);
			canvas.removeEventListener("keydown", handleKeyDown);
		};
	}, [drawColorPanel, handleCanvasInteraction, handleKeyDown]);

	return (
		<div className={styles.selectors}>
			<canvas
				className={styles.canvas}
				ref={canvasRef}
				width="250"
				height="150"
				role="img"
				tabIndex={0}
				aria-labelledby={labelId}
				aria-label={`Color picker, currently selected: ${selectedColor}`}
			/>
		</div>
	);
}
