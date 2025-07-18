export type RepoLanguages = Record<string, number>

export async function fetchRepoLanguages(repository: string, githubToken: string | undefined): Promise<RepoLanguages | undefined> {
    try {
        const author = repository.split("/")[3];
        const slug = repository.split("/")[4];

        const headers = {
            Accept: 'application/vnd.github.v3+json',
          } as Record<string, string>
          
          if (githubToken) {
            headers.Authorization = `Bearer ${githubToken}`
          }

          const response = await fetch(`https://api.github.com/repos/${author}/${slug}/languages`, { headers })

          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`)
          }

          const data: RepoLanguages = await response.json()
          return data

    } catch (error) {
        console.error(error)
        return undefined
    }
}