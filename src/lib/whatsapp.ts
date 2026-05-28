const TWILIO_SID = process.env.TWILIO_ACCOUNT_SID
const TWILIO_TOKEN = process.env.TWILIO_AUTH_TOKEN
const FROM_NUMBER = process.env.TWILIO_WHATSAPP_FROM ?? 'whatsapp:+14155238886'

export async function sendWhatsApp(toPhone: string, message: string): Promise<void> {
  if (!TWILIO_SID || !TWILIO_TOKEN || !toPhone) return

  const to = toPhone.startsWith('whatsapp:') ? toPhone : `whatsapp:+27${toPhone.replace(/^0/, '')}`

  await fetch(
    `https://api.twilio.com/2010-04-01/Accounts/${TWILIO_SID}/Messages.json`,
    {
      method: 'POST',
      headers: {
        Authorization: `Basic ${Buffer.from(`${TWILIO_SID}:${TWILIO_TOKEN}`).toString('base64')}`,
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: new URLSearchParams({ From: FROM_NUMBER, To: to, Body: message }),
    }
  ).catch(() => {}) // silently fail — WhatsApp is best-effort
}

export function claimStatusMessage(claimNumber: string, status: string, appUrl: string): string {
  const base = `Busizwe Burial Society – Claim ${claimNumber}`
  const url = `${appUrl}/dashboard/claims`
  switch (status) {
    case 'UNDER_REVIEW':
      return `${base}: Your claim is now under review. Our team will be in touch within 48 hours. View: ${url}`
    case 'APPROVED':
      return `${base}: ✅ Your claim has been approved. Payout will be processed within 24 hours. View: ${url}`
    case 'PAID':
      return `${base}: 💛 Your payout has been processed. We are deeply sorry for your loss. View: ${url}`
    case 'REJECTED':
      return `${base}: Your claim could not be approved at this time. Please log in for details and contact us if you have questions. View: ${url}`
    default:
      return `${base}: Your claim status has been updated. View: ${url}`
  }
}
