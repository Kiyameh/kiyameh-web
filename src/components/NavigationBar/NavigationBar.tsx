import {
  User,
  BotMessageSquare,
  FileUser,
  Hash,
  Sun,
  Languages,
  FileCode2,
  FlaskConical,
} from 'lucide-react'
import styles from './NavigationBar.module.css'

const translations = {
  en: {
    home: 'Home',
    about: 'About',
    projects: 'Projects',
    skills: 'Skills',
    connect: 'Connect',
    portfolio: 'Portfolio',
    labs: 'Labs',
    resume: 'Resume',
  },
  es: {
    home: 'Inicio',
    about: 'Sobre mí',
    projects: 'Proyectos',
    skills: 'Habilidades',
    connect: 'Contacto',
    portfolio: 'Portafolio',
    labs: 'Labs',
    resume: 'Currículum',
  },
}

export default function NavigationBar({
  currentLocale,
}: {
  currentLocale: string
}) {
  const t =
    translations[currentLocale as keyof typeof translations] || translations.en

  const toggleLocale = () => {
    const newLocale = currentLocale === 'es' ? 'en' : 'es'
    const currentPath = window.location.pathname
    const newPath = currentPath.replace(`/${currentLocale}`, `/${newLocale}`)
    window.location.href = newPath
  }

  return (
    <nav className={styles.navbar}>
      <ul>
        {/* Portfolio */}
        <li className={`${styles.page} ${styles.expansiblePage}`}>
          <div className={styles.sectionContainer}>
            <a
              href="#hero"
              className={styles.section}
            >
              <Hash className={styles.hash} />
              <span> {t.home}</span>
            </a>
            <a
              href="#about"
              className={styles.section}
            >
              <Hash className={styles.hash} />
              <span> {t.about}</span>
            </a>
            <a
              href="#projects"
              className={styles.section}
            >
              <Hash className={styles.hash} />
              <span> {t.projects}</span>
            </a>
            <a
              href="#skills"
              className={styles.section}
            >
              <Hash className={styles.hash} />
              <span> {t.skills}</span>
            </a>
            <a
              href="#contact"
              className={styles.section}
            >
              <Hash className={styles.hash} />
              <span> {t.connect}</span>
            </a>
          </div>
          <a
            href="/"
            className={styles.trigger}
          >
            <User className={styles.icon} />
            <span className={styles.text}>{t.portfolio}</span>
          </a>
        </li>
        {/* Projects */}
        <li className={styles.page}>
          <a
            href="projects"
            className={styles.trigger}
          >
            <FileCode2 className={styles.icon} />
            <span className={styles.text}>{t.projects}</span>
          </a>
        </li>
        {/* Labs */}
        <li className={styles.page}>
          <a
            href="labs"
            className={styles.trigger}
          >
            <FlaskConical className={styles.icon} />
            <span className={styles.text}>{t.labs}</span>
          </a>
        </li>
        {/* Resume */}
        <li className={styles.page}>
          <a
            href="resume"
            className={styles.trigger}
          >
            <FileUser className={styles.icon} />
            <span className={styles.text}>{t.resume}</span>
          </a>
        </li>

        <div className={styles.divider} />
        {/* Theme */}
        <li className={styles.button}>
          <Sun className={styles.icon} />
        </li>
        {/* Language */}
        <li
          className={`${styles.button} ${styles.languageButton}`}
          onClick={toggleLocale}
        >
          <div className={styles.localeContainer}>
            <Languages className={styles.icon} />
            <div>
              <span className={styles.locale}>
                {currentLocale.toUpperCase()}
              </span>
            </div>
          </div>
        </li>
        {/* Bot */}
        <li className={styles.button}>
          <BotMessageSquare className={`${styles.icon} ${styles.bot}`} />
        </li>
      </ul>
    </nav>
  )
}
