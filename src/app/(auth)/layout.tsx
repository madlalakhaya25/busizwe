import Logo, { LogoSVG } from '@/components/layout/Logo'
import Link from 'next/link'
import { Shield, Heart, Clock } from 'lucide-react'

const TRUST_POINTS = [
  { icon: Shield, text: 'FSCA Authorised Burial Society' },
  { icon: Heart, text: 'Funeral cover from R19.60/month' },
  { icon: Clock, text: '48-hour claim processing' },
]

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen lg:grid lg:grid-cols-2">
      {/* Left panel — brand panel, desktop only */}
      <div className="hidden lg:flex flex-col bg-[#014D4E] relative overflow-hidden">
        {/* Subtle radial glow */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 right-0 w-[480px] h-[480px] rounded-full bg-[#C89B3C]/8 blur-[120px]" />
          <div className="absolute bottom-0 left-0 w-[360px] h-[360px] rounded-full bg-white/4 blur-[100px]" />
        </div>

        <div className="relative flex flex-col h-full px-12 py-10">
          {/* Logo at top */}
          <Link href="/" className="self-start focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C89B3C] rounded-lg">
            <div className="flex items-center gap-3">
              <LogoSVG size="md" />
              <div className="flex flex-col leading-tight">
                <span className="font-bold text-white text-base tracking-tight" style={{ fontFamily: 'Georgia, serif' }}>
                  Busizwe
                </span>
                <span className="text-[10px] font-semibold text-[#C89B3C] tracking-widest uppercase" style={{ fontFamily: 'Georgia, serif' }}>
                  Burial Society
                </span>
              </div>
            </div>
          </Link>

          {/* Hero content — centered vertically */}
          <div className="flex-1 flex flex-col justify-center py-12">
            {/* Gold accent line */}
            <div className="w-10 h-0.5 bg-[#C89B3C] mb-8" />

            <h2
              className="text-4xl font-bold text-white leading-snug mb-4"
              style={{ fontFamily: 'Georgia, serif' }}
            >
              Dignity in<br />
              <span className="text-[#C89B3C]">Every Farewell.</span>
            </h2>

            <p className="text-white/60 text-sm leading-relaxed mb-10 max-w-xs">
              Protecting South African families with affordable, dignified funeral cover.
            </p>

            {/* Trust points */}
            <ul className="space-y-5">
              {TRUST_POINTS.map(({ icon: Icon, text }) => (
                <li key={text} className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-[#C89B3C]/15 flex items-center justify-center shrink-0">
                    <Icon className="w-4 h-4 text-[#C89B3C]" />
                  </div>
                  <span className="text-white/80 text-sm">{text}</span>
                </li>
              ))}
            </ul>

            {/* Stat row */}
            <div className="mt-10 pt-8 border-t border-white/10 grid grid-cols-3 gap-4">
              {[
                { value: '5,000+', label: 'Members' },
                { value: 'R19.60', label: 'From/month' },
                { value: 'Age 16–84', label: 'Eligible' },
              ].map((s) => (
                <div key={s.label}>
                  <p className="text-lg font-bold text-white" style={{ fontFamily: 'Georgia, serif' }}>
                    {s.value}
                  </p>
                  <p className="text-xs text-white/40 mt-0.5">{s.label}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Footer note */}
          <p className="relative text-xs text-white/30">
            © {new Date().getFullYear()} Busizwe Burial Society · FSCA Authorised
          </p>
        </div>
      </div>

      {/* Right panel — auth form */}
      <div className="flex min-h-screen lg:min-h-0 items-center justify-center p-6 sm:p-10 bg-[#F7F3EA]">
        <div className="w-full max-w-md">
          {/* Mobile logo */}
          <div className="lg:hidden mb-8 flex flex-col items-center gap-2">
            <Logo size="lg" variant="full" href="/" />
            <p className="text-xs text-[#6b6b6b] tracking-wide">Dignity in Every Farewell</p>
          </div>

          {children}
        </div>
      </div>
    </div>
  )
}
