import React from 'react'
import { Bs3Circle } from 'react-icons/bs'
import styles from './FourthModal.module.css'

type FourthModalProps = {
  onClose: () => void
  onBack: () => void
  onNext: () => void
  onFirst: () => void
}

export default function FourthModal({
  onClose,
  onBack,
  onNext,
  onFirst,
}: FourthModalProps) {
  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modalContent}>
        <button className={styles.closeButton} onClick={onClose}>
          &times;
        </button>
        <h1 className={styles.title}>ChatGPT APIキーの取得方法</h1>
        <div className={styles.modalintro}>
          <p className={styles.step}>Step 3 of 5</p>
          <h2 className={styles.subtitle}>
            <Bs3Circle className={styles.icon} />
            <span className={styles.subtitleText}>APIキーを取得する</span>
          </h2>
          <p className={styles.description}>
            TOP画面の左上の鍵アイコン「API keys」を選択し、「+Create new secret
            key」をクリックします。
            <br />
            「Create secret key」をクリックします。
            <br />
            ポップアップ表示される「Create new secret
            key」から、APIキーの情報をコピーしてメモしておきましょう。
          </p>
          <div className={styles.navigation}>
            <button className={styles.backButton} onClick={onBack}>
              &larr; 戻る
            </button>
            <button className={styles.nextButton} onClick={onNext}>
              次へ &rarr;
            </button>
          </div>
        </div>

        <div
          className={styles.backFirst}
          onClick={onFirst}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              onFirst()
            }
          }}
          role="button"
          tabIndex={0}
        >
          <p className={styles.backFirstText}> &larr;APIキーの入力に戻る。</p>
        </div>
      </div>
    </div>
  )
}
