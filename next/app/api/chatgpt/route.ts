import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  const { apiKey, text } = await request.json()

  if (!apiKey) {
    return NextResponse.json(
      { error: 'APIキーが設定されていません。' },
      { status: 400 },
    )
  }

  const messages = [
    {
      role: 'user',
      content: text,
    },
  ]

  const body = {
    model: 'gpt-4o',
    messages: messages,
    max_tokens: 30,
    seed: 27,
    logprobs: true,
    top_logprobs: 10,
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
    const generated_text = data.choices[0]?.message?.content || ''
    const logprobs_info = data.choices[0]?.logprobs?.tokens || []

    return NextResponse.json({
      text: generated_text,
      logprobs: logprobs_info,
      data,
    })
  } else {
    const errorText = await response.text()
    console.error(`Error: ${response.status}`)
    console.error(errorText)
    return NextResponse.json({ error: errorText }, { status: response.status })
  }
}
