import React from 'react'
import styles from './SmallCard.module.css'
import { SmallCardProps } from '@/types'

export default function SmallCard({
  token,
  percentage,
  displayToken,
}: SmallCardProps) {
  return (
    <div className={styles.smallCard}>
      <p className={styles.word}>{displayToken(token)}</p>
      <p className={styles.percent}>{percentage.toFixed(2)}%</p>
    </div>
  )
}
