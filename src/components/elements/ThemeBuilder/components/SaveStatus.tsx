import React from "react";
import { Save, Check, X, Loader2, SaveIcon, Ellipsis } from "lucide-react";
import type { SaveStatus as SaveStatusType } from "../hooks/useAutoSave";
import styles from "./SaveStatus.module.css";

/**
 * @version 1
 * @description Componente que muestra el estado de guardado automático del tema.
 * @param {SaveStatusType} status - El estado actual del guardado.
 * @param {function} onForceSave - Función para forzar el guardado manual.
 * @param {string} themeName - Nombre del tema actual.
 */

interface SaveStatusProps {
	status: SaveStatusType;
	onForceSave?: () => void;
	themeName?: string;
	className?: string;
}

const statusConfig = {
	saved: {
		icon: SaveIcon,
		label: "Guardado",
		description: "Tema guardado automáticamente",
		className: "saved",
	},
	unsaved: {
		icon: Ellipsis,
		label: "Actualizando",
		description: "Hay cambios sin guardar",
		className: "unsaved",
	},
	saving: {
		icon: Ellipsis,
		label: "Guardando",
		description: "Guardando cambios automáticamente",
		className: "saving",
	},
	"not-tracked": {
		icon: Save,
		label: "No guardado",
		description: "Este tema no está en la biblioteca",
		className: "notTracked",
	},
} as const;

export default function SaveStatus({
	status,
	onForceSave,
	themeName,
	className = "",
}: SaveStatusProps) {
	const config = statusConfig[status];
	const IconComponent = config.icon;

	const handleClick = () => {
		if (status === "unsaved" && onForceSave) {
			onForceSave();
		}
	};

	const isClickable = status === "unsaved" && onForceSave;

	return (
		<div
			className={`${styles.saveStatus} ${styles[config.className]} ${className} ${
				isClickable ? styles.clickable : ""
			}`}
			onClick={handleClick}
			title={`${config.description}${themeName ? ` - ${themeName}` : ""}`}
		>
			<div className={styles.iconContainer}>
				<IconComponent
					size={16}
					className={`${styles.icon} ${
						status === "saving" ? styles.spinning : ""
					}`}
				/>
			</div>

			{/* Desktop label */}
			<span className={styles.label}>{config.label}</span>
		</div>
	);
}
