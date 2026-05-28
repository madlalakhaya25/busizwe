import { prisma } from '@/lib/prisma'
import AdminDashboard from '@/components/admin/AdminDashboard'
import type { Metadata } from 'next'

export const metadata: Metadata = { title: 'Admin Dashboard' }

export default async function AdminPage() {
  let stats = {
    totalMembers: 0,
    activePolices: 0,
    pendingPolicies: 0,
    totalPremiums: 0,
    pendingDocuments: 0,
    overduePayments: 0,
  }

  let recentMembers: unknown[] = []

  try {
    const [totalMembers, activePolices, pendingPolicies, pendingDocuments, overduePayments, premiums, members] = await Promise.all([
      prisma.user.count({ where: { deletedAt: null } }),
      prisma.policy.count({ where: { status: 'ACTIVE', deletedAt: null } }),
      prisma.policy.count({ where: { status: 'PENDING', deletedAt: null } }),
      prisma.document.count({ where: { status: 'PENDING', deletedAt: null } }),
      prisma.payment.count({ where: { status: 'OVERDUE' } }),
      prisma.payment.aggregate({ where: { status: 'PAID' }, _sum: { amount: true } }),
      prisma.user.findMany({
        where: { deletedAt: null },
        include: {
          profile: true,
          policies: { where: { deletedAt: null }, select: { id: true, status: true } },
        },
        orderBy: { createdAt: 'desc' },
        take: 8,
      }),
    ])

    stats = {
      totalMembers,
      activePolices,
      pendingPolicies,
      pendingDocuments,
      overduePayments,
      totalPremiums: Number(premiums._sum.amount ?? 0),
    }

    recentMembers = members
  } catch {
    // DB not configured
  }

  return <AdminDashboard stats={stats} recentMembers={recentMembers} />
}
