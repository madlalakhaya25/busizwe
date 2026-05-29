import { auth } from '@clerk/nextjs/server'
import { redirect } from 'next/navigation'
import DashboardSidebar from '@/components/dashboard/DashboardSidebar'
import DashboardHeader from '@/components/dashboard/DashboardHeader'
import MobileBottomNav from '@/components/dashboard/MobileBottomNav'

export default async function DashboardLayout({ children }: { children: React.ReactNode }) {
  const { userId } = await auth()
  if (!userId) redirect('/sign-in')

  return (
    <div className="h-screen overflow-hidden bg-[#F9FAFB] flex">
      <DashboardSidebar />
      <div className="flex-1 flex flex-col min-w-0 h-full">
        <DashboardHeader />
        <main className="flex-1 p-4 sm:p-6 pb-24 lg:p-8 lg:pb-8 overflow-y-auto">
          {children}
        </main>
      </div>
      <MobileBottomNav />
    </div>
  )
}
