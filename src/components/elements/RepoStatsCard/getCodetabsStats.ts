interface CodeTabsStats {
  language: string
  linesOfCode: number
  bytes: number
}

type CodeTabsApiResponse = CodeTabsStats[]

export async function getCodetabsStats(repository: string) {
  const author = repository.split('/')[3]
  const slug = repository.split('/')[4]

  const response = await fetch(
    `https://api.codetabs.com/v1/loc?github=${author}/${slug}`
  )

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`)
  }

  const data: CodeTabsApiResponse = await response.json()

  return data
}
