import type { Project } from "@/content/config";

/*
 * @version 1
 * @revisado 17/07/2025
 * @descripcion: Función para ordenar proyectos por relevancia
 */

export function sortProjectByRelevancy(projects: Project[]) {
	return projects.sort((a, b) => {
		const relevancyA = a.data.relevancy ?? 1;
		const relevancyB = b.data.relevancy ?? 1;
		return relevancyB - relevancyA;
	});
}
