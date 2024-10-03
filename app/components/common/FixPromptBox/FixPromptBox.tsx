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
          <h3>改善提案</h3>
          <ReactMarkdown>{improvementSuggestions}</ReactMarkdown>
        </>
      ) : (
        <p>No improvement suggestions available</p>
      )}
    </div>
  )
}
