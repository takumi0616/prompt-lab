import React from 'react'
import styles from './TemplateModal.module.css'

interface TemplateModalProps {
  prompt: string
  onClose: () => void
  onInsert: () => void
}

const TemplateModal: React.FC<TemplateModalProps> = ({
  prompt,
  onClose,
  onInsert,
}) => {
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

export default TemplateModal
