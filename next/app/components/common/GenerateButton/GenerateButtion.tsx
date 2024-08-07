import React, { useState } from 'react'
import styles from './GenerateButton.module.css'
import { GenerateButtonProps } from '@/types'

export default function GenerateButton({
  onClick,
  disabled,
  className,
}: GenerateButtonProps) {
  const [isLoading, setIsLoading] = useState(false)

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    setIsLoading(true)
    onClick()
    setTimeout(() => {
      setIsLoading(false)
    }, 3000)
  }

  return (
    <button
      type="submit"
      onClick={handleClick}
      disabled={disabled || isLoading}
      className={`${styles.generateButton} ${className}`}
    >
      {isLoading ? <div className={styles.loader}></div> : <p>Generate</p>}
    </button>
  )
}
