'use client'

import { motion } from 'framer-motion'

const testimonials = [
  {
    name: 'Sarah Chen',
    location: 'Traveled to Japan',
    quote: 'TravelBuddy made my solo trip to Japan unforgettable. I found two amazing travel partners and we ended up exploring Tokyo together for two weeks!',
    avatar: 'SC',
  },
  {
    name: 'Marcus Johnson',
    location: 'Traveled to Bali',
    quote: 'I was nervous about traveling alone for the first time. The community here is so welcoming. Our Bali trip was absolutely incredible.',
    avatar: 'MJ',
  },
  {
    name: 'Elena Rodriguez',
    location: 'Traveled to Greece',
    quote: 'The trip planning tools are fantastic. We coordinated our Santorini trip seamlessly and split costs through the app. Highly recommend!',
    avatar: 'ER',
  },
]

const container = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.15 },
  },
}

const item = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' as const } },
}

export default function TestimonialsSection() {
  return (
    <section className="bg-zinc-50 py-24 dark:bg-zinc-950">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.5 }}
          className="mx-auto max-w-2xl text-center"
        >
          <h2 className="text-3xl font-bold tracking-tight text-zinc-900 sm:text-4xl dark:text-white">
            What Travelers Say
          </h2>
          <p className="mt-4 text-lg text-zinc-600 dark:text-zinc-400">
            Real stories from our community.
          </p>
        </motion.div>
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-100px' }}
          className="mx-auto mt-16 grid max-w-5xl gap-8 sm:grid-cols-3"
        >
          {testimonials.map((t) => (
            <motion.div
              key={t.name}
              variants={item}
              className="flex flex-col rounded-2xl border border-zinc-200 bg-white p-6 dark:border-zinc-800 dark:bg-zinc-900"
            >
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-emerald-100 text-sm font-semibold text-emerald-700 dark:bg-emerald-900 dark:text-emerald-300">
                  {t.avatar}
                </div>
                <div>
                  <p className="text-sm font-semibold text-zinc-900 dark:text-white">{t.name}</p>
                  <p className="text-sm text-zinc-500 dark:text-zinc-400">{t.location}</p>
                </div>
              </div>
              <blockquote className="mt-4 flex-1 text-base leading-6 text-zinc-600 dark:text-zinc-400">
                &ldquo;{t.quote}&rdquo;
              </blockquote>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
