import { useState } from "react";
import { Popover } from "../Popover/Popover";
import ColorPicker from "./ColorPicker";

/**
 * @version 1
 * @description Component for selecting a border color opened in a popover.
 * @param name - Name of the color.
 * @param initialColor - Initial color.
 * @param initialSurfaceColor - Initial surface color.
 * @param onChange - Function to be called when the color changes.
 */
export default function BorderColorPopover({
	name,
	initialColor,
	initialSurfaceColor,
	onChange,
}: {
	name?: string;
	initialColor?: string;
	initialSurfaceColor?: string;
	onChange?: (color: string) => void;
}) {
	const [selectedColor, setSelectedColor] = useState(initialColor || "#3b82f6");

	return (
		<Popover
			trigger={
				<button
					title={name}
					style={{
						backgroundColor: initialSurfaceColor,
						width: "40px",
						height: "40px",
						border: `3px solid ${selectedColor}`,
						borderRadius: "var(--radius-medium)",
						cursor: "pointer",
					}}
					aria-label={`Select color ${name}`}
				/>
			}
			placement="bottom"
		>
			{() => (
				<ColorPicker
					name={name}
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
