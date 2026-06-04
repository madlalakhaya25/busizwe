import { auth } from '@clerk/nextjs/server'
import { NextResponse } from 'next/server'
import { z } from 'zod'
import { ClaimStatus } from '@prisma/client'
import { prisma } from '@/lib/prisma'
import { getAdminUser } from '@/lib/requireAdmin'
import { sendWhatsApp, claimStatusMessage } from '@/lib/whatsapp'

const APP_URL = process.env.NEXT_PUBLIC_APP_URL ?? 'https://busizwe.co.za'

const reviewSchema = z.object({
  action: z.enum(['APPROVE', 'REJECT', 'MARK_PAID', 'UNDER_REVIEW']),
  adminNotes: z.string().optional(),
  rejectionReason: z.string().optional(),
})

type ClaimUpdateData = {
  adminNotes?: string
  reviewedBy: string
  reviewedAt: Date
  status?: ClaimStatus
  approvedAt?: Date
  paidAt?: Date
  rejectedAt?: Date
  rejectionReason?: string
}

export async function POST(req: Request, { params }: { params: Promise<{ id: string }> }) {
  const { userId } = await auth()
  if (!userId) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const admin = await getAdminUser(userId)
  if (!admin) return NextResponse.json({ error: 'Forbidden' }, { status: 403 })

  const { id } = await params
  const body = await req.json()
  const parsed = reviewSchema.safeParse(body)
  if (!parsed.success) return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 })

  const { action, adminNotes, rejectionReason } = parsed.data

  const updateData: ClaimUpdateData = {
    adminNotes,
    reviewedBy: admin.id,
    reviewedAt: new Date(),
  }

  if (action === 'UNDER_REVIEW') updateData.status = ClaimStatus.UNDER_REVIEW
  if (action === 'APPROVE') { updateData.status = ClaimStatus.APPROVED; updateData.approvedAt = new Date() }
  if (action === 'MARK_PAID') { updateData.status = ClaimStatus.PAID; updateData.paidAt = new Date() }
  if (action === 'REJECT') {
    updateData.status = ClaimStatus.REJECTED
    updateData.rejectedAt = new Date()
    updateData.rejectionReason = rejectionReason
  }

  const claim = await prisma.claim.update({
    where: { id },
    data: updateData,
    include: {
      user: { select: { profile: { select: { phone: true } } } },
    },
  })

  // Best-effort — only fires when phone is present (C-1 fix: removed operator precedence bug)
  const phone = claim.user.profile?.phone
  if (phone) {
    sendWhatsApp(phone, claimStatusMessage(claim.claimNumber, claim.status, APP_URL))
  }

  return NextResponse.json(claim)
}
