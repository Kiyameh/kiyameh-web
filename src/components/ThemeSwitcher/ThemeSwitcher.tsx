import {useEffect, useState} from 'react'
import styles from './ThemeSwitcher.module.css'

const sunIcon = `
  <circle cx="12" cy="12" r="5" />
  <g stroke="currentColor" stroke-width="2">
    <line x1="12" y1="1" x2="12" y2="3" />
    <line x1="12" y1="21" x2="12" y2="23" />
    <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
    <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
    <line x1="1" y1="12" x2="3" y2="12" />
    <line x1="21" y1="12" x2="23" y2="12" />
    <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
    <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
  </g>
`

const moonIcon = `
  <path d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z" />
`

/**
 * @version 1
 * @returns  A button element that toggles the theme of the page
 */

export default function ThemeSwitcher() {
  const [theme, setTheme] = useState<'light' | 'dark'>('dark')
  const [isAnimating, setIsAnimating] = useState(false)

  const getCurrentTheme = (): 'light' | 'dark' => {
    return (localStorage.getItem('theme') as 'light' | 'dark') || 'light'
  }

  const applyTheme = (newTheme: 'light' | 'dark') => {
    document.documentElement.setAttribute('data-theme', newTheme)
    document.body.setAttribute('data-theme', newTheme)
    localStorage.setItem('theme', newTheme)
    setTheme(newTheme)
  }

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light'
    setIsAnimating(true)
    setTimeout(() => {
      applyTheme(newTheme)
      setIsAnimating(false)
    }, 150)
  }

  useEffect(() => {
    const savedTheme = getCurrentTheme()
    applyTheme(savedTheme)
  }, [])

  return (
    <button
      id="theme-toggle-btn"
      className={styles.themeIconBtn}
      onClick={toggleTheme}
      aria-label="Toggle theme"
    >
      <svg
        className={`${styles.icon} ${
          isAnimating ? styles.fadeOut : styles.fadeIn
        }`}
        id="theme-icon"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        width="24"
        height="24"
        fill="currentColor"
        dangerouslySetInnerHTML={{
          __html: theme === 'light' ? sunIcon : moonIcon,
        }}
      />
    </button>
  )
}
