import { Palette, BookOpen } from "lucide-react";
import styles from "./ThemeBuilderApp.module.css";
import { useThemeBuilder } from "./hooks/useThemeBuilder";
import { useThemeLibrary } from "./hooks/useThemeLibrary";
import { useAutoSave } from "./hooks/useAutoSave";
import ColorSelectionPanel from "./components/ColorSelectionPanel";
import PreviewPanel from "./components/PreviewPanel";
import CodePanel from "./components/CodePanel";
import ThemeLibraryModal from "./components/ThemeLibraryModal";
import SaveStatus from "./components/SaveStatus";
import Breadcrumb from "@/components/ui/Breadcrumb/Breadcrumb";
import AuthControls from "@/components/ui/AuthControls/AuthControls";
import { AuthProvider } from "@/contexts/AuthContext";

export default function ThemeBuilderApp() {
	const {
		currentTheme,
		css,
		activeTab,
		mobileActiveTab,
		copied,
		isLibraryOpen,
		codeRef,
		setCurrentTheme,
		setActiveTab,
		handleMobileTabChange,
		copyToClipboard,
		openLibrary,
		closeLibrary,
		loadTheme,
	} = useThemeBuilder();

	// Theme library hook
	const themeLibrary = useThemeLibrary();

	const saveCurrentTheme = () => {
		const savedTheme = themeLibrary.saveTheme(currentTheme);
		return savedTheme;
	};

	// Auto-save hook
	const { saveStatus, forceSave } = useAutoSave({
		currentTheme,
		savedThemes: themeLibrary.savedThemes,
		updateTheme: themeLibrary.updateTheme,
		isEnabled: true,
		saveInterval: 2000,
	});

	return (
		<AuthProvider>
			<div className={styles.container}>
				{/* Header */}
				<header className={styles.header}>
					<nav className={styles.breadcrumb}>
						<Breadcrumb
							items={[
								{ label: "Kiyameh.com", href: "/" },
								{ label: "Tools", href: "/tools" },
								{ label: "Theme Builder", href: "/theme-builder" },
							]}
						/>
					</nav>
					<div className={styles.title}>
						<Palette className={styles.titleIcon} size={24} />
						<h1 className={styles.title}>Theme Builder</h1>
					</div>
					<div className={styles.headerActions}>
						<SaveStatus
							status={saveStatus}
							onForceSave={forceSave}
							themeName={currentTheme.name}
							className={styles.saveStatus}
						/>
						<button
							className={styles.libraryButton}
							onClick={openLibrary}
							title="Abrir biblioteca de temas"
						>
							<BookOpen size={18} />
							<span>Biblioteca</span>
						</button>
					</div>
				</header>

				{/* Main Layout */}
				<div className={styles.main}>
					{/* Mobile Tab Navigation */}
					<div className={styles.mobileTabNav}>
						<button
							className={`${styles.mobileTabButton} ${
								mobileActiveTab === "colors" ? styles.active : ""
							}`}
							onClick={() => handleMobileTabChange("colors")}
						>
							Colores
						</button>
						<button
							className={`${styles.mobileTabButton} ${
								mobileActiveTab === "preview" ? styles.active : ""
							}`}
							onClick={() => handleMobileTabChange("preview")}
						>
							Vista Previa
						</button>
						<button
							className={`${styles.mobileTabButton} ${
								mobileActiveTab === "code" ? styles.active : ""
							}`}
							onClick={() => handleMobileTabChange("code")}
						>
							Código CSS
						</button>
					</div>
					{/* Color Selection Panel */}
					<ColorSelectionPanel
						currentTheme={currentTheme}
						setCurrentTheme={setCurrentTheme}
						mobileActiveTab={mobileActiveTab}
					/>

					{/* Content Panel */}
					<div
						className={`${styles.contentBox} ${
							mobileActiveTab === "preview" || mobileActiveTab === "code"
								? styles.mobileVisible
								: styles.mobileHidden
						}`}
					>
						{/* Desktop Tab Navigation */}
						<div className={styles.tabNav}>
							<button
								className={`${styles.tabButton} ${
									activeTab === "preview" ? styles.active : ""
								}`}
								onClick={() => setActiveTab("preview")}
							>
								Vista Previa
							</button>
							<button
								className={`${styles.tabButton} ${
									activeTab === "code" ? styles.active : ""
								}`}
								onClick={() => setActiveTab("code")}
							>
								Código CSS
							</button>
						</div>

						{/* Tab Content */}
						<div className={styles.tabContent}>
							{activeTab === "preview" && mobileActiveTab !== "code" && (
								<PreviewPanel currentTheme={currentTheme} />
							)}
							{(activeTab === "code" || mobileActiveTab === "code") && (
								<CodePanel
									css={css}
									copied={copied}
									copyToClipboard={copyToClipboard}
									codeRef={codeRef}
								/>
							)}
						</div>
					</div>
				</div>

				{/* Theme Library Modal */}
				<ThemeLibraryModal
					isOpen={isLibraryOpen}
					onClose={closeLibrary}
					currentTheme={currentTheme}
					onLoadTheme={loadTheme}
					onSaveCurrentTheme={saveCurrentTheme}
					savedThemes={themeLibrary.savedThemes}
					isLoading={themeLibrary.isLoading}
					deleteTheme={themeLibrary.deleteTheme}
					duplicateTheme={themeLibrary.duplicateTheme}
					exportTheme={themeLibrary.exportTheme}
					importTheme={themeLibrary.importTheme}
					clearLibrary={themeLibrary.clearLibrary}
				/>
			</div>
		</AuthProvider>
	);
}
