import React from 'react'
import ReactMarkdown from 'react-markdown'
import styles from './FixPromptBox.module.css'
import { FixPromptProps } from '@/app/types'

export default function FixPromptBox({
  improvementSuggestions,
  score,
  similarityScore,
}: FixPromptProps) {
  const getScoreMessage = (score: number) => {
    if (score >= 90) return 'すごい！天才プロンプター！'
    if (score >= 70) return 'いいね！あともう一歩！'
    return 'がんばって！次はもっとよくなるよ！'
  }

  const starCount = Math.min(5, Math.floor(score / 20))

  return (
    <div className={styles.resultContainer}>
      <div className={styles.scoreSection}>
        <div className={styles.scorePrimary}>
          <span className={styles.trophyIcon} role="img" aria-label="trophy">
            🏆
          </span>
          <div className={styles.scoreContent}>
            <div className={styles.scoreHeader}>
              <h2 className={styles.scoreTitle}>きみのスコア</h2>
            </div>
            <div className={styles.scoreValue}>{Math.round(score)}点</div>
          </div>
        </div>

        <div className={styles.scoreSecondary}>
          <p className={styles.scoreMessage}>{getScoreMessage(score)}</p>
          <div className={styles.starContainer}>
            {[...Array(5)].map((_, i) => (
              <span
                key={i}
                className={styles.star}
                role="img"
                aria-label="star"
                style={{ opacity: i < starCount ? 1 : 0.3 }}
              >
                ⭐
              </span>
            ))}
          </div>
          <p className={styles.similarityScore}>
            類似度スコア: {similarityScore}
          </p>
        </div>
      </div>

      {improvementSuggestions ? (
        <div className={styles.hintSection}>
          <div className={styles.hintHeader}>
            <span className={styles.hintIcon} role="img" aria-label="lightbulb">
              💡
            </span>
            <h3 className={styles.hintTitle}>もっとよくするためのヒント！</h3>
          </div>
          <p className={styles.hintDescription}>
            ヒントを参考に、もっといいプロンプトを作ってみよう！
            サイドメニューにも同じ内容が表示されているよ！
          </p>
          <div className={styles.hintList}>
            <ReactMarkdown>{improvementSuggestions}</ReactMarkdown>
          </div>
        </div>
      ) : (
        <p>今はもっとよくするためのヒントがないよ。またあとで見てみてね！</p>
      )}
    </div>
  )
}
