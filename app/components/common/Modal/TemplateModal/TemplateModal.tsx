import React from 'react'
import { RxCross1 } from 'react-icons/rx'
import styles from './TemplateModal.module.css'
import { TemplateModalProps } from '@/app/types'

export default function TemplateModal({
  title,
  subTitle,
  prompt,
  onClose,
  onInsert,
}: TemplateModalProps) {
  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modalContent}>
        <button className={styles.closeButton} onClick={onClose}>
          <RxCross1 />
        </button>
        <div className={styles.modalIntro}>
          <div className={styles.modalTitle}>
            <h3>{title}</h3>
          </div>
          <div className={styles.modalSubTitle}>
            <p>{subTitle}</p>
          </div>
          <div className={styles.modalPrompt}>
            <p>{prompt}</p>
          </div>
        </div>
        <div className={styles.buttonGroup}>
          <button className={styles.insertButton} onClick={onInsert}>
            挿入
          </button>
        </div>
      </div>
    </div>
  )
}
