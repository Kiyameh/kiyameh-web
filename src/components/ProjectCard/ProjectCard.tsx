import { useMemo } from 'react'
import styles from './ProjectCard.module.css'
import type {Project} from '../../content/config'
import {Eye, Github} from 'lucide-react'
import Button from '../ui/Button/Button'
import WebPagePlaceholder from '../ui/WebPagePlaceholder/WebPagePlaceholder'

interface ProjectCardProps {
  project: Project
  language: 'en' | 'es'
}

export default function ProjectCard({
  project,
  language,
}: ProjectCardProps) {

  const translations = useMemo(() => {
    return {
      en: {
        repository: 'Repository',
        viewProject: 'Live Project',
        viewDetails: 'View Details',
      },
      es: {
        repository: 'Repositorio',
        viewProject: 'En vivo',
        viewDetails: 'Ver Detalles',
      },
    }
  }, [language])


  return (
    <article className={styles.projectCard}>
      <div className={styles.projectImage}>
        {project.data.mainImage ? (
          <img
            src={project.data.mainImage}
            alt={`Screenshot of ${project.data.name}`}
            loading="lazy"
          />
        ) : (
          <WebPagePlaceholder />
        )}
      </div>

      <div className={styles.projectContent}>
        <header className={styles.projectHeader}>
          <h2 className={styles.projectTitle}>{project.data.name}</h2>
          <p className={styles.projectDescription}>
            {project.data.description}
          </p>
        </header>

        <div className={styles.projectLinks}>
          {project.data.repository && (
            <Button
              href={project.data.repository}
              target="_blank"
              rel="noopener noreferrer"
            >
              <Github className={styles.projectLinkIcon} />
              {translations[language].repository}
            </Button>
          )}

          {project.data.url && (
            <Button
              href={project.data.url}
              target="_blank"
              rel="noopener noreferrer"
            >
              <div className={styles.liveIndicator}>
              </div>
              {translations[language].viewProject}
            </Button>
          )}

          <Button
            primary
            href={`/${language}/projects/${project.data.slug}`}
            className={styles.detailsButton}
          >
            <Eye className={styles.projectLinkIcon} />
            {translations[language].viewDetails}
          </Button>
        </div>
      </div>
    </article>
  )
}
