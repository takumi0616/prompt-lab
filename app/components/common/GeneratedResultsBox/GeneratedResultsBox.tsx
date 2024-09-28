import React from 'react'
import { useTranslations } from 'next-intl'
import styles from './GeneratedResultsBox.module.css'
import { GenerationResultsProps } from '@/types'

export default function GeneratedResultsBox({
  result,
  model,
  maxTokens,
  seed,
  topLogprobs,
  temperature,
  topP,
}: GenerationResultsProps) {
  const t = useTranslations('GeneratedResultsBox')
  return (
    <div className={styles.responseBox}>
      <header>{t('GenerationResults')}</header>
      <div className={styles.responseBoxArea}>
        <p className={styles.black}>{result}</p>
      </div>
      <div className={styles.parameters}>
        <p className={styles.parameterBox}>
          {t('Model')}: <span className={styles.black}>{model}</span>
        </p>
        <p className={styles.parameterBox}>
          {t('MaxTokens')}: <span className={styles.black}>{maxTokens}</span>
        </p>
        <p className={styles.parameterBox}>
          {t('Seed')}: <span className={styles.black}>{seed}</span>
        </p>
        <p className={styles.parameterBox}>
          {t('TopLogprobs')}:{' '}
          <span className={styles.black}>{topLogprobs}</span>
        </p>
        <p className={styles.parameterBox}>
          {t('Temperature')}:{' '}
          <span className={styles.black}>{temperature}</span>
        </p>
        <p className={styles.parameterBox}>
          {t('TopP')}: <span className={styles.black}>{topP}</span>
        </p>
      </div>
    </div>
  )
}
