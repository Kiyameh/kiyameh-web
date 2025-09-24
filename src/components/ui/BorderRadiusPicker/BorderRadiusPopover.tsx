import { useState } from "react";
import { Popover } from "../Popover/Popover";
import BorderRadiusPicker from "./BorderRadiusPicker";

/**
 * @version 1
 * @description Component for selecting a border radius opened in a popover.
 * @param name - Name of the border radius property.
 * @param initialValue - Initial border radius value.
 * @param onChange - Function to be called when the border radius changes.
 */
export default function BorderRadiusPopover({
	name,
	initialValue,
	onChange,
}: {
	name?: string;
	initialValue?: string;
	onChange?: (value: string) => void;
}) {
	const [selectedRadius, setSelectedRadius] = useState(initialValue || "8px");

	return (
		<Popover
			trigger={
				<button
					style={{
						backgroundColor: "var(--surface-200)",
						width: "40px",
						height: "40px",
						border: "2px solid var(--border)",
						borderRadius: selectedRadius,
						cursor: "pointer",
						display: "flex",
						alignItems: "center",
						justifyContent: "center",
						fontSize: "12px",
						fontWeight: "600",
						color: "var(--content)",
					}}
					title={name}
					aria-label={`Select border radius ${name}`}
				>
					R
				</button>
			}
			placement="bottom"
		>
			{() => (
				<BorderRadiusPicker
					name={name}
					value={selectedRadius}
					onChange={(value) => {
						setSelectedRadius(value);
						onChange?.(value);
					}}
				/>
			)}
		</Popover>
	);
}
