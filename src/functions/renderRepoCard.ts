import { renderRepoCard, type RepoStats } from "github-repo-stats-card";

export function renderStatsCard(selector: string, stats: RepoStats) {
  renderRepoCard(selector, stats);
}
