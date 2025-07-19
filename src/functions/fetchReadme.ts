export async function fetchReadme(user: string, repo: string): Promise<string> {
  const url = `https://raw.githubusercontent.com/${user}/${repo}/main/README.md`
  const response = await fetch(url)
  if (!response.ok) throw new Error(`Error fetching README for ${repo}`)
  return await response.text()
}
