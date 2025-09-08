import {
  User,
  FileUser,
  Hash,
  Languages,
  FileCode2,
  FlaskConical,
} from 'lucide-react'
import styles from './NavigationBar.module.css'
import ThemeSwitcher from '@/components/ui/ThemeSwitcher/ThemeSwitcher'
import AiChatBot from '../AiChatBot/AiChatBot'

const translations = {
  en: {
    home: 'Home',
    about: 'About',
    works: 'Works',
    skills: 'Skills',
    connect: 'Connect',
    portfolio: 'Portfolio',
    projects: 'Projects',
    labs: 'Labs',
    resume: 'Resume',
  },
  es: {
    home: 'Inicio',
    about: 'Sobre mí',
    works: 'Trabajos',
    skills: 'Habilidades',
    connect: 'Contacto',
    portfolio: 'Portafolio',
    projects: 'Proyectos',
    labs: 'Labs',
    resume: 'Currículum',
  },
}

export default function NavigationBar({
  currentLocale,
  currentPath,
}: {
  currentLocale: string
  currentPath: string
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
              href={`/${currentLocale}/#hero`}
              className={styles.section}
            >
              <Hash className={styles.hash} />
              <span> {t.home}</span>
            </a>
            <a
              href={`/${currentLocale}/#about`}
              className={styles.section}
            >
              <Hash className={styles.hash} />
              <span> {t.about}</span>
            </a>
            <a
              href={`/${currentLocale}/#works`}
              className={styles.section}
            >
              <Hash className={styles.hash} />
              <span> {t.works}</span>
            </a>
            <a
              href={`/${currentLocale}/#skills`}
              className={styles.section}
            >
              <Hash className={styles.hash} />
              <span> {t.skills}</span>
            </a>
            <a
              href={`/${currentLocale}/#contact`}
              className={styles.section}
            >
              <Hash className={styles.hash} />
              <span> {t.connect}</span>
            </a>
          </div>
          <a
            href={`/${currentLocale}/`}
            className={styles.trigger}
          >
            <User
              className={`${styles.icon} ${
                currentPath.endsWith('/') ? styles.active : ''
              }`}
            />
            <span className={styles.text}>{t.portfolio}</span>
          </a>
        </li>
        {/* Projects */}
        <li className={styles.page}>
          <a
            href={`/${currentLocale}/projects`}
            className={styles.trigger}
          >
            <FileCode2
              className={`${styles.icon} ${
                currentPath.includes('projects') ? styles.active : ''
              }`}
            />
            <span className={styles.text}>{t.projects}</span>
          </a>
        </li>
        {/* Labs */}
        <li className={styles.page}>
          <a
            href={`/${currentLocale}/labs`}
            className={styles.trigger}
          >
            <FlaskConical
              className={`${styles.icon} ${
                currentPath.includes('labs') ? styles.active : ''
              }`}
            />
            <span className={styles.text}>{t.labs}</span>
          </a>
        </li>
        {/* Resume */}
        <li className={styles.page}>
          <a
            href={`/${currentLocale}/resume`}
            className={styles.trigger}
          >
            <FileUser
              className={`${styles.icon} ${
                currentPath.includes('resume') ? styles.active : ''
              }`}
            />
            <span className={styles.text}>{t.resume}</span>
          </a>
        </li>

        <div className={styles.divider} />
        {/* Theme */}
        <li>
          <ThemeSwitcher />
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
          <AiChatBot />
        </li>
      </ul>
    </nav>
  )
}
