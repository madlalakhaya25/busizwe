import { auth } from '@clerk/nextjs/server'
import { redirect } from 'next/navigation'
import { prisma } from '@/lib/prisma'
import AdminClaimsPage from '@/components/admin/AdminClaimsPage'
import type { Metadata } from 'next'

export const metadata: Metadata = { title: 'Claims – Admin' }

export default async function AdminClaimsServerPage() {
  const { userId } = await auth()
  if (!userId) redirect('/sign-in')

  let claims: unknown[] = []

  try {
    const admin = await prisma.user.findUnique({
      where: { clerkId: userId },
      select: { role: true },
    })
    if (!admin || (admin.role !== 'ADMIN' && admin.role !== 'SUPER_ADMIN')) {
      redirect('/dashboard')
    }

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
  } catch {
    // DB not configured
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-[#014D4E]" style={{ fontFamily: 'Georgia, serif' }}>
          Claims
        </h1>
        <p className="text-[#6b6b6b] text-sm mt-1">Review and action member funeral cover claims</p>
      </div>
      <AdminClaimsPage claims={claims} />
    </div>
  )
}
