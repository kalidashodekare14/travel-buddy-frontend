'use client'

import { useEffect } from 'react'
import { useSession } from 'next-auth/react'

export default function SessionWatcher() {
  const { data: session } = useSession()

  useEffect(() => {
    if (session?.accessToken) {
      localStorage.setItem('accessToken', session.accessToken)
    } else if (!session) {
      localStorage.removeItem('accessToken')
    }
  }, [session])

  return null
}
