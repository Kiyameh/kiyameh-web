import { useState } from "react";
import HandwrittenNote from "./HandwrittenNote";
export default function HandwrittenNoteShowcase() {
	const [position, setPosition] = useState<
		"top" | "left" | "right" | "topleft" | "topright"
	>("topleft");
	return (
		<div style={{ width: "100%" }}>
			<header>
				<div
					style={{
						width: "100%",
						display: "flex",
						flexWrap: "wrap",
						gap: "1rem",
						alignItems: "center",
						justifyContent: "space-around",
						margin: "1rem 0",
					}}
				>
					<label>
						<input
							type="radio"
							name="position"
							value="topleft"
							checked={position === "topleft"}
							onChange={() => setPosition("topleft")}
						/>
						Top Left
					</label>
					<label>
						<input
							type="radio"
							name="position"
							value="top"
							checked={position === "top"}
							onChange={() => setPosition("top")}
						/>
						Top
					</label>
					<label>
						<input
							type="radio"
							name="position"
							value="topright"
							checked={position === "topright"}
							onChange={() => setPosition("topright")}
						/>
						Top Right
					</label>
					<label>
						<input
							type="radio"
							name="position"
							value="left"
							checked={position === "left"}
							onChange={() => setPosition("left")}
						/>
						Left
					</label>
					<label>
						<input
							type="radio"
							name="position"
							value="right"
							checked={position === "right"}
							onChange={() => setPosition("right")}
						/>
						Right
					</label>
				</div>
			</header>
			<div
				style={{
					width: "100%",
					display: "grid",
					gridTemplateColumns: "1fr 2fr 1fr",
					gridTemplateRows: "100px 200px",
					gap: "0.5rem",
				}}
			>
				<div>
					{position === "topleft" && (
						<HandwrittenNote text="Top left Note" position="topleft" />
					)}
				</div>
				<div>
					{position === "top" && (
						<HandwrittenNote text="Top Note" position="top" />
					)}
				</div>
				<div>
					{position === "topright" && (
						<HandwrittenNote text="Top right Note" position="topright" />
					)}
				</div>
				<div>
					{position === "left" && (
						<HandwrittenNote text="Left Note" position="left" />
					)}
				</div>
				<div>
					<div
						style={{
							width: "100%",
							height: "100%",
							display: "flex",
							alignItems: "center",
							justifyContent: "center",
							border: "3px dashed var(--border)",
							fontSize: "1.8rem",
							fontFamily: "Caveat Variable",
							textAlign: "center",
							textWrap: "wrap",
							color: "var(--border)",
							borderRadius: "var(--radius-large)",
						}}
					>
						Awsm Component
					</div>
				</div>
				<div>
					{position === "right" && (
						<HandwrittenNote text="Right Note" position="right" />
					)}
				</div>
			</div>
		</div>
	);
}
