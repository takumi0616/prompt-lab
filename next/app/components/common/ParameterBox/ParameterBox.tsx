import React from 'react'
import styles from './ParameterBox.module.css'
import { ParameterBoxProps } from '@/types'

const ParameterBox: React.FC<ParameterBoxProps> = ({
  model,
  maxTokens,
  seed,
  topLogprobs,
  temperature,
  topP,
}) => {
  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Generation Parameters</h2>
      <ul className={styles.list}>
        <li>
          <strong>Model:</strong> {model}
        </li>
        <li>
          <strong>Max Tokens:</strong> {maxTokens}
        </li>
        <li>
          <strong>Seed:</strong> {seed}
        </li>
        <li>
          <strong>Top Logprobs:</strong> {topLogprobs}
        </li>
        <li>
          <strong>Temperature:</strong> {temperature}
        </li>
        <li>
          <strong>Top P:</strong> {topP}
        </li>
      </ul>
    </div>
  )
}

export default ParameterBox
