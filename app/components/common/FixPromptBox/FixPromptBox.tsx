import React from 'react'
import ReactMarkdown from 'react-markdown'
import styles from './FixPromptBox.module.css'
import { FixPromptProps } from '@/app/types'

export default function FixPromptBox({
  improvementSuggestions,
}: FixPromptProps) {
  return (
    <div className={styles.fixPrompt}>
      {improvementSuggestions ? (
        <>
          <h2>プロンプトの改善についての提案</h2>
          <h4>
            サイドメニューにも同じ内容が表示されているので、参考にしながらプロンプトを改善しよう！
          </h4>
          <ReactMarkdown>{improvementSuggestions}</ReactMarkdown>
        </>
      ) : (
        <p>No improvement suggestions available</p>
      )}
    </div>
  )
}
