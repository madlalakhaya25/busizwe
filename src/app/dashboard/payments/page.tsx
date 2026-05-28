import { auth } from '@clerk/nextjs/server'
import { redirect } from 'next/navigation'
import { prisma } from '@/lib/prisma'
import PaymentsPage from '@/components/dashboard/PaymentsPage'
import type { Metadata } from 'next'

export const metadata: Metadata = { title: 'Payments' }

export default async function DashboardPaymentsPage() {
  const { userId } = await auth()
  if (!userId) redirect('/sign-in')

  let payments: unknown[] = []

  try {
    const user = await prisma.user.findUnique({ where: { clerkId: userId } })
    if (user) {
      payments = await prisma.payment.findMany({
        where: { userId: user.id },
        include: { policy: { select: { policyNumber: true, product: { select: { name: true } } } } },
        orderBy: { dueDate: 'desc' },
      })
    }
  } catch {
    // DB not configured
  }

  return <PaymentsPage payments={payments} />
}
