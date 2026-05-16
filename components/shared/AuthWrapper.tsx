'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'

interface AuthWrapperProps {
  title: string
  subtitle: string
  children: React.ReactNode
  footer: React.ReactNode
}

export default function AuthWrapper({ title, subtitle, children, footer }: AuthWrapperProps) {
  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 px-4 py-12 dark:bg-zinc-950">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: 'easeOut' as const }}
        className="w-full max-w-md"
      >
        <div className="rounded-2xl border border-zinc-200 bg-white p-8 shadow-sm dark:border-zinc-800 dark:bg-zinc-900">
          <div className="mb-8 text-center">
            <Link href="/" className="inline-flex items-center gap-2 text-xl font-bold tracking-tight text-zinc-900 dark:text-white">
              <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-500 text-sm font-bold text-white">
                T
              </span>
              TravelBuddy
            </Link>
            <h1 className="mt-6 text-2xl font-bold tracking-tight text-zinc-900 dark:text-white">
              {title}
            </h1>
            <p className="mt-2 text-base text-zinc-600 dark:text-zinc-400">
              {subtitle}
            </p>
          </div>
          {children}
        </div>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.4 }}
          className="mt-6 text-center text-base text-zinc-600 dark:text-zinc-400"
        >
          {footer}
        </motion.p>
      </motion.div>
    </div>
  )
}
