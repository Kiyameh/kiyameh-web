import type {Project} from '@/content/config'

/*
 * @version 1
 * @revisado 02/07/2025
 * @descripcion: Función para ordenar proyectos por fecha
 */

export function sortProjectByDate(projects: Project[]) {
  return projects.sort((a, b) => {
    const dateA = a.data.date ? new Date(a.data.date).getTime() : 0
    const dateB = b.data.date ? new Date(b.data.date).getTime() : 0
    return dateB - dateA
  })
}
