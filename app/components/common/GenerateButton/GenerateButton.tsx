import React, { useState } from 'react'
import { useTranslations } from 'next-intl'
import styles from './GenerateButton.module.css'
import { GenerateButtonProps } from '@/types'

export default function GenerateButton({
  onClick,
  disabled,
  isLoading,
  className,
}: GenerateButtonProps) {
  const [showTooltip, setShowTooltip] = useState(false)
  const t = useTranslations('GenerateButton')
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
        {isLoading ? (
          <div className={styles.loader}></div>
        ) : (
          <p>{t('Generate')}</p>
        )}
      </button>
      {showTooltip && (
        <div className={styles.tooltip}>{t('Enter the prompt or API_Key')}</div>
      )}
    </div>
  )
}
