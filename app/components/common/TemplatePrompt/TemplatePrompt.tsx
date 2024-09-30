import React from 'react'
import styles from './TemplatePrompt.module.css'

interface TemplatePromptProps {
  onSelectPrompt: (prompt: string) => void
  onOpenModal: (prompt: string) => void
}

const templates = [
  {
    title: 'ビジネスメールの作成',
    prompt:
      'あなたはビジネスマンです。クライアントに対して、プロジェクトの進捗報告メールを書いてください。',
  },
  {
    title: '旅行プランの提案',
    prompt:
      'あなたは旅行代理店のスタッフです。3泊4日で楽しめる東京の旅行プランを提案してください。',
  },
]

const TemplatePrompt: React.FC<TemplatePromptProps> = ({
  onSelectPrompt,
  onOpenModal,
}) => {
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
      <h3>テンプレートから選択</h3>
      <ul className={styles.templateList}>
        {templates.map((template, index) => (
          <li key={index} className={styles.templateItem}>
            <div
              className={styles.templateTitle}
              role="button"
              tabIndex={0}
              onClick={() => onOpenModal(template.prompt)}
              onKeyDown={(event) => handleKeyDown(event, template.prompt)}
            >
              {template.title}
            </div>
            <button
              className={styles.insertButton}
              onClick={() => onSelectPrompt(template.prompt)}
            >
              挿入
            </button>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default TemplatePrompt
