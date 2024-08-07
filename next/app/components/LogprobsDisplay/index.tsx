// next/app/LogprobsDisplay/index.tsx
import React from 'react'
import styles from './index.module.css'
import { LogprobsDisplayProps } from '@/types'

const LogprobsDisplay: React.FC<LogprobsDisplayProps> = ({ logprobs }) => {
  return (
    <div className={styles.grid}>
      {logprobs.map((token, index) => (
        <div key={index} className={styles.card}>
          <h3 className={styles.title}>Token: {token.token}</h3>
          <p>Log Probability: {token.logprob.toFixed(8)}</p>
          <h4 className={styles.subtitle}>Top Log Probabilities:</h4>
          <ul>
            {token.top_logprobs.slice(0, 10).map((topLogprob, i) => {
              const expLogprob = Math.exp(topLogprob.logprob)
              const totalExpLogprob = token.top_logprobs.reduce(
                (acc, curr) => acc + Math.exp(curr.logprob),
                0,
              )
              const percentage = (expLogprob / totalExpLogprob) * 100

              return (
                <li key={i}>
                  <strong>Candidate:</strong> {topLogprob.token}
                  <br />
                  <strong>Log Probability:</strong> {percentage.toFixed(2)}%
                </li>
              )
            })}
          </ul>
        </div>
      ))}
    </div>
  )
}

export default LogprobsDisplay
