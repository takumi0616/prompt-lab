'use client'

import React from 'react'
import { ImLab } from 'react-icons/im'
import { useRouter } from 'next/navigation'
import { signIn, signOut, useSession } from 'next-auth/react'
import styles from './Header.module.css'
import { useLanguage } from '@/i18n/client'

export default function Header() {
  const { data: session } = useSession()
  const handleReload = () => {
    window.location.reload()
  }

  const handleKeyPress = (event: React.KeyboardEvent) => {
    if (event.key === 'Enter' || event.key === ' ') {
      handleReload()
    }
  }

  const { language, setLanguage } = useLanguage()
  const router = useRouter()

  const handleLanguageToggle = () => {
    const newLanguage = language === 'ja' ? 'en' : 'ja'
    setLanguage(newLanguage)
    router.push(`/${newLanguage}`)
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

      <nav className={styles.nav}>
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
      </nav>
      <div
        className={styles.languageToggleContainer}
        onClick={handleLanguageToggle}
        onKeyPress={handleLanguageToggle}
        tabIndex={0}
        role="button"
      >
        <img src="/japan.png" alt="Japanese" className={styles.languageIcon} />
        <div className={styles.toggleSwitch}>
          <div
            className={`${styles.toggleBall} ${
              language === 'en' ? styles.toggleBallRight : ''
            }`}
          ></div>
        </div>
        <img src="/us.png" alt="English" className={styles.languageIcon} />
      </div>
    </header>
  )
}
