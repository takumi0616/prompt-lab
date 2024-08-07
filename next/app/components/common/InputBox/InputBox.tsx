import React from 'react'
import styles from './InputBox.module.css'
import GenerateButton from '@/components/common/GenerateButton'
import { InputBoxProps } from '@/types'

export default function InputBox({
  apiKey,
  prompt,
  setPrompt,
  setIsModalOpen,
  handleSubmit,
}: InputBoxProps) {
  const handleGenerateClick = () => {
    handleSubmit(new Event('submit') as unknown as React.FormEvent)
  }

  return (
    <div className={styles.container}>
      <form onSubmit={handleSubmit} className={styles.form}>
        <div className={styles.inputContainer}>
          <textarea
            placeholder="Type your message..."
            id="prompt"
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            required
            className={styles.input}
          />
        </div>
        <div className={styles.buttonContainer}>
          <button
            type="button"
            onClick={() => setIsModalOpen(true)}
            className={styles.gearButton}
          >
            ⚙️
            {!apiKey && <span className={styles.warning}>!</span>}
          </button>
          <GenerateButton
            onClick={handleGenerateClick}
            disabled={!apiKey || !prompt}
            className={styles.generateButton}
          />
        </div>
      </form>
    </div>
  )
}
