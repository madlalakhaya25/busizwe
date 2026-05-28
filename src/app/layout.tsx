import type { Metadata, Viewport } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import { ClerkProvider } from '@clerk/nextjs'
import './globals.css'

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
})

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
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
}

export const viewport: Viewport = {
  themeColor: '#014D4E',
  width: 'device-width',
  initialScale: 1,
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <ClerkProvider>
      <html
        lang="en-ZA"
        className={`${geistSans.variable} ${geistMono.variable} h-full`}
        suppressHydrationWarning
      >
        <head>
          <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
        </head>
        <body className="min-h-full flex flex-col antialiased bg-[#F7F3EA] text-[#1C1C1C]">
          {children}
        </body>
      </html>
    </ClerkProvider>
  )
}
