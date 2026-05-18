import HeroSection from '@/components/section/HeroSection'
import HowItWorks from '@/components/section/HowItWorks'
import FeaturesSection from '@/components/section/FeaturesSection'
import StatsSection from '@/components/section/StatsSection'
import DestinationsSection from '@/components/section/DestinationsSection'
import TestimonialsSection from '@/components/section/TestimonialsSection'
import SafetySection from '@/components/section/SafetySection'
import CtaSection from '@/components/section/CtaSection'

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <HowItWorks />
      <FeaturesSection />
      <StatsSection />
      <DestinationsSection />
      <TestimonialsSection />
      <SafetySection />
      <CtaSection />
    </>
  )
}
