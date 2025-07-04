import type { Project } from "@/content/config";
import type { ProjectType } from "@/content/config";

export default function filterProjectsByType(
  projects: Project[],
  filterType: ProjectType
) {
  return projects.filter((project) => project.data.type === filterType);
}
