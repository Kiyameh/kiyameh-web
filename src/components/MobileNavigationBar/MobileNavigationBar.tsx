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
}: {
  currentLocale: string
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
    const currentPath = window.location.pathname
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
          <ul>
            <li className={styles.section}>
              <a href="/">
                <User className={styles.icon} />
                <span>{t.portfolio}</span>
              </a>

              <ul className={styles.subsections}>
                <li>
                  <a
                    href="#hero"
                    onClick={handleSectionClick}
                  >
                    <Hash className={styles.hash} />
                    <span>{t.home}</span>
                  </a>
                </li>
                <li>
                  <a
                    href="#about"
                    onClick={handleSectionClick}
                  >
                    <Hash className={styles.hash} />
                    <span>{t.about}</span>
                  </a>
                </li>
                <li>
                  <a
                    href="#projects"
                    onClick={handleSectionClick}
                  >
                    <Hash className={styles.hash} />
                    <span>{t.projects}</span>
                  </a>
                </li>
                <li>
                  <a
                    href="#skills"
                    onClick={handleSectionClick}
                  >
                    <Hash className={styles.hash} />
                    <span>{t.skills}</span>
                  </a>
                </li>
                <li>
                  <a
                    href="#contact"
                    onClick={handleSectionClick}
                  >
                    <Hash className={styles.hash} />
                    <span>{t.connect}</span>
                  </a>
                </li>
              </ul>
            </li>
            <li>
              <a href="projects">
                <FileCode2 className={styles.icon} />
                <span>{t.projects}</span>
              </a>
            </li>
            <li>
              <a href="labs">
                <FlaskConical className={styles.icon} />
                <span>{t.labs}</span>
              </a>
            </li>
            <li>
              <a href="resume">
                <FileUser className={styles.icon} />
                <span>{t.resume}</span>
              </a>
            </li>
          </ul>
        </nav>

        <div className={styles.bottomButtons}>
          <button className={styles.iconButton}>
            <Sun />
          </button>
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
          <button className={styles.iconButton}>
            <BotMessageSquare className={styles.bot} />
          </button>
        </div>
      </div>
    </>
  )
}
