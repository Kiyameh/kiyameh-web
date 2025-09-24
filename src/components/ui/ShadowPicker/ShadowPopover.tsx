import { useState } from "react";
import { Popover } from "../Popover/Popover";
import ShadowPicker from "./ShadowPicker";

/**
 * @version 1
 * @description Component for selecting box shadow opened in a popover.
 * @param name - Name of the shadow property.
 * @param initialValue - Initial shadow value.
 * @param onChange - Function to be called when the shadow changes.
 */
export default function ShadowPopover({
	name,
	initialValue,
	onChange,
}: {
	name?: string;
	initialValue?: string;
	onChange?: (value: string) => void;
}) {
	const [selectedShadow, setSelectedShadow] = useState(
		initialValue || "0px 4px 8px rgba(0, 0, 0, 0.1)"
	);

	return (
		<Popover
			trigger={
				<button
					style={{
						backgroundColor: "var(--surface-200)",
						width: "40px",
						height: "40px",
						border: "2px solid var(--border)",
						borderRadius: "var(--radius-medium)",
						cursor: "pointer",
						display: "flex",
						alignItems: "center",
						justifyContent: "center",
						fontSize: "12px",
						fontWeight: "600",
						color: "var(--content)",
						boxShadow: selectedShadow,
					}}
					title={name}
					aria-label={`Select shadow ${name}`}
				>
					S
				</button>
			}
			placement="bottom"
		>
			{() => (
				<ShadowPicker
					name={name}
					value={selectedShadow}
					onChange={(value) => {
						setSelectedShadow(value);
						onChange?.(value);
					}}
				/>
			)}
		</Popover>
	);
}
