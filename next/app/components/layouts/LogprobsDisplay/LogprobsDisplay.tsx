import React from 'react'
import styles from './LogprobsDisplay.module.css'
import { LogprobsDisplayProps } from '@/types'

const LogprobsDisplay: React.FC<LogprobsDisplayProps> = ({ logprobs }) => {
  const displayToken = (token: string) => {
    if (token === '\n') {
      return '[改行文字]'
    }
    if (token.trim() === '') {
      return '[空白文字]'
    }
    return token
  }

  return (
    <div className={styles.grid}>
      {logprobs.map((token, index) => (
        <div key={index} className={styles.card}>
          <h3 className={styles.title}>{displayToken(token.token)}</h3>
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
                  <strong>{displayToken(topLogprob.token)}</strong>
                  <strong>{percentage.toFixed(2)}%</strong>
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
