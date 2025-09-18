import { useCallback, useRef, useState, type MouseEvent } from "react";
import "./Grapper.css";

interface GrapperProps {
	variant?: "static" | "spotlight" | "sticky";
	mode?: "border" | "solid" | "ghost";
	borderWidth?: string;
	borderRadius?: string;
	children?: React.ReactNode;
}

export default function Grapper({
	variant = "static",
	mode = "border",
	borderWidth = "2px",
	borderRadius = "16px",
	children,
}: GrapperProps) {
	const [position, setPosition] = useState({ x: 0, y: 0 });
	const ref = useRef<HTMLDivElement>(null);

	const handleMouseMove = useCallback((e: MouseEvent<HTMLDivElement>) => {
		const rect = ref.current?.getBoundingClientRect();
		if (!rect) return;
		setPosition({
			x: ((e.clientX - rect.left) / rect.width) * 100,
			y: ((e.clientY - rect.top) / rect.height) * 100,
		});
	}, []);

	const cssVariables = {
		"--radius": `${borderRadius}`,
		"--inset": `${borderWidth}`,
		"--position-x": `${position.x}%`,
		"--position-y": `${position.y}%`,
	} as React.CSSProperties;

	return (
		<div
			role="none"
			ref={ref}
			onMouseMove={handleMouseMove}
			className="grapper"
			data-variant={variant}
			data-mode={mode}
			style={cssVariables}
		>
			{children}
			<div className="grapper-front" />
			<div className="grapper-back" />
		</div>
	);
}
