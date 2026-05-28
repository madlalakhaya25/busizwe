import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET() {
  try {
    const products = await prisma.product.findMany({
      where: { isActive: true, deletedAt: null },
      include: {
        pricingTiers: {
          orderBy: [{ ageGroup: 'asc' }, { coverAmount: 'asc' }],
        },
      },
      orderBy: { createdAt: 'asc' },
    })
    return NextResponse.json(products)
  } catch {
    return NextResponse.json({ error: 'Database not configured' }, { status: 500 })
  }
}
