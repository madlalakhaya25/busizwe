import { auth } from '@clerk/nextjs/server'
import { NextResponse } from 'next/server'
import { z } from 'zod'
import { prisma } from '@/lib/prisma'
import { generatePolicyNumber } from '@/lib/utils'

const createSchema = z.object({
  productId: z.string().min(1),
  pricingTierId: z.string().min(1),
})

export async function GET() {
  const { userId } = await auth()
  if (!userId) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const user = await prisma.user.findUnique({ where: { clerkId: userId } })
  if (!user) return NextResponse.json({ error: 'User not found' }, { status: 404 })

  const policies = await prisma.policy.findMany({
    where: { userId: user.id, deletedAt: null },
    include: {
      product: true,
      pricingTier: true,
      dependants: { where: { deletedAt: null } },
    },
    orderBy: { createdAt: 'desc' },
  })

  return NextResponse.json(policies)
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

  const { productId, pricingTierId } = parsed.data

  const pricingTier = await prisma.pricingTier.findFirst({
    where: { id: pricingTierId, productId },
  })
  if (!pricingTier) {
    return NextResponse.json({ error: 'Invalid product/pricing tier' }, { status: 400 })
  }

  const policy = await prisma.policy.create({
    data: {
      userId: user.id,
      productId,
      pricingTierId,
      policyNumber: generatePolicyNumber(),
      status: 'PENDING',
      monthlyPremium: pricingTier.premium,
      coverAmount: pricingTier.coverAmount,
    },
    include: { product: true, pricingTier: true },
  })

  return NextResponse.json(policy, { status: 201 })
}
