import { auth } from '@clerk/nextjs/server'
import { redirect } from 'next/navigation'
import { prisma } from '@/lib/prisma'
import DependantsPage from '@/components/dashboard/DependantsPage'
import type { Metadata } from 'next'

export const metadata: Metadata = { title: 'Dependants' }

export default async function DashboardDependantsPage() {
  const { userId } = await auth()
  if (!userId) redirect('/sign-in')

  let dependants: unknown[] = []
  let policies: unknown[] = []

  try {
    const user = await prisma.user.findUnique({ where: { clerkId: userId } })
    if (user) {
      policies = await prisma.policy.findMany({
        where: { userId: user.id, deletedAt: null },
        select: { id: true, policyNumber: true, product: { select: { name: true } } },
      })
      dependants = await prisma.dependant.findMany({
        where: { policy: { userId: user.id }, deletedAt: null },
        include: { policy: { select: { policyNumber: true, product: { select: { name: true } } } } },
        orderBy: { createdAt: 'desc' },
      })
    }
  } catch {
    // DB not configured
  }

  return <DependantsPage dependants={dependants} policies={policies} />
}
