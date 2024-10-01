import React, { useState } from 'react'
import styles from './CreatePrompt.module.css'
import { CreatePromptProps } from '@/app/types'

export default function CreatePrompt({ onComplete }: CreatePromptProps) {
  const [answers, setAnswers] = useState<string[]>(['', '', ''])
  const [currentQuestion, setCurrentQuestion] = useState(0)

  const questions = [
    'What is your favorite color?',
    'What is your favorite animal?',
    'What is your hobby?',
  ]

  const handleComplete = () => {
    let generatedPrompt = ''

    generatedPrompt += `Q1 answer is: ${answers[0]}\n`
    generatedPrompt += `Q2 answer is: ${answers[1]}\n`
    generatedPrompt += `Q3 answer is: ${answers[2]}\n`

    onComplete(generatedPrompt)
  }

  const handleNext = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1)
    } else {
      handleComplete()
    }
  }

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1)
    }
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const updatedAnswers = [...answers]
    updatedAnswers[currentQuestion] = e.target.value
    setAnswers(updatedAnswers)
  }

  return (
    <div className={styles.createPrompt}>
      <div className={styles.question}>
        <p>{questions[currentQuestion]}</p>
        <input
          type="text"
          value={answers[currentQuestion]}
          onChange={handleInputChange}
        />
      </div>
      <div className={styles.buttonContainer}>
        <button onClick={handlePrevious} disabled={currentQuestion === 0}>
          戻る
        </button>
        {currentQuestion < questions.length - 1 ? (
          <button onClick={handleNext}>次へ</button>
        ) : (
          <button onClick={handleComplete}>完了</button>
        )}
      </div>
    </div>
  )
}
