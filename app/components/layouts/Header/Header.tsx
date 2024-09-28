'use client'

import React from 'react'
// import { signIn, signOut, useSession } from 'next-auth/react'
import { useTranslations } from 'next-intl'
import { BiMenuAltLeft } from 'react-icons/bi'
import styles from './Header.module.css'

export default function Header() {
  // const { data: session } = useSession()
  const t = useTranslations('Header')
  return (
    <header className={styles.header}>
      <BiMenuAltLeft className={styles.icon} size={50} />
      <p className={styles.text}>{t('prompt-lab')}</p>
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
