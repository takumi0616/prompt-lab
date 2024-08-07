import React from 'react'
import styles from './BigCard.module.css'
import SmallCard from '@/components/common/SmallCard'
import { BigCardProps } from '@/types'

export default function BigCard({ tokenInfo }: BigCardProps) {
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
    <div className={styles.card}>
      <h3 className={styles.title}>{displayToken(tokenInfo.token)}</h3>
      <ul>
        {tokenInfo.top_logprobs.slice(0, 10).map((topLogprob, i) => {
          const expLogprob = Math.exp(topLogprob.logprob)
          const totalExpLogprob = tokenInfo.top_logprobs.reduce(
            (acc, curr) => acc + Math.exp(curr.logprob),
            0,
          )
          const percentage = (expLogprob / totalExpLogprob) * 100

          return (
            <SmallCard
              key={i}
              token={topLogprob.token}
              percentage={percentage}
              displayToken={displayToken}
            />
          )
        })}
      </ul>
    </div>
  )
}
