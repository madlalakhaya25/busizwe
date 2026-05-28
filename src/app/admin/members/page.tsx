import { prisma } from '@/lib/prisma'
import AdminMembersPage from '@/components/admin/AdminMembersPage'
import type { Metadata } from 'next'

export const metadata: Metadata = { title: 'Members – Admin' }

export default async function AdminMembersPageRoute() {
  let members: unknown[] = []

  try {
    members = await prisma.user.findMany({
      where: { deletedAt: null },
      include: {
        profile: true,
        policies: {
          where: { deletedAt: null },
          include: { product: { select: { name: true } } },
          orderBy: { createdAt: 'desc' },
        },
        documents: { where: { deletedAt: null }, select: { id: true, status: true, type: true } },
      },
      orderBy: { createdAt: 'desc' },
    })
  } catch {
    // DB not configured
  }

  return <AdminMembersPage members={members} />
}
