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
  const t =
    translations[currentLocale as keyof typeof translations] || translations.en

  const handleNavigationClick = () => {
    setIsOpen(false)
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
              <a
                href="/"
                onClick={handleNavigationClick}
              >
                <User className={styles.icon} />
                <span>{t.portfolio}</span>
              </a>

              <ul className={styles.subsections}>
                <li>
                  <a
                    href="#hero"
                    onClick={handleNavigationClick}
                  >
                    <Hash className={styles.hash} />
                    <span>{t.home}</span>
                  </a>
                </li>
                <li>
                  <a
                    href="#about"
                    onClick={handleNavigationClick}
                  >
                    <Hash className={styles.hash} />
                    <span>{t.about}</span>
                  </a>
                </li>
                <li>
                  <a
                    href="#projects"
                    onClick={handleNavigationClick}
                  >
                    <Hash className={styles.hash} />
                    <span>{t.projects}</span>
                  </a>
                </li>
                <li>
                  <a
                    href="#skills"
                    onClick={handleNavigationClick}
                  >
                    <Hash className={styles.hash} />
                    <span>{t.skills}</span>
                  </a>
                </li>
                <li>
                  <a
                    href="#contact"
                    onClick={handleNavigationClick}
                  >
                    <Hash className={styles.hash} />
                    <span>{t.connect}</span>
                  </a>
                </li>
              </ul>
            </li>
            <li>
              <a
                href="projects"
                onClick={handleNavigationClick}
              >
                <FileCode2 className={styles.icon} />
                <span>{t.projects}</span>
              </a>
            </li>
            <li>
              <a
                href="labs"
                onClick={handleNavigationClick}
              >
                <FlaskConical className={styles.icon} />
                <span>{t.labs}</span>
              </a>
            </li>
            <li>
              <a
                href="resume"
                onClick={handleNavigationClick}
              >
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
          <button className={styles.iconButton}>
            <Languages />
          </button>
          <button className={styles.iconButton}>
            <BotMessageSquare className={styles.bot} />
          </button>
        </div>
      </div>
    </>
  )
}
