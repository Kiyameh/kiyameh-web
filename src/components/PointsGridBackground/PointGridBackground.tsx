import React, {useState, useEffect} from 'react'
import styles from './PointGridBackground.module.css'

const PointsGridBackground = () => {
  const width = 1600
  const height = 800
  const spacing = 35
  const radius = 2

  const [pulseStates, setPulseStates] = useState<{[key: string]: number}>({})

  // Generar puntos
  const points: {x: number; y: number; key: string}[] = []
  for (let y = 0; y < height; y += spacing) {
    for (let x = 0; x < width; x += spacing) {
      const key = `${x}-${y}`
      points.push({x, y, key})
    }
  }

  // Efecto para animar los puntos aleatoriamente
  useEffect(() => {
    const interval = setInterval(() => {
      setPulseStates((prev) => {
        const newStates = {...prev}

        // Seleccionar 8-12 puntos aleatorios para animar
        const pointsToAnimate = Math.floor(Math.random() * 5) + 8
        const randomPoints = points
          .sort(() => Math.random() - 0.5)
          .slice(0, pointsToAnimate)

        randomPoints.forEach((point) => {
          newStates[point.key] = Math.random() * 0.9 + 0.1 // Valor entre 0.1 y 1.0
        })

        return newStates
      })
    }, 1000) // Cambiar cada 1 segundo

    return () => clearInterval(interval)
  }, [])

  return (
    <svg
      width={width}
      height={height}
      className={styles.gridSvg}
    >
      <defs>
        <mask id="blob-mask">
          <rect
            width="100%"
            height="100%"
            fill="black"
          />
          <path
            fill="white"
            d="M150,100 C250,50 550,150 600,300 C650,450 400,600 250,550 C100,500 50,300 150,100 Z"
          />
        </mask>
      </defs>
      <g mask="url(#blob-mask)">
        {points.map(({x, y, key}) => (
          <circle
            key={key}
            cx={x}
            cy={y}
            r={radius}
            fill="var(--gradient-300)"
            opacity={pulseStates[key] || 0.3}
            style={{
              transition: 'opacity 0.8s ease-in-out',
            }}
          />
        ))}
      </g>
    </svg>
  )
}

export default PointsGridBackground
