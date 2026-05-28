import { auth } from '@clerk/nextjs/server'
import { redirect } from 'next/navigation'
import { prisma } from '@/lib/prisma'
import PoliciesPage from '@/components/dashboard/PoliciesPage'
import type { Metadata } from 'next'

export const metadata: Metadata = { title: 'My Policies' }

export default async function DashboardPoliciesPage() {
  const { userId } = await auth()
  if (!userId) redirect('/sign-in')

  let policies: unknown[] = []

  try {
    const user = await prisma.user.findUnique({ where: { clerkId: userId } })
    if (user) {
      policies = await prisma.policy.findMany({
        where: { userId: user.id, deletedAt: null },
        include: {
          product: true,
          pricingTier: true,
          dependants: { where: { deletedAt: null } },
          payments: { orderBy: { dueDate: 'desc' }, take: 3 },
        },
        orderBy: { createdAt: 'desc' },
      })
    }
  } catch {
    // DB not configured
  }

  return <PoliciesPage policies={policies} />
}
