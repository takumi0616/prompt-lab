import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const { apiKey, text1, text2 } = await request.json()

    if (!apiKey) {
      return NextResponse.json(
        { error: 'APIキーが設定されていません。' },
        { status: 400 },
      )
    }

    if (!text1 || !text2) {
      return NextResponse.json(
        { error: 'Both text1 and text2 must be provided.' },
        { status: 400 },
      )
    }

    const headers = {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${apiKey}`,
    }

    const body1 = {
      input: text1,
      model: 'text-embedding-3-large',
    }

    const body2 = {
      input: text2,
      model: 'text-embedding-3-large',
    }

    const [response1, response2] = await Promise.all([
      fetch('https://api.openai.com/v1/embeddings', {
        method: 'POST',
        headers: headers,
        body: JSON.stringify(body1),
      }),
      fetch('https://api.openai.com/v1/embeddings', {
        method: 'POST',
        headers: headers,
        body: JSON.stringify(body2),
      }),
    ])

    if (!response1.ok || !response2.ok) {
      const errorText1 = await response1.text()
      const errorText2 = await response2.text()
      console.error(`Error 1: ${response1.status}, ${errorText1}`)
      console.error(`Error 2: ${response2.status}, ${errorText2}`)
      return NextResponse.json(
        { error: 'Failed to fetch embeddings' },
        { status: 500 },
      )
    }

    const data1 = await response1.json()
    const data2 = await response2.json()

    const embedding1 = data1.data[0].embedding
    const embedding2 = data2.data[0].embedding

    const similarityScore = cosineSimilarity(embedding1, embedding2)

    return NextResponse.json({ similarityScore })
  } catch (error) {
    console.error('Error:', (error as Error).message)
    return NextResponse.json(
      { error: (error as Error).message },
      { status: 500 },
    )
  }
}

function dotProduct(vec1: number[], vec2: number[]): number {
  return vec1.reduce((sum, value, index) => sum + value * vec2[index], 0)
}

function norm(vec: number[]): number {
  return Math.sqrt(vec.reduce((sum, value) => sum + value * value, 0))
}

function cosineSimilarity(embedding1: number[], embedding2: number[]): number {
  const dotProd = dotProduct(embedding1, embedding2)
  const norm1 = norm(embedding1)
  const norm2 = norm(embedding2)
  return dotProd / (norm1 * norm2)
}
