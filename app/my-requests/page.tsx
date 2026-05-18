'use client'

import { useSession } from 'next-auth/react'
import { redirect } from 'next/navigation'
import MyRequestsSection from '@/components/section/MyRequestsSection'

export default function MyRequestsPage() {
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

  return <MyRequestsSection />
}
