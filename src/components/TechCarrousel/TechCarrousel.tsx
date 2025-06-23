import {useMemo, useState} from 'react'
import TechBadge from '../TechBadge/TechBadge'
import IconButton from '../IconButton/IconButton'
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
        <IconButton
          className={selectedTag === 'languages' ? styles.active : ''}
          onMouseEnter={() => setActiveTags(['languages'])}
          onMouseLeave={() => !selectedTag && setActiveTags(allTags)}
          onClick={() => handleTagClick('languages')}
          title="Languages"
        >
          <Code />
        </IconButton>
        <IconButton
          className={selectedTag === 'frameworks' ? styles.active : ''}
          onMouseEnter={() => setActiveTags(['frameworks'])}
          onMouseLeave={() => !selectedTag && setActiveTags(allTags)}
          onClick={() => handleTagClick('frameworks')}
          title="Frameworks"
        >
          <Atom />
        </IconButton>
        <IconButton
          className={selectedTag === 'tools' ? styles.active : ''}
          onMouseEnter={() => setActiveTags(['tools'])}
          onMouseLeave={() => !selectedTag && setActiveTags(allTags)}
          onClick={() => handleTagClick('tools')}
          title="Tools"
        >
          <Hammer />
        </IconButton>
        <IconButton
          className={selectedTag === 'libraries' ? styles.active : ''}
          onMouseEnter={() => setActiveTags(['libraries'])}
          onMouseLeave={() => !selectedTag && setActiveTags(allTags)}
          onClick={() => handleTagClick('libraries')}
          title="Libraries"
        >
          <Library />
        </IconButton>
        <IconButton
          className={selectedTag === 'databases' ? styles.active : ''}
          onMouseEnter={() => setActiveTags(['databases'])}
          onMouseLeave={() => !selectedTag && setActiveTags(allTags)}
          onClick={() => handleTagClick('databases')}
          title="Databases"
        >
          <Database />
        </IconButton>
        <IconButton
          className={selectedTag === 'cloud' ? styles.active : ''}
          onMouseEnter={() => setActiveTags(['cloud'])}
          onMouseLeave={() => !selectedTag && setActiveTags(allTags)}
          onClick={() => handleTagClick('cloud')}
          title="Cloud"
        >
          <Cloud />
        </IconButton>
        <IconButton
          className={selectedTag === 'backend' ? styles.active : ''}
          onMouseEnter={() => setActiveTags(['backend'])}
          onMouseLeave={() => !selectedTag && setActiveTags(allTags)}
          onClick={() => handleTagClick('backend')}
          title="Backend"
        >
          <Server />
        </IconButton>
        <IconButton
          className={selectedTag === 'design' ? styles.active : ''}
          onMouseEnter={() => setActiveTags(['design'])}
          onMouseLeave={() => !selectedTag && setActiveTags(allTags)}
          onClick={() => handleTagClick('design')}
          title="Design"
        >
          <Palette />
        </IconButton>
      </div>
    </>
  )
}
