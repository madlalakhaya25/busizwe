import type { Metadata, Viewport } from 'next'
import { Geist, Geist_Mono, Fraunces } from 'next/font/google'
import { ClerkProvider } from '@clerk/nextjs'
import PWARegister from '@/components/PWARegister'
import './globals.css'

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
})

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
})

// Premium display serif for headings — optical sizing, soft contrast
const fraunces = Fraunces({
  variable: '--font-fraunces',
  subsets: ['latin'],
  display: 'swap',
  weight: ['400', '500', '600', '700'],
  style: ['normal', 'italic'],
})

export const metadata: Metadata = {
  title: {
    default: 'Busizwe Burial Society',
    template: '%s | Busizwe Burial Society',
  },
  description:
    'Dignified and affordable funeral cover for South African families. Trusted burial society serving communities across South Africa.',
  keywords: ['funeral cover', 'burial society', 'South Africa', 'funeral insurance', 'Busizwe'],
  authors: [{ name: 'Busizwe Burial Society' }],
  metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL ?? 'https://busizwe.co.za'),
  openGraph: {
    type: 'website',
    locale: 'en_ZA',
    url: 'https://busizwe.co.za',
    siteName: 'Busizwe Burial Society',
    title: 'Busizwe Burial Society – Dignity in Every Farewell',
    description: 'Affordable funeral cover for South African families.',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Busizwe Burial Society',
    description: 'Affordable funeral cover for South African families.',
  },
  icons: {
    icon: '/favicon.svg',
    apple: '/apple-icon.svg',
  },
  manifest: '/manifest.webmanifest',
}

export const viewport: Viewport = {
  themeColor: '#014D4E',
  width: 'device-width',
  initialScale: 1,
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en-ZA"
      className={`${geistSans.variable} ${geistMono.variable} ${fraunces.variable} h-full`}
      suppressHydrationWarning
    >
      <head>
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
      </head>
      <body className="min-h-full flex flex-col antialiased bg-[#F7F3EA] text-[#1C1C1C]">
        <ClerkProvider>
          <PWARegister />
          {children}
        </ClerkProvider>
      </body>
    </html>
  )
}
