import React from 'react'
import { Bs2Circle } from 'react-icons/bs'
import styles from './ThirdModal.module.css'

type ThirdModalProps = {
  onClose: () => void
  onBack: () => void
  onNext: () => void
  onFirst: () => void
}

export default function ThirdModal({
  onClose,
  onBack,
  onNext,
  onFirst,
}: ThirdModalProps) {
  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modalContent}>
        <button className={styles.closeButton} onClick={onClose}>
          &times;
        </button>
        <h1 className={styles.title}>ChatGPT APIキーの取得方法</h1>
        <div className={styles.modalintro}>
          <p className={styles.step}>Step 2 of 5</p>
          <h2 className={styles.subtitle}>
            <Bs2Circle className={styles.icon} />
            <span className={styles.subtitleText}>支払い情報を登録する</span>
          </h2>
          <p className={styles.description}>
            TOP画面の左側のネジアイコン「Settings」から「Billing」を選択し、「Add
            payment details」をクリックします。
            <br />
            個人名義で登録する場合は「Individual」、企業名義で登録する場合は「Company」を選択します。
            <br />
            クレジットカード情報を入力し、「Continue」をクリックします。
            <br />
            「Your subscription was created
            successfully」と表示されれば、支払い情報の登録は完了です。
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
