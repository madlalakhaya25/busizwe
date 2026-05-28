import { auth } from '@clerk/nextjs/server'
import { redirect } from 'next/navigation'
import { prisma } from '@/lib/prisma'
import ClaimsPage from '@/components/dashboard/ClaimsPage'
import type { Metadata } from 'next'

export const metadata: Metadata = { title: 'Claims' }

export default async function DashboardClaimsPage() {
  const { userId } = await auth()
  if (!userId) redirect('/sign-in')

  let claims: unknown[] = []
  let policies: unknown[] = []

  try {
    const user = await prisma.user.findUnique({ where: { clerkId: userId } })
    if (user) {
      claims = await prisma.claim.findMany({
        where: { userId: user.id },
        include: {
          policy: { select: { policyNumber: true, coverAmount: true, product: { select: { name: true } } } },
        },
        orderBy: { createdAt: 'desc' },
      })
      policies = await prisma.policy.findMany({
        where: { userId: user.id, status: 'ACTIVE', deletedAt: null },
        select: { id: true, policyNumber: true, coverAmount: true, product: { select: { name: true } } },
      })
    }
  } catch {
    // DB not configured
  }

  return <ClaimsPage claims={claims} policies={policies} />
}
