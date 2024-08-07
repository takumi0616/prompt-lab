// next/app/components/ChatInterface/index.tsx
'use client'

import { useState } from 'react'
import LogprobsDisplay from '@/components/LogprobsDisplay'
import styles from '@/components/ChatInterface/index.module.css'
import { TokenInfo, ResultData } from '@/types'

export default function ChatInterface() {
  const [apiKey, setApiKey] = useState('')
  const [prompt, setPrompt] = useState('')
  const [result, setResult] = useState<ResultData | null>(null)
  const [logprobs, setLogprobs] = useState<TokenInfo[]>([])
  const [error, setError] = useState<string>('')

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault()
    setError('')
    setResult(null)
    setLogprobs([])

    try {
      const response = await fetch('/api/chatgpt', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ apiKey, text: prompt }),
      })

      if (!response.ok) {
        throw new Error(`API request failed with status ${response.status}`)
      }

      const data: ResultData = await response.json()

      setResult(data)

      if (data.text) {
        setResult(data)
      } else {
        throw new Error('No text returned from API')
      }

      if (data.data.choices[0].logprobs) {
        setLogprobs(data.data.choices[0].logprobs.content)
      } else {
        throw new Error('No logprobs found in API response')
      }
    } catch (error: unknown) {
      if (error instanceof Error) {
        setError(error.message)
      } else {
        setError('An unknown error occurred')
      }
    }
  }

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>ChatGPT API Interface</h1>
      <form onSubmit={handleSubmit} className={styles.form}>
        <div className={styles.mb}>
          <label htmlFor="apiKey" className={styles.label}>
            API Key:
          </label>
          <input
            type="text"
            id="apiKey"
            value={apiKey}
            onChange={(e) => setApiKey(e.target.value)}
            required
            className={styles.input}
          />
        </div>
        <div className={styles.mb}>
          <label htmlFor="prompt" className={styles.label}>
            Prompt:
          </label>
          <input
            type="text"
            id="prompt"
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            required
            className={styles.input}
          />
        </div>
        <button
          type="submit"
          disabled={!apiKey || !prompt}
          className={styles.button}
        >
          Send
        </button>
      </form>
      {error && (
        <div
          className={`${styles.bgRed} ${styles.borderRed} ${styles.textRed} ${styles.px} ${styles.py} ${styles.rounded} ${styles.mb}`}
        >
          <h2 className={styles.bold}>Error:</h2>
          <p>{error}</p>
        </div>
      )}
      {result && (
        <div className={styles.mb}>
          <h2 className={styles.bold}>Result:</h2>
          <p>{result.text}</p>
        </div>
      )}
      {logprobs.length > 0 && (
        <div>
          <h2 className={`${styles.bold} ${styles.mb}`}>Log Probabilities:</h2>
          <LogprobsDisplay logprobs={logprobs} />
        </div>
      )}
    </div>
  )
}
