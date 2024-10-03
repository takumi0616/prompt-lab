import { useEffect, useState } from 'react'
import ReactMarkdown from 'react-markdown'
import styles from './FixPromptBox.module.css'
import { FixPromptProps } from '@/app/types'

export default function FixPromptBox({
  apiKey,
  userPrompt,
  output,
  desiredOutput,
  similarityScore,
}: FixPromptProps) {
  const [improvementSuggestions, setImprovementSuggestions] = useState<
    string | null
  >(null)
  const [loading, setLoading] = useState<boolean>(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchImprovementSuggestions = async () => {
      setLoading(true)
      setError(null)

      try {
        const response = await fetch('/api/fixprompt', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            apiKey,
            userPrompt,
            output,
            desiredOutput,
            similarityScore,
          }),
        })

        const data = await response.json()

        if (response.ok) {
          setImprovementSuggestions(data.improvementSuggestions)
        } else {
          setError(data.error || 'Failed to get improvement suggestions')
        }
      } catch (err: unknown) {
        if (err instanceof Error) {
          setError(err.message)
        } else {
          setError('Something went wrong')
        }
      } finally {
        setLoading(false)
      }
    }

    fetchImprovementSuggestions()
  }, [apiKey, userPrompt, output, desiredOutput, similarityScore])

  if (loading) return <p>Loading improvement suggestions...</p>
  if (error) return <p>Error: {error}</p>

  return (
    <div className={styles.fixPrompt}>
      {improvementSuggestions ? (
        <>
          <h3>改善提案</h3>
          <ReactMarkdown>{improvementSuggestions}</ReactMarkdown>
        </>
      ) : (
        <p>No improvement suggestions available</p>
      )}
    </div>
  )
}
