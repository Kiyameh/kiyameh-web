import {useState} from 'react'
import {
  User,
  BotMessageSquare,
  FileUser,
  Hash,
  Sun,
  Languages,
  FileCode2,
  Menu,
  X,
  FlaskConical,
} from 'lucide-react'
import styles from './MobileNavigationBar.module.css'

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
    labs: 'Laboratorio',
    resume: 'Currículum',
  },
}

export default function MobileNavigationBar({
  currentLocale,
  currentPath,
}: {
  currentLocale: string
  currentPath: string
}) {
  const [isOpen, setIsOpen] = useState(false)
  const [isLanguageSelectorVisible, setIsLanguageSelectorVisible] =
    useState(false)
  const t =
    translations[currentLocale as keyof typeof translations] || translations.en

  const handleSectionClick = () => {
    setIsOpen(false)
  }

  const toggleLanguageSelector = () => {
    setIsLanguageSelectorVisible(!isLanguageSelectorVisible)
  }

  const changeLanguage = (locale: string) => {
    const newPath = currentPath.replace(`/${currentLocale}`, `/${locale}`)
    window.location.href = newPath
  }

  return (
    <>
      <button
        className={styles.burgerButton}
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? <X /> : <Menu />}
      </button>

      <div className={`${styles.menu} ${isOpen ? styles.open : ''}`}>
        <nav className={styles.navigation}>
          {/* DELETE */}
          <p>{currentPath}</p>
          <p>{currentLocale}</p>
          <ul>
            {/* Portfolio */}
            <li className={styles.section}>
              <a href="/">
                <User className={styles.icon} />
                <span
                  className={
                    currentPath.endsWith('/') ? `${styles.active}` : ''
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
                    href={`/${currentLocale}/#projects`}
                    onClick={handleSectionClick}
                  >
                    <Hash className={styles.hash} />
                    <span>{t.projects}</span>
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
              <a href="projects">
                <FileCode2 className={styles.icon} />
                <span
                  className={
                    currentPath.includes('projects') ? `${styles.active}` : ''
                  }
                >
                  {t.projects}
                </span>
              </a>
            </li>
            {/* Labs */}
            <li>
              <a href="labs">
                <FlaskConical className={styles.icon} />
                <span
                  className={
                    currentPath.includes('labs') ? `${styles.active}` : ''
                  }
                >
                  {t.labs}
                </span>
              </a>
            </li>
            {/* Resume */}
            <li>
              <a href="resume">
                <FileUser className={styles.icon} />
                <span
                  className={
                    currentPath.includes('resume') ? `${styles.active}` : ''
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
          <button className={styles.iconButton}>
            <Sun />
          </button>
          {/* Language */}
          <div className={styles.languageButton}>
            <button
              className={styles.iconButton}
              onClick={toggleLanguageSelector}
            >
              <Languages />
            </button>
            <div
              className={`${styles.languageSelector} ${
                isLanguageSelectorVisible ? styles.visible : ''
              }`}
            >
              <button
                className={`${styles.languageOption} ${
                  currentLocale === 'es' ? styles.active : ''
                }`}
                onClick={() => changeLanguage('es')}
              >
                ES
              </button>
              <button
                className={`${styles.languageOption} ${
                  currentLocale === 'en' ? styles.active : ''
                }`}
                onClick={() => changeLanguage('en')}
              >
                EN
              </button>
            </div>
          </div>
          {/* Bot */}
          <button className={styles.iconButton}>
            <BotMessageSquare className={styles.bot} />
          </button>
        </div>
      </div>
    </>
  )
}
