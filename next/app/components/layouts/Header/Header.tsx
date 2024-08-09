import React from 'react'
import { BiMenuAltLeft } from 'react-icons/bi'
import styles from './Header.module.css'

export default function Header() {
  return (
    <header className={styles.header}>
      <BiMenuAltLeft className={styles.icon} size={50} />
      <p className={styles.text}>GPT-Logprobs</p>
    </header>
  )
}
