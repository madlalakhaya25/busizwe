import { auth } from '@clerk/nextjs/server'
import { redirect } from 'next/navigation'
import { prisma } from '@/lib/prisma'
import AdminClaimsPage from '@/components/admin/AdminClaimsPage'
import type { Metadata } from 'next'

export const metadata: Metadata = { title: 'Claims – Admin' }

export default async function AdminClaimsServerPage() {
  const { userId } = await auth()
  if (!userId) redirect('/sign-in')

  // Role check must be outside try/catch — redirect() throws a special error
  // that would be silently swallowed by a bare catch block
  const admin = await prisma.user.findUnique({
    where: { clerkId: userId },
    select: { role: true },
  }).catch(() => null)

  if (!admin || (admin.role !== 'ADMIN' && admin.role !== 'SUPER_ADMIN')) {
    redirect('/dashboard')
  }

  let claims: unknown[] = []

  try {
    claims = await prisma.claim.findMany({
      include: {
        user: {
          select: {
            email: true,
            profile: { select: { firstName: true, lastName: true, phone: true } },
          },
        },
        policy: {
          select: { policyNumber: true, coverAmount: true, product: { select: { name: true } } },
        },
      },
      orderBy: { createdAt: 'desc' },
    })
  } catch (e) {
    if (!(e instanceof Error) || e.constructor.name !== 'PrismaClientInitializationError') throw e
    // DB not yet configured — render empty state
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-[#014D4E] font-serif">
          Claims
        </h1>
        <p className="text-[#6b6b6b] text-sm mt-1">Review and action member funeral cover claims</p>
      </div>
      <AdminClaimsPage claims={claims} />
    </div>
  )
}
