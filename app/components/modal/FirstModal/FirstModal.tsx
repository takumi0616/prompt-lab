import React from 'react'
import { AiOutlineQuestionCircle } from 'react-icons/ai'
import styles from './FirstModal.module.css'

type FirstModalProps = {
  onClose: () => void
  onSwitchToExplanation: () => void
}

export default function FirstModal({
  onClose,
  onSwitchToExplanation,
}: FirstModalProps) {
  const [apiKey, setApiKey] = React.useState('')

  const handleStartClick = () => {
    if (apiKey) {
      // ここでAPIキーを保存して、モーダルを閉じる処理などを行う
      onClose()
    } else {
      alert('APIキーを入力してください')
    }
  }

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modalContent}>
        <button className={styles.closeButton} onClick={onClose}>
          &times;
        </button>
        <h1 className={styles.title}>ChatGPTのAPIキーを入力</h1>
        <p className={styles.description}>
          APIキーを入力してGPT-Logprobsを始めましょう。お持ちでない場合は、取得方法をご案内します。
        </p>
        <h2 className={styles.apititle}>APIキー</h2>
        <input
          type="text"
          className={styles.input}
          placeholder="sk-XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX"
          value={apiKey}
          onChange={(e) => setApiKey(e.target.value)}
        />
        <div className={styles.outbox}>
          <div className={styles.link} onClick={onSwitchToExplanation}>
            <AiOutlineQuestionCircle />
            <span>APIキーの取得方法を見る。</span>
          </div>
          <button className={styles.startButton} onClick={handleStartClick}>
            始める
          </button>
        </div>
      </div>
    </div>
  )
}
