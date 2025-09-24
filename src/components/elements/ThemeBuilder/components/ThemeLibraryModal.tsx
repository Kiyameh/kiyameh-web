import React, { useState } from "react";
import {
	X,
	Download,
	Upload,
	Copy,
	Trash2,
	Edit3,
	Plus,
	FileText,
} from "lucide-react";
import type { Theme } from "../types";
import type { SavedTheme } from "../hooks/useThemeLibrary";
import AuthBanner from "./AuthBanner";
import styles from "./ThemeLibraryModal.module.css";

/**
 * @version 1
 * @description Modal que muestra la biblioteca de temas guardados.
 * @param {boolean} isOpen - Si el modal está abierto.
 * @param {function} onClose - Función para cerrar el modal.
 * @param {Theme} currentTheme - El tema actual.
 * @param {function} onLoadTheme - Función para cargar un tema.
 * @param {function} onSaveCurrentTheme - Función para guardar el tema actual.
 */

interface ThemeLibraryModalProps {
	isOpen: boolean;
	onClose: () => void;
	currentTheme: Theme;
	onLoadTheme: (theme: Theme) => void;
	onSaveCurrentTheme: () => void;
	// Theme library functions
	savedThemes: SavedTheme[];
	isLoading: boolean;
	deleteTheme: (id: string) => boolean;
	duplicateTheme: (id: string) => SavedTheme | null;
	exportTheme: (id: string) => string | null;
	importTheme: (themeJson: string) => SavedTheme | null;
	clearLibrary: () => void;
}

export default function ThemeLibraryModal({
	isOpen,
	onClose,
	currentTheme,
	onLoadTheme,
	onSaveCurrentTheme,
	savedThemes,
	isLoading,
	deleteTheme,
	duplicateTheme,
	exportTheme,
	importTheme,
	clearLibrary,
}: ThemeLibraryModalProps) {
	const [searchTerm, setSearchTerm] = useState("");
	const [selectedTheme, setSelectedTheme] = useState<SavedTheme | null>(null);
	const [showImportDialog, setShowImportDialog] = useState(false);
	const [importText, setImportText] = useState("");

	if (!isOpen) return null;

	const filteredThemes = savedThemes.filter(
		(theme: SavedTheme) =>
			theme.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
			theme.description.toLowerCase().includes(searchTerm.toLowerCase()),
	);

	const handleLoadTheme = (theme: SavedTheme) => {
		const { id, createdAt, updatedAt, ...themeData } = theme;
		onLoadTheme(themeData);
		onClose();
	};

	const handleExportTheme = (id: string) => {
		const exportData = exportTheme(id);
		if (exportData) {
			const blob = new Blob([exportData], { type: "application/json" });
			const url = URL.createObjectURL(blob);
			const a = document.createElement("a");
			a.href = url;
			a.download = `theme-${savedThemes.find((t: SavedTheme) => t.id === id)?.name || "unnamed"}.json`;
			document.body.appendChild(a);
			a.click();
			document.body.removeChild(a);
			URL.revokeObjectURL(url);
		}
	};

	const handleImportTheme = () => {
		if (importText.trim()) {
			const imported = importTheme(importText);
			if (imported) {
				setImportText("");
				setShowImportDialog(false);
			} else {
				alert(
					"Error al importar el tema. Verifica que el formato sea correcto.",
				);
			}
		}
	};

	const handleDeleteTheme = (id: string) => {
		if (confirm("¿Estás seguro de que quieres eliminar este tema?")) {
			deleteTheme(id);
		}
	};

	const handleClearLibrary = () => {
		if (
			confirm(
				"¿Estás seguro de que quieres eliminar todos los temas? Esta acción no se puede deshacer.",
			)
		) {
			clearLibrary();
		}
	};

	return (
		<div className={styles.modalOverlay} onClick={onClose}>
			<div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
				{/* Header */}
				<div className={styles.modalHeader}>
					<h2 className={styles.modalTitle}>Biblioteca de Temas</h2>
					<button className={styles.closeButton} onClick={onClose}>
						<X size={20} />
					</button>
				</div>

				{/* Actions Bar */}
				<div className={styles.actionsBar}>
					{/* Auth Banner */}
					<AuthBanner />
					<div className={styles.actionButtons}>
						<button
							className={styles.actionButton}
							onClick={onSaveCurrentTheme}
							title="Guardar tema actual"
						>
							<Plus size={16} />
							Guardar Actual
						</button>

						<button
							className={styles.actionButton}
							onClick={() => setShowImportDialog(true)}
							title="Importar tema"
						>
							<Upload size={16} />
							Importar
						</button>

						{savedThemes.length > 0 && (
							<button
								className={`${styles.actionButton} ${styles.dangerButton}`}
								onClick={handleClearLibrary}
								title="Limpiar biblioteca"
							>
								<Trash2 size={16} />
								Limpiar Todo
							</button>
						)}
					</div>
				</div>

				{/* Search */}
				<div className={styles.searchContainer}>
					<input
						type="text"
						placeholder="Buscar temas..."
						value={searchTerm}
						onChange={(e) => setSearchTerm(e.target.value)}
						className={styles.searchInput}
					/>
				</div>

				{/* Content */}
				<div className={styles.modalBody}>
					{isLoading ? (
						<div className={styles.loadingState}>
							<div className={styles.spinner}></div>
							<p>Cargando temas...</p>
						</div>
					) : filteredThemes.length === 0 ? (
						<div className={styles.emptyState}>
							<FileText size={48} className={styles.emptyIcon} />
							<h3>No hay temas guardados</h3>
							<p>
								{searchTerm
									? "No se encontraron temas que coincidan con tu búsqueda."
									: "Guarda tu primer tema para comenzar tu biblioteca."}
							</p>
						</div>
					) : (
						<div className={styles.themeGrid}>
							{filteredThemes.map((theme) => (
								<div key={theme.id} className={styles.themeCard}>
									{/* Theme Preview */}
									<div
										className={styles.themePreview}
										style={
											{
												"--preview-surface": theme.surface200,
												"--preview-primary": theme.primary,
												"--preview-accent": theme.accent,
												"--preview-content": theme.content,
											} as React.CSSProperties
										}
									>
										<div className={styles.previewColors}>
											<div
												className={styles.previewColor}
												style={{ backgroundColor: theme.primary }}
											></div>
											<div
												className={styles.previewColor}
												style={{ backgroundColor: theme.accent }}
											></div>
											<div
												className={styles.previewColor}
												style={{ backgroundColor: theme.surface300 }}
											></div>
										</div>
									</div>

									{/* Theme Info */}
									<div className={styles.themeInfo}>
										<h4 className={styles.themeName}>{theme.name}</h4>
										<p className={styles.themeDescription}>
											{theme.description}
										</p>
										<div className={styles.themeMetadata}>
											<span className={styles.themeDate}>
												{new Date(theme.createdAt).toLocaleDateString()}
											</span>
											<span className={styles.themeMode}>
												{theme.colorModePreference === "light"
													? "☀️"
													: theme.colorModePreference === "dark"
														? "🌙"
														: "🔄"}
											</span>
										</div>
									</div>

									{/* Theme Actions */}
									<div className={styles.themeActions}>
										<button
											className={styles.primaryAction}
											onClick={() => handleLoadTheme(theme)}
											title="Cargar tema"
										>
											Cargar
										</button>

										<div className={styles.secondaryActions}>
											<button
												className={styles.iconButton}
												onClick={() => duplicateTheme(theme.id)}
												title="Duplicar"
											>
												<Copy size={14} />
											</button>

											<button
												className={styles.iconButton}
												onClick={() => handleExportTheme(theme.id)}
												title="Exportar"
											>
												<Download size={14} />
											</button>

											<button
												className={`${styles.iconButton} ${styles.dangerButton}`}
												onClick={() => handleDeleteTheme(theme.id)}
												title="Eliminar"
											>
												<Trash2 size={14} />
											</button>
										</div>
									</div>
								</div>
							))}
						</div>
					)}
				</div>

				{/* Import Dialog */}
				{showImportDialog && (
					<div className={styles.importDialog}>
						<div className={styles.importContent}>
							<h3>Importar Tema</h3>
							<p>Pega el JSON del tema que quieres importar:</p>
							<textarea
								value={importText}
								onChange={(e) => setImportText(e.target.value)}
								placeholder="Pega aquí el JSON del tema..."
								className={styles.importTextarea}
								rows={10}
							/>
							<div className={styles.importActions}>
								<button
									className={styles.cancelButton}
									onClick={() => {
										setShowImportDialog(false);
										setImportText("");
									}}
								>
									Cancelar
								</button>
								<button
									className={styles.importButton}
									onClick={handleImportTheme}
									disabled={!importText.trim()}
								>
									Importar
								</button>
							</div>
						</div>
					</div>
				)}
			</div>
		</div>
	);
}
