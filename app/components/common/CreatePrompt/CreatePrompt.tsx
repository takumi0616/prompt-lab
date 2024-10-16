'use client'

import React, { useState, useEffect } from 'react'
import styles from './CreatePrompt.module.css'
import { CreatePromptProps } from '@/app/types'
import { useTranslation } from '@/i18n/client'

export default function CreatePrompt({
  onComplete,
  lang,
}: CreatePromptProps & { lang: string }) {
  const { t } = useTranslation(lang)
  const questions = [
    {
      question: t('createPrompt.whatDoYouWantToKnow'),
      subTitle: t('createPrompt.enterInterest'),
      example: t('createPrompt.exampleAI'),
    },
    {
      question: t('createPrompt.howDoYouWantItExplained'),
      subTitle: t('createPrompt.enterExplanationStyle'),
      example: t('createPrompt.exampleBriefly'),
    },
    {
      question: t('createPrompt.whoWillAnswer'),
      subTitle: t('createPrompt.enterRole'),
      example: t('createPrompt.exampleExpert'),
    },
    {
      question: t('createPrompt.yourIdentity'),
      subTitle: t('createPrompt.enterPosition'),
      example: t('createPrompt.exampleStudent'),
    },
    {
      question: t('createPrompt.desiredLength'),
      subTitle: t('createPrompt.enterLength'),
      example: t('createPrompt.exampleLength'),
    },
    {
      question: t('createPrompt.enterExample'),
      subTitle: t('createPrompt.enterExampleExplanation'),
      example: t('createPrompt.exampleProverb'),
    },
  ]

  const [answers, setAnswers] = useState<string[]>(
    Array(questions.length).fill(''),
  )
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [showQuestion, setShowQuestion] = useState(true)

  useEffect(() => {
    setShowQuestion(true)
  }, [])

  const handleComplete = () => {
    let generatedPrompt = ''

    // Tip 3: モデルに役割を与える
    if (answers[2]) {
      generatedPrompt += `${t('createPrompt.youAre')} ${answers[2]}.\n\n`
    }

    // Tip 6: 肯定的な表現を使う
    // Tip 1: 明確で具体的な指示を出す
    if (answers[0]) {
      generatedPrompt += `${t('createPrompt.teachAbout')} 「${answers[0]}」.\n\n`
    }

    // Tip 7: 対象者を明示する
    if (answers[3]) {
      generatedPrompt += `${answers[3]}${t('createPrompt.explain')}\n\n`
    }

    // Tip 2: 期待する出力形式を指定する
    if (answers[1]) {
      generatedPrompt += `${t('createPrompt.pleaseExplainIn')} ${answers[1]} ${t('createPrompt.format')}.\n\n`
    }

    // Tip 15: 回答の長さを指定する
    if (answers[4]) {
      generatedPrompt += `${t('createPrompt.pleaseLimitAnswerTo')} ${answers[4]}.\n\n`
    }

    // Tip 5: 具体的な例を提供する（Few-shot学習）
    if (answers[5]) {
      generatedPrompt += `${t('createPrompt.referenceExample')}:\n\n${answers[5]}\n\n`
    }

    generatedPrompt = generatedPrompt.trim()

    onComplete(generatedPrompt)
  }

  const handleNext = () => {
    if (currentQuestion < questions.length - 1) {
      setShowQuestion(false)
      setTimeout(() => {
        setCurrentQuestion(currentQuestion + 1)
        setShowQuestion(true)
      }, 300)
    } else {
      handleComplete()
    }
  }

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setShowQuestion(false)
      setTimeout(() => {
        setCurrentQuestion(currentQuestion - 1)
        setShowQuestion(true)
      }, 300)
    }
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const updatedAnswers = [...answers]
    updatedAnswers[currentQuestion] = e.target.value
    setAnswers(updatedAnswers)
  }

  return (
    <div className={styles.createPrompt}>
      <div
        className={`${styles.questionContainer} ${
          showQuestion ? styles.show : ''
        }`}
      >
        <p className={styles.question}>{questions[currentQuestion].question}</p>
        <p className={styles.subTitle}>{questions[currentQuestion].subTitle}</p>
        <p className={styles.example}>{questions[currentQuestion].example}</p>
        <input
          type="text"
          value={answers[currentQuestion]}
          onChange={handleInputChange}
          className={styles.input}
        />
      </div>
      <div className={styles.buttonContainer}>
        <button
          className={styles.button}
          onClick={handlePrevious}
          disabled={currentQuestion === 0}
        >
          {t('createPrompt.back')}
        </button>
        {currentQuestion < questions.length - 1 ? (
          <button className={styles.button} onClick={handleNext}>
            {t('createPrompt.next')}
          </button>
        ) : (
          <button className={styles.button} onClick={handleComplete}>
            {t('createPrompt.complete')}
          </button>
        )}
      </div>
    </div>
  )
}
