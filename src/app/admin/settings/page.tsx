import { auth } from '@clerk/nextjs/server'
import { currentUser } from '@clerk/nextjs/server'
import { Settings, Bell, Shield, Database, Globe } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'

export default async function AdminSettingsPage() {
  const { userId } = await auth()
  const user = await currentUser()

  const sections = [
    {
      icon: Shield,
      title: 'Administrator Account',
      description: 'Your admin identity and access level',
      items: [
        { label: 'Name', value: `${user?.firstName ?? ''} ${user?.lastName ?? ''}`.trim() || 'Admin User' },
        { label: 'Email', value: user?.emailAddresses[0]?.emailAddress ?? '—' },
        { label: 'Clerk ID', value: userId ?? '—' },
        { label: 'Role', value: 'ADMIN', badge: true },
      ],
    },
    {
      icon: Globe,
      title: 'Platform Settings',
      description: 'Busizwe Burial Society configuration',
      items: [
        { label: 'Platform', value: 'Busizwe Burial Society' },
        { label: 'Environment', value: process.env.NODE_ENV ?? 'development' },
        { label: 'FSP Reg. No.', value: 'XXXXXXX' },
        { label: 'Regulator', value: 'FSCA' },
      ],
    },
    {
      icon: Database,
      title: 'Data & Storage',
      description: 'Database and file storage status',
      items: [
        { label: 'Database', value: 'PostgreSQL (Prisma 7)' },
        { label: 'File Storage', value: 'Cloudinary' },
        { label: 'Auth Provider', value: 'Clerk' },
      ],
    },
    {
      icon: Bell,
      title: 'Notifications',
      description: 'Alerts and communication settings',
      items: [
        { label: 'WhatsApp Alerts', value: 'Configured' },
        { label: 'Email Notifications', value: 'info@busizwe.co.za' },
        { label: 'Support Line', value: '0800 000 000' },
      ],
    },
  ]

  return (
    <div className="space-y-6 max-w-4xl">
      {/* Header */}
      <div className="flex items-center gap-3 mb-2">
        <div className="w-10 h-10 rounded-xl bg-[#1C1C1C]/8 flex items-center justify-center">
          <Settings className="w-5 h-5 text-[#1C1C1C]" />
        </div>
        <div>
          <h1 className="font-serif text-2xl font-semibold text-[#1C1C1C]">Settings</h1>
          <p className="text-sm text-[#6b6b6b]">Platform configuration and admin account</p>
        </div>
      </div>

      <div className="grid sm:grid-cols-2 gap-4">
        {sections.map(({ icon: Icon, title, description, items }) => (
          <Card key={title} className="h-full">
            <CardHeader className="pb-3">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-[#014D4E]/8 flex items-center justify-center shrink-0">
                  <Icon className="w-4 h-4 text-[#014D4E]" />
                </div>
                <div>
                  <CardTitle className="text-base font-semibold text-[#1C1C1C]">{title}</CardTitle>
                  <p className="text-xs text-[#9a9a9a] mt-0.5">{description}</p>
                </div>
              </div>
            </CardHeader>
            <CardContent className="pt-0">
              <dl className="space-y-3">
                {items.map(({ label, value, badge }) => (
                  <div key={label} className="flex items-center justify-between gap-2 py-2 border-b border-[#e0d9cc] last:border-0">
                    <dt className="text-xs font-medium text-[#9a9a9a] uppercase tracking-wide shrink-0">{label}</dt>
                    <dd className="text-sm font-medium text-[#1C1C1C] text-right truncate">
                      {badge ? (
                        <Badge variant="success">{value}</Badge>
                      ) : (
                        value
                      )}
                    </dd>
                  </div>
                ))}
              </dl>
            </CardContent>
          </Card>
        ))}
      </div>

      <p className="text-xs text-[#9a9a9a] text-center pb-4">
        Runtime configuration is managed via environment variables. Contact your system administrator to change platform settings.
      </p>
    </div>
  )
}
