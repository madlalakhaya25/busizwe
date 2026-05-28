import { auth } from '@clerk/nextjs/server'
import { redirect } from 'next/navigation'
import { prisma } from '@/lib/prisma'
import DashboardOverview from '@/components/dashboard/DashboardOverview'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Dashboard',
  description: 'Your Busizwe Burial Society member dashboard.',
}

export default async function DashboardPage() {
  const { userId } = await auth()
  if (!userId) redirect('/sign-in')

  let user = null
  let policies: {id: string; status: string; monthlyPremium: unknown; coverAmount: unknown; policyNumber: string; product: {name: string}}[] = []
  let payments: {id: string; status: string; amount: unknown; dueDate: Date}[] = []
  let documents: {id: string; status: string}[] = []

  try {
    user = await prisma.user.findUnique({
      where: { clerkId: userId },
      include: { profile: true },
    })

    if (user) {
      policies = await prisma.policy.findMany({
        where: { userId: user.id, deletedAt: null },
        include: { product: { select: { name: true } } },
        orderBy: { createdAt: 'desc' },
        take: 5,
      })

      payments = await prisma.payment.findMany({
        where: { userId: user.id },
        orderBy: { dueDate: 'desc' },
        take: 5,
      })

      documents = await prisma.document.findMany({
        where: { userId: user.id, deletedAt: null },
      })
    }
  } catch {
    // Database not configured yet – show empty state
  }

  const stats = {
    totalPolicies: policies.length,
    activePolicies: policies.filter((p) => p.status === 'ACTIVE').length,
    pendingPolicies: policies.filter((p) => p.status === 'PENDING').length,
    totalDocuments: documents.length,
    approvedDocuments: documents.filter((d) => d.status === 'APPROVED').length,
    overduePayments: payments.filter((p) => p.status === 'OVERDUE').length,
  }

  return (
    <DashboardOverview
      user={user}
      stats={stats}
      recentPolicies={policies}
      recentPayments={payments}
    />
  )
}
