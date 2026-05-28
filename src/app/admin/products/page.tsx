import { prisma } from '@/lib/prisma'
import AdminProductsPage from '@/components/admin/AdminProductsPage'
import type { Metadata } from 'next'

export const metadata: Metadata = { title: 'Products – Admin' }

export default async function AdminProductsPageRoute() {
  let products: unknown[] = []

  try {
    products = await prisma.product.findMany({
      where: { deletedAt: null },
      include: { pricingTiers: { orderBy: [{ ageGroup: 'asc' }, { coverAmount: 'asc' }] } },
      orderBy: { createdAt: 'asc' },
    })
  } catch {
    // DB not configured
  }

  return <AdminProductsPage products={products} />
}
