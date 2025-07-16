import React, {useRef, useState, useCallback, type MouseEvent} from 'react'
import technologies from '@/content/technologies.json'
import styles from './TechBadge.module.css'

export default function TechBadge({
  tech,
  inset = 2,
  disabled = false,
}: {
  tech: string
  inset?: number
  disabled?: boolean
}) {
  const {svgPath, name, color} = technologies[tech as keyof typeof technologies]

  const [position, setPosition] = useState<{x: number; y: number} | null>(null)

  const ref = useRef<HTMLDivElement>(null)

  const handleMouseMove = useCallback((e: MouseEvent<HTMLDivElement>) => {
    const rect = ref.current?.getBoundingClientRect()
    if (!rect) return
    setPosition({
      x: ((e.clientX - rect.left) / rect.width) * 100,
      y: ((e.clientY - rect.top) / rect.height) * 100,
    })
  }, [])

  const cssVariables = {
    '--color': color,
    '--gradient-position-x': position ? `${position.x}%` : '50%',
    '--gradient-position-y': position ? `${position.y}%` : '50%',
    '--border-inset': `${inset}px`,
  } as React.CSSProperties

  return (
    <div
      ref={ref}
      style={cssVariables}
      className={`${styles.techBadge} ${disabled ? styles.disabled : ''}`}
      onMouseMove={handleMouseMove}
    >
      <svg
        className={styles.icon}
        viewBox="0 0 24 24"
        fill={color}
      >
        <path d={svgPath} />
      </svg>
      <span className={styles.label}>{name}</span>
    </div>
  )
}
