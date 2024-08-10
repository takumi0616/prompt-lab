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
      <p>{result}</p>
      <div className={styles.parameters}>
        <p>Model: {model}</p>
        <p>Max Tokens: {maxTokens}</p>
        <p>Seed: {seed}</p>
        <p>Top Logprobs: {topLogprobs}</p>
        <p>Temperature: {temperature}</p>
        <p>Top P: {topP}</p>
      </div>
    </div>
  )
}
