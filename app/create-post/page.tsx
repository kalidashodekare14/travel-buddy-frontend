'use client'

import { useSession } from 'next-auth/react'
import { redirect } from 'next/navigation'
import CreatePostSection from '@/components/section/CreatePostSection'

export default function CreatePostPage() {
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

  return <CreatePostSection />
}
