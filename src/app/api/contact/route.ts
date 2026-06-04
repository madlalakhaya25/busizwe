import { NextResponse } from 'next/server'
import { z } from 'zod'
import { Resend } from 'resend'

const contactSchema = z.object({
  firstName:   z.string().min(1).max(100),
  lastName:    z.string().min(1).max(100),
  email:       z.string().email(),
  phone:       z.string().optional(),
  subject:     z.string().optional(),
  message:     z.string().min(10).max(2000),
})

const BUSINESS_EMAIL = 'busizwebs@gmail.com'

export async function POST(req: Request) {
  const body = await req.json().catch(() => null)
  if (!body) return NextResponse.json({ error: 'Invalid request' }, { status: 400 })

  const parsed = contactSchema.safeParse(body)
  if (!parsed.success) return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 })

  const { firstName, lastName, email, phone, subject, message } = parsed.data
  const fullName = `${firstName} ${lastName}`

  const resendKey = process.env.RESEND_API_KEY
  if (!resendKey) {
    // Log to console when not configured — form still shows success to user
    console.log('[contact] No RESEND_API_KEY — form submission:', { fullName, email, subject, message })
    return NextResponse.json({ success: true })
  }

  const resend = new Resend(resendKey)

  const subjectLine = subject
    ? `Contact Form – ${subject} — from ${fullName}`
    : `Contact Form — from ${fullName}`

  const { error } = await resend.emails.send({
    from:    'Busizwe Burial Society <noreply@busizwe.co.za>',
    to:      [BUSINESS_EMAIL],
    replyTo: email,
    subject: subjectLine,
    html: `
      <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; color: #1C1C1C;">
        <div style="background: #014D4E; padding: 24px 32px; border-radius: 8px 8px 0 0;">
          <h2 style="color: #fff; margin: 0; font-size: 20px;">New Contact Form Submission</h2>
        </div>
        <div style="padding: 32px; border: 1px solid #E5E7EB; border-top: none; border-radius: 0 0 8px 8px;">
          <table style="width: 100%; border-collapse: collapse;">
            <tr><td style="padding: 8px 0; color: #6B7280; width: 140px;">Name</td><td style="padding: 8px 0; font-weight: 600;">${fullName}</td></tr>
            <tr><td style="padding: 8px 0; color: #6B7280;">Email</td><td style="padding: 8px 0;"><a href="mailto:${email}" style="color: #014D4E;">${email}</a></td></tr>
            ${phone ? `<tr><td style="padding: 8px 0; color: #6B7280;">Phone</td><td style="padding: 8px 0;">${phone}</td></tr>` : ''}
            ${subject ? `<tr><td style="padding: 8px 0; color: #6B7280;">Subject</td><td style="padding: 8px 0;">${subject}</td></tr>` : ''}
          </table>
          <hr style="border: none; border-top: 1px solid #E5E7EB; margin: 20px 0;" />
          <p style="color: #6B7280; font-size: 13px; margin: 0 0 8px;">Message</p>
          <div style="background: #F9FAFB; border-radius: 6px; padding: 16px; white-space: pre-wrap; line-height: 1.6;">${message}</div>
          <p style="color: #9CA3AF; font-size: 12px; margin-top: 24px;">
            Reply directly to this email to respond to ${firstName}.
          </p>
        </div>
      </div>
    `,
  })

  if (error) {
    console.error('[contact] Resend error:', error)
    return NextResponse.json({ error: 'Failed to send message' }, { status: 500 })
  }

  return NextResponse.json({ success: true })
}
