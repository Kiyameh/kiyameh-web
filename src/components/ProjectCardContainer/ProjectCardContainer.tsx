import {useMemo, useState} from 'react'
import styles from './ProjectCardContainer.module.css'
import {getTypeIcon, filterProjectsByType} from './functions'
import type {Project} from '../../content/config'
import { Asterisk } from 'lucide-react'
import ProjectCard from '../ProjectCard/ProjectCard'
import Button from '../ui/Button/Button'

export default function ProjectCardContainer({
  projects,
  language,
}: {
  projects: Project[]
  language: 'en' | 'es'
}) {
  const [activeFilter, setActiveFilter] = useState('all')
  const [filteredProjects, setFilteredProjects] = useState(projects)

  const translations = useMemo(() => {
    return {
      en: {
        all: 'All',
        filterTypes: {
          webpage: 'Webpage',
          tool: 'Tool',
          package: 'Package',
          design: 'Design',
        },
      },
      es: {
        all: 'Todos',
        filterTypes: {
          webpage: 'Página Web',
          tool: 'Herramienta',
          package: 'Paquete',
          design: 'Diseño',
        },
      },
    }
  }, [language])

  const filterProjects = (filterType: string) => {
    setActiveFilter(filterType)
    const filtered = filterProjectsByType(projects, filterType)
    setFilteredProjects(filtered)
  }

  return (
    <>
      {/* Sección de filtros */}
      <section className={styles.filtersSection}>        
            <Button
              active={activeFilter === 'all'}
              onClick={() => filterProjects('all')}
            >
                <Asterisk className={styles.filterIcon}/>
              {translations[language].all}
            </Button>

            {Object.entries(translations[language].filterTypes).map(([key, label]) => (
              <Button
                key={key}
                active={activeFilter === key}
                onClick={() => filterProjects(key)}
              >
                <span className={styles.filterIcon}>{getTypeIcon(key)}</span>
                {label}
              </Button>
            ))}
      </section>

      {/* Sección de proyectos */}
      <section className={styles.projectsSection}>
          {filteredProjects.map((project) => (
            <ProjectCard
              key={project.data.slug}
              project={project}
              language={language}
            />
          ))}
      </section>
    </>
  )
}
