export interface RepoStats {
    name: string
    fullName: string
    htmlUrl: string
    stargazersCount: number
    forksCount: number
    openIssuesCount: number
    description: string
    createdAt: string
    updatedAt: string
  }

export async function fetchRepoStats(repository: string, githubToken: string | undefined): Promise<RepoStats | undefined> {
try {
    const author = repository.split("/")[3];
    const slug = repository.split("/")[4];

    const headers = {
        Accept: 'application/vnd.github.v3+json',
      } as Record<string, string>
  
      if (githubToken) {
        headers.Authorization = `Bearer ${githubToken}`
      }

      const response = await fetch(`https://api.github.com/repos/${author}/${slug}`, { headers })

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }
      
      const data: RepoStats = await response.json()
      
      return data
} catch (error) {
    console.error(error)
    return undefined
}


}


