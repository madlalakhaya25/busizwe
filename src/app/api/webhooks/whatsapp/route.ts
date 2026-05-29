import { NextResponse } from 'next/server'
import crypto from 'crypto'
import { prisma } from '@/lib/prisma'
import { sendWhatsApp } from '@/lib/whatsapp'

const APP_URL = process.env.NEXT_PUBLIC_APP_URL ?? 'https://busizwe.co.za'

function verifyTwilioSignature(token: string, signature: string, url: string, params: URLSearchParams): boolean {
  const sorted = [...params.entries()].sort(([a], [b]) => a.localeCompare(b))
  const str = url + sorted.map(([k, v]) => `${k}${v}`).join('')
  const expected = crypto.createHmac('sha1', token).update(str).digest('base64')
  try {
    return crypto.timingSafeEqual(Buffer.from(signature), Buffer.from(expected))
  } catch {
    return false
  }
}

export async function POST(req: Request) {
  const authToken = process.env.TWILIO_AUTH_TOKEN
  if (authToken) {
    const sig = req.headers.get('x-twilio-signature') ?? ''
    const url = `${APP_URL}/api/webhooks/whatsapp`
    const rawBody = await req.clone().text()
    if (!verifyTwilioSignature(authToken, sig, url, new URLSearchParams(rawBody))) {
      return new NextResponse('Forbidden', { status: 403 })
    }
  }

  const text = await req.text()
  const params = new URLSearchParams(text)
  const from = params.get('From') ?? ''
  const body = (params.get('Body') ?? '').trim().toUpperCase()

  const rawPhone = from.replace('whatsapp:', '').replace('+27', '0')
  let reply = ''

  try {
    if (body === 'STATUS' || body === 'POLICY') {
      // Single query instead of two sequential lookups (M-6)
      const profile = await prisma.profile.findFirst({
        where: { phone: rawPhone },
        select: {
          firstName: true,
          user: {
            select: {
              policies: {
                where: { status: 'ACTIVE' },
                select: { policyNumber: true },
              },
            },
          },
        },
      })

      if (!profile) {
        reply = `Hi there! We couldn't find your account. Please log in at ${APP_URL} or call us on 061 463 1973.`
      } else {
        const active = profile.user?.policies ?? []
        reply = active.length === 0
          ? `Hi ${profile.firstName}! You have no active policies. Visit ${APP_URL}/dashboard to apply for cover.`
          : `Hi ${profile.firstName}! Your active ${active.length === 1 ? 'policy' : 'policies'}: ${active.map((p) => p.policyNumber).join(', ')}. View: ${APP_URL}/dashboard`
      }
    } else if (body === 'CLAIM') {
      reply = `To submit a funeral claim, please visit: ${APP_URL}/dashboard/claims\n\nFor urgent help, call 061 463 1973. We are sorry for your loss. 💛`
    } else if (body === 'HELP' || body === 'HI' || body === 'HELLO') {
      reply = `Welcome to Busizwe Burial Society 🌿\n\nReply with:\n• STATUS – your policy status\n• CLAIM – how to submit a claim\n\nVisit: ${APP_URL}\nCall: 061 463 1973\n\nWe are here for you.`
    } else {
      reply = `Hello 👋 For help, reply HELP or visit ${APP_URL}. For urgent matters, call 061 463 1973.`
    }
  } catch {
    reply = `We're experiencing a brief issue. Please try again or call 061 463 1973.`
  }

  await sendWhatsApp(from, reply)

  return new NextResponse(
    `<?xml version="1.0" encoding="UTF-8"?><Response></Response>`,
    { headers: { 'Content-Type': 'text/xml' } }
  )
}
