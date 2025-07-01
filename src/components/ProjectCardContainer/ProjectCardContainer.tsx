import {useState} from 'react'
import {GradientButton} from 'need-more-gradients-ui'
import styles from './ProjectCardContainer.module.css'
import {getTypeIcon, filterProjectsByType} from './functions'
import type {Project} from '../../content/config'
import {translations} from './translations'

export default function ProjectCardContainer({
  projects,
  language,
}: {
  projects: Project[]
  language: 'en' | 'es'
}) {
  const t = translations[language]
  const [activeFilter, setActiveFilter] = useState('all')
  const [filteredProjects, setFilteredProjects] = useState(projects)

  const filterProjects = (filterType: string) => {
    setActiveFilter(filterType)
    const filtered = filterProjectsByType(projects, filterType)
    setFilteredProjects(filtered)
  }

  return (
    <>
      {/* Sección de filtros */}
      <section className={styles.filtersSection}>
        <div className={styles.filtersContainer}>
          <div className={styles.filterButtons}>
            <button
              className={`${styles.filterButton} ${
                activeFilter === 'all' ? styles.filterButtonActive : ''
              }`}
              onClick={() => filterProjects('all')}
            >
              <span className={styles.filterIcon}>
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"></path>
                </svg>
              </span>
              <span className={styles.filterLabel}>{t.all}</span>
            </button>

            {Object.entries(t.filterTypes).map(([key, label]) => (
              <button
                key={key}
                className={`${styles.filterButton} ${
                  activeFilter === key ? styles.filterButtonActive : ''
                }`}
                onClick={() => filterProjects(key)}
              >
                <span className={styles.filterIcon}>{getTypeIcon(key)}</span>
                <span className={styles.filterLabel}>{label}</span>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Sección de proyectos */}
      <section className={styles.projectsSection}>
        <div className={styles.projectsContainer}>
          {filteredProjects.map((project) => (
            <article
              key={project.data.slug}
              className={styles.projectCard}
              data-type={project.data.type}
            >
              <div className={styles.projectImage}>
                {project.data.mainImage ? (
                  <img
                    src={project.data.mainImage}
                    alt={`Screenshot of ${project.data.name}`}
                    loading="lazy"
                  />
                ) : (
                  <div className={styles.screenshotPlaceholder}>
                    <div className={styles.placeholderContent}>
                      <div className={styles.placeholderHeader}>
                        <div className={styles.placeholderDots}>
                          <div className={styles.dot} />
                          <div className={styles.dot} />
                          <div className={styles.dot} />
                        </div>
                      </div>
                      <div className={styles.placeholderBody}>
                        <div className={styles.placeholderText}>
                          I'm a placeholder :)
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                <GradientButton
                  primary
                  roundness={0.6}
                  borderWidth={2}
                  className={styles.projectButton}
                >
                  <a href={`/${language}/projects/${project.data.slug}`}>
                    {t.viewDetails}
                  </a>
                </GradientButton>
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
                    <a
                      href={project.data.repository}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={styles.projectLink}
                    >
                      <svg
                        width="20"
                        height="20"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                      >
                        <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                      </svg>
                      {t.repository}
                    </a>
                  )}

                  {project.data.url && (
                    <a
                      href={project.data.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={styles.projectLink}
                    >
                      <svg
                        width="20"
                        height="20"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                      >
                        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
                      </svg>
                      {t.viewProject}
                    </a>
                  )}
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>
    </>
  )
}
