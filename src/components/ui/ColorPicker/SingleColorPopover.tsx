import { useState } from "react";
import { Popover } from "../Popover/Popover";
import ColorPicker from "./ColorPicker";

/**
 * @version 1
 * @description Component for selecting a single color opened in a popover.
 * @param initialColor - Initial color.
 * @param onChange - Function to be called when the color changes.
 */
export default function SingleColorPopover({
	initialColor,
	onChange,
}: {
	initialColor?: string;
	onChange?: (color: string) => void;
}) {
	const [selectedColor, setSelectedColor] = useState(initialColor || "#3b82f6");

	return (
		<Popover
			trigger={
				<button
					style={{
						backgroundColor: selectedColor,
						width: "40px",
						height: "40px",
						border: "2px solid var(--content)",
						borderRadius: "var(--radius-medium)",
						cursor: "pointer",
					}}
					aria-label="Select color"
				/>
			}
			placement="bottom"
		>
			{() => (
				<ColorPicker
					value={selectedColor}
					onChange={(color) => {
						setSelectedColor(color);
						onChange?.(color);
					}}
				/>
			)}
		</Popover>
	);
}
