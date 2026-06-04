import { auth } from '@clerk/nextjs/server'
import { redirect } from 'next/navigation'
import { prisma } from '@/lib/prisma'
import AdminMembersPage from '@/components/admin/AdminMembersPage'
import type { Metadata } from 'next'

export const metadata: Metadata = { title: 'Members – Admin' }

export default async function AdminMembersPageRoute() {
  const { userId } = await auth()
  if (!userId) redirect('/sign-in')

  const admin = await prisma.user.findUnique({
    where: { clerkId: userId },
    select: { role: true },
  }).catch(() => null)

  if (!admin || (admin.role !== 'ADMIN' && admin.role !== 'SUPER_ADMIN')) {
    redirect('/dashboard')
  }

  let members: unknown[] = []

  try {
    members = await prisma.user.findMany({
      where: { deletedAt: null },
      include: {
        profile: true,
        policies: {
          where: { deletedAt: null },
          include: {
            product: true,
            pricingTier: true,
            dependants: {
              where: { deletedAt: null },
              select: { id: true, firstName: true, lastName: true, relationship: true, dateOfBirth: true },
            },
          },
          orderBy: { createdAt: 'desc' },
        },
        documents: { where: { deletedAt: null }, select: { id: true, status: true, type: true } },
      },
      orderBy: { createdAt: 'desc' },
      take: 500,
    })
  } catch (error) {
    console.error('[admin/members] Failed to fetch members:', error)
  }

  return <AdminMembersPage members={members} />
}
