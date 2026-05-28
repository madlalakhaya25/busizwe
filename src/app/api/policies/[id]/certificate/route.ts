import { auth } from '@clerk/nextjs/server'
import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { renderToBuffer } from '@react-pdf/renderer'
import { PolicyCertificatePDF } from '@/components/pdf/PolicyCertificate'
import React from 'react'

export async function GET(req: Request, { params }: { params: Promise<{ id: string }> }) {
  const { userId } = await auth()
  if (!userId) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const user = await prisma.user.findUnique({
    where: { clerkId: userId },
    include: { profile: true },
  })
  if (!user) return NextResponse.json({ error: 'User not found' }, { status: 404 })

  const { id } = await params

  const policy = await prisma.policy.findFirst({
    where: {
      id,
      ...(user.role === 'MEMBER' ? { userId: user.id } : {}),
    },
    include: {
      product: true,
      pricingTier: true,
      dependants: { where: { deletedAt: null } },
    },
  })

  if (!policy) return NextResponse.json({ error: 'Policy not found' }, { status: 404 })

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const pdfBuffer = await renderToBuffer(
    React.createElement(PolicyCertificatePDF, { policy, user }) as any
  )

  return new NextResponse(new Uint8Array(pdfBuffer), {
    headers: {
      'Content-Type': 'application/pdf',
      'Content-Disposition': `attachment; filename="BBS-${policy.policyNumber}.pdf"`,
    },
  })
}
