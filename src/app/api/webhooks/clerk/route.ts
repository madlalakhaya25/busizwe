import { Webhook } from 'svix'
import { headers } from 'next/headers'
import { WebhookEvent } from '@clerk/nextjs/server'
import { prisma } from '@/lib/prisma'
import { NextResponse } from 'next/server'

export async function POST(req: Request) {
  const WEBHOOK_SECRET = process.env.CLERK_WEBHOOK_SECRET

  if (!WEBHOOK_SECRET) {
    return NextResponse.json({ error: 'Webhook secret not configured' }, { status: 500 })
  }

  const headerPayload = await headers()
  const svix_id = headerPayload.get('svix-id')
  const svix_timestamp = headerPayload.get('svix-timestamp')
  const svix_signature = headerPayload.get('svix-signature')

  if (!svix_id || !svix_timestamp || !svix_signature) {
    return NextResponse.json({ error: 'Missing svix headers' }, { status: 400 })
  }

  const payload = await req.json()
  const body = JSON.stringify(payload)

  const wh = new Webhook(WEBHOOK_SECRET)
  let evt: WebhookEvent

  try {
    evt = wh.verify(body, {
      'svix-id': svix_id,
      'svix-timestamp': svix_timestamp,
      'svix-signature': svix_signature,
    }) as WebhookEvent
  } catch {
    return NextResponse.json({ error: 'Invalid signature' }, { status: 400 })
  }

  if (evt.type === 'user.created') {
    const { id, email_addresses, first_name, last_name } = evt.data
    const email = email_addresses[0]?.email_address

    if (!email) return NextResponse.json({ error: 'No email' }, { status: 400 })

    await prisma.user.create({
      data: {
        clerkId: id,
        email,
        profile: first_name
          ? {
              create: {
                firstName: first_name ?? '',
                lastName: last_name ?? '',
              },
            }
          : undefined,
      },
    })
  }

  if (evt.type === 'user.updated') {
    const { id, email_addresses, first_name, last_name } = evt.data
    const email = email_addresses[0]?.email_address

    if (email) {
      await prisma.user.update({
        where: { clerkId: id },
        data: { email },
      })
    }

    if (first_name || last_name) {
      const user = await prisma.user.findUnique({ where: { clerkId: id } })
      if (user) {
        await prisma.profile.upsert({
          where: { userId: user.id },
          create: { userId: user.id, firstName: first_name ?? '', lastName: last_name ?? '' },
          update: { firstName: first_name ?? '', lastName: last_name ?? '' },
        })
      }
    }
  }

  if (evt.type === 'user.deleted') {
    const { id } = evt.data
    if (id) {
      await prisma.user.update({
        where: { clerkId: id },
        data: { deletedAt: new Date() },
      })
    }
  }

  return NextResponse.json({ received: true })
}
