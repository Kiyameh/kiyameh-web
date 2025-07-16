import React, {useState, useEffect} from 'react'
import {Loader2} from 'lucide-react'
import technologies from '@/content/technologies.json'

interface CodeTabsStats {
  language: string
  linesOfCode: number
  bytes: number
}

type CodeTabsApiResponse = CodeTabsStats[]

const getSimpleIconPath = (languageName: string): string | null => {
  const normalizedName = languageName.toLowerCase()
  const technology = technologies[normalizedName as keyof typeof technologies]
  return technology?.svgPath || null
}

export default function LanguagePercents({
  repositoryUrl,
}: {
  repositoryUrl: string
}) {
  const [topLanguages, setTopLanguages] = useState<
    {language: string; percentage: number; iconPath: string | null}[]
  >([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)

  const author = repositoryUrl.split('/')[3]
  const repository = repositoryUrl.split('/')[4]

  useEffect(() => {
    const fetchLanguagePercentages = async () => {
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

        const rawLanguages = data.filter(
          (item) => item.language !== 'Total' && item.language !== 'JSON'
        )

        const totalLinesOfCode = rawLanguages.reduce(
          (sum, lang) => sum + lang.linesOfCode,
          0
        )

        if (totalLinesOfCode === 0) {
          setTopLanguages([])
          setLoading(false)
          return
        }

        const processedLanguages = rawLanguages.map((lang) => ({
          language: lang.language,
          percentage: (lang.linesOfCode / totalLinesOfCode) * 100,
        }))

        const sortedLanguages = processedLanguages.sort(
          (a, b) => b.percentage - a.percentage
        )

        const top3 = sortedLanguages.slice(0, 3)

        const languagesWithIcons = top3.map((lang) => ({
          ...lang,
          iconPath: getSimpleIconPath(lang.language),
        }))

        console.log(languagesWithIcons)
        setTopLanguages(languagesWithIcons)
      } catch (err) {
        console.error('Failed to fetch language percentages:', err)
        setError(true)
      } finally {
        setLoading(false)
      }
    }

    if (repository) {
      fetchLanguagePercentages()
    }
  }, [repository])

  if (loading) {
    return (
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: '50px',
        }}
      >
        <Loader2
          style={{
            animation: 'spin 1s linear infinite',
            color: 'var(--primary)',
            width: '24px',
            height: '24px',
          }}
        />
      </div>
    )
  }

  if (error) {
    return null
  }

  if (topLanguages.length === 0) {
    return null
  }

  return (
    <div style={{display: 'flex', flexDirection: 'column', gap: '10px'}}>
      {topLanguages.map((lang, index) => (
        <div
          key={index}
          style={{display: 'flex', alignItems: 'center', gap: '10px'}}
        >
          {lang.iconPath ? (
            <svg style={{width: '24px', height: '24px', scale: '0.8'}}>
              <path
                d={lang.iconPath}
                fill="var(--content)"
              />
            </svg>
          ) : (
            // Fallback si no hay icono
            <div
              style={{
                width: '24px',
                height: '24px',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                border: '1px solid var(--border)',
                borderRadius: '4px',
                fontSize: '0.8em',
              }}
            >
              {lang.language.charAt(0).toUpperCase()}
            </div>
          )}
          <span style={{fontWeight: 'bold'}}>{lang.language}:</span>
          <span>{lang.percentage.toFixed(1)}%</span>
        </div>
      ))}
    </div>
  )
}
