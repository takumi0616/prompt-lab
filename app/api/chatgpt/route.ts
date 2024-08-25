import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  const {
    apiKey,
    text,
    model,
    max_tokens,
    seed,
    top_logprobs,
    temperature,
    top_p,
  } = await request.json()

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
    model: model || 'gpt-4o',
    messages: messages,
    max_tokens: max_tokens || 30,
    seed: seed || 27,
    logprobs: true,
    top_logprobs: top_logprobs || 10,
    temperature: temperature || 0,
    top_p: top_p || 1,
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
