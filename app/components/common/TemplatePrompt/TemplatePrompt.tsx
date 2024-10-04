import React from 'react'
import {
  FaEnvelope,
  FaPlane,
  FaPenFancy,
  FaShoppingCart,
  FaUtensils,
} from 'react-icons/fa'
import { IoLogoWechat } from 'react-icons/io5'
import { SiLibreofficeimpress } from 'react-icons/si'
import { BiDetail } from 'react-icons/bi'
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
    title: '買い物リストの作成',
    subTitle: '一週間分の食材リスト',
    icon: <FaShoppingCart />,
    prompt:
      'あなたは家庭で料理をする人です。1週間分の食材の買い物リストを作成してください。',
  },
  {
    title: '簡単な料理レシピ',
    subTitle: '10分で作れる料理',
    icon: <FaUtensils />,
    prompt: '10分以内で作れる簡単な料理のレシピを提案してください。',
  },
  {
    title: '旅行プランの提案',
    subTitle: '東京の3泊4日旅行プラン',
    icon: <FaPlane />,
    prompt:
      'あなたは旅行代理店のスタッフです。3泊4日で楽しめる東京の旅行プランを提案してください。',
  },
  {
    title: 'インタビューの質問',
    subTitle: ' 作家へのインタビューのための質問のリスト',
    icon: <FaPenFancy />,
    prompt:
      'あなたは記者です。作家へのインタビューのための質問のリストを作成してください。',
  },
  {
    title: '賛否両論者',
    subTitle: ' 特定のトピックの長所と短所を分析',
    icon: <IoLogoWechat />,
    prompt: 'リモートワークとオフィスワークの長所と短所を分析してください。',
  },
  {
    title: '資料作成',
    subTitle: ' 自社の新しいソフトウェアに関する資料作成',
    icon: <SiLibreofficeimpress />,
    prompt:
      'あなたは大手企業に勤めるソフトウェアの担当者です。新しいソフトウェアに関する資料の骨子を作成してください。',
  },
  {
    title: '会議アジェンダ作成',
    subTitle: ' 週次チームミーティングのアジェンダ',
    icon: <BiDetail />,
    prompt:
      'あなたはチームリーダーです。週次チームミーティングのためのアジェンダを作成してください。',
  },
]

export default function TemplatePrompt({ onOpenModal }: TemplatePromptProps) {
  const handleKeyDown = (
    event: React.KeyboardEvent<HTMLDivElement>,
    title: string,
    subTitle: string,
    prompt: string,
  ) => {
    if (event.key === 'Enter' || event.key === ' ') {
      onOpenModal(title, subTitle, prompt)
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
              onClick={() =>
                onOpenModal(template.title, template.subTitle, template.prompt)
              }
              onKeyDown={(event) =>
                handleKeyDown(
                  event,
                  template.title,
                  template.subTitle,
                  template.prompt,
                )
              }
            >
              <div className={styles.iconWrapper}>{template.icon}</div>
              <div className={styles.textContent}>
                <div className={styles.templateTitle}>{template.title}</div>
                <div className={styles.templateSubTitle}>
                  {template.subTitle}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
