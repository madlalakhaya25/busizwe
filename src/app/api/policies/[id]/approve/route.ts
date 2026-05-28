import { auth } from '@clerk/nextjs/server'
import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

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

  const policy = await prisma.policy.update({
    where: { id },
    data: {
      status: 'ACTIVE',
      approvedAt: new Date(),
      approvedBy: admin.id,
      startDate: new Date(),
    },
  })

  return NextResponse.json(policy)
}
