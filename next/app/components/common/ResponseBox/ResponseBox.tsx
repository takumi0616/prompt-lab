import React from 'react'
import styles from './ResponseBox.module.css'
import { ResponseBoxProps } from '@/types'

export default function ResponseBox({ result }: ResponseBoxProps) {
  return (
    <div className={styles.responseBox}>
      <p>{result}</p>
    </div>
  )
}
