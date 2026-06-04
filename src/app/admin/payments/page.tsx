import { auth } from '@clerk/nextjs/server'
import { redirect } from 'next/navigation'
import { prisma } from '@/lib/prisma'
import AdminPaymentsPage from '@/components/admin/AdminPaymentsPage'
import type { Metadata } from 'next'

export const metadata: Metadata = { title: 'Payments – Admin' }

export default async function AdminPaymentsPageRoute() {
  const { userId } = await auth()
  if (!userId) redirect('/sign-in')

  const admin = await prisma.user.findUnique({
    where: { clerkId: userId },
    select: { role: true },
  }).catch(() => null)

  if (!admin || (admin.role !== 'ADMIN' && admin.role !== 'SUPER_ADMIN')) {
    redirect('/dashboard')
  }

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
  } catch (error) {
    console.error('[admin/payments] Failed to fetch payments:', error)
  }

  return <AdminPaymentsPage payments={payments} />
}
