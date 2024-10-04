import React, { useState, useEffect } from 'react'
import styles from './CreatePrompt.module.css'
import { CreatePromptProps } from '@/app/types'

export default function CreatePrompt({ onComplete }: CreatePromptProps) {
  const questions = [
    {
      question: '何を知りたいですか？',
      subTitle: '興味のあるテーマを入力してください。',
      example: '例: AI技術に関する情報',
    },
    {
      question: 'どんなふうに教えて欲しいですか？',
      subTitle: '希望する説明の仕方を入力してください。',
      example: '例: 簡潔に、詳細に、初心者向けに',
    },
    {
      question: '誰に教えて欲しいですか？',
      subTitle: '回答者の役割や視点を入力してください。',
      example: '例: 専門家、先生、子供',
    },
    {
      question: 'あなたの身分を教えてください',
      subTitle: 'あなたの職業や立場を入力してください。',
      example: '例: 学生、エンジニア、経営者',
    },
    {
      question: '何文字くらいで教えて欲しいですか？',
      subTitle: '希望する回答の長さを入力してください。',
      example: '例: 100文字、500文字、具体的な長さ',
    },
    {
      question: '例の文章があれば入力してください',
      subTitle: '回答に含めたい例があれば入力してください。',
      example: '例: 「早起きは三文の徳」の意味を説明してください。',
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
      generatedPrompt += `あなたは${answers[2]}です。\n\n`
    }

    // Tip 6: 肯定的な表現を使う
    // Tip 1: 明確で具体的な指示を出す
    if (answers[0]) {
      generatedPrompt += `次のテーマについて教えてください：「${answers[0]}」。\n\n`
    }

    // Tip 7: 対象者を明示する
    if (answers[3]) {
      generatedPrompt += `${answers[3]}にも分かるように説明してください。\n\n`
    }

    // Tip 2: 期待する出力形式を指定する
    if (answers[1]) {
      generatedPrompt += `回答は${answers[1]}形式でお願いします。\n\n`
    }

    // Tip 15: 回答の長さを指定する
    if (answers[4]) {
      generatedPrompt += `回答は${answers[4]}以内でお願いします。\n\n`
    }

    // Tip 5: 具体的な例を提供する（Few-shot学習）
    if (answers[5]) {
      generatedPrompt += `以下を参考にしてください：\n\n${answers[5]}\n\n`
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
          戻る
        </button>
        {currentQuestion < questions.length - 1 ? (
          <button className={styles.button} onClick={handleNext}>
            次へ
          </button>
        ) : (
          <button className={styles.button} onClick={handleComplete}>
            完了
          </button>
        )}
      </div>
    </div>
  )
}
