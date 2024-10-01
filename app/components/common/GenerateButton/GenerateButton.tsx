import React, { useState } from 'react'
import styles from './GenerateButton.module.css'
import { GenerateButtonProps } from '@/app/types'

export default function GenerateButton({
  onClick,
  disabled,
  isLoading,
  className,
}: GenerateButtonProps) {
  const [showTooltip, setShowTooltip] = useState(false)

  return (
    <div
      className={styles.buttonContainer}
      onMouseEnter={() => {
        if (disabled) setShowTooltip(true)
      }}
      onMouseLeave={() => setShowTooltip(false)}
    >
      <button
        type="submit"
        onClick={onClick}
        disabled={disabled || isLoading}
        className={`${styles.generateButton} ${className} ${
          (disabled || isLoading) && styles.disabled
        }`}
      >
        {isLoading ? <div className={styles.loader}></div> : <p>Generate</p>}
      </button>
      {showTooltip && (
        <div className={styles.tooltip}>
          プロンプト、もしくはAPI_Keyを入力してください
        </div>
      )}
    </div>
  )
}
