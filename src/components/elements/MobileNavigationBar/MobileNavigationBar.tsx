import { useState } from "react";
import {
	User,
	FileUser,
	Hash,
	Languages,
	FileCode2,
	Menu,
	X,
	PencilRuler,
} from "lucide-react";
import styles from "./MobileNavigationBar.module.css";
import ThemeSwitcher from "@/components/ui/ThemeSwitcher/ThemeSwitcher";

const translations = {
	en: {
		home: "Home",
		about: "About",
		works: "Works",
		skills: "Skills",
		connect: "Connect",
		portfolio: "Portfolio",
		projects: "Projects",
		labs: "Labs",
		method: "Method",
		resume: "Resume",
	},
	es: {
		home: "Inicio",
		about: "Sobre mí",
		works: "Trabajos",
		skills: "Habilidades",
		connect: "Contacto",
		portfolio: "Portafolio",
		projects: "Proyectos",
		labs: "Laboratorio",
		method: "Método",
		resume: "Currículum",
	},
};

export default function MobileNavigationBar({
	currentLocale,
	currentPath,
}: {
	currentLocale: string;
	currentPath: string;
}) {
	const [isOpen, setIsOpen] = useState(false);
	const [isLanguageSelectorVisible, setIsLanguageSelectorVisible] =
		useState(false);
	const t =
		translations[currentLocale as keyof typeof translations] || translations.en;

	const handleSectionClick = () => {
		setIsOpen(false);
	};

	const toggleLanguageSelector = () => {
		setIsLanguageSelectorVisible(!isLanguageSelectorVisible);
	};

	const changeLanguage = (locale: string) => {
		const newPath = currentPath.replace(`/${currentLocale}`, `/${locale}`);
		window.location.href = newPath;
	};

	const cleanPath =
		currentPath.endsWith("/") && currentPath.length > 1
			? currentPath.slice(0, -1)
			: currentPath;

	return (
		<>
			<button
				type="button"
				className={styles.burgerButton}
				onClick={() => setIsOpen(!isOpen)}
			>
				{isOpen ? <X /> : <Menu />}
			</button>

			<div className={`${styles.menu} ${isOpen ? styles.open : ""}`}>
				<nav className={styles.navigation}>
					<ul>
						{/* Portfolio */}
						<li className={styles.section}>
							<a href={`/${currentLocale}/`}>
								<User className={styles.icon} />
								<span
									className={
										cleanPath === "/es" || cleanPath === "/en"
											? `${styles.active}`
											: ""
									}
								>
									{t.portfolio}
								</span>
							</a>

							<ul className={styles.subsections}>
								<li>
									<a
										href={`/${currentLocale}/#hero`}
										onClick={handleSectionClick}
									>
										<Hash className={styles.hash} />
										<span>{t.home}</span>
									</a>
								</li>
								<li>
									<a
										href={`/${currentLocale}/#about`}
										onClick={handleSectionClick}
									>
										<Hash className={styles.hash} />
										<span>{t.about}</span>
									</a>
								</li>
								<li>
									<a
										href={`/${currentLocale}/#works`}
										onClick={handleSectionClick}
									>
										<Hash className={styles.hash} />
										<span>{t.works}</span>
									</a>
								</li>
								<li>
									<a
										href={`/${currentLocale}/#skills`}
										onClick={handleSectionClick}
									>
										<Hash className={styles.hash} />
										<span>{t.skills}</span>
									</a>
								</li>
								<li>
									<a
										href={`/${currentLocale}/#contact`}
										onClick={handleSectionClick}
									>
										<Hash className={styles.hash} />
										<span>{t.connect}</span>
									</a>
								</li>
							</ul>
						</li>
						{/* Projects */}
						<li>
							<a href={`/${currentLocale}/projects`}>
								<FileCode2 className={styles.icon} />
								<span
									className={
										currentPath.includes("projects") ? `${styles.active}` : ""
									}
								>
									{t.projects}
								</span>
							</a>
						</li>
						{/* Method */}
						<li>
							<a href={`/${currentLocale}/method`}>
								<PencilRuler className={styles.icon} />
								<span
									className={
										currentPath.includes("method") ? `${styles.active}` : ""
									}
								>
									{t.method}
								</span>
							</a>
						</li>
						{/* Resume */}
						<li>
							<a href={`/${currentLocale}/resume`}>
								<FileUser className={styles.icon} />
								<span
									className={
										currentPath.includes("resume") ? `${styles.active}` : ""
									}
								>
									{t.resume}
								</span>
							</a>
						</li>
					</ul>
				</nav>

				<div className={styles.bottomButtons}>
					{/* Theme */}
					<ThemeSwitcher />
					{/* Language */}
					<div className={styles.languageButton}>
						<button
							type="button"
							className={styles.iconButton}
							onClick={toggleLanguageSelector}
						>
							<Languages />
						</button>
						<div
							className={`${styles.languageSelector} ${
								isLanguageSelectorVisible ? styles.visible : ""
							}`}
						>
							<button
								type="button"
								className={`${styles.languageOption} ${
									currentLocale === "es" ? styles.active : ""
								}`}
								onClick={() => changeLanguage("es")}
							>
								ES
							</button>
							<button
								type="button"
								className={`${styles.languageOption} ${
									currentLocale === "en" ? styles.active : ""
								}`}
								onClick={() => changeLanguage("en")}
							>
								EN
							</button>
						</div>
					</div>
				</div>
			</div>
		</>
	);
}
