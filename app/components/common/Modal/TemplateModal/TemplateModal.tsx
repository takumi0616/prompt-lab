import React from 'react'
import { RxCross1 } from 'react-icons/rx'
import styles from './TemplateModal.module.css'

interface TemplateModalProps {
  title: string
  subTitle: string
  prompt: string
  onClose: () => void
  onInsert: () => void
}

const TemplateModal: React.FC<TemplateModalProps> = ({
  title,
  subTitle,
  prompt,
  onClose,
  onInsert,
}) => {
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

export default TemplateModal
