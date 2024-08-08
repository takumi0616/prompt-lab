'use client'

import React, { useState } from 'react'
import s from './GenerateButton.module.css'

export default function GenerateButton() {
  const [isLoading, setIsLoading] = useState(false)

  const handleClick = () => {
    setIsLoading(true)
    // Simulate a loading process
    setTimeout(() => {
      setIsLoading(false)
    }, 3000)
  }

  return (
    <button
      id="generateButton"
      className={s.generateButton}
      onClick={handleClick}
      disabled={isLoading}
    >
      {isLoading ? <div className={s.loader}></div> : <p>Generate</p>}
    </button>
  )
}
