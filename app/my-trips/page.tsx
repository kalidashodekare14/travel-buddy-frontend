'use client'

import { useSession } from 'next-auth/react'
import { redirect } from 'next/navigation'
import MyTripsSection from '@/components/section/MyTripsSection'

export default function MyTripsPage() {
  const { status } = useSession()

  if (status === 'unauthenticated') {
    redirect('/login')
  }

  if (status === 'loading') {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-emerald-500 border-t-transparent" />
      </div>
    )
  }

  return <MyTripsSection />
}
