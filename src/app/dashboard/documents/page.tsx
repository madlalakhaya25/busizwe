import { auth } from '@clerk/nextjs/server'
import { redirect } from 'next/navigation'
import { prisma } from '@/lib/prisma'
import DocumentsPage from '@/components/dashboard/DocumentsPage'
import type { Metadata } from 'next'

export const metadata: Metadata = { title: 'Documents' }

export default async function DashboardDocumentsPage() {
  const { userId } = await auth()
  if (!userId) redirect('/sign-in')

  let documents: unknown[] = []

  try {
    const user = await prisma.user.findUnique({ where: { clerkId: userId } })
    if (user) {
      documents = await prisma.document.findMany({
        where: { userId: user.id, deletedAt: null },
        orderBy: { createdAt: 'desc' },
      })
    }
  } catch {
    // DB not configured
  }

  return <DocumentsPage documents={documents} />
}
