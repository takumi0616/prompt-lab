import React from 'react'
import { Bs1Circle } from 'react-icons/bs'
import styles from './SecondModal.module.css'

type SecondModalProps = {
  onClose: () => void
  onBack: () => void // FirstModal に戻るための関数を追加
  onNext: () => void
  onFirst: () => void
}

export default function SecondModal({
  onClose,
  onBack,
  onNext,
  onFirst,
}: SecondModalProps) {
  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modalContent}>
        <button className={styles.closeButton} onClick={onClose}>
          &times;
        </button>
        <h1 className={styles.title}>ChatGPT APIキーの取得方法</h1>
        <div className={styles.modalintro}>
          <p className={styles.step}>Step 1 of 5</p>
          <h2 className={styles.subtitle}>
            <Bs1Circle className={styles.icon} />
            <span className={styles.subtitleText}>
              Open AI社のアカウントを作成・ログインする
            </span>
          </h2>
          <p className={styles.description}>
            Open AI社のAPIページにアクセスし、「Start
            building」をクリックしてください。
          </p>
          <img
            src="https://via.placeholder.com/600x300?text=Step+1+Image"
            alt="Step 1"
            className={styles.image}
          />

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
