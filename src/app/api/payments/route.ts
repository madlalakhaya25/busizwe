import { auth } from '@clerk/nextjs/server'
import { NextResponse } from 'next/server'
import { z } from 'zod'
import { prisma } from '@/lib/prisma'

const createSchema = z.object({
  policyNumber: z.string().min(1),
  amount:       z.number().positive().optional(),
  dueDate:      z.string().refine((d) => !isNaN(Date.parse(d))),
  reference:    z.string().optional(),
  paymentMethod: z.string().optional(),
  markPaid:     z.boolean().optional(),
})

export async function POST(req: Request) {
  const { userId } = await auth()
  if (!userId) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const admin = await prisma.user.findUnique({
    where: { clerkId: userId },
    select: { role: true, id: true },
  })
  if (!admin || (admin.role !== 'ADMIN' && admin.role !== 'SUPER_ADMIN')) {
    return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
  }

  const body = await req.json()
  const parsed = createSchema.safeParse(body)
  if (!parsed.success) return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 })

  const { policyNumber, dueDate, reference, paymentMethod, markPaid } = parsed.data

  const policy = await prisma.policy.findUnique({
    where: { policyNumber },
    select: { id: true, userId: true, monthlyPremium: true, status: true },
  })
  if (!policy) return NextResponse.json({ error: 'Policy not found' }, { status: 404 })

  const amount = parsed.data.amount ?? Number(policy.monthlyPremium)

  const payment = await prisma.payment.create({
    data: {
      userId:   policy.userId,
      policyId: policy.id,
      amount,
      dueDate:  new Date(dueDate),
      status:   markPaid ? 'PAID' : 'PENDING',
      ...(markPaid        && { paidAt: new Date(), recordedBy: admin.id }),
      ...(reference       && { reference }),
      ...(paymentMethod   && { paymentMethod }),
    },
  })

  return NextResponse.json(payment, { status: 201 })
}
