'use client'

import { useState } from 'react'
import styles from './index.module.css'
import LogprobsDisplay from '@/components/layouts/LogprobsDisplay'
import ResponseBox from '@/components/common/ResponseBox'
import InputBox from '@/components/common/InputBox'
import ConfigModal from '@/components/modal/ConfigModal'
import { TokenInfo, ResultData } from '@/types'
import ParameterBox from '@/components/common/ParameterBox'

export default function ChatInterface() {
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
    }
  }

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>ChatGPT API Interface</h1>
      <InputBox
        apiKey={apiKey}
        prompt={prompt}
        setPrompt={setPrompt}
        setIsModalOpen={setIsModalOpen}
        handleSubmit={handleSubmit}
      />
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
          <ResponseBox result={result.text} />
          <ParameterBox
            model={model}
            maxTokens={maxTokens}
            seed={seed}
            topLogprobs={topLogprobs}
            temperature={temperature}
            topP={topP}
          />
        </>
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
