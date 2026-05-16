'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'

const container = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.2 },
  },
}

const item = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' as const } },
}

export default function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-emerald-50 via-white to-teal-50 dark:from-zinc-950 dark:via-zinc-900 dark:to-emerald-950">
      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="mx-auto max-w-7xl px-4 py-24 sm:px-6 sm:py-32 lg:px-8"
      >
        <motion.div variants={item} className="mx-auto max-w-2xl text-center">
          <motion.h1
            variants={item}
            className="text-4xl font-bold tracking-tight text-zinc-900 sm:text-6xl dark:text-white"
          >
            Find Your Perfect{' '}
            <span className="text-emerald-500">Travel Buddy</span>
          </motion.h1>
          <motion.p
            variants={item}
            className="mt-6 text-lg leading-8 text-zinc-600 dark:text-zinc-400"
          >
            Connect with like-minded travelers, share adventures, and explore the
            world together. Your next journey starts here.
          </motion.p>
          <motion.div variants={item} className="mt-10 flex items-center justify-center gap-4">
            <Link
              href="/register"
              className="rounded-xl bg-emerald-500 px-8 py-3.5 text-sm font-semibold text-white shadow-sm transition-all hover:bg-emerald-600 hover:shadow-md"
            >
              Get Started
            </Link>
            <Link
              href="/explore"
              className="rounded-xl border border-zinc-300 px-8 py-3.5 text-sm font-semibold text-zinc-700 transition-all hover:bg-zinc-50 dark:border-zinc-700 dark:text-zinc-300 dark:hover:bg-zinc-800"
            >
              Explore Trips
            </Link>
          </motion.div>
        </motion.div>
      </motion.div>
      <div className="absolute inset-x-0 -bottom-px h-px bg-gradient-to-r from-transparent via-emerald-300 to-transparent" />
    </section>
  )
}
