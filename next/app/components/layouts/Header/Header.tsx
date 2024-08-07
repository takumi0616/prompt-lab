import React from 'react'
import styles from './Header.module.css'

export default function Header() {
  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <h1 className={styles.title}>GPT-Logprobs</h1>
        <nav className={styles.nav}>
          <ul className={styles.navList}>
            <li className={styles.navItem}>
              <a href="#home" className={styles.navLink}>
                Home
              </a>
            </li>
            <li className={styles.navItem}>
              <a href="#features" className={styles.navLink}>
                Features
              </a>
            </li>
            <li className={styles.navItem}>
              <a href="#contact" className={styles.navLink}>
                Contact
              </a>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  )
}
