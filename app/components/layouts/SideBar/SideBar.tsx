import React, { useEffect, useState } from 'react'
import ReactMarkdown from 'react-markdown'
import styles from './SideBar.module.css'
import { Tip, SideBarProps } from '@/app/types'

const tips: Tip[] = [
  {
    id: 1,
    title: '明確で具体的な指示を出す',
    example:
      '例: 「次の文章を要約してください。要約は3文以内でお願いします。」',
  },
  {
    id: 2,
    title: '期待する出力形式を指定する',
    example:
      '例: 「回答はJSON形式で以下のようにしてください：{"鶴の数": , "亀の数": }」',
  },
  {
    id: 3,
    title: 'モデルに役割を与える',
    example:
      '例: 「あなたは旅行ガイドです。おすすめの観光地を教えてください。」',
  },
  {
    id: 4,
    title: '思考プロセスを促す（チェーン・オブ・ソート）',
    example: '例: 「ステップバイステップで問題を解いてください。」',
  },
  {
    id: 5,
    title: '具体的な例を提供する（Few-shot学習）',
    example:
      "例: 「例：'早起きは三文の徳' の意味を説明してください。では、'石の上にも三年' の意味も説明してください。」",
  },
  {
    id: 6,
    title: '肯定的な表現を使う',
    example: '例: 「〜してください。」（「〜しないでください。」より効果的）',
  },
  {
    id: 7,
    title: '対象者を明示する',
    example: '例: 「小学生にも分かるように説明してください。」',
  },
  {
    id: 8,
    title: '形式や構造を指定する',
    example: '例: 「箇条書きで回答してください。」',
  },
  {
    id: 9,
    title: '特定の語句やフレーズを使うよう指示する',
    example:
      "例: 「回答に必ず '重要なポイントは' というフレーズを含めてください。」",
  },
  {
    id: 10,
    title: '偏見やステレオタイプを避けるよう指示する',
    example: '例: 「回答は偏見を持たず、中立的な立場でお願いします。」',
  },
  {
    id: 11,
    title: '過度な丁寧さを省く',
    example:
      "例: 「簡潔に回答してください。 'お願いします' や 'ありがとうございます' は不要です。」",
  },
  {
    id: 12,
    title: 'デリミター（区切り記号）を使って明確にする',
    example: "例: 「次の文章を '---' で囲みます：---ここに文章---」",
  },
  {
    id: 13,
    title: '複雑なタスクを分割する',
    example: '例: 「まず問題の要点をまとめ、その後解決策を提案してください。」',
  },
  {
    id: 14,
    title: '特定の情報に基づいて回答するよう指示する',
    example: "例: 「以下のテキストを参考に答えてください： 'テキスト内容'」",
  },
  {
    id: 15,
    title: '回答の長さを指定する',
    example: '例: 「100文字以内で説明してください。」',
  },
  {
    id: 16,
    title: '問題解決のプロセスを示す',
    example: '例: 「以下の数式を解いて、その過程を説明してください。」',
  },
]

export default function SideBar({
  isOpen,
  checkboxStates,
  setCheckboxStates,
  improvementSuggestions,
}: SideBarProps) {
  const [showImprovementSuggestions, setShowImprovementSuggestions] =
    useState(false)

  useEffect(() => {
    if (improvementSuggestions) {
      setShowImprovementSuggestions(true)
    } else {
      setShowImprovementSuggestions(false)
    }
  }, [improvementSuggestions])

  const handleCheckboxChange = (index: number) => {
    const updatedCheckboxStates = [...checkboxStates]
    updatedCheckboxStates[index] = !updatedCheckboxStates[index]
    setCheckboxStates(updatedCheckboxStates)
  }

  return (
    <div
      className={`${styles.sidebar} ${isOpen ? styles.open : styles.closed}`}
    >
      <div className={styles.content}>
        {showImprovementSuggestions && (
          <div className={styles.tipItem}>
            <h2 className={styles.title}>プロンプト改善提案</h2>
            <div className={styles.improvementSuggestions}>
              <ReactMarkdown>{improvementSuggestions}</ReactMarkdown>
            </div>
          </div>
        )}

        <h2 className={styles.title}>プロンプトチェックシート（全16個）</h2>
        {tips.map((tip, index) => (
          <div key={tip.id} className={styles.tipItem}>
            <label className={styles.checkboxLabel}>
              <input
                type="checkbox"
                checked={checkboxStates[index]}
                onChange={() => handleCheckboxChange(index)}
              />
              <span
                className={styles.tipTitle}
              >{`${tip.id}. ${tip.title}`}</span>
            </label>
            <p className={styles.tipExample}>{tip.example}</p>
          </div>
        ))}

        <div className={styles.referenceSection}>
          <h2 className={styles.title}>参考文献</h2>
          <p>本サイトは以下の研究および記事をもとに作成されています：</p>
          <ul className={styles.referenceList}>
            <li>
              Zhou, Yongchao, et al. &quot;Large language models are human-level
              prompt engineers.&quot;
              <i>arXiv preprint arXiv:2211.01910</i> (2022).
            </li>
            <li>
              Bsharat, Sondos Mahmoud, Aidar Myrzakhan, and Zhiqiang Shen.
              &quot;Principled instructions are all you need for questioning
              llama-1/2, gpt-3.5/4.&quot;
              <i>arXiv preprint arXiv:2312.16171</i> (2023).
            </li>
            <li>
              かずうぉんばっと,
              &quot;プロンプト改善エージェントを作ってみた&quot;
              <a href="https://zenn.dev/kazuwombat/articles/2095668882245d">
                Zenn Article
              </a>{' '}
              (2023).
            </li>
            <li>
              Ryotaro,
              &quot;OpenAI・Anthropic・Googleのプロンプトエンジニアリングガイドをまとめてみた&quot;
              <a href="https://zenn.dev/shilla/articles/85b20f8263e206">
                Zenn Article
              </a>{' '}
              (2024).
            </li>
          </ul>
        </div>
      </div>
    </div>
  )
}
