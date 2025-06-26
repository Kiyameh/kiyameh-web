import {useMemo, useState, useEffect} from 'react'
import {AnimatePresence, motion} from 'framer-motion'

type Language = 'en' | 'es'

interface HeroProps {
  language: Language
}

interface SubtitleContent {
  a: string
  b: string
}

const SUBTITLES: Record<Language, SubtitleContent[]> = {
  en: [
    {a: ' passion ', b: ' creating memorable digital experiences '},
    {a: ' purpose ', b: ' designing modern and accessible interfaces '},
    {a: ' vision ', b: ' clean, sustainable and efficient code '},
    {a: ' path ', b: ' innovation and adaptation '},
    {a: ' cause ', b: ' free software and community '},
  ],
  es: [
    {a: ' pasión ', b: ' crear experiencias digitales memorables '},
    {a: ' propósito ', b: ' diseñar interfaces modernas y accesibles '},
    {a: ' visión ', b: ' un código limpio, sostenible y eficiente '},
    {a: ' camino ', b: ' la inovación y la adaptación '},
    {a: ' causa ', b: ' el software libre y la comunidad '},
  ],
}

const TITLES: Record<Language, {prefix: string; suffix: string}> = {
  en: {
    prefix: "I'm Andoni, and I'm a ",
    suffix: 'software developer',
  },
  es: {
    prefix: 'Soy Andoni, y soy ',
    suffix: 'desarrollador de software',
  },
}

const TEXTS: Record<Language, {my: string; is: string}> = {
  en: {my: 'My', is: 'is'},
  es: {my: 'Mi', is: 'es'},
}

export default function Hero({language = 'en'}: HeroProps) {
  const [subtitle, setSubtitle] = useState<SubtitleContent>(
    SUBTITLES[language][0]
  )

  const subtitleStates = useMemo(
    () => ({
      initial: {y: '100%', opacity: 0},
      animate: {y: '0%', opacity: 1},
      exit: {y: '-100%', opacity: 0},
    }),
    []
  )

  const subtitles = useMemo(() => SUBTITLES[language], [language])
  const {my, is} = TEXTS[language]
  const {prefix, suffix} = TITLES[language]

  useEffect(() => {
    let currentIndex = 0
    const interval = setInterval(() => {
      currentIndex = (currentIndex + 1) % subtitles.length
      setSubtitle(subtitles[currentIndex])
    }, 4000)

    return () => clearInterval(interval)
  }, [subtitles])

  return (
    <div
      style={{
        textAlign: 'center',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '1rem',
      }}
    >
      <svg
        style={{
          maxHeight: '100px',
          opacity: '70%',
          padding: '1rem',
        }}
        width="66"
        height="100"
        viewBox="0 0 66 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M0 4.99999C0 2.23857 2.23858 0 5 0H13.56C16.3214 0 18.56 2.23858 18.56 5V94.84C18.56 97.6014 16.3214 99.84 13.56 99.84H5C2.23858 99.84 0 97.6014 0 94.84V4.99999ZM36.569 44.2073C38.4637 42.38 41.4507 42.3345 43.4001 44.1035L47.2755 47.6202C49.3289 49.4836 49.4738 52.6621 47.5984 54.7046L40.794 62.1151C39.1228 63.9352 39.0317 66.7031 40.5797 68.6291L59.1281 91.7077C61.7578 94.9797 59.4286 99.84 55.2308 99.84H45.2556C43.7524 99.84 42.3289 99.1637 41.3794 97.9984L17.6248 68.8449C15.9827 66.8297 16.1588 63.8923 18.0299 62.0877L36.569 44.2073Z"
          fill="var(--content)"
        />
        <circle
          cx="53"
          cy="37"
          r="8"
          fill="#FF197C"
        />
      </svg>

      {/* Title */}
      <h1
        className="big-paragraph"
        style={{
          fontSize: '2rem',
        }}
      >
        {prefix}
        <p className="emphasis fantasy-text">{suffix}</p>
      </h1>

      {/* Subtitle */}
      <div
        className="big-paragraph"
        style={{height: '120px'}}
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={`${language}-${subtitle.a}`}
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
            <span>{my}</span>
            <span className="emphasis fantasy-text">{subtitle.a}</span>
            <span>{is}</span>
            <span>{subtitle.b}</span>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  )
}
