import type { Project } from "@/content/config";
import type { ProjectCategory } from "@/content/config";

export default function filterProjectsByType(
	projects: Project[],
	filterType: ProjectCategory,
) {
	return projects.filter((project) => project.data.type === filterType);
}
