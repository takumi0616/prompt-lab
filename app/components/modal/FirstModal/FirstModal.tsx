import React from 'react'
import { AiOutlineQuestionCircle } from 'react-icons/ai'
import styles from './FirstModal.module.css'

type FirstModalProps = {
  onClose: () => void
  onSwitchToExplanation: () => void
  setApiKey: (key: string) => void
}

export default function FirstModal({
  onClose,
  onSwitchToExplanation,
  setApiKey,
}: FirstModalProps) {
  const [localApiKey, setLocalApiKey] = React.useState('')

  const handleStartClick = () => {
    if (localApiKey) {
      // 親コンポーネントから渡された setApiKey を使用してAPIキーを設定
      setApiKey(localApiKey)
      onClose()
    } else {
      alert('APIキーを入力してください')
    }
  }

  return (
    <div className={styles.firstmodalOverlay}>
      <div className={styles.firstmodalContent}>
        <button className={styles.closeButton} onClick={onClose}>
          &times;
        </button>
        <h1 className={styles.title}>ChatGPTのAPIキーを入力</h1>
        <p className={styles.description}>
          APIキーを入力してGPT-Logprobsを始めましょう。お持ちでない場合は、取得方法をご案内します。
        </p>
        <h2 className={styles.apititle}>APIキー</h2>
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
            <span>APIキーの取得方法を見る。</span>
          </button>

          <button className={styles.startButton} onClick={handleStartClick}>
            始める
          </button>
        </div>
      </div>
    </div>
  )
}
