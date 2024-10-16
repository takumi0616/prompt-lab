import React, { useEffect, useState } from 'react'
import ReactMarkdown from 'react-markdown'
import styles from './SideBar.module.css'
import { Tip, SideBarProps } from '@/app/types'
import { useTranslation } from '@/i18n/client'

export default function SideBar({
  isOpen,
  checkboxStates,
  setCheckboxStates,
  improvementSuggestions,
  lang,
}: SideBarProps & { lang: string }) {
  const { t } = useTranslation(lang)
  const [showImprovementSuggestions, setShowImprovementSuggestions] =
    useState(false)

  useEffect(() => {
    if (improvementSuggestions) {
      setShowImprovementSuggestions(true)
    } else {
      setShowImprovementSuggestions(false)
    }
  }, [improvementSuggestions])

  const handleCheckboxChange = (index: number) => {
    const updatedCheckboxStates = [...checkboxStates]
    updatedCheckboxStates[index] = !updatedCheckboxStates[index]
    setCheckboxStates(updatedCheckboxStates)
  }

  const tips: Tip[] = t('tips', { returnObjects: true }) as Tip[]

  return (
    <div
      className={`${styles.sidebar} ${isOpen ? styles.open : styles.closed}`}
    >
      <div className={styles.content}>
        {showImprovementSuggestions && (
          <div className={styles.tipItem}>
            <h2 className={styles.title}>
              {t('sidebar.improvementSuggestions')}
            </h2>
            <div className={styles.improvementSuggestions}>
              <ReactMarkdown>{improvementSuggestions}</ReactMarkdown>
            </div>
          </div>
        )}

        <h2 className={styles.title}>{t('sidebar.promptChecklist')}</h2>
        {tips.map((tip, index) => (
          <div key={index} className={styles.tipItem}>
            <label className={styles.checkboxLabel}>
              <input
                type="checkbox"
                checked={checkboxStates[index]}
                onChange={() => handleCheckboxChange(index)}
              />
              <span
                className={styles.tipTitle}
              >{`${index + 1}. ${tip.title}`}</span>
            </label>
            <p className={styles.tipExample}>{tip.example}</p>
          </div>
        ))}

        <div className={styles.referenceSection}>
          <h2 className={styles.title}>{t('sidebar.references')}</h2>
          <p>{t('sidebar.siteBasedOn')}</p>
          <ul className={styles.referenceList}>
            {(
              t('sidebar.referenceList', { returnObjects: true }) as string[]
            ).map((reference, index) => (
              <li key={index}>{reference}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  )
}
