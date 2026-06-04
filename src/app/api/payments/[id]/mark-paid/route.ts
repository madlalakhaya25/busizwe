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
  const body = await req.json().catch(() => ({}))
  const reference: string | undefined = body.reference || undefined
  const paymentMethod: string | undefined = body.paymentMethod || undefined

  const payment = await prisma.payment.update({
    where: { id },
    data: {
      status: 'PAID',
      paidAt: new Date(),
      recordedBy: admin.id,
      ...(reference     && { reference }),
      ...(paymentMethod && { paymentMethod }),
    },
  })

  // Auto-create next month's payment
  const nextDue = new Date(payment.dueDate)
  nextDue.setMonth(nextDue.getMonth() + 1)

  await prisma.payment.create({
    data: {
      userId:   payment.userId,
      policyId: payment.policyId,
      amount:   payment.amount,
      status:   'PENDING',
      dueDate:  nextDue,
    },
  })

  return NextResponse.json(payment)
}
