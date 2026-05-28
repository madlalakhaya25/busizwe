import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { sendWhatsApp } from '@/lib/whatsapp'

const APP_URL = process.env.NEXT_PUBLIC_APP_URL ?? 'https://busizwe.co.za'

// Twilio posts form-encoded body for incoming WhatsApp messages
export async function POST(req: Request) {
  const text = await req.text()
  const params = new URLSearchParams(text)
  const from = params.get('From') ?? ''          // e.g. whatsapp:+27821234567
  const body = (params.get('Body') ?? '').trim().toUpperCase()

  const rawPhone = from.replace('whatsapp:', '').replace('+27', '0')

  let reply = ''

  try {
    if (body === 'STATUS' || body === 'POLICY') {
      const profile = await prisma.profile.findFirst({ where: { phone: rawPhone } })
      if (!profile) {
        reply = `Hi there! We couldn't find your account. Please log in at ${APP_URL} or call us on 0800 000 000.`
      } else {
        const user = await prisma.user.findUnique({ where: { id: profile.userId }, include: { policies: { where: { status: 'ACTIVE' }, select: { policyNumber: true, coverAmount: true } } } })
        const activePolicies = user?.policies ?? []
        if (activePolicies.length === 0) {
          reply = `Hi ${profile.firstName}! You have no active policies. Visit ${APP_URL}/dashboard to apply for cover.`
        } else {
          const list = activePolicies.map((p) => `${p.policyNumber}`).join(', ')
          reply = `Hi ${profile.firstName}! Your active ${activePolicies.length === 1 ? 'policy' : 'policies'}: ${list}. View details: ${APP_URL}/dashboard`
        }
      }
    } else if (body === 'CLAIM') {
      reply = `To submit a funeral claim, please visit: ${APP_URL}/dashboard/claims\n\nIf you need urgent assistance, call us on 0800 000 000. We are sorry for your loss. 💛`
    } else if (body === 'HELP' || body === 'HI' || body === 'HELLO') {
      reply = `Welcome to Busizwe Burial Society 🌿\n\nReply with:\n• STATUS – your policy status\n• CLAIM – how to submit a claim\n\nOr visit ${APP_URL}\nCall: 0800 000 000\n\nWe are here for you.`
    } else {
      reply = `Hello 👋 We received your message. For help, reply HELP or visit ${APP_URL}. For urgent matters, call 0800 000 000.`
    }
  } catch {
    reply = `We're experiencing a brief issue. Please try again or call 0800 000 000.`
  }

  // Send the reply using Twilio
  await sendWhatsApp(from, reply)

  // Return TwiML (Twilio also accepts this format)
  return new NextResponse(
    `<?xml version="1.0" encoding="UTF-8"?><Response></Response>`,
    { headers: { 'Content-Type': 'text/xml' } }
  )
}
