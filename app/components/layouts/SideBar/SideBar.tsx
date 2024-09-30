import React from 'react'
import styles from './SideBar.module.css'

export default function SideBar({ isOpen }: { isOpen: boolean }) {
  return (
    <div
      className={`${styles.sidebar} ${isOpen ? styles.open : styles.closed}`}
    >
      <h2 className={styles.title}>生成AIプロンプト作成ガイド</h2>
      <div className={styles.content}>
        <section className={styles.section}>
          <h3 className={styles.subtitle}>1. 明確な指示を与える</h3>
          <p>
            AIに期待する結果を具体的に伝えましょう。曖昧な表現は避け、詳細な情報を提供することで、望む回答が得られやすくなります。
          </p>
        </section>
        <section className={styles.section}>
          <h3 className={styles.subtitle}>2. 文脈を提供する</h3>
          <p>
            必要に応じて背景情報や目的を伝えることで、AIがより適切な回答を生成します。
          </p>
        </section>
        <section className={styles.section}>
          <h3 className={styles.subtitle}>3. フォーマットを指定する</h3>
          <p>
            特定の形式やスタイルでの回答が必要な場合、その旨を明記しましょう。
          </p>
        </section>
        <section className={styles.section}>
          <h3 className={styles.subtitle}>4. 制約条件を設定する</h3>
          <p>
            語数制限やトピックの範囲など、制限事項がある場合はプロンプトに含めてください。
          </p>
        </section>
        <section className={styles.section}>
          <h3 className={styles.subtitle}>5. 例を示す</h3>
          <p>期待する回答の例を提供することで、AIが理解しやすくなります。</p>
        </section>
        <section className={styles.section}>
          <h3 className={styles.subtitle}>1. 明確な指示を与える</h3>
          <p>
            AIに期待する結果を具体的に伝えましょう。曖昧な表現は避け、詳細な情報を提供することで、望む回答が得られやすくなります。
          </p>
        </section>
        <section className={styles.section}>
          <h3 className={styles.subtitle}>2. 文脈を提供する</h3>
          <p>
            必要に応じて背景情報や目的を伝えることで、AIがより適切な回答を生成します。
          </p>
        </section>
        <section className={styles.section}>
          <h3 className={styles.subtitle}>3. フォーマットを指定する</h3>
          <p>
            特定の形式やスタイルでの回答が必要な場合、その旨を明記しましょう。
          </p>
        </section>
        <section className={styles.section}>
          <h3 className={styles.subtitle}>4. 制約条件を設定する</h3>
          <p>
            語数制限やトピックの範囲など、制限事項がある場合はプロンプトに含めてください。
          </p>
        </section>
        <section className={styles.section}>
          <h3 className={styles.subtitle}>5. 例を示す</h3>
          <p>期待する回答の例を提供することで、AIが理解しやすくなります。</p>
        </section>
        <section className={styles.section}>
          <h3 className={styles.subtitle}>1. 明確な指示を与える</h3>
          <p>
            AIに期待する結果を具体的に伝えましょう。曖昧な表現は避け、詳細な情報を提供することで、望む回答が得られやすくなります。
          </p>
        </section>
        <section className={styles.section}>
          <h3 className={styles.subtitle}>2. 文脈を提供する</h3>
          <p>
            必要に応じて背景情報や目的を伝えることで、AIがより適切な回答を生成します。
          </p>
        </section>
        <section className={styles.section}>
          <h3 className={styles.subtitle}>3. フォーマットを指定する</h3>
          <p>
            特定の形式やスタイルでの回答が必要な場合、その旨を明記しましょう。
          </p>
        </section>
        <section className={styles.section}>
          <h3 className={styles.subtitle}>4. 制約条件を設定する</h3>
          <p>
            語数制限やトピックの範囲など、制限事項がある場合はプロンプトに含めてください。
          </p>
        </section>
        <section className={styles.section}>
          <h3 className={styles.subtitle}>5. 例を示す</h3>
          <p>期待する回答の例を提供することで、AIが理解しやすくなります。</p>
        </section>
        <section className={styles.section}>
          <h3 className={styles.subtitle}>1. 明確な指示を与える</h3>
          <p>
            AIに期待する結果を具体的に伝えましょう。曖昧な表現は避け、詳細な情報を提供することで、望む回答が得られやすくなります。
          </p>
        </section>
        <section className={styles.section}>
          <h3 className={styles.subtitle}>2. 文脈を提供する</h3>
          <p>
            必要に応じて背景情報や目的を伝えることで、AIがより適切な回答を生成します。
          </p>
        </section>
        <section className={styles.section}>
          <h3 className={styles.subtitle}>3. フォーマットを指定する</h3>
          <p>
            特定の形式やスタイルでの回答が必要な場合、その旨を明記しましょう。
          </p>
        </section>
        <section className={styles.section}>
          <h3 className={styles.subtitle}>4. 制約条件を設定する</h3>
          <p>
            語数制限やトピックの範囲など、制限事項がある場合はプロンプトに含めてください。
          </p>
        </section>
        <section className={styles.section}>
          <h3 className={styles.subtitle}>5. 例を示す</h3>
          <p>期待する回答の例を提供することで、AIが理解しやすくなります。</p>
        </section>
        <section className={styles.section}>
          <h3 className={styles.subtitle}>1. 明確な指示を与える</h3>
          <p>
            AIに期待する結果を具体的に伝えましょう。曖昧な表現は避け、詳細な情報を提供することで、望む回答が得られやすくなります。
          </p>
        </section>
        <section className={styles.section}>
          <h3 className={styles.subtitle}>2. 文脈を提供する</h3>
          <p>
            必要に応じて背景情報や目的を伝えることで、AIがより適切な回答を生成します。
          </p>
        </section>
        <section className={styles.section}>
          <h3 className={styles.subtitle}>3. フォーマットを指定する</h3>
          <p>
            特定の形式やスタイルでの回答が必要な場合、その旨を明記しましょう。
          </p>
        </section>
        <section className={styles.section}>
          <h3 className={styles.subtitle}>4. 制約条件を設定する</h3>
          <p>
            語数制限やトピックの範囲など、制限事項がある場合はプロンプトに含めてください。
          </p>
        </section>
        <section className={styles.section}>
          <h3 className={styles.subtitle}>5. 例を示す</h3>
          <p>期待する回答の例を提供することで、AIが理解しやすくなります。</p>
        </section>
      </div>
    </div>
  )
}
