import React from 'react'
import styles from './IconButton.module.css'

export default function IconButton({
  children,
  title,
  onClick,
  src,
  className = '',
  onMouseEnter,
  onMouseLeave,
}: {
  children: React.ReactNode
  title: string
  onClick?: () => void
  src?: string
  className?: string
  onMouseEnter?: () => void
  onMouseLeave?: () => void
}) {
  const buttonClasses = `${styles.iconButton} ${className}`.trim()

  // Si hay un src, renderizar como enlace
  if (src) {
    return (
      <a
        href={src}
        className={buttonClasses}
        title={title}
        aria-label={title}
        onClick={onClick}
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
      >
        {children}
      </a>
    )
  }

  // Si no hay src, renderizar como botón
  return (
    <button
      type="button"
      className={buttonClasses}
      title={title}
      aria-label={title}
      onClick={onClick}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      {children}
    </button>
  )
}
