import {useState, useEffect} from 'react'
import {Code, Loader2} from 'lucide-react'

interface CodeTabsStats {
  language: string
  linesOfCode: number
  bytes: number
}

type CodeTabsApiResponse = CodeTabsStats[]

export default function LinesOfCode({repositoryUrl}: {repositoryUrl: string}) {
  const [lines, setLines] = useState<number | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)

  const author = repositoryUrl.split('/')[3]
  const repository = repositoryUrl.split('/')[4]

  useEffect(() => {
    const fetchLinesOfCode = async () => {
      try {
        setLoading(true)
        setError(false)
        const response = await fetch(
          `https://api.codetabs.com/v1/loc?github=${author}/${repository}`
        )
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`)
        }
        const data: CodeTabsApiResponse = await response.json()
        const totalLines = data.find(
          (item) => item.language === 'Total'
        )?.linesOfCode

        if (totalLines !== undefined) {
          setLines(totalLines)
        } else {
          throw new Error('Total lines of code not found in response.')
        }
      } catch (err) {
        console.error('Failed to fetch lines of code:', err)
        setError(true)
      } finally {
        setLoading(false)
      }
    }

    if (repository) {
      fetchLinesOfCode()
    }
  }, [repository])

  if (loading) {
    return (
      <div>
        <Loader2 style={{animation: 'spin 1s linear infinite'}} />
      </div>
    )
  }

  if (error) {
    return null
  }

  if (lines === null) {
    return null
  }

  return (
    <div style={{display: 'flex', alignItems: 'center', gap: '8px'}}>
      <Code style={{color: 'var(--primary)', width: '20px', height: '20px'}} />
      <span style={{fontWeight: 'bold'}}>{lines} líneas de código</span>
    </div>
  )
}
