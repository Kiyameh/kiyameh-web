import {Globe, Wrench, Package, Palette, Asterisk} from 'lucide-react'
import styles from './ProjectCardContainer.module.css'
import type {Project} from '../../content/config'

export function getTypeIcon(type: string) {
  switch (type) {
    case 'webpage':
      return <Globe className={styles.typeIcon} />
    case 'tool':
      return <Wrench className={styles.typeIcon} />
    case 'package':
      return <Package className={styles.typeIcon} />
    case 'design':
      return <Palette className={styles.typeIcon} />
    default:
      return <Asterisk className={styles.typeIcon} />
  }
}

export function getTypeColor(type: string) {
  switch (type) {
    case 'webpage':
      return styles.typeWebpage
    case 'tool':
      return styles.typeTool
    case 'package':
      return styles.typePackage
    case 'design':
      return styles.typeDesign
    default:
      return styles.typeOther
  }
}

export function filterProjects(
  projects: Project[],
  searchTerm: string,
  activeFilter: string | null
) {
  return projects.filter((project) => {
    const matchesFilter =
      activeFilter === null || project.data.type === activeFilter
    const matchesSearch =
      project.data.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      project.data.description_en
        .toLowerCase()
        .includes(searchTerm.toLowerCase())
    return matchesFilter && matchesSearch
  })
}

// Función específica para el filtrado por tipo
export function filterProjectsByType(projects: any[], filterType: string) {
  if (filterType === 'all') {
    return projects
  }
  return projects.filter((project) => project.data.type === filterType)
}
