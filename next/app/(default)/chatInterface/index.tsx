'use client'

import { useState } from 'react'
import { signOut, useSession } from 'next-auth/react'
import styles from './index.module.css'
import LogprobsDisplay from '@/components/layouts/LogprobsDisplay'
import InputBox from '@/components/common/InputBox'
import ConfigModal from '@/components/modal/ConfigModal'
import { TokenInfo, ResultData } from '@/types'
import GeneratedResultsBox from '@/components/common/GeneratedResultsBox'

export default function ChatInterface() {
  const { data: session } = useSession()
  const [model, setModel] = useState('gpt-4o')
  const [apiKey, setApiKey] = useState('')
  const [prompt, setPrompt] = useState('')
  const [maxTokens, setMaxTokens] = useState(30)
  const [seed, setSeed] = useState(27)
  const [topLogprobs, setTopLogprobs] = useState(10)
  const [temperature, setTemperature] = useState(0)
  const [topP, setTopP] = useState(1)
  const [result, setResult] = useState<ResultData | null>(null)
  const [logprobs, setLogprobs] = useState<TokenInfo[]>([])
  const [error, setError] = useState<string>('')
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault()
    setError('')
    setResult(null)
    setLogprobs([])
    setIsLoading(true)

    try {
      const response = await fetch('/api/chatgpt', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          apiKey,
          text: prompt,
          model,
          max_tokens: maxTokens,
          seed,
          logprobs: true,
          top_logprobs: topLogprobs,
          temperature,
          top_p: topP,
        }),
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
    } finally {
      setIsLoading(false)
    }
  }

  const handleSaveResult = async () => {
    if (!result) return

    const response = await fetch('/api/results/save', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ text: result.text }),
    })

    if (!response.ok) {
      const errorText = await response.text()
      setError(`Failed to save result: ${errorText}`)
    }
  }

  return (
    <>
      <div className={styles.heroContainer}>
        <div className={styles.hero}>
          <h1 className={styles.title}>Chat with an AI</h1>
          <h2 className={styles.subtitle}>Check out the most likely options</h2>
          <div className={styles.components}>
            <InputBox
              apiKey={apiKey}
              prompt={prompt}
              setPrompt={setPrompt}
              setIsModalOpen={setIsModalOpen}
              handleSubmit={handleSubmit}
              isLoading={isLoading}
            />
          </div>
        </div>
      </div>
      <ConfigModal
        model={model}
        setModel={setModel}
        apiKey={apiKey}
        setApiKey={setApiKey}
        maxTokens={maxTokens}
        setMaxTokens={setMaxTokens}
        seed={seed}
        setSeed={setSeed}
        topLogprobs={topLogprobs}
        setTopLogprobs={setTopLogprobs}
        temperature={temperature}
        setTemperature={setTemperature}
        topP={topP}
        setTopP={setTopP}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />

      {session && <button onClick={() => signOut()}>Sign out</button>}
      {error && (
        <div
          className={`${styles.bgRed} ${styles.borderRed} ${styles.textRed} ${styles.px} ${styles.py} ${styles.rounded} ${styles.mb}`}
        >
          <h2 className={styles.bold}>Error:</h2>
          <p>{error}</p>
        </div>
      )}
      {result && (
        <>
          <GeneratedResultsBox
            result={result.text}
            model={model}
            maxTokens={maxTokens}
            seed={seed}
            topLogprobs={topLogprobs}
            temperature={temperature}
            topP={topP}
          />
          {session && (
            <button onClick={handleSaveResult} disabled={isLoading}>
              Save Result
            </button>
          )}
        </>
      )}
      {logprobs.length > 0 && (
        <div>
          <h2 className={`${styles.bold} ${styles.mb}`}>Log Probabilities:</h2>
          <LogprobsDisplay logprobs={logprobs} />
        </div>
      )}
    </>
  )
}
