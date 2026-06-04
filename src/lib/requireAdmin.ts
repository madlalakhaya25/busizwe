import { prisma } from '@/lib/prisma'

export type AdminUser = { id: string; role: string }

/**
 * Looks up the DB user and verifies they hold an admin role.
 * Returns the user record, or null if not found / not an admin.
 */
export async function getAdminUser(clerkId: string): Promise<AdminUser | null> {
  const user = await prisma.user.findUnique({
    where: { clerkId },
    select: { id: true, role: true },
  })
  if (!user || (user.role !== 'ADMIN' && user.role !== 'SUPER_ADMIN')) return null
  return user
}
