import React from 'react'
import { FaEnvelope, FaPlane } from 'react-icons/fa'
import styles from './TemplatePrompt.module.css'
import { TemplatePromptProps } from '@/app/types'

const templates = [
  {
    title: 'ビジネスメールの作成',
    subTitle: 'クライアントへの進捗報告メール',
    icon: <FaEnvelope />,
    prompt:
      'あなたはビジネスマンです。クライアントに対して、プロジェクトの進捗報告メールを書いてください。',
  },
  {
    title: '旅行プランの提案',
    subTitle: '東京の3泊4日旅行プラン',
    icon: <FaPlane />,
    prompt:
      'あなたは旅行代理店のスタッフです。3泊4日で楽しめる東京の旅行プランを提案してください。',
  },
]

export default function TemplatePrompt({
  onSelectPrompt,
  onOpenModal,
}: TemplatePromptProps) {
  const handleKeyDown = (
    event: React.KeyboardEvent<HTMLDivElement>,
    prompt: string,
  ) => {
    if (event.key === 'Enter' || event.key === ' ') {
      onOpenModal(prompt)
    }
  }

  return (
    <div className={styles.templatePrompt}>
      <div className={styles.templateGrid}>
        {templates.map((template, index) => (
          <div key={index} className={styles.templateCard}>
            <div
              className={styles.cardContent}
              role="button"
              tabIndex={0}
              onClick={() => onOpenModal(template.prompt)}
              onKeyDown={(event) => handleKeyDown(event, template.prompt)}
            >
              <div className={styles.iconWrapper}>{template.icon}</div>
              <div className={styles.textContent}>
                <div className={styles.templateTitle}>{template.title}</div>
                <div className={styles.templateSubTitle}>
                  {template.subTitle}
                </div>
              </div>
            </div>
            <button
              className={styles.insertButton}
              onClick={() => onSelectPrompt(template.prompt)}
            >
              挿入
            </button>
          </div>
        ))}
      </div>
    </div>
  )
}
