import { clerkClient } from '@clerk/nextjs/server'
import { prisma } from '@/lib/prisma'

/**
 * Returns the DB user for the given Clerk ID.
 * If no DB record exists yet (e.g. webhook missed), creates one on the fly.
 */
export async function getOrCreateUser(clerkId: string) {
  const existing = await prisma.user.findUnique({ where: { clerkId } })
  if (existing) return existing

  const clerk = await clerkClient()
  const clerkUser = await clerk.users.getUser(clerkId)
  const email = clerkUser.emailAddresses[0]?.emailAddress ?? ''
  const firstName = clerkUser.firstName ?? ''
  const lastName = clerkUser.lastName ?? ''

  return prisma.user.create({
    data: {
      clerkId,
      email,
      profile: {
        create: { firstName, lastName },
      },
    },
  })
}
