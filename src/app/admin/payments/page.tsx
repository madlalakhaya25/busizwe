import { prisma } from '@/lib/prisma'
import AdminPaymentsPage from '@/components/admin/AdminPaymentsPage'
import type { Metadata } from 'next'

export const metadata: Metadata = { title: 'Payments – Admin' }

export default async function AdminPaymentsPageRoute() {
  let payments: unknown[] = []

  try {
    payments = await prisma.payment.findMany({
      include: {
        user: {
          select: {
            email: true,
            profile: { select: { firstName: true, lastName: true } },
          },
        },
        policy: { select: { policyNumber: true, product: { select: { name: true } } } },
      },
      orderBy: { dueDate: 'desc' },
      take: 100,
    })
  } catch {
    // DB not configured
  }

  return <AdminPaymentsPage payments={payments} />
}
