import { auth } from '@clerk/nextjs/server'
import { NextResponse } from 'next/server'
import { z } from 'zod'
import { prisma } from '@/lib/prisma'

const createSchema = z.object({
  claimId: z.string().min(1),
  tribute: z.string().max(2000).optional(),
  birthYear: z.number().int().min(1900).max(new Date().getFullYear()).optional(),
})

export async function POST(req: Request) {
  const { userId } = await auth()
  if (!userId) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const user = await prisma.user.findUnique({ where: { clerkId: userId } })
  if (!user) return NextResponse.json({ error: 'Not found' }, { status: 404 })

  const body = await req.json()
  const parsed = createSchema.safeParse(body)
  if (!parsed.success) return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 })

  const { claimId, tribute, birthYear } = parsed.data

  const claim = await prisma.claim.findFirst({
    where: { id: claimId, userId: user.id },
  })
  if (!claim) return NextResponse.json({ error: 'Claim not found' }, { status: 404 })
  if (!['APPROVED', 'PAID'].includes(claim.status)) {
    return NextResponse.json({ error: 'Memorial can only be created for approved claims' }, { status: 400 })
  }

  const existing = await prisma.memorial.findUnique({ where: { claimId } })
  if (existing) return NextResponse.json(existing)

  const memorial = await prisma.memorial.create({
    data: {
      claimId,
      userId: user.id,
      firstName: claim.deceasedFirstName,
      lastName: claim.deceasedLastName,
      deathYear: new Date(claim.deceasedDateOfDeath).getFullYear(),
      birthYear: birthYear ?? null,
      tribute: tribute ?? null,
    },
  })

  return NextResponse.json(memorial, { status: 201 })
}
