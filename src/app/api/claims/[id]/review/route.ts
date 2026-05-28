import { auth } from '@clerk/nextjs/server'
import { NextResponse } from 'next/server'
import { z } from 'zod'
import { prisma } from '@/lib/prisma'

const reviewSchema = z.object({
  action: z.enum(['APPROVE', 'REJECT', 'MARK_PAID', 'UNDER_REVIEW']),
  adminNotes: z.string().optional(),
  rejectionReason: z.string().optional(),
})

export async function POST(req: Request, { params }: { params: Promise<{ id: string }> }) {
  const { userId } = await auth()
  if (!userId) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const admin = await prisma.user.findUnique({
    where: { clerkId: userId },
    select: { role: true, id: true },
  })
  if (!admin || (admin.role !== 'ADMIN' && admin.role !== 'SUPER_ADMIN')) {
    return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
  }

  const { id } = await params
  const body = await req.json()
  const parsed = reviewSchema.safeParse(body)
  if (!parsed.success) return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 })

  const { action, adminNotes, rejectionReason } = parsed.data

  const updateData: Record<string, unknown> = {
    adminNotes,
    reviewedBy: admin.id,
    reviewedAt: new Date(),
  }

  if (action === 'UNDER_REVIEW') updateData.status = 'UNDER_REVIEW'
  if (action === 'APPROVE') { updateData.status = 'APPROVED'; updateData.approvedAt = new Date() }
  if (action === 'MARK_PAID') { updateData.status = 'PAID'; updateData.paidAt = new Date() }
  if (action === 'REJECT') {
    updateData.status = 'REJECTED'
    updateData.rejectedAt = new Date()
    updateData.rejectionReason = rejectionReason
  }

  const claim = await prisma.claim.update({ where: { id }, data: updateData })
  return NextResponse.json(claim)
}
