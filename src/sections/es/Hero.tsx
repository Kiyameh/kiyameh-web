import {useMemo, useState, useEffect} from 'react'
import {AnimatePresence, motion} from 'framer-motion'

export default function Hero() {
  const [subtitle, setSubtitle] = useState({
    a: ' pasión ',
    b: ' crear experiencias digitales memorables ',
  })

  const subtitleStates = useMemo(() => {
    return {
      initial: {y: '100%', opacity: 0},
      animate: {y: '0%', opacity: 1},
      exit: {y: '-100%', opacity: 0},
    }
  }, [])

  const subtitles = useMemo(() => {
    return [
      {a: ' pasión ', b: ' crear experiencias digitales memorables '},
      {a: ' propósito ', b: ' diseñar interfaces modernas y accesibles '},
      {a: ' visión ', b: ' un código limpio, sostenible y eficiente '},
      {a: ' camino ', b: ' la inovación y la adaptación '},
      {a: ' causa ', b: ' el software libre y la comunidad '},
    ]
  }, [])

  useEffect(() => {
    let currentIndex = 0
    const interval = setInterval(() => {
      currentIndex = (currentIndex + 1) % subtitles.length
      setSubtitle(subtitles[currentIndex])
    }, 4000)

    return () => clearInterval(interval)
  }, [subtitles])

  return (
    <section
      id="hero"
      className="section"
      style={{
        textAlign: 'center',
      }}
    >
      {/* Title */}
      <h1 className="big-paragraph">
        Soy Andoni, y soy{' '}
        <span className="emphasis fantasy-text">desarrollador de software</span>
      </h1>

      {/* Subtitle */}
      <div
        className="big-paragraph"
        style={{height: '120px'}}
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={subtitle.a + subtitle.b}
            initial="initial"
            animate="animate"
            exit="exit"
            variants={subtitleStates}
            transition={{
              duration: 0.4,
              ease: [0.4, 0, 0.2, 1],
              opacity: {duration: 0.3},
            }}
          >
            <span>Mi</span>
            <span className="emphasis fantasy-text">{subtitle.a}</span>
            <span>es</span>
            <span>{subtitle.b}</span>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  )
}
