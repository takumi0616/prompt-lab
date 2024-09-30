import React, { useState } from 'react'
import styles from './CreatePrompt.module.css'

interface CreatePromptProps {
  onComplete: (generatedPrompt: string) => void
}

const CreatePrompt: React.FC<CreatePromptProps> = ({ onComplete }) => {
  const [answer1, setAnswer1] = useState('')
  const [answer2, setAnswer2] = useState('')

  const handleComplete = () => {
    const generatedPrompt = `あなたの回答1は「${answer1}」、回答2は「${answer2}」です。`
    onComplete(generatedPrompt)
  }

  return (
    <div className={styles.createPrompt}>
      <h3>Create your prompt</h3>
      <div className={styles.question}>
        <p>Question 1:</p>
        <input
          type="text"
          value={answer1}
          onChange={(e) => setAnswer1(e.target.value)}
        />
      </div>
      <div className={styles.question}>
        <p>Question 2:</p>
        <input
          type="text"
          value={answer2}
          onChange={(e) => setAnswer2(e.target.value)}
        />
      </div>
      {/* 追加の質問をここに追加 */}
      <button onClick={handleComplete}>完了</button>
    </div>
  )
}

export default CreatePrompt
