import React, { useRef, useState, useEffect } from 'react'
import { CiSettings } from 'react-icons/ci'
import { AiOutlineFileAdd } from 'react-icons/ai'
import styles from './InputBox.module.css'
import GenerateButton from '@/components/common/GenerateButton'
import { InputBoxProps } from '@/types'

export default function InputBox({
  apiKey,
  prompt,
  setPrompt,
  setIsModalOpen,
  handleSubmit,
  isLoading,
}: InputBoxProps) {
  const textareaRef = useRef<HTMLTextAreaElement>(null)
  const [message, setMessage] = useState(prompt)

  useEffect(() => {
    const textarea = textareaRef.current
    if (textarea) {
      textarea.style.height = 'auto'
      textarea.style.height = `${textarea.scrollHeight}px`
    }
  }, [message])

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setPrompt(e.target.value)
    setMessage(e.target.value)
  }

  const handleKeyPress = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault()
      document.getElementById('generateButton')?.click()
    }
  }

  const handleGenerateClick = () => {
    handleSubmit(new Event('submit') as unknown as React.FormEvent)
  }

  return (
    <div className={styles.inputBox}>
      <div className={styles.components}>
        <textarea
          ref={textareaRef}
          className={styles.textarea}
          placeholder="Type your message..."
          value={message}
          onChange={handleChange}
          onKeyDown={handleKeyPress}
        />
      </div>
      <div className={styles.components}>
        <div className={styles.icons}>
          <div className={styles.leftIcons}>
            <AiOutlineFileAdd size={40} className={styles.iconHover} />
          </div>
          <div className={styles.rightIcons}>
            <div className={styles.icon}>
              <CiSettings
                size={48}
                className={styles.iconHover}
                onClick={() => setIsModalOpen(true)}
              />
            </div>
            <div className={styles.icon}>
              <GenerateButton
                onClick={handleGenerateClick}
                disabled={!apiKey || !prompt}
                isLoading={isLoading}
                className={styles.generateButton}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
