import { auth } from '@clerk/nextjs/server'
import { redirect } from 'next/navigation'
import { prisma } from '@/lib/prisma'
import ApplyWizard from '@/components/dashboard/ApplyWizard'
import type { Metadata } from 'next'

export const metadata: Metadata = { title: 'Apply for Cover' }

export default async function ApplyPage() {
  const { userId } = await auth()
  if (!userId) redirect('/sign-in')

  let products: unknown[] = []
  try {
    products = await prisma.product.findMany({
      where: { isActive: true, deletedAt: null },
      include: {
        pricingTiers: {
          orderBy: [{ ageGroup: 'asc' }, { coverAmount: 'asc' }],
        },
      },
      orderBy: { createdAt: 'asc' },
    })
  } catch (error) {
    console.error('[dashboard/apply] Failed to fetch products:', error)
  }

  // products shape is validated by Prisma — safe cast at server/client boundary
  return <ApplyWizard products={products as any} />
}
