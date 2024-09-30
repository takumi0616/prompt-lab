'use client'

import React from 'react'
import { ImLab } from 'react-icons/im'
import styles from './Header.module.css'

export default function Header() {
  const handleReload = () => {
    window.location.reload()
  }

  const handleKeyPress = (event: React.KeyboardEvent) => {
    if (event.key === 'Enter' || event.key === ' ') {
      handleReload()
    }
  }

  return (
    <header className={styles.header}>
      <div
        onClick={handleReload}
        onKeyPress={handleKeyPress}
        tabIndex={0}
        role="button"
        className={styles.clickableArea}
      >
        <ImLab className={styles.icon} size={34} />
        <p className={styles.text}>Prompt Lab</p>
      </div>

      {/* <nav className={styles.nav}>
        <ul className={styles.navList}>
          {session ? (
            <li className={styles.navItem}>
              <span className={styles.navLink}>{session.user?.email}</span>
              <button onClick={() => signOut()} className={styles.navLink}>
                Sign out
              </button>
            </li>
          ) : (
            <li className={styles.navItem}>
              <button
                onClick={() => signIn('google')}
                className={styles.navLink}
              >
                Sign in
              </button>
            </li>
          )}
        </ul>
      </nav> */}
    </header>
  )
}
