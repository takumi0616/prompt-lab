import React from 'react'
import styles from './TemplateModal.module.css'
import { TemplateModalProps } from '@/app/types'

export default function TemplateModal({
  prompt,
  onClose,
  onInsert,
}: TemplateModalProps) {
  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modalContent}>
        <h3>テンプレートの内容</h3>
        <p>{prompt}</p>
        <div className={styles.buttonGroup}>
          <button onClick={onInsert}>挿入</button>
          <button onClick={onClose}>閉じる</button>
        </div>
      </div>
    </div>
  )
}
