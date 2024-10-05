import React from 'react'
import ReactMarkdown from 'react-markdown'
import styles from './GeneratedResultsBox.module.css'
import { GenerationResultsProps } from '@/app/types'

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
      {/* <header>Generation Results</header> */}
      <header>生成結果</header>
      <div className={styles.responseBoxArea}>
        <ReactMarkdown className={styles.black}>{result}</ReactMarkdown>
      </div>
      <div className={styles.parameters}>
        <p className={styles.parameterBox}>
          Model: <span className={styles.black}>{model}</span>
        </p>
        <p className={styles.parameterBox}>
          Max Tokens: <span className={styles.black}>{maxTokens}</span>
        </p>
        <p className={styles.parameterBox}>
          Seed: <span className={styles.black}>{seed}</span>
        </p>
        <p className={styles.parameterBox}>
          Top Logprobs: <span className={styles.black}>{topLogprobs}</span>
        </p>
        <p className={styles.parameterBox}>
          Temperature: <span className={styles.black}>{temperature}</span>
        </p>
        <p className={styles.parameterBox}>
          Top P: <span className={styles.black}>{topP}</span>
        </p>
      </div>
    </div>
  )
}
