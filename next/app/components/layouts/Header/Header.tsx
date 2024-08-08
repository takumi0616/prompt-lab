'use client'

import React from 'react'
import { signIn, signOut, useSession } from 'next-auth/react'
import styles from './Header.module.css'

export default function Header() {
  const { data: session } = useSession()

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
        </nav>
      </div>
    </header>
  )
}
