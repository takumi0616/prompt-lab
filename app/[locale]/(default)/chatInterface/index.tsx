'use client'

import { useState, useEffect } from 'react'
import { useTranslations } from 'next-intl'
import { Element, scroller } from 'react-scroll'
import styles from './index.module.css'
import { TokenInfo, ResultData } from '@/types'
import {
  ConfigModal,
  CorrectBox,
  FirstModal,
  GeneratedResultsBox,
  InputBox,
  InstructionModal,
} from '@/components/common'
import { LogprobsDisplay } from '@/components/layouts'

export default function ChatInterface() {
  const t = useTranslations('chatInterface')
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
  const [isFirstModalOpen, setIsFirstModalOpen] = useState(true)
  const [isInstructionModalOpen, setIsInstructionModalOpen] = useState(false)
  const [isToggled, setIsToggled] = useState(false)
  const [isTextareaExpanded, setIsTextareaExpanded] = useState(false)
  const [isHidden, setIsHidden] = useState(true)

  useEffect(() => {
    if (result) {
      scroller.scrollTo('generatedResultsBox', {
        duration: 800,
        smooth: 'true',
        offset: -30,
      })
    }
  }, [result])

  useEffect(() => {
    setIsFirstModalOpen(true)
  }, [])

  useEffect(() => {
    const handleTextareaExpansion = () => {
      if (isToggled) {
        setIsTextareaExpanded(true)
        setIsHidden(false)
      } else {
        const timer = setTimeout(() => {
          setIsHidden(true)
        }, 500)
        return () => clearTimeout(timer)
      }
    }

    const handleResultExpansion = () => {
      if (result) {
        setIsTextareaExpanded(true)
      } else if (!result && !isToggled) {
        setIsTextareaExpanded(false)
      }
    }

    handleTextareaExpansion()
    handleResultExpansion()
  }, [isToggled, result])

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

  const handleCloseFirstModal = () => {
    setIsFirstModalOpen(false)
  }

  const handleSwitchToInstruction = () => {
    setIsFirstModalOpen(false)
    setIsInstructionModalOpen(true)
  }

  const handleCloseInstructionModal = () => {
    setIsInstructionModalOpen(false)
  }

  const handleBackToFirstModal = () => {
    setIsInstructionModalOpen(false)
    setIsFirstModalOpen(true)
  }

  return (
    <>
      <div
        className={`${styles.heroContainer} ${
          isTextareaExpanded ? styles.expanded : ''
        }`}
      >
        <div className={styles.hero}>
          <h1 className={styles.title}>{t('Chat with an AI')}</h1>
          <h2 className={styles.subtitle}>
            {t('Click on the gear icon to set the optimal parameters')}
          </h2>
        </div>
        <div className={styles.components}>
          <InputBox
            apiKey={apiKey}
            prompt={prompt}
            setPrompt={setPrompt}
            setIsModalOpen={setIsModalOpen}
            handleSubmit={handleSubmit}
            isToggled={isToggled}
            setIsToggled={setIsToggled}
            isLoading={isLoading}
            setIsTextareaExpanded={setIsTextareaExpanded}
          />
          <div
            className={`${styles.components} 
            ${isToggled ? styles.slideDown : styles.slideUp}
              ${isHidden ? styles.hidden : ''}`}
          >
            <div className={styles.hideComponent}>
              <p>{t('Expected Answer')}</p>
              <CorrectBox
                correctText={correctText}
                setCorrectText={setCorrectText}
              />
            </div>
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

      {isFirstModalOpen && (
        <FirstModal
          onClose={handleCloseFirstModal}
          onSwitchToExplanation={handleSwitchToInstruction}
          setApiKey={setApiKey}
        />
      )}

      {isInstructionModalOpen && (
        <InstructionModal
          onClose={handleCloseInstructionModal}
          onFirst={handleBackToFirstModal}
        />
      )}

      {error && (
        <div
          className={`${styles.bgRed} ${styles.borderRed} ${styles.textRed} ${styles.px} ${styles.py} ${styles.rounded} ${styles.mb}`}
        >
          <h2 className={styles.bold}>{t('Error')}:</h2>
          <p>{error}</p>
        </div>
      )}
      {result && (
        <>
          <div className={styles.fadeIn}>
            <Element name="generatedResultsBox">
              <GeneratedResultsBox
                result={result.text}
                model={model}
                maxTokens={maxTokens}
                seed={seed}
                topLogprobs={topLogprobs}
                temperature={temperature}
                topP={topP}
              />
            </Element>
            {result.similarityScore !== undefined && (
              <div className={`${styles.fadeIn} ${styles.mb}`}>
                <h2 className={styles.scoreText}>
                  {t('Similarity Score')}: {result.similarityScore}
                </h2>
              </div>
            )}
          </div>
        </>
      )}
      {logprobs.length > 0 && (
        <div className={`${styles.fadeIn} ${styles.mb}`}>
          <LogprobsDisplay logprobs={logprobs} />
        </div>
      )}
    </>
  )
}
