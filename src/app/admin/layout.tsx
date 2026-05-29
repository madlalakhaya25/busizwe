import { auth } from '@clerk/nextjs/server'
import { redirect } from 'next/navigation'
import { prisma } from '@/lib/prisma'
import AdminSidebar from '@/components/admin/AdminSidebar'
import AdminHeader from '@/components/admin/AdminHeader'
import AdminMobileNav from '@/components/admin/AdminMobileNav'

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const { userId } = await auth()
  if (!userId) redirect('/sign-in')

  try {
    const user = await prisma.user.findUnique({
      where: { clerkId: userId },
      select: { role: true },
    })
    if (!user || (user.role !== 'ADMIN' && user.role !== 'SUPER_ADMIN')) {
      redirect('/dashboard')
    }
  } catch {
    // Allow access if DB not configured (dev mode)
  }

  return (
    <div className="min-h-screen bg-[#F7F3EA] flex">
      <AdminSidebar />
      <div className="flex-1 flex flex-col min-w-0">
        <AdminHeader />
        <main className="flex-1 p-4 sm:p-6 pb-24 lg:p-8 lg:pb-8 overflow-y-auto">
          {children}
        </main>
      </div>
      <AdminMobileNav />
    </div>
  )
}
