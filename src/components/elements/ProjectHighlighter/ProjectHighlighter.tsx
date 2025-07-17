import styles from './ProjectHighlighter.module.css'
import {useMemo, useState} from 'react'
import type {Project} from '@/content/config'
import Button from '@/components/ui/Button/Button'
import filterProjectsByType from '@/functions/filterProyectByType'
import {
  Asterisk,
  Globe,
  Wrench,
  Package,
  Palette,
  FileQuestion,
  FileCode2,
} from 'lucide-react'
import {StickyCard} from 'need-more-gradients-ui'

export default function ProjectHighlighter({
  projects,
  language,
}: {
  projects: Project[]
  language: 'es' | 'en'
}) {
  const [activeFilter, setActiveFilter] = useState<AvailableCategories>('all')
  const [filteredProjects, setFilteredProjects] = useState<Project[]>(projects)

  const proyectCategories = useMemo(() => {
    return [
      {name: 'all', label_es: 'Todos', label_en: 'All', icon: <Asterisk />},
      {
        name: 'webpage',
        label_es: 'Página Web',
        label_en: 'Webpage',
        icon: <Globe />,
      },
      {
        name: 'tool',
        label_es: 'Herramienta',
        label_en: 'Tool',
        icon: <Wrench />,
      },
      {
        name: 'package',
        label_es: 'Paquete',
        label_en: 'Package',
        icon: <Package />,
      },
      {
        name: 'design',
        label_es: 'Diseño',
        label_en: 'Design',
        icon: <Palette />,
      },
      {
        name: 'other',
        label_es: 'Otro',
        label_en: 'Other',
        icon: <FileQuestion />,
      },
    ]
  }, [])

  type AvailableCategories = (typeof proyectCategories)[number]['name']

  const filterProjects = (category: AvailableCategories) => {
    setActiveFilter(category)
    if (category === 'all') {
      setFilteredProjects(projects)
      return
    }
    const filtered = filterProjectsByType(projects, category)
    setFilteredProjects(filtered)
  }

  return (
    <section className={styles.projectExplorer}>
      <div className={styles.projectFilter}>
        {proyectCategories.map((category) => (
          <Button
            key={category.name}
            text={language === 'es' ? category.label_es : category.label_en}
            icon={category.icon}
            onClick={() => filterProjects(category.name)}
            active={activeFilter === category.name}
          />
        ))}
      </div>

      <ul className={styles.projectList}>
        {filteredProjects.map((project) => (
          <li
            key={project.id}
            className={styles.projectItem}
          >
            <a
              href={`projects/${project.data.slug}`}
              key={project.id}
            >
              <div className={styles.projectImage}>
                {project.data.logo && (
                  <img
                    src={project.data.logo}
                    alt={project.data.name}
                    className={styles.logoLight}
                  />
                )}
                {project.data.logo_dark && (
                  <img
                    src={project.data.logo_dark}
                    alt={project.data.name}
                    className={styles.logoDark}
                  />
                )}
                {!project.data.logo && !project.data.logo_dark && (
                  <FileCode2 className={styles.placeholderIcon} />
                )}
              </div>
              <StickyCard borderWidth={2}>
                <div className={styles.projectInfo}>
                  <h3>{project.data.name}</h3>
                  <p>
                    {language === 'es'
                      ? project.data.description
                      : project.data.description_en}
                  </p>
                </div>
              </StickyCard>
            </a>
          </li>
        ))}
      </ul>
    </section>
  )
}
