'use client'

import React, { useState } from 'react'
import s from './InputBox.module.css'
import GenerateButton from '@/components/common/GenerateButton'

export default function InputBox() {
  const [message, setMessage] = useState('')

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setMessage(e.target.value)
  }

  const handleKeyPress = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault() // Enterキーのデフォルトの動作を防ぐ
      document.getElementById('generateButton')?.click() // GenerateButtonのクリックイベントを出す
    }
  }

  return (
    <div className={s.inputBox}>
      <textarea
        className={s.textarea}
        placeholder="Type your message..."
        value={message}
        onChange={handleChange}
        onKeyPress={handleKeyPress}
      />
      <GenerateButton />
    </div>
  )
}
