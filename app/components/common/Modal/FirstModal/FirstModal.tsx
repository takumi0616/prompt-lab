import React, { useState } from 'react'
import { AiOutlineQuestionCircle } from 'react-icons/ai'
import { RxCross1 } from 'react-icons/rx'
import { useTranslations } from 'next-intl'
import styles from './FirstModal.module.css'

type FirstModalProps = {
  onClose: () => void
  onSwitchToExplanation: () => void
  setApiKey: (key: string) => void // setApiKeyの型を定義
}

export default function FirstModal({
  onClose,
  onSwitchToExplanation,
  setApiKey,
}: FirstModalProps) {
  const [localApiKey, setLocalApiKey] = useState('')
  const t = useTranslations('FirstModal')

  const handleStartClick = () => {
    if (localApiKey) {
      setApiKey(localApiKey) // setApiKeyを呼び出す
      onClose()
    } else {
      alert(t('apiKeyRequired'))
    }
  }

  return (
    <div className={styles.firstModalOverlay}>
      <div className={styles.firstModalContent}>
        <button className={styles.closeButton} onClick={onClose}>
          <RxCross1 />
        </button>
        <h1 className={styles.title}>{t('modalTitle')}</h1>
        <p className={styles.description}>{t('modalDescription')}</p>
        <h2 className={styles.apiTitle}>{t('apiKeyTitle')}</h2>
        <input
          type="password"
          className={styles.input}
          placeholder="sk-XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX"
          value={localApiKey}
          onChange={(e) => setLocalApiKey(e.target.value)} // ローカルなAPIキーの状態を更新
        />
        <div className={styles.outbox}>
          <button className={styles.link} onClick={onSwitchToExplanation}>
            <AiOutlineQuestionCircle />
            <span>{t('apiKeyInstructions')}</span>
          </button>

          <button className={styles.startButton} onClick={handleStartClick}>
            {t('startButton')}
          </button>
        </div>
      </div>
    </div>
  )
}
