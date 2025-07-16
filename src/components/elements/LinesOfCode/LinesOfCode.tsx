import {useState, useEffect} from 'react'
import {Code} from 'lucide-react'
import styles from './LinesOfCode.module.css'

interface CodeTabsStats {
  language: string
  linesOfCode: number
  bytes: number
}

type CodeTabsApiResponse = CodeTabsStats[]

export default function LinesOfCode({
  repositoryUrl,
  language,
}: {
  repositoryUrl: string
  language: 'en' | 'es'
}) {
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
      <div className={styles.loaderContainer}>
        <span className={styles.loader}></span>
        <span>Loading stats...</span>
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
    <div className={styles.container}>
      <Code className={styles.icon} />
      <span>
        {lines} {language === 'es' ? 'líneas de código' : 'lines of code'}
      </span>
    </div>
  )
}
