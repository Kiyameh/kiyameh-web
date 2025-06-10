import {useMemo, useState, useEffect} from 'react'
import {AnimatePresence, motion} from 'framer-motion'

export default function Hero() {
  const [subtitle, setSubtitle] = useState({
    a: ' passion ',
    b: ' creating memorable digital experiences ',
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
      {a: ' passion ', b: ' creating memorable digital experiences '},
      {a: ' purpose ', b: ' designing modern and accessible interfaces '},
      {a: ' vision ', b: ' clean, sustainable and efficient code '},
      {a: ' path ', b: ' innovation and adaptation '},
      {a: ' cause ', b: ' free software and community '},
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
    >
      {/* Title */}
      <h1 className="big-paragraph">
        I'm Andoni, and I'm a{' '}
        <span className="emphasis fantasy-text">software developer</span>
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
            <span>My</span>
            <span className="emphasis fantasy-text">{subtitle.a}</span>
            <span>is</span>
            <span>{subtitle.b}</span>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  )
}
