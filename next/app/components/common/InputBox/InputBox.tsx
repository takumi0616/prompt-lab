'use client'

import React, { useState, useEffect, useRef } from 'react'
import { CiSettings } from 'react-icons/ci'
import { AiOutlineFileAdd } from 'react-icons/ai'
import s from './InputBox.module.css'
import GenerateButton from '@/components/common/GenerateButton'

export default function InputBox() {
  const [message, setMessage] = useState('')
  const textareaRef = useRef<HTMLTextAreaElement>(null)

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setMessage(e.target.value)
  }

  const handleKeyPress = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault() // Enterキーのデフォルトの動作を防ぐ
      document.getElementById('generateButton')?.click() // GenerateButtonのクリックイベントを出す
    }
  }

  useEffect(() => {
    const textarea = textareaRef.current
    if (textarea) {
      textarea.style.height = 'auto'
      textarea.style.height = `${textarea.scrollHeight}px`
    }
  }, [message])

  return (
    <div className={s.inputBox}>
      <div className={s.components}>
        <textarea
          ref={textareaRef}
          className={s.textarea}
          placeholder="Type your message..."
          value={message}
          onChange={handleChange}
          onKeyPress={handleKeyPress}
        />
      </div>
      <div className={s.components}>
        <div className={s.icons}>
          <div className={s.lefticons}>
            <AiOutlineFileAdd size={40} />
          </div>
          <div className={s.righticons}>
            <div className={s.icon}>
              <CiSettings size={48} />
            </div>
            <div className={s.icon}>
              <GenerateButton />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
