'use client'

import React, { useRef, useState, useEffect } from 'react'
import styles from './CorrectBox.module.css'
import { CorrectBoxProps } from '@/app/types'

export default function CorrectBox({
  correctText,
  setCorrectText,
}: CorrectBoxProps) {
  const textareaRef = useRef<HTMLTextAreaElement>(null)
  const [message, setMessage] = useState(correctText)

  useEffect(() => {
    const textarea = textareaRef.current
    if (textarea) {
      textarea.style.height = 'auto'
      textarea.style.height = `${textarea.scrollHeight}px`
    }
  }, [message])

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setCorrectText(e.target.value)
    setMessage(e.target.value)
  }

  return (
    <div className={styles.correctBox}>
      <div className={styles.component}>
        <textarea
          ref={textareaRef}
          placeholder="Enter correct text here..."
          value={message}
          onChange={handleChange}
          className={styles.textarea}
        />
      </div>
    </div>
  )
}
