import React from 'react'
import styles from './LogprobsDisplay.module.css'
import { LogprobsDisplayProps } from '@/types'
import BigCard from '@/components/common/BigCard'

export default function LogprobsDisplay({ logprobs }: LogprobsDisplayProps) {
  return (
    <div className={styles.grid}>
      {logprobs.map((tokenInfo, index) => (
        <BigCard key={index} tokenInfo={tokenInfo} />
      ))}
    </div>
  )
}
