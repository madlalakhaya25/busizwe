import { auth } from '@clerk/nextjs/server'
import { NextResponse } from 'next/server'
import { z } from 'zod'
import { prisma } from '@/lib/prisma'

const createSchema = z.object({
  policyId: z.string().min(1),
  firstName: z.string().min(1).max(100),
  lastName: z.string().min(1).max(100),
  dateOfBirth: z.string().refine((d) => !isNaN(Date.parse(d))),
  relationship: z.enum(['SPOUSE', 'CHILD', 'PARENT', 'SIBLING', 'GRANDPARENT', 'GRANDCHILD', 'OTHER']),
  idNumber: z.string().optional(),
  phone: z.string().optional(),
})

export async function GET() {
  const { userId } = await auth()
  if (!userId) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const user = await prisma.user.findUnique({ where: { clerkId: userId } })
  if (!user) return NextResponse.json({ error: 'User not found' }, { status: 404 })

  const dependants = await prisma.dependant.findMany({
    where: { policy: { userId: user.id }, deletedAt: null },
    include: { policy: { select: { policyNumber: true } } },
    orderBy: { createdAt: 'desc' },
  })

  return NextResponse.json(dependants)
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

  const { policyId, ...data } = parsed.data

  const policy = await prisma.policy.findFirst({
    where: { id: policyId, userId: user.id, deletedAt: null },
  })
  if (!policy) return NextResponse.json({ error: 'Policy not found' }, { status: 404 })

  const dependant = await prisma.dependant.create({
    data: {
      policyId,
      firstName: data.firstName,
      lastName: data.lastName,
      dateOfBirth: new Date(data.dateOfBirth),
      relationship: data.relationship,
      idNumber: data.idNumber,
      phone: data.phone,
    },
  })

  return NextResponse.json(dependant, { status: 201 })
}
