'use client'

import { motion } from 'framer-motion'

const steps = [
  {
    number: '01',
    title: 'Create Your Profile',
    description: 'Set up your traveler profile with your preferences, interests, and dream destinations in minutes.',
    icon: 'M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z',
    color: 'emerald',
  },
  {
    number: '02',
    title: 'Find Your Match',
    description: 'Browse through travelers who share your itinerary, dates, and travel style. Smart matching makes it easy.',
    icon: 'M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z',
    color: 'teal',
  },
  {
    number: '03',
    title: 'Start Exploring',
    description: 'Plan together, split costs via the app, chat in real-time, and make memories that last a lifetime.',
    icon: 'M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 017.843 4.582M12 3a8.997 8.997 0 00-7.843 4.582m15.686 0A11.953 11.953 0 0112 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0121 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0112 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 013 12c0-1.605.42-3.113 1.157-4.418',
    color: 'emerald',
  },
]

const colorMap: Record<string, { bg: string; text: string; border: string; darkBg: string; darkText: string }> = {
  emerald: {
    bg: 'bg-emerald-50',
    text: 'text-emerald-600',
    border: 'border-emerald-200',
    darkBg: 'dark:bg-emerald-950',
    darkText: 'dark:text-emerald-400',
  },
  teal: {
    bg: 'bg-teal-50',
    text: 'text-teal-600',
    border: 'border-teal-200',
    darkBg: 'dark:bg-teal-950',
    darkText: 'dark:text-teal-400',
  },
}

const container = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.2 },
  },
}

const item = {
  hidden: { opacity: 0, y: 40 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' as const } },
}

export default function HowItWorks() {
  return (
    <section className="bg-white py-24 dark:bg-black">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.5 }}
          className="mx-auto max-w-2xl text-center"
        >
          <span className="mb-4 inline-block rounded-full bg-emerald-50 px-4 py-1.5 text-sm font-medium text-emerald-600 dark:bg-emerald-950 dark:text-emerald-400">
            Simple Process
          </span>
          <h2 className="text-3xl font-bold tracking-tight text-zinc-900 sm:text-4xl dark:text-white">
            How It Works
          </h2>
          <p className="mt-4 text-lg text-zinc-600 dark:text-zinc-400">
            Three simple steps to find your ideal travel companion and plan an unforgettable journey.
          </p>
        </motion.div>

        <div className="relative mx-auto mt-16 max-w-5xl">
          <div className="absolute left-1/2 top-12 hidden h-0.5 w-2/3 -translate-x-1/2 bg-gradient-to-r from-emerald-200 via-teal-200 to-emerald-200 dark:from-emerald-800 dark:via-teal-800 dark:to-emerald-800 lg:block" />

          <motion.div
            variants={container}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: '-100px' }}
            className="grid gap-8 lg:grid-cols-3"
          >
            {steps.map((step, i) => {
              const c = colorMap[step.color]
              return (
                <motion.div
                  key={step.number}
                  variants={item}
                  className="relative flex flex-col items-center rounded-2xl border border-zinc-200 bg-white p-8 text-center transition-shadow hover:shadow-lg dark:border-zinc-800 dark:bg-zinc-900"
                >
                  <div
                    className={`flex h-16 w-16 items-center justify-center rounded-2xl ${c.bg} ${c.text} ${c.darkBg} ${c.darkText}`}
                  >
                    <svg className="h-7 w-7" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" d={step.icon} />
                    </svg>
                  </div>

                  <div
                    className={`absolute -top-3 left-1/2 -translate-x-1/2 flex h-8 w-8 items-center justify-center rounded-full border-2 border-white text-sm font-bold ${c.bg} ${c.text} ${c.darkBg} ${c.darkText}`}
                  >
                    {step.number}
                  </div>

                  <h3 className="mt-6 text-lg font-semibold text-zinc-900 dark:text-white">
                    {step.title}
                  </h3>
                  <p className="mt-3 text-base leading-relaxed text-zinc-600 dark:text-zinc-400">
                    {step.description}
                  </p>

                  {i < steps.length - 1 && (
                    <div className="mt-6 flex items-center gap-1 text-sm font-medium text-emerald-500">
                      <span>Next step</span>
                      <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                      </svg>
                    </div>
                  )}
                </motion.div>
              )
            })}
          </motion.div>
        </div>
      </div>
    </section>
  )
}
