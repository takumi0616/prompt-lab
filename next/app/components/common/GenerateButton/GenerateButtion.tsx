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
    <button className={s.generateButton} onClick={handleClick}>
      {isLoading ? <div className={s.loader}></div> : <p>Generate</p>}
    </button>
  )
}
