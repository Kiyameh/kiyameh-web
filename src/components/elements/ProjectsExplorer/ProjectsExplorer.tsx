import { useState, useMemo, useCallback } from "react";
import styles from "./ProjectsExplorer.module.css";
import type { Project } from "@/content/config";
import { getTypeIcon, getTypeColor, filterProjects } from "./functions";
import { translations } from "./translations";

import {
	X,
	Minus,
	Square,
	Search,
	Grid3x3,
	List,
	Globe,
	Wrench,
	Package,
	Palette,
	ExternalLink,
	Github,
	ChevronRight,
	Info,
	Hammer,
	Settings,
	Images,
	FileQuestion,
	Asterisk,
} from "lucide-react";
import ImageGallery from "../../ui/ImageGallery/ImageGallery";
import Button from "../../ui/Button/Button";
import ProjectTypeBadge from "../../ui/ProjectTypeBadge/ProjectTypeBadge";

export default function ProjectsExplorer({
	projects,
	language,
}: {
	projects: Project[];
	language: "en" | "es";
}) {
	const t = translations[language];

	const [activeFilter, setActiveFilter] = useState<string | null>(null);
	const [searchTerm, setSearchTerm] = useState("");
	const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
	const [selectedProject, setSelectedProject] = useState<Project | null>(null);

	const proyectCategories = useMemo(() => {
		return [
			{ name: "all", label_es: "Todos", label_en: "All", icon: <Asterisk /> },
			{
				name: "webpage",
				label_es: "Página Web",
				label_en: "Webpage",
				icon: <Globe />,
			},
			{
				name: "tool",
				label_es: "Herramienta",
				label_en: "Tool",
				icon: <Wrench />,
			},
			{
				name: "package",
				label_es: "Paquete",
				label_en: "Package",
				icon: <Package />,
			},
			{
				name: "design",
				label_es: "Diseño",
				label_en: "Design",
				icon: <Palette />,
			},
			{
				name: "other",
				label_es: "Otro",
				label_en: "Other",
				icon: <FileQuestion />,
			},
		];
	}, []);

	const filteredProjects = useMemo(
		() => filterProjects(projects, searchTerm, activeFilter),
		[projects, searchTerm, activeFilter],
	);

	const handleImageError = useCallback(
		(e: React.SyntheticEvent<HTMLImageElement>) => {
			const target = e.target as HTMLImageElement;
			target.style.display = "none";
			const fallback = target.nextElementSibling as HTMLElement;
			if (fallback) {
				fallback.classList.remove("hidden");
			}
		},
		[],
	);

	const renderGridView = () => (
		<div className={styles.gridView}>
			{filteredProjects.map((project) => (
				<button
					type="button"
					key={project.id}
					className={`${styles.projectCard} ${
						selectedProject?.id === project.id ? styles.projectCardSelected : ""
					}`}
					onClick={() => setSelectedProject(project)}
					tabIndex={selectedProject ? -1 : 0}
				>
					<div className={styles.projectLogo}>
						{project.data.logo && (
							<img
								src={project.data.logo}
								alt={project.data.name}
								className={`${styles.projectLogoImage} ${styles.logoLight}`}
								onError={handleImageError}
							/>
						)}
						{project.data.logo_dark && (
							<img
								src={project.data.logo_dark}
								alt={project.data.name}
								className={`${styles.projectLogoImage} ${styles.logoDark}`}
								onError={handleImageError}
							/>
						)}
						{!project.data.logo && !project.data.logo_dark && (
							<div className={styles.projectLogoFallback}>
								{getTypeIcon(project.data.type)}
							</div>
						)}
					</div>

					<h3 className={styles.projectName}>{project.data.name}</h3>

					<div className={styles.projectType}>
						<ProjectTypeBadge type={project.data.type} />
					</div>

					{selectedProject?.id === project.id && (
						<div className={styles.selectionIndicator}>
							<ChevronRight />
						</div>
					)}
				</button>
			))}
		</div>
	);

	const renderListView = () => (
		<table className={styles.listView}>
			<thead>
				<tr className={styles.listHeader}>
					<th>{t.type}</th>
					<th>{t.name}</th>
					<th>{t.technologies}</th>
				</tr>
			</thead>

			<tbody>
				{filteredProjects.map((project) => (
					<tr
						key={project.id}
						className={`${styles.listRow} ${
							selectedProject?.id === project.id ? styles.listRowSelected : ""
						}`}
						onClick={() => setSelectedProject(project)}
						tabIndex={selectedProject ? -1 : 0}
					>
						<td className={styles.listRowType}>
							<div
								className={`${getTypeColor(project.data.type)} ${
									styles.typeBadge
								}`}
							>
								{getTypeIcon(project.data.type)}
							</div>
						</td>

						<td className={styles.listRowName}>
							<div>
								<h3 className={styles.listRowTitle}>{project.data.name}</h3>
								<p className={styles.listRowSubtitle}>{project.data.type}</p>
							</div>
						</td>

						<td className={styles.listRowTechnologies}>
							{project.data.technologies.slice(0, 6).map((tech) => (
								<span key={tech} className={styles.techBadge}>
									{tech}
								</span>
							))}
							{project.data.technologies.length > 6 && (
								<span className={styles.techBadge}>
									+{project.data.technologies.length - 6}
								</span>
							)}
						</td>
					</tr>
				))}
			</tbody>
		</table>
	);

	const renderDetailsPanel = () => {
		if (!selectedProject) return null;

		return (
			<div className={styles.detailsPanel}>
				<div className={styles.detailsHeader}>
					<button
						type="button"
						onClick={() => setSelectedProject(null)}
						className={`${styles.windowButton} ${styles.close}`}
					>
						<X className={styles.controlIcon} />
					</button>
					<h2 className={styles.detailsTitle}>{t.projectDetails}</h2>
				</div>

				<div className={styles.detailsContent}>
					<div className={styles.detailsSectionTitle}>
						<div className={styles.projectLogo}>
							{selectedProject.data.logo && (
								<img
									src={selectedProject.data.logo}
									alt={selectedProject.data.name}
									className={`${styles.projectLogoImage} ${styles.logoLight}`}
									onError={handleImageError}
								/>
							)}
							{selectedProject.data.logo_dark && (
								<img
									src={selectedProject.data.logo_dark}
									alt={selectedProject.data.name}
									className={`${styles.projectLogoImage} ${styles.logoDark}`}
									onError={handleImageError}
								/>
							)}
							{!selectedProject.data.logo &&
								!selectedProject.data.logo_dark && (
									<div className={styles.projectLogoFallback}>
										{getTypeIcon(selectedProject.data.type)}
									</div>
								)}
						</div>
						<h3 className={styles.projectName}>{selectedProject.data.name}</h3>
						<span
							className={`${styles.typeBadge} ${getTypeColor(
								selectedProject.data.type,
							)}`}
						>
							{getTypeIcon(selectedProject.data.type)}
							<span>{selectedProject.data.type}</span>
						</span>
					</div>

					<div className={styles.detailsSection}>
						<h4 className={styles.detailsTitle}>
							<Info className={styles.typeIcon} />
							{t.description}
						</h4>
						<p className={styles.detailsText}>
							{language === "en"
								? selectedProject.data.description_en
								: selectedProject.data.description}
						</p>
					</div>

					<div className={styles.detailsSection}>
						<a
							href={`/${language}/projects/${selectedProject.data.slug}`}
							className={styles.projectPageCard}
						>
							<Info className={styles.linkIcon} />
							<div>
								<p className={styles.linkText}>{t.viewProjectPage}</p>
							</div>
						</a>
						{selectedProject.data.url && (
							<a
								href={selectedProject.data.url}
								target="_blank"
								rel="noopener noreferrer"
								className={styles.linkCard}
							>
								<ExternalLink className={styles.linkIcon} />
								<div>
									<p className={styles.linkText}>{t.visitWebsite}</p>
									<p className={styles.linkUrl}>{selectedProject.data.url}</p>
								</div>
							</a>
						)}

						{selectedProject.data.repository && (
							<a
								href={selectedProject.data.repository}
								target="_blank"
								rel="noopener noreferrer"
								className={styles.linkCard}
							>
								<Github className={styles.linkIcon} />
								<div>
									<p className={styles.linkText}>{t.viewRepository}</p>
									<p className={styles.linkUrl}>
										{selectedProject.data.repository}
									</p>
								</div>
							</a>
						)}
					</div>

					<div className={styles.detailsSection}>
						<h4 className={styles.detailsTitle}>
							<Hammer className={styles.typeIcon} />
							{t.technologies}
						</h4>
						<div className={styles.techList}>
							{selectedProject.data.technologies.map((tech) => (
								<span key={tech} className={styles.techBadge}>
									{tech}
								</span>
							))}
						</div>
					</div>

					<div className={styles.detailsSection}>
						<h4 className={styles.detailsTitle}>
							<Settings className={styles.typeIcon} />
							{t.keyFeatures}
						</h4>
						<ul className={styles.featureList}>
							{(language === "en"
								? selectedProject.data.features_en
								: selectedProject.data.features
							).map((feature) => (
								<li key={feature} className={styles.featureItem}>
									<span className={styles.featureDot}></span>
									{feature}
								</li>
							))}
						</ul>
					</div>

					{selectedProject.data.images && (
						<div className={styles.detailsSection}>
							<h4 className={styles.detailsTitle}>
								<Images className={styles.typeIcon} />
								{t.screenshot}
							</h4>
							<div className={styles.previewImage}>
								<ImageGallery
									images={
										selectedProject.data.images?.map((image) => {
											return {
												src: image,
												alt: selectedProject.data.name,
											};
										}) || []
									}
								/>
							</div>
						</div>
					)}
				</div>
			</div>
		);
	};

	return (
		<div
			className={styles.window}
			role="application"
			aria-label={t.windowTitle}
		>
			<div className={styles.titleBar}>
				<div className={styles.windowControls}>
					<div
						className={`${styles.windowButton} ${styles.close}`}
						tabIndex={-1}
					>
						<X className={styles.controlIcon} />
					</div>
					<div
						className={`${styles.windowButton} ${styles.minimize}`}
						tabIndex={-1}
					>
						<Minus className={styles.controlIcon} />
					</div>
					<div
						className={`${styles.windowButton} ${styles.maximize}`}
						tabIndex={-1}
					>
						<Square className={styles.controlIcon} />
					</div>
				</div>
				<div className={styles.windowTitle}>{t.windowTitle}</div>
			</div>

			<div className={styles.toolbar}>
				<div className={styles.toolbarContent}>
					<div className={styles.searchContainer}>
						<div className={styles.searchBar}>
							<Search className={styles.searchIcon} />
							<input
								type="text"
								placeholder={t.searchPlaceholder}
								value={searchTerm}
								onChange={(e) => setSearchTerm(e.target.value)}
								className={styles.searchInput}
								aria-label={t.searchPlaceholder}
							/>
						</div>
					</div>

					<div className={styles.viewToggle}>
						<button
							type="button"
							onClick={() => setViewMode("grid")}
							className={`${styles.viewButton} ${
								viewMode === "grid"
									? styles.viewButtonActive
									: styles.viewButtonInactive
							}`}
							aria-label={t.gridView}
							aria-pressed={viewMode === "grid"}
						>
							<Grid3x3 className={styles.viewIcon} />
						</button>
						<button
							type="button"
							onClick={() => setViewMode("list")}
							className={`${styles.viewButton} ${
								viewMode === "list"
									? styles.viewButtonActive
									: styles.viewButtonInactive
							}`}
							aria-label={t.listView}
							aria-pressed={viewMode === "list"}
						>
							<List className={styles.viewIcon} />
						</button>
					</div>
					<div className={styles.projectFilter}>
						{proyectCategories.map((category) => (
							<Button
								key={category.name}
								text={language === "es" ? category.label_es : category.label_en}
								icon={category.icon}
								onClick={() => setActiveFilter(category.name)}
								active={activeFilter === category.name}
							/>
						))}
					</div>
				</div>
			</div>

			<div className={styles.mainContent}>
				<div className={styles.projectsList}>
					{filteredProjects.length === 0 ? (
						<div className={styles.emptyState}>
							<Package className={styles.emptyIcon} />
							<h3 className={styles.emptyTitle}>{t.noProjectsFound}</h3>
							<p className={styles.emptyText}>{t.noProjectsFoundSubtitle}</p>
						</div>
					) : viewMode === "grid" ? (
						renderGridView()
					) : (
						renderListView()
					)}
				</div>

				<div
					className={`${styles.detailsOverlay} ${
						selectedProject ? styles.visible : ""
					}`}
					onClick={() => setSelectedProject(null)}
					aria-hidden={!selectedProject}
				/>

				<div
					className={`${styles.detailsPanelContainer} ${
						selectedProject ? styles.visible : ""
					}`}
					role="dialog"
					aria-modal="true"
					aria-label={selectedProject?.data.name}
				>
					{selectedProject && renderDetailsPanel()}
				</div>
			</div>

			<div className={styles.statusBar}>
				<span>
					{filteredProjects.length} {t.projectsCount} {projects.length}{" "}
					{t.projects}
				</span>
			</div>
		</div>
	);
}
