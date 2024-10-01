import React from 'react'
import styles from './LogprobsDisplay.module.css'
import { LogprobsDisplayProps } from '@/app/types'
import BigCard from '@/app/components/common/BigCard'

export default function LogprobsDisplay({ logprobs }: LogprobsDisplayProps) {
  return (
    <div className={styles.container}>
      <div className={styles.grid}>
        {logprobs.map((tokenInfo, index) => (
          <BigCard key={index} tokenInfo={tokenInfo} />
        ))}
      </div>
    </div>
  )
}
