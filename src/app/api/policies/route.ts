import { auth } from '@clerk/nextjs/server'
import { NextResponse } from 'next/server'
import { z } from 'zod'
import { prisma } from '@/lib/prisma'
import { getOrCreateUser } from '@/lib/getOrCreateUser'
import { generatePolicyNumber } from '@/lib/utils'
import { appendPolicyRow } from '@/lib/googleSheets'

const createSchema = z.object({
  productId: z.string().min(1),
  pricingTierId: z.string().min(1),
})

export async function GET() {
  const { userId } = await auth()
  if (!userId) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const user = await getOrCreateUser(userId)

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

  const user = await getOrCreateUser(userId)

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

  const [policy, profile] = await Promise.all([
    prisma.policy.create({
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
    }),
    prisma.profile.findUnique({ where: { userId: user.id } }),
  ])

  // Best-effort — runs in background, never blocks the response
  appendPolicyRow({
    timestamp:        new Date().toISOString(),
    policyNumber:     policy.policyNumber,
    status:           'PENDING',
    memberName:       profile ? `${profile.firstName} ${profile.lastName}`.trim() : '',
    email:            user.email,
    phone:            profile?.phone ?? '',
    idNumber:         profile?.idNumber ?? '',
    product:          policy.product.name,
    ageGroup:         policy.pricingTier.ageGroup,
    coverAmount:      Number(policy.coverAmount).toFixed(2),
    monthlyPremium:   Number(policy.monthlyPremium).toFixed(2),
    applicationDate:  new Date().toLocaleDateString('en-ZA'),
  })

  return NextResponse.json(policy, { status: 201 })
}
