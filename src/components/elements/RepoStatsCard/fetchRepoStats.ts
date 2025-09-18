export interface RepoStats {
	name: string;
	fullName: string;
	htmlUrl: string;
	stargazersCount: number;
	forksCount: number;
	openIssuesCount: number;
	description: string;
	createdAt: string;
	updatedAt: string;
}

export async function fetchRepoStats(
	repository: string,
	githubToken: string | undefined,
): Promise<RepoStats | undefined> {
	try {
		const author = repository.split("/")[3];
		const slug = repository.split("/")[4];

		const headers = {
			Accept: "application/vnd.github.v3+json",
		} as Record<string, string>;

		if (githubToken) {
			headers.Authorization = `Bearer ${githubToken}`;
		}

		const response = await fetch(
			`https://api.github.com/repos/${author}/${slug}`,
			{ headers },
		);

		if (!response.ok) {
			throw new Error(`HTTP error! status: ${response.status}`);
		}

		const data = await response.json();

		const selectedData: RepoStats = {
			name: data.name,
			fullName: data.full_name,
			htmlUrl: data.html_url,
			stargazersCount: data.stargazers_count,
			forksCount: data.forks_count,
			openIssuesCount: data.open_issues_count,
			description: data.description || "No description",
			createdAt: data.created_at,
			updatedAt: data.updated_at,
		};

		return selectedData;
	} catch (error) {
		console.error(error);
		return undefined;
	}
}
