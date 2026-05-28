import HeroSection from '@/components/public/HeroSection'
import StatsSection from '@/components/public/StatsSection'
import AboutSection from '@/components/public/AboutSection'
import ProductsPreviewSection from '@/components/public/ProductsPreviewSection'
import HowItWorksSection from '@/components/public/HowItWorksSection'
import TestimonialsSection from '@/components/public/TestimonialsSection'
import CTASection from '@/components/public/CTASection'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Busizwe Burial Society – Dignity in Every Farewell',
  description:
    'Affordable, dignified funeral cover for South African families. Register online and get covered from as little as R19.60/month.',
}

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <StatsSection />
      <AboutSection />
      <ProductsPreviewSection />
      <HowItWorksSection />
      <TestimonialsSection />
      <CTASection />
    </>
  )
}
