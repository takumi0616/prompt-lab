import React from 'react'
import styles from './SmallCard.module.css'
import { SmallCardProps } from '@/types'

export default function SmallCard({
  token,
  percentage,
  displayToken,
}: SmallCardProps) {
  return (
    <li className={styles.smallCard}>
      <strong>{displayToken(token)}</strong>
      <strong>{percentage.toFixed(2)}%</strong>
    </li>
  )
}
