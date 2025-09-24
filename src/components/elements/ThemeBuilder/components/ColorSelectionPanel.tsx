import type { Theme } from "../types";
import styles from "./ColorSelectionPanel.module.css";
import SingleColorPopover from "@/components/ui/ColorPicker/SingleColorPopover";
import DualColorPopover from "@/components/ui/ColorPicker/DualColorPopover";
import BorderColorPopover from "@/components/ui/ColorPicker/BorderColorPopover";
import { BorderRadiusPopover } from "@/components/ui/BorderRadiusPicker";
import { ShadowPopover } from "@/components/ui/ShadowPicker";

/**
 * @version 1
 * @description Componente que muestra el panel de selección de colores.
 * @param {Theme} currentTheme - El tema actual.
 * @param {function} setCurrentTheme - Función para actualizar el tema.
 * @param {"colors" | "preview" | "code"} mobileActiveTab - Tab activa en dispositivos móviles.
 */

interface ColorSelectionPanelProps {
	currentTheme: Theme;
	setCurrentTheme: React.Dispatch<React.SetStateAction<Theme>>;
	mobileActiveTab: "colors" | "preview" | "code";
}

export default function ColorSelectionPanel({
	currentTheme,
	setCurrentTheme,
	mobileActiveTab,
}: ColorSelectionPanelProps) {
	return (
		<aside
			className={`${styles.selectBox} ${mobileActiveTab === "colors" ? styles.mobileVisible : styles.mobileHidden}`}
		>
			<div className={styles.inputWithPrefix}>
				<input
					type="text"
					value={currentTheme.name}
					onChange={(e) =>
						setCurrentTheme((prev) => ({ ...prev, name: e.target.value }))
					}
					className={styles.input}
					placeholder="Nombre del tema..."
				/>
			</div>
			<input
				type="text"
				value={currentTheme.description}
				onChange={(e) =>
					setCurrentTheme((prev) => ({
						...prev,
						description: e.target.value,
					}))
				}
				placeholder="Describe tu tema..."
				className={styles.input}
			/>
			<select
				value={currentTheme.colorModePreference}
				onChange={(e) =>
					setCurrentTheme((prev) => ({
						...prev,
						colorModePreference: e.target.value as "light" | "dark" | "auto",
					}))
				}
				className={styles.select}
			>
				<option value="light">Claro</option>
				<option value="dark">Oscuro</option>
				<option value="auto">Automático</option>
			</select>
			<h4>Surfaces</h4>
			<div className={styles.colorGroup}>
				<SingleColorPopover
					name="--surface-100"
					initialColor={currentTheme.surface100}
					onChange={(color) =>
						setCurrentTheme((prev) => ({ ...prev, surface100: color }))
					}
				/>
				<SingleColorPopover
					name="--surface-200"
					initialColor={currentTheme.surface200}
					onChange={(color) =>
						setCurrentTheme((prev) => ({ ...prev, surface200: color }))
					}
				/>
				<SingleColorPopover
					name="--surface-300"
					initialColor={currentTheme.surface300}
					onChange={(color) =>
						setCurrentTheme((prev) => ({ ...prev, surface300: color }))
					}
				/>
			</div>
			<h4>Content</h4>
			<div className={styles.colorGroup}>
				<DualColorPopover
					name="--content"
					initialContentColor={currentTheme.content}
					initialSurfaceColor={currentTheme.surface200}
					onContentColorChange={(color) =>
						setCurrentTheme((prev) => ({
							...prev,
							content: color,
						}))
					}
				/>
				<DualColorPopover
					name="--emphasis"
					initialContentColor={currentTheme.emphasis}
					initialSurfaceColor={currentTheme.surface200}
					onContentColorChange={(color) =>
						setCurrentTheme((prev) => ({
							...prev,
							emphasis: color,
						}))
					}
				/>
			</div>
			<h4>Borders</h4>
			<div className={styles.colorGroup}>
				<BorderColorPopover
					name="--border"
					initialColor={currentTheme.border}
					initialSurfaceColor={currentTheme.surface200}
					onChange={(color) =>
						setCurrentTheme((prev) => ({ ...prev, border: color }))
					}
				/>
				<BorderColorPopover
					name="--border-soft"
					initialColor={currentTheme.borderSoft}
					initialSurfaceColor={currentTheme.surface200}
					onChange={(color) =>
						setCurrentTheme((prev) => ({ ...prev, borderSoft: color }))
					}
				/>
				<BorderColorPopover
					name="--focus"
					initialColor={currentTheme.focus}
					initialSurfaceColor={currentTheme.surface200}
					onChange={(color) =>
						setCurrentTheme((prev) => ({ ...prev, focus: color }))
					}
				/>
			</div>
			<h4>Gradients</h4>
			<div className={styles.colorGroup}>
				<SingleColorPopover
					name="--gradient-100"
					initialColor={currentTheme.gradient100}
					onChange={(color) =>
						setCurrentTheme((prev) => ({ ...prev, gradient100: color }))
					}
				/>
				<SingleColorPopover
					name="--gradient-200"
					initialColor={currentTheme.gradient200}
					onChange={(color) =>
						setCurrentTheme((prev) => ({ ...prev, gradient200: color }))
					}
				/>
				<SingleColorPopover
					name="--gradient-300"
					initialColor={currentTheme.gradient300}
					onChange={(color) =>
						setCurrentTheme((prev) => ({ ...prev, gradient300: color }))
					}
				/>
				<DualColorPopover
					name="--gradient-content"
					initialContentColor={currentTheme.gradientContent}
					initialSurfaceColor={currentTheme.gradient300}
					onContentColorChange={(color) =>
						setCurrentTheme((prev) => ({ ...prev, gradientContent: color }))
					}
				/>
			</div>
			<h4>Brand</h4>
			<div className={styles.colorGroup}>
				<DualColorPopover
					name="--primary & --primary-content"
					initialContentColor={currentTheme.primaryContent}
					initialSurfaceColor={currentTheme.primary}
					onContentColorChange={(color) =>
						setCurrentTheme((prev) => ({ ...prev, primaryContent: color }))
					}
					onSurfaceColorChange={(color) =>
						setCurrentTheme((prev) => ({ ...prev, primary: color }))
					}
				/>
				<DualColorPopover
					name="--accent & --accent-content"
					initialContentColor={currentTheme.accentContent}
					initialSurfaceColor={currentTheme.accent}
					onContentColorChange={(color) =>
						setCurrentTheme((prev) => ({ ...prev, accentContent: color }))
					}
					onSurfaceColorChange={(color) =>
						setCurrentTheme((prev) => ({ ...prev, accent: color }))
					}
				/>
				<DualColorPopover
					name="--neutral & --neutral-content"
					initialContentColor={currentTheme.neutralContent}
					initialSurfaceColor={currentTheme.neutral}
					onContentColorChange={(color) =>
						setCurrentTheme((prev) => ({ ...prev, neutralContent: color }))
					}
					onSurfaceColorChange={(color) =>
						setCurrentTheme((prev) => ({ ...prev, neutral: color }))
					}
				/>
			</div>
			<h4>Feedback</h4>
			<div className={styles.colorGroup}>
				<DualColorPopover
					name="--info & --info-content"
					initialContentColor={currentTheme.infoContent}
					initialSurfaceColor={currentTheme.info}
					onContentColorChange={(color) =>
						setCurrentTheme((prev) => ({ ...prev, infoContent: color }))
					}
					onSurfaceColorChange={(color) =>
						setCurrentTheme((prev) => ({ ...prev, info: color }))
					}
				/>
				<DualColorPopover
					name="--success & --success-content"
					initialContentColor={currentTheme.successContent}
					initialSurfaceColor={currentTheme.success}
					onContentColorChange={(color) =>
						setCurrentTheme((prev) => ({ ...prev, successContent: color }))
					}
					onSurfaceColorChange={(color) =>
						setCurrentTheme((prev) => ({ ...prev, success: color }))
					}
				/>

				<DualColorPopover
					name="--warning & --warning-content"
					initialContentColor={currentTheme.warningContent}
					initialSurfaceColor={currentTheme.warning}
					onContentColorChange={(color) =>
						setCurrentTheme((prev) => ({ ...prev, warningContent: color }))
					}
					onSurfaceColorChange={(color) =>
						setCurrentTheme((prev) => ({ ...prev, warning: color }))
					}
				/>
				<DualColorPopover
					name="--error & --error-content"
					initialContentColor={currentTheme.errorContent}
					initialSurfaceColor={currentTheme.error}
					onContentColorChange={(color) =>
						setCurrentTheme((prev) => ({ ...prev, errorContent: color }))
					}
					onSurfaceColorChange={(color) =>
						setCurrentTheme((prev) => ({ ...prev, error: color }))
					}
				/>
			</div>
			<h4>Border Radius</h4>
			<div className={styles.colorGroup}>
				<BorderRadiusPopover
					name="--radius-small"
					initialValue={currentTheme.radiusSmall}
					onChange={(value) =>
						setCurrentTheme((prev) => ({ ...prev, radiusSmall: value }))
					}
				/>
				<BorderRadiusPopover
					name="--radius-medium"
					initialValue={currentTheme.radiusMedium}
					onChange={(value) =>
						setCurrentTheme((prev) => ({ ...prev, radiusMedium: value }))
					}
				/>
				<BorderRadiusPopover
					name="--radius-large"
					initialValue={currentTheme.radiusLarge}
					onChange={(value) =>
						setCurrentTheme((prev) => ({ ...prev, radiusLarge: value }))
					}
				/>
			</div>
			<h4>Box Shadow</h4>
			<div className={styles.colorGroup}>
				<ShadowPopover
					name="--shadow-small"
					initialValue={currentTheme.shadowSmall}
					onChange={(value) =>
						setCurrentTheme((prev) => ({ ...prev, shadowSmall: value }))
					}
				/>
				<ShadowPopover
					name="--shadow-medium"
					initialValue={currentTheme.shadowMedium}
					onChange={(value) =>
						setCurrentTheme((prev) => ({ ...prev, shadowMedium: value }))
					}
				/>
				<ShadowPopover
					name="--shadow-large"
					initialValue={currentTheme.shadowLarge}
					onChange={(value) =>
						setCurrentTheme((prev) => ({ ...prev, shadowLarge: value }))
					}
				/>
			</div>
		</aside>
	);
}
