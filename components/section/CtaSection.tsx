'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'

export default function CtaSection() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-emerald-500 to-teal-600 py-24">
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMC4xIj48cGF0aCBkPSJNMzYgMzR2LTRoMnY0aC0yem0wIDJ2LTRoMnY0aC0yem0wIDJ2LTRoMnY0aC0yeiIvPjwvZz48L2c+PC9zdmc+')] opacity-20" />
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8"
      >
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
            Ready for Your Next Adventure?
          </h2>
          <p className="mt-4 text-lg text-emerald-100">
            Join thousands of travelers already exploring the world together.
          </p>
          <div className="mt-10">
            <Link
              href="/register"
              className="inline-flex items-center rounded-xl bg-white px-8 py-3.5 text-sm font-semibold text-emerald-600 shadow-sm transition-all hover:bg-emerald-50 hover:shadow-md"
            >
              Create Your Account
              <svg className="ml-2 h-4 w-4" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
              </svg>
            </Link>
          </div>
        </div>
      </motion.div>
    </section>
  )
}
