import {useCallback, useRef, useState, type MouseEvent} from 'react'
import './Gradow.css'

interface GradowProps {
  variant?: 'spin' | 'pulse' | 'sticky'
  mode?: 'permanent' | 'hover'
  opacity?: number
  children?: React.ReactNode
}

export default function Gradow({
  variant = 'spin',
  mode = 'permanent',
  opacity = 0.5,
  children,
}: GradowProps) {
  const [position, setPosition] = useState({x: 0, y: 0})
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
    '--position-x': `${position.x}%`,
    '--position-y': `${position.y}%`,
    '--opacity': opacity,
  } as React.CSSProperties

  return (
    <div
      ref={ref}
      onMouseMove={handleMouseMove}
      className="gradow"
      data-variant={variant}
      data-mode={mode}
      style={cssVariables}
    >
      {children}
      <div className="gradow-back" />
    </div>
  )
}
