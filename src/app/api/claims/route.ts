import { auth } from '@clerk/nextjs/server'
import { NextResponse } from 'next/server'
import { z } from 'zod'
import { prisma } from '@/lib/prisma'

function generateClaimNumber(): string {
  const year = new Date().getFullYear()
  const random = Math.floor(Math.random() * 90000) + 10000
  return `CLM-${year}-${random}`
}

const createSchema = z.object({
  policyId: z.string().min(1),
  deceasedFirstName: z.string().min(1).max(100),
  deceasedLastName: z.string().min(1).max(100),
  deceasedIdNumber: z.string().optional(),
  deceasedDateOfDeath: z.string().refine((d) => !isNaN(Date.parse(d))),
  relationship: z.string().min(1),
  funeralDate: z.string().optional(),
  funeralHome: z.string().optional(),
  notes: z.string().optional(),
})

export async function GET() {
  const { userId } = await auth()
  if (!userId) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const user = await prisma.user.findUnique({ where: { clerkId: userId } })
  if (!user) return NextResponse.json({ error: 'User not found' }, { status: 404 })

  const claims = await prisma.claim.findMany({
    where: { userId: user.id },
    include: { policy: { select: { policyNumber: true, product: { select: { name: true } }, coverAmount: true } } },
    orderBy: { createdAt: 'desc' },
  })

  return NextResponse.json(claims)
}

export async function POST(req: Request) {
  const { userId } = await auth()
  if (!userId) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const user = await prisma.user.findUnique({ where: { clerkId: userId } })
  if (!user) return NextResponse.json({ error: 'User not found' }, { status: 404 })

  const body = await req.json()
  const parsed = createSchema.safeParse(body)
  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 })
  }

  const { policyId, funeralDate, deceasedDateOfDeath, ...rest } = parsed.data

  const policy = await prisma.policy.findFirst({
    where: { id: policyId, userId: user.id, status: 'ACTIVE' },
  })
  if (!policy) {
    return NextResponse.json({ error: 'Policy not found or not active' }, { status: 400 })
  }

  const claim = await prisma.claim.create({
    data: {
      userId: user.id,
      policyId,
      claimNumber: generateClaimNumber(),
      status: 'SUBMITTED',
      claimAmount: policy.coverAmount,
      deceasedDateOfDeath: new Date(deceasedDateOfDeath),
      funeralDate: funeralDate ? new Date(funeralDate) : undefined,
      ...rest,
    },
    include: { policy: { select: { policyNumber: true, product: { select: { name: true } } } } },
  })

  return NextResponse.json(claim, { status: 201 })
}
