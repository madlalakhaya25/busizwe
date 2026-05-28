import Logo from '@/components/layout/Logo'
import Link from 'next/link'

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen grid lg:grid-cols-2">
      {/* Left panel */}
      <div className="hidden lg:flex flex-col bg-[#014D4E] relative overflow-hidden p-12">
        <div className="absolute inset-0 opacity-5 pointer-events-none"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23C89B3C' fill-rule='evenodd'%3E%3Cpath d='M0 40L40 0H20L0 20M40 40V20L20 40'/%3E%3C/g%3E%3C/svg%3E")`,
          }}
        />
        <div className="absolute -top-32 -right-32 w-96 h-96 rounded-full bg-[#C89B3C]/10 blur-3xl" />
        <div className="absolute -bottom-32 -left-32 w-80 h-80 rounded-full bg-white/5 blur-3xl" />

        <div className="relative flex flex-col h-full">
          <Link href="/">
            <Logo size="md" variant="full" href="/" />
          </Link>

          <div className="flex-1 flex flex-col justify-center">
            <blockquote className="text-white/90 text-2xl leading-relaxed italic mb-6" style={{ fontFamily: 'Georgia, serif' }}>
              &quot;Dignity in every farewell. Peace of mind for every family.&quot;
            </blockquote>
            <p className="text-white/60 text-sm">
              Join thousands of South African families who trust Busizwe Burial Society to protect their loved ones.
            </p>

            <div className="mt-10 grid grid-cols-2 gap-4">
              {[
                { value: '5,000+', label: 'Members' },
                { value: 'R19.60', label: 'From/month' },
                { value: '48hrs', label: 'Claims' },
                { value: 'Age 16–84', label: 'Eligible' },
              ].map((stat) => (
                <div key={stat.label} className="bg-white/8 rounded-xl p-4">
                  <p className="text-xl font-bold text-white">{stat.value}</p>
                  <p className="text-xs text-white/60">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>

          <p className="relative text-xs text-white/40">
            © {new Date().getFullYear()} Busizwe Burial Society. FSCA Authorised.
          </p>
        </div>
      </div>

      {/* Right panel */}
      <div className="flex items-center justify-center p-8 bg-[#F7F3EA]">
        <div className="w-full max-w-md">
          <div className="lg:hidden mb-8 flex justify-center">
            <Logo size="md" variant="full" href="/" />
          </div>
          {children}
        </div>
      </div>
    </div>
  )
}
