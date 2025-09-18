import { useState } from "react";
import style from "./Playground.module.css";
import Grapper from "@/components/package/Grapper";
import Gradow from "@/components/package/Gradow";
import { Bell, Info, MessageCircleHeart, Palette } from "lucide-react";

export default function GradowPlayground() {
	const [variant, setVariant] = useState<"spin" | "pulse" | "sticky">("pulse");
	const [mode, setMode] = useState<"permanent" | "hover">("permanent");

	const [opacity, setOpacity] = useState<number>(0.5);
	return (
		<section className={style.section}>
			{/* Selectors */}
			<header className={style.controls}>
				<fieldset>
					<legend>Variant:</legend>
					<label>
						<input
							type="radio"
							name="gradow-variant"
							value="spin"
							checked={variant === "spin"}
							onChange={(e) => setVariant(e.target.value as typeof variant)}
						/>
						Spin
					</label>
					<label>
						<input
							type="radio"
							name="gradow-variant"
							value="pulse"
							checked={variant === "pulse"}
							onChange={(e) => setVariant(e.target.value as typeof variant)}
						/>
						Pulse
					</label>
					<label>
						<input
							type="radio"
							name="gradow-variant"
							value="sticky"
							checked={variant === "sticky"}
							onChange={(e) => setVariant(e.target.value as typeof variant)}
						/>
						Sticky
					</label>
				</fieldset>
				<fieldset>
					<legend>Mode:</legend>
					<label>
						<input
							type="radio"
							name="gradow-mode"
							value="permanent"
							checked={mode === "permanent"}
							onChange={(e) => setMode(e.target.value as typeof mode)}
						/>
						Permanent
					</label>
					<label>
						<input
							type="radio"
							name="gradow-mode"
							value="hover"
							checked={mode === "hover"}
							onChange={(e) => setMode(e.target.value as typeof mode)}
						/>
						Hover
					</label>
				</fieldset>
				<div>
					Opacity:
					<label>
						<input
							type="range"
							min={0}
							max={1}
							step={0.1}
							value={opacity}
							onChange={(e) => setOpacity(parseFloat(e.target.value))}
						/>
						<span>{opacity}</span>
					</label>
				</div>
			</header>

			{/* Showcase */}
			<main className={style.showcase}>
				<div className={style.smallItems}>
					<Gradow variant={variant} mode={mode} opacity={opacity}>
						<Grapper>
							<div className={style.chip}>
								<Palette size={16} />
								I`m a chip
							</div>
						</Grapper>
					</Gradow>
					<Gradow variant={variant} mode={mode} opacity={opacity}>
						<Grapper>
							<button type="button" className={style.button}>
								<Bell size={20} />
								I`m a button
							</button>
						</Grapper>
					</Gradow>
				</div>
				<Gradow variant={variant} mode={mode} opacity={opacity}>
					<Grapper>
						<div className={style.card}>
							<Info size={36} />
							I`m a card, with a so long text and a button inside
							<Grapper mode="solid">
								<button type="button" className={style.button}>
									<MessageCircleHeart size={24} />
									I'm button
								</button>
							</Grapper>
						</div>
					</Grapper>
				</Gradow>
			</main>
		</section>
	);
}
