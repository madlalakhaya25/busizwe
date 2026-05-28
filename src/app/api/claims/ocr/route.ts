import { auth } from '@clerk/nextjs/server'
import { NextResponse } from 'next/server'

interface OcrResult {
  firstName: string | null
  lastName: string | null
  idNumber: string | null
  dateOfDeath: string | null
}

export async function POST(req: Request) {
  const { userId } = await auth()
  if (!userId) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const apiKey = process.env.OPENAI_API_KEY
  if (!apiKey) {
    return NextResponse.json<OcrResult>({ firstName: null, lastName: null, idNumber: null, dateOfDeath: null })
  }

  try {
    const body = await req.json() as { base64: string; mimeType: string }
    const { base64, mimeType } = body

    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: { Authorization: `Bearer ${apiKey}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({
        model: 'gpt-4o-mini',
        max_tokens: 200,
        messages: [
          {
            role: 'user',
            content: [
              {
                type: 'image_url',
                image_url: { url: `data:${mimeType};base64,${base64}`, detail: 'low' },
              },
              {
                type: 'text',
                text: 'This is a South African death certificate or death notice. Extract: firstName (given name), lastName (surname/family name), idNumber (13-digit SA ID number if visible), dateOfDeath (ISO format YYYY-MM-DD). Return ONLY valid JSON: {"firstName":null,"lastName":null,"idNumber":null,"dateOfDeath":null}. Use null for any field not clearly visible.',
              },
            ],
          },
        ],
      }),
    })

    if (!response.ok) {
      return NextResponse.json<OcrResult>({ firstName: null, lastName: null, idNumber: null, dateOfDeath: null })
    }

    const json = await response.json() as { choices: { message: { content: string } }[] }
    const raw = json.choices?.[0]?.message?.content ?? '{}'
    const jsonMatch = raw.match(/\{[\s\S]*\}/)
    const result: OcrResult = jsonMatch ? JSON.parse(jsonMatch[0]) : { firstName: null, lastName: null, idNumber: null, dateOfDeath: null }

    return NextResponse.json<OcrResult>(result)
  } catch {
    return NextResponse.json<OcrResult>({ firstName: null, lastName: null, idNumber: null, dateOfDeath: null })
  }
}
