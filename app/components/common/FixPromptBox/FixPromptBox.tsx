import React from 'react'
import ReactMarkdown from 'react-markdown'
import styles from './FixPromptBox.module.css'
import { FixPromptProps } from '@/app/types'

export default function FixPromptBox({
  improvementSuggestions,
  score,
  similarityScore,
}: FixPromptProps) {
  return (
    <div className={styles.fixPrompt}>
      <div className={styles.scoreBox}>
        <h2 className={styles.scoreTitle}>
          あなたのプロンプトの点数: {Math.round(score)}点
        </h2>
        <h3 className={styles.scoreSubTitle}>
          Similarity Score: {similarityScore}
        </h3>
      </div>
      {improvementSuggestions ? (
        <div className={styles.fixPromptText}>
          <h2>プロンプトの改善についての提案</h2>
          <h4>
            サイドメニューにも同じ内容が表示されているので、参考にしながらプロンプトを改善しよう！
          </h4>
          <ReactMarkdown>{improvementSuggestions}</ReactMarkdown>
        </div>
      ) : (
        <p>No improvement suggestions available</p>
      )}
    </div>
  )
}
