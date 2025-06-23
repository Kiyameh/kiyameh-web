import {useMemo, useState} from 'react'
import TechBadge from '../TechBadge/TechBadge'
import styles from './TechCarrousel.module.css'
import {
  Atom,
  Cloud,
  Code,
  Database,
  Hammer,
  Library,
  Palette,
  Server,
} from 'lucide-react'

export default function TechCarrousel({reverse = false}) {
  const technologies = useMemo(
    () => [
      {name: 'astro', tag: 'frameworks'},
      {name: 'tailwindcss', tag: 'libraries'},
      {name: 'nextdotjs', tag: 'frameworks'},
      {name: 'firebase', tag: 'cloud'},
      {name: 'html5', tag: 'languages'},
      {name: 'vitest', tag: 'frameworks'},
      {name: 'typescript', tag: 'languages'},
      {name: 'chakraui', tag: 'libraries'},
      {name: 'react', tag: 'frameworks'},
      {name: 'express', tag: 'backend'},
      {name: 'cloudinary', tag: 'cloud'},
      {name: 'mui', tag: 'libraries'},
      {name: 'css', tag: 'languages'},
      {name: 'cloudflare', tag: 'cloud'},
      {name: 'figma', tag: 'design'},
      {name: 'git', tag: 'tools'},
      {name: 'github', tag: 'tools'},
      {name: 'mongodb', tag: 'databases'},
      {name: 'postgresql', tag: 'databases'},
      {name: 'vite', tag: 'frameworks'},
      {name: 'zod', tag: 'tools'},
      {name: 'javascript', tag: 'languages'},
      {name: 'netlify', tag: 'cloud'},
      {name: 'nodedotjs', tag: 'backend'},
      {name: 'npm', tag: 'tools'},
      {name: 'markdown', tag: 'languages'},
      {name: 'shadcnui', tag: 'libraries'},
    ],
    []
  )

  const allTags = useMemo(() => {
    return [
      'languages',
      'frameworks',
      'tools',
      'libraries',
      'databases',
      'cloud',
      'backend',
      'design',
    ]
  }, [technologies])

  const [activeTags, setActiveTags] = useState<string[]>(allTags)
  const [selectedTag, setSelectedTag] = useState<string | null>(null)

  const handleTagClick = (tag: string) => {
    if (selectedTag === tag) {
      setSelectedTag(null)
      setActiveTags(allTags)
    } else {
      setSelectedTag(tag)
      setActiveTags([tag])
    }
  }

  return (
    <>
      <div className={styles.carouselContainer}>
        <div className={styles.carouselTrack}>
          {technologies.map((tech, index) => (
            <TechBadge
              key={`${tech.name}-${index}`}
              tech={tech.name}
              disabled={!activeTags.includes(tech.tag)}
            />
          ))}
          {/* Duplicado de los elementos para el efecto infinito */}
          {technologies.map((tech, index) => (
            <TechBadge
              key={`duplicate-${tech}-${index}`}
              tech={tech.name}
              disabled={!activeTags.includes(tech.tag)}
            />
          ))}
        </div>
        <div className={`${styles.carouselTrack} ${styles.reverse}`}>
          {technologies.map((tech, index) => (
            <TechBadge
              key={`${tech.name}-${index}`}
              tech={tech.name}
              disabled={!activeTags.includes(tech.tag)}
            />
          ))}
          {/* Duplicado de los elementos para el efecto infinito */}
          {technologies.map((tech, index) => (
            <TechBadge
              key={`duplicate-${tech}-${index}`}
              tech={tech.name}
              disabled={!activeTags.includes(tech.tag)}
            />
          ))}
        </div>
      </div>
      <div className={styles.tagsContainer}>
        <button
          className={selectedTag === 'languages' ? styles.active : ''}
          onMouseEnter={() => setActiveTags(['languages'])}
          onMouseLeave={() => !selectedTag && setActiveTags(allTags)}
          onClick={() => handleTagClick('languages')}
        >
          <Code />
        </button>
        <button
          className={selectedTag === 'frameworks' ? styles.active : ''}
          onMouseEnter={() => setActiveTags(['frameworks'])}
          onMouseLeave={() => !selectedTag && setActiveTags(allTags)}
          onClick={() => handleTagClick('frameworks')}
        >
          <Atom />
        </button>
        <button
          className={selectedTag === 'tools' ? styles.active : ''}
          onMouseEnter={() => setActiveTags(['tools'])}
          onMouseLeave={() => !selectedTag && setActiveTags(allTags)}
          onClick={() => handleTagClick('tools')}
        >
          <Hammer />
        </button>
        <button
          className={selectedTag === 'libraries' ? styles.active : ''}
          onMouseEnter={() => setActiveTags(['libraries'])}
          onMouseLeave={() => !selectedTag && setActiveTags(allTags)}
          onClick={() => handleTagClick('libraries')}
        >
          <Library />
        </button>
        <button
          className={selectedTag === 'databases' ? styles.active : ''}
          onMouseEnter={() => setActiveTags(['databases'])}
          onMouseLeave={() => !selectedTag && setActiveTags(allTags)}
          onClick={() => handleTagClick('databases')}
        >
          <Database />
        </button>
        <button
          className={selectedTag === 'cloud' ? styles.active : ''}
          onMouseEnter={() => setActiveTags(['cloud'])}
          onMouseLeave={() => !selectedTag && setActiveTags(allTags)}
          onClick={() => handleTagClick('cloud')}
        >
          <Cloud />
        </button>
        <button
          className={selectedTag === 'backend' ? styles.active : ''}
          onMouseEnter={() => setActiveTags(['backend'])}
          onMouseLeave={() => !selectedTag && setActiveTags(allTags)}
          onClick={() => handleTagClick('backend')}
        >
          <Server />
        </button>
        <button
          className={selectedTag === 'design' ? styles.active : ''}
          onMouseEnter={() => setActiveTags(['design'])}
          onMouseLeave={() => !selectedTag && setActiveTags(allTags)}
          onClick={() => handleTagClick('design')}
        >
          <Palette />
        </button>
      </div>
    </>
  )
}
