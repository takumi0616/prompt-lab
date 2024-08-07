import React from 'react'
import styles from './ResponseBox.module.css'
import { ResponseBoxProps } from '@/types'

export default function ResponseBox({ result }: ResponseBoxProps) {
  return (
    <div className={styles.mb}>
      <h2 className={styles.bold}>Result:</h2>
      <p>{result}</p>
    </div>
  )
}
