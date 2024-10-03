'use client'

import { useState, useEffect } from 'react'
import { Element, scroller } from 'react-scroll'
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa6'
import { motion, AnimatePresence } from 'framer-motion'
import { BsFillRocketTakeoffFill, BsChatTextFill } from 'react-icons/bs'
import { IoMdBookmarks } from 'react-icons/io'
import styles from './page.module.css'
import { TokenInfo, ResultData } from '@/app/types'
import {
  ConfigModal,
  CorrectBox,
  CreatePrompt,
  FirstModal,
  GeneratedResultsBox,
  InputBox,
  InstructionModal,
  TemplateModal,
  TemplatePrompt,
} from '@/app/components/common'
import { LogprobsDisplay, Header, Footer } from '@/app/components/layouts'
import SideBar from '@/app/components/layouts/SideBar'
import FixPromptBox from '@/app/components/common/FixPromptBox'

export default function Home() {
  const [checkboxStates, setCheckboxStates] = useState<boolean[]>(
    new Array(20).fill(false),
  )
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
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)
  const [selectedOption, setSelectedOption] = useState('promptBox')
  const [isTemplateModalOpen, setIsTemplateModalOpen] = useState(false)
  const [selectedTemplatePrompt, setSelectedTemplatePrompt] = useState('')

  const toggleSidebar = () => {
    setIsSidebarOpen((prevState) => !prevState)
  }

  useEffect(() => {
    if (result) {
      scroller.scrollTo('generatedResultsBox', {
        duration: 800,
        smooth: 'true',
        offset: -100,
      })
    }
  }, [result])

  useEffect(() => {
    setIsFirstModalOpen(true)
  }, [])

  useEffect(() => {
    if (isToggled) {
      // Expected Answerがオンの場合の処理
    }
  }, [isToggled, result])

  const resetCheckboxes = () => {
    setCheckboxStates(new Array(20).fill(false))
  }

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
      resetCheckboxes()
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

  const renderSidebarToggleButton = () => {
    return (
      <button
        className={`${styles.sidebarToggleButton} ${
          !isSidebarOpen ? styles.fuwafuwa : ''
        }`}
        onClick={toggleSidebar}
      >
        {isSidebarOpen ? (
          <FaChevronLeft size={24} />
        ) : (
          <FaChevronRight size={24} />
        )}
      </button>
    )
  }

  const handleCreatePromptComplete = (generatedPrompt: string) => {
    setPrompt(generatedPrompt)
    setSelectedOption('promptBox')
  }

  const handleTemplatePromptSelect = (prompt: string) => {
    setPrompt(prompt)
    setSelectedOption('promptBox')
    setIsTemplateModalOpen(false)
  }

  const handleTemplateModalOpen = (prompt: string) => {
    setSelectedTemplatePrompt(prompt)
    setIsTemplateModalOpen(true)
  }

  const handleTemplateModalClose = () => {
    setIsTemplateModalOpen(false)
  }

  return (
    <>
      <Header />
      <div className={styles.container}>
        <div
          className={`${styles.sidebar} ${isSidebarOpen ? styles.sidebarOpen : ''}`}
        >
          <SideBar
            isOpen={isSidebarOpen}
            checkboxStates={checkboxStates}
            setCheckboxStates={setCheckboxStates}
          />
        </div>
        {renderSidebarToggleButton()}
        <div
          className={`${styles.heroContainer} ${
            isSidebarOpen ? styles.heroContainerSidebarOpen : ''
          }`}
        >
          <div className={styles.menuContainer}>
            <div className={styles.menu}>
              <button
                onClick={() => setSelectedOption('promptBox')}
                className={
                  selectedOption === 'promptBox' ? styles.activeButton : ''
                }
              >
                <BsFillRocketTakeoffFill className={styles.icon} />
                Prompt Box
              </button>
              <button
                onClick={() => setSelectedOption('thinkPromptTogether')}
                className={
                  selectedOption === 'thinkPromptTogether'
                    ? styles.activeButton
                    : ''
                }
              >
                <BsChatTextFill className={styles.icon} />
                Think of a prompt together
              </button>
              <button
                onClick={() => setSelectedOption('templatePrompt')}
                className={
                  selectedOption === 'templatePrompt' ? styles.activeButton : ''
                }
              >
                <IoMdBookmarks className={styles.icon} />
                Template Prompt
              </button>
            </div>
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={selectedOption}
              initial={{ x: 300, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: -300, opacity: 0 }}
              transition={{ duration: 0.5 }}
              className={styles.transitionContainer}
            >
              {selectedOption === 'promptBox' && (
                <>
                  <div className={styles.hero}>
                    <h1 className={styles.title}>Chat with an AI</h1>
                    <h2 className={styles.subtitle}>
                      Click on the gear icon to set the optimal parameters
                    </h2>
                  </div>
                  <div className={styles.componentTop}>
                    <InputBox
                      apiKey={apiKey}
                      prompt={prompt}
                      setPrompt={setPrompt}
                      setIsModalOpen={setIsModalOpen}
                      handleSubmit={handleSubmit}
                      isToggled={isToggled}
                      setIsToggled={setIsToggled}
                      isLoading={isLoading}
                    />
                    {isToggled && (
                      <AnimatePresence>
                        <motion.div
                          initial={{ opacity: 0, y: -10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -10 }}
                          transition={{ duration: 0.5 }}
                          className={styles.componentBottom}
                        >
                          <div className={styles.hideComponent}>
                            <p>Expected Answer</p>
                            <CorrectBox
                              correctText={correctText}
                              setCorrectText={setCorrectText}
                            />
                          </div>
                        </motion.div>
                      </AnimatePresence>
                    )}
                  </div>
                </>
              )}
              {selectedOption === 'thinkPromptTogether' && (
                <>
                  <div className={styles.hero}>
                    <h1 className={styles.title}>Create your prompt</h1>
                    <h2 className={styles.subtitle}>
                      You can create a prompt just by answering a question
                    </h2>
                  </div>
                  <div className={styles.componentTop}>
                    <CreatePrompt onComplete={handleCreatePromptComplete} />
                  </div>
                </>
              )}
              {selectedOption === 'templatePrompt' && (
                <>
                  <div className={styles.hero}>
                    <h1 className={styles.title}>Select the template</h1>
                    <h2 className={styles.subtitle}>
                      Click the insert button and use the prompt
                    </h2>
                  </div>
                  <div className={styles.componentTop}>
                    <TemplatePrompt
                      onSelectPrompt={handleTemplatePromptSelect}
                      onOpenModal={handleTemplateModalOpen}
                    />
                  </div>
                </>
              )}
            </motion.div>
          </AnimatePresence>

          {isTemplateModalOpen && (
            <TemplateModal
              prompt={selectedTemplatePrompt}
              onClose={handleTemplateModalClose}
              onInsert={() =>
                handleTemplatePromptSelect(selectedTemplatePrompt)
              }
            />
          )}
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
          <h2 className={styles.bold}>Error:</h2>
          <p>{error}</p>
        </div>
      )}
      {result && (
        <div className={styles.resultBox}>
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
                  Similarity Score: {result.similarityScore}
                </h2>
                <FixPromptBox
                  apiKey={apiKey}
                  userPrompt={prompt}
                  output={result.text}
                  desiredOutput={correctText}
                  similarityScore={result.similarityScore}
                />
              </div>
            )}
          </div>
        </div>
      )}
      {logprobs.length > 0 && (
        <div className={`${styles.fadeIn} ${styles.mb}`}>
          <LogprobsDisplay logprobs={logprobs} />
        </div>
      )}
      <Footer />
    </>
  )
}
