'use client'

import { useState } from 'react'
import styles from './index.module.css'
import LogprobsDisplay from '@/components/layouts/LogprobsDisplay'
import InputBox from '@/components/common/InputBox'
import ConfigModal from '@/components/modal/ConfigModal'
import { TokenInfo, ResultData } from '@/types'
import GeneratedResultsBox from '@/components/common/GeneratedResultsBox'

export default function ChatInterface() {
  const [model, setModel] = useState('gpt-4o')
  const [apiKey, setApiKey] = useState('')
  const [prompt, setPrompt] = useState('')
  const [maxTokens, setMaxTokens] = useState(300)
  const [seed, setSeed] = useState(100)
  const [topLogprobs, setTopLogprobs] = useState(3)
  const [temperature, setTemperature] = useState(1)
  const [topP, setTopP] = useState(1)
  const [result, setResult] = useState<ResultData | null>(null)
  const [logprobs, setLogprobs] = useState<TokenInfo[]>([])
  const [error, setError] = useState<string>('')
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [correctText, setCorrectText] = useState('')

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

      // correctTextが空でない場合にEmbedding APIを呼び出す
      if (correctText.trim() !== '') {
        const embeddingResponse = await fetch('/api/embedding', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            apiKey,
            text1: correctText,
            text2: data.text,
          }),
        })

        if (!embeddingResponse.ok) {
          throw new Error(
            `Embedding API request failed with status ${embeddingResponse.status}`,
          )
        }

        const embeddingData = await embeddingResponse.json()
        setResult((prevResult) => {
          if (prevResult) {
            return {
              ...prevResult,
              similarityScore: embeddingData.similarityScore,
            }
          } else {
            return {
              text: data.text,
              data: data.data,
              similarityScore: embeddingData.similarityScore,
            }
          }
        })
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

  return (
    <>
      <div className={styles.heroContainer}>
        <div className={styles.hero}>
          <h1 className={styles.title}>Chat with an AI</h1>
          <h2 className={styles.subtitle}>
            Click on the gear icon to set the optimal parameters
          </h2>
          <div>
            <textarea
              placeholder="Enter correct text here..."
              value={correctText}
              onChange={(e) => setCorrectText(e.target.value)}
              style={{ width: '100%', marginBottom: '10px' }}
            />
          </div>
          <div>
            <p>input box</p>
          </div>
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
          <div className={styles.fadeIn}>
            <GeneratedResultsBox
              result={result.text}
              model={model}
              maxTokens={maxTokens}
              seed={seed}
              topLogprobs={topLogprobs}
              temperature={temperature}
              topP={topP}
            />
            {result.similarityScore !== undefined && (
              <div className={styles.fadeIn}>
                <h2>Similarity Score: {result.similarityScore}</h2>
              </div>
            )}
          </div>
        </>
      )}
      {logprobs.length > 0 && (
        <div className={styles.fadeIn}>
          <LogprobsDisplay logprobs={logprobs} />
        </div>
      )}
    </>
  )
}
