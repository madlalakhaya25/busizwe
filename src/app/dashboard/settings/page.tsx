import { auth, currentUser } from '@clerk/nextjs/server'
import { redirect } from 'next/navigation'
import { prisma } from '@/lib/prisma'
import SettingsPage from '@/components/dashboard/SettingsPage'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Settings',
  description: 'Manage your Busizwe Burial Society account settings.',
}

export default async function DashboardSettingsPage() {
  const { userId } = await auth()
  if (!userId) redirect('/sign-in')

  const clerkUser = await currentUser()
  const email =
    clerkUser?.emailAddresses?.[0]?.emailAddress ?? ''

  let profile = null
  try {
    const user = await prisma.user.findUnique({
      where: { clerkId: userId },
      include: { profile: true },
    })
    profile = user?.profile ?? null
  } catch {
    // DB unavailable — show empty form
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-[#014D4E] font-serif">
          Account Settings
        </h1>
        <p className="text-sm text-[#6b6b6b] mt-1">
          Manage your personal details and contact information.
        </p>
      </div>
      <SettingsPage email={email} profile={profile} />
    </div>
  )
}
