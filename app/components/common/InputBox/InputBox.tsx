import React, { useRef, useState, useEffect } from 'react'
import { CiSettings } from 'react-icons/ci'
import { BsToggleOff, BsToggleOn } from 'react-icons/bs'
import styles from './InputBox.module.css'
import GenerateButton from '@/app/components/common/GenerateButton'
import { InputBoxProps } from '@/app/types'

export default function InputBox({
  apiKey,
  prompt,
  setPrompt,
  setIsModalOpen,
  handleSubmit,
  isToggled,
  setIsToggled,
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
  }, [message, isToggled])

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setPrompt(e.target.value)
    setMessage(e.target.value)
  }

  const handleGenerateClick = () => {
    handleSubmit(new Event('submit') as unknown as React.FormEvent)
  }

  const toggleSwitch = () => {
    setIsToggled(!isToggled)
  }

  useEffect(() => {
    setMessage(prompt)
  }, [prompt])

  return (
    <div className={styles.inputBox}>
      <div className={styles.components}>
        <textarea
          ref={textareaRef}
          className={styles.textarea}
          // placeholder="Type your message..."
          placeholder="メッセージを入力してください"
          value={message}
          onChange={handleChange}
        />
      </div>
      <div className={styles.components}>
        <div className={styles.icons}>
          <div className={styles.leftIcons}>
            {isToggled ? (
              <BsToggleOn
                size={48}
                onClick={toggleSwitch}
                className={styles.iconHover}
              />
            ) : (
              <BsToggleOff
                size={48}
                onClick={toggleSwitch}
                className={styles.iconHover}
              />
            )}
            <div className={styles.iconIntro}>
              {/* <p>Enable Expected Answer</p> */}
              <p>採点機能を有効</p>
            </div>
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
