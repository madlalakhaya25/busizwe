import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function POST(_req: Request, { params }: { params: Promise<{ token: string }> }) {
  const { token } = await params

  try {
    const memorial = await prisma.memorial.update({
      where: { token },
      data: { candleCount: { increment: 1 } },
      select: { candleCount: true },
    })
    return NextResponse.json({ candleCount: memorial.candleCount })
  } catch {
    return NextResponse.json({ error: 'Memorial not found' }, { status: 404 })
  }
}
