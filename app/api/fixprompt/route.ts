import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  const { apiKey, userPrompt, output, desiredOutput, similarityScore } =
    await request.json()

  if (!apiKey) {
    return NextResponse.json(
      { error: 'APIキーが設定されていません。' },
      { status: 400 },
    )
  }

  const fixPrompt = `
    # 命令文
    現在の出力と理想の出力を比較して、現在の出力が理想の出力に近づくために、現在のユーザーのプロンプトの改善点を 下記に記載しているプロンプトチェックシート（全16個）をもとに、リストアップしてください。
    また、現在のユーザーのプロンプトの改善点をdiff形式で表示してください。プロンプトエンジニアリングに関して初心者の方が見るので、文章やアドバイスは簡潔に記述してください。

    # 現在のユーザーのプロンプト:
    \`\`\`
    ${userPrompt}
    \`\`\`

    # 現在の出力:
    \`\`\`
    ${output}
    \`\`\`

    # 理想の出力:
    \`\`\`
    ${desiredOutput}
    \`\`\`

    # 類似度スコア: ${similarityScore}

    # プロンプトチェックシート（全16個）
    \`\`\`
    1. 明確で具体的な指示を出す
    2. 期待する出力形式を指定する
    3. モデルに役割を与える
    4. 思考プロセスを促す（チェーン・オブ・ソート）
    5. 具体的な例を提供する（Few-shot学習）
    6. 肯定的な表現を使う
    7. 対象者を明示する
    8. 形式や構造を指定する
    9. 特定の語句やフレーズを使うよう指示する
    10. 偏見やステレオタイプを避けるよう指示する
    11. 過度な丁寧さを省く
    12. デリミター（区切り記号）を使って明確にする
    13. 複雑なタスクを分割する
    14. 特定の情報に基づいて回答するよう指示する
    15. 回答の長さを指定する
    16. 問題解決のプロセスを示す
    \`\`\`
  `

  const body = {
    model: 'gpt-4o',
    messages: [{ role: 'user', content: fixPrompt }],
    max_tokens: 2000,
    temperature: 0.0,
  }

  const headers = {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${apiKey}`,
  }

  const response = await fetch('https://api.openai.com/v1/chat/completions', {
    method: 'POST',
    headers: headers,
    body: JSON.stringify(body),
  })

  if (response.ok) {
    const data = await response.json()
    const improvementSuggestions = data.choices[0]?.message?.content || ''

    return NextResponse.json({
      improvementSuggestions,
      data,
    })
  } else {
    const errorText = await response.text()
    return NextResponse.json({ error: errorText }, { status: response.status })
  }
}
