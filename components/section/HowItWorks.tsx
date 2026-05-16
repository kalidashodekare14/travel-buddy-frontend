'use client'

import { motion } from 'framer-motion'

const steps = [
  {
    number: '01',
    title: 'Create Your Profile',
    description: 'Set up your traveler profile with your preferences, interests, and dream destinations.',
  },
  {
    number: '02',
    title: 'Find Your Match',
    description: 'Browse through travelers who share your itinerary and travel style.',
  },
  {
    number: '03',
    title: 'Start Exploring',
    description: 'Plan together, split costs, and make memories that last a lifetime.',
  },
]

const container = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.15 },
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
          <h2 className="text-3xl font-bold tracking-tight text-zinc-900 sm:text-4xl dark:text-white">
            How It Works
          </h2>
          <p className="mt-4 text-lg text-zinc-600 dark:text-zinc-400">
            Three simple steps to find your ideal travel companion.
          </p>
        </motion.div>
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-100px' }}
          className="mx-auto mt-16 grid max-w-5xl gap-8 sm:grid-cols-3"
        >
          {steps.map((step) => (
            <motion.div key={step.number} variants={item} className="relative text-center">
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-emerald-50 text-2xl font-bold text-emerald-600 dark:bg-emerald-950 dark:text-emerald-400">
                {step.number}
              </div>
              <h3 className="mt-6 text-lg font-semibold text-zinc-900 dark:text-white">
                {step.title}
              </h3>
              <p className="mt-2 text-base text-zinc-600 dark:text-zinc-400">
                {step.description}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
