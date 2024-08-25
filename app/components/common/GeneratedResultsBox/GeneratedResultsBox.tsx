import React from 'react'
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
  return (
    <div className={styles.responseBox}>
      <header>Generation Results</header>
      <div className={styles.responseBox_erea}>
        <p className={styles.black}>{result}</p>
      </div>
      <div className={styles.parameters}>
        <p className={styles.parameterbox}>
          Model: <span className={styles.black}>{model}</span>
        </p>
        <p className={styles.parameterbox}>
          Max Tokens: <span className={styles.black}>{maxTokens}</span>
        </p>
        <p className={styles.parameterbox}>
          Seed: <span className={styles.black}>{seed}</span>
        </p>
        <p className={styles.parameterbox}>
          Top Logprobs: <span className={styles.black}>{topLogprobs}</span>
        </p>
        <p className={styles.parameterbox}>
          Temperature: <span className={styles.black}>{temperature}</span>
        </p>
        <p className={styles.parameterbox}>
          Top P: <span className={styles.black}>{topP}</span>
        </p>
      </div>
    </div>
  )
}
