import { auth } from '@clerk/nextjs/server'
import { NextResponse } from 'next/server'
import { z } from 'zod'

const ALLOWED_MIME = ['image/jpeg', 'image/png', 'image/webp', 'application/pdf'] as const
const MAX_BASE64_LENGTH = 14_000_000 // ~10 MB after base64 expansion

const bodySchema = z.object({
  mimeType: z.enum(ALLOWED_MIME),
  base64: z.string().max(MAX_BASE64_LENGTH),
})

type OcrResult = { firstName: string | null; lastName: string | null; idNumber: string | null; dateOfDeath: string | null }

const EMPTY: OcrResult = { firstName: null, lastName: null, idNumber: null, dateOfDeath: null }

export async function POST(req: Request) {
  const { userId } = await auth()
  if (!userId) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const apiKey = process.env.OPENAI_API_KEY
  if (!apiKey) return NextResponse.json<OcrResult>(EMPTY)

  const raw = await req.json().catch(() => null)
  const parsed = bodySchema.safeParse(raw)
  if (!parsed.success) return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 })

  const { base64, mimeType } = parsed.data

  try {
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
              { type: 'image_url', image_url: { url: `data:${mimeType};base64,${base64}`, detail: 'low' } },
              {
                type: 'text',
                text: 'This is a South African death certificate. Extract: firstName (given name), lastName (surname), idNumber (13-digit SA ID if visible), dateOfDeath (YYYY-MM-DD). Return ONLY valid JSON: {"firstName":null,"lastName":null,"idNumber":null,"dateOfDeath":null}. Use null for any field not clearly visible.',
              },
            ],
          },
        ],
      }),
    })

    if (!response.ok) return NextResponse.json<OcrResult>(EMPTY)

    const json = await response.json() as { choices: { message: { content: string } }[] }
    const content = json.choices?.[0]?.message?.content ?? ''
    const match = content.match(/\{[\s\S]*\}/)
    const result: OcrResult = match ? JSON.parse(match[0]) : EMPTY

    return NextResponse.json<OcrResult>(result)
  } catch {
    return NextResponse.json<OcrResult>(EMPTY)
  }
}
