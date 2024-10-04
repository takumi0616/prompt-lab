import React from 'react'
import styles from './SmallCard.module.css'
import { SmallCardProps } from '@/app/types'

export default function SmallCard({
  token,
  percentage,
  displayToken,
  variant = 'gray',
}: SmallCardProps & { variant?: 'green' | 'gray' }) {
  return (
    <div className={`${styles.smallCard} ${styles[variant]}`}>
      <p className={`${styles.word} ${variant === 'gray' ? styles.gray : ''}`}>
        {displayToken(token)}
      </p>
      <p className={styles.percent}>{percentage.toFixed(2)}%</p>
    </div>
  )
}
