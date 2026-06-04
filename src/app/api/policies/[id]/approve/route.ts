import { auth } from '@clerk/nextjs/server'
import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { getAdminUser } from '@/lib/requireAdmin'

export async function POST(req: Request, { params }: { params: Promise<{ id: string }> }) {
  const { userId } = await auth()
  if (!userId) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const admin = await getAdminUser(userId)
  if (!admin) return NextResponse.json({ error: 'Forbidden' }, { status: 403 })

  const { id } = await params

  const startDate = new Date()

  const policy = await prisma.policy.update({
    where: { id },
    data: {
      status: 'ACTIVE',
      approvedAt: startDate,
      approvedBy: admin.id,
      startDate,
    },
  })

  // Auto-create the first month's payment record
  await prisma.payment.create({
    data: {
      userId: policy.userId,
      policyId: policy.id,
      amount: policy.monthlyPremium,
      status: 'PENDING',
      dueDate: startDate,
    },
  })

  return NextResponse.json(policy)
}
