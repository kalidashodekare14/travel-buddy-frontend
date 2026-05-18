'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1 } },
}

const item = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' as const } },
}

const stats = [
  { value: '12K+', label: 'Active Travelers' },
  { value: '50K+', label: 'Trips Planned' },
  { value: '500+', label: 'Destinations' },
  { value: '98%', label: 'Satisfaction' },
]

const values = [
  {
    title: 'Community First',
    description: 'We believe travel is better together. Our platform is built around fostering genuine connections between like-minded explorers.',
    icon: 'M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m.94 3.198l.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0112 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 016 18.719m12 0a5.971 5.971 0 00-.941-3.197m0 0A5.995 5.995 0 0012 12.75a5.995 5.995 0 00-5.058 2.772m0 0a3 3 0 00-4.681 2.72 8.986 8.986 0 003.74.477m.94-3.197a5.971 5.971 0 00-.94 3.197M15 6.75a3 3 0 11-6 0 3 3 0 016 0zm6 3a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0zm-13.5 0a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z',
  },
  {
    title: 'Safety First',
    description: 'Every user is verified, every review is authentic, and our support team is available 24/7 to ensure a secure experience.',
    icon: 'M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z',
  },
  {
    title: 'Affordable Travel',
    description: 'We make group travel accessible by helping you split costs, find deals, and plan budget-friendly adventures together.',
    icon: 'M12 6v12m-3-2.818l.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 11-18 0 9 9 0 0118 0z',
  },
  {
    title: 'Sustainability',
    description: 'We promote responsible travel by encouraging group trips that reduce carbon footprint and supporting local communities.',
    icon: 'M2.25 18L9 11.25l4.306 4.307a11.95 11.95 0 015.814-5.519l2.74-1.22m0 0l-5.94-2.28m5.94 2.28l-2.28 5.941',
  },
]

const team = [
  { name: 'Alex Rivera', role: 'CEO & Co-Founder', initials: 'AR' },
  { name: 'Maya Patel', role: 'CTO & Co-Founder', initials: 'MP' },
  { name: 'James Chen', role: 'Head of Design', initials: 'JC' },
  { name: 'Sofia Martinez', role: 'Head of Community', initials: 'SM' },
]

const timeline = [
  { year: '2024', event: 'TravelBuddy founded with a vision to connect travelers worldwide.' },
  { year: '2024', event: 'Launched beta version with 500 early users.' },
  { year: '2025', event: 'Reached 10,000 active travelers across 50+ countries.' },
  { year: '2026', event: 'Introduced AI-powered matching and real-time chat features.' },
]

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950">
      <section className="relative overflow-hidden bg-gradient-to-br from-emerald-50 via-white to-teal-50 py-24 dark:from-zinc-950 dark:via-zinc-900 dark:to-emerald-950">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -left-32 -top-32 h-96 w-96 rounded-full bg-emerald-200/30 blur-3xl dark:bg-emerald-800/20" />
          <div className="absolute -right-32 -bottom-32 h-96 w-96 rounded-full bg-teal-200/30 blur-3xl dark:bg-teal-800/20" />
        </div>

        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="relative mx-auto max-w-3xl px-4 text-center sm:px-6 lg:px-8"
        >
          <motion.span
            variants={item}
            className="mb-4 inline-block rounded-full bg-emerald-100 px-4 py-1.5 text-sm font-medium text-emerald-700 dark:bg-emerald-900 dark:text-emerald-300"
          >
            About Us
          </motion.span>

          <motion.h1
            variants={item}
            className="text-4xl font-bold tracking-tight text-zinc-900 sm:text-5xl dark:text-white"
          >
            We Believe Travel Is{' '}
            <span className="bg-gradient-to-r from-emerald-500 to-teal-500 bg-clip-text text-transparent">
              Better Together
            </span>
          </motion.h1>

          <motion.p
            variants={item}
            className="mt-6 text-lg leading-relaxed text-zinc-600 dark:text-zinc-400"
          >
            TravelBuddy connects like-minded travelers from around the world. Whether you are
            looking for a travel companion for your next adventure or want to share your journey
            with others, we make it happen.
          </motion.p>
        </motion.div>
      </section>

      <section className="bg-white py-20 dark:bg-black">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.5 }}
            className="mx-auto max-w-3xl text-center"
          >
            <h2 className="text-3xl font-bold tracking-tight text-zinc-900 dark:text-white">
              Our Mission
            </h2>
            <p className="mt-6 text-lg leading-relaxed text-zinc-600 dark:text-zinc-400">
              To make solo travel a thing of the past. We empower people to explore the world
              together — safely, affordably, and memorably. TravelBuddy is more than an app;
              it is a community of adventurers who believe the best experiences are shared.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="bg-gradient-to-br from-emerald-500 to-teal-600 py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.div
            variants={container}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: '-100px' }}
            className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4"
          >
            {stats.map((s) => (
              <motion.div
                key={s.label}
                variants={item}
                className="rounded-2xl border border-white/10 bg-white/10 p-6 text-center backdrop-blur-sm"
              >
                <p className="text-3xl font-bold text-white">{s.value}</p>
                <p className="mt-1 text-base text-emerald-100">{s.label}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      <section className="bg-zinc-50 py-20 dark:bg-zinc-950">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.5 }}
            className="mx-auto max-w-2xl text-center"
          >
            <span className="mb-4 inline-block rounded-full bg-emerald-100 px-4 py-1.5 text-sm font-medium text-emerald-700 dark:bg-emerald-900 dark:text-emerald-300">
              Our Values
            </span>
            <h2 className="text-3xl font-bold tracking-tight text-zinc-900 dark:text-white">
              What We Stand For
            </h2>
          </motion.div>

          <motion.div
            variants={container}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: '-100px' }}
            className="mx-auto mt-16 grid max-w-5xl gap-6 sm:grid-cols-2"
          >
            {values.map((v) => (
              <motion.div
                key={v.title}
                variants={item}
                className="rounded-2xl border border-zinc-200 bg-white p-6 transition-shadow hover:shadow-md dark:border-zinc-800 dark:bg-zinc-900"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600 dark:bg-emerald-950 dark:text-emerald-400">
                  <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d={v.icon} />
                  </svg>
                </div>
                <h3 className="mt-4 font-semibold text-zinc-900 dark:text-white">{v.title}</h3>
                <p className="mt-2 text-base leading-relaxed text-zinc-600 dark:text-zinc-400">{v.description}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      <section className="bg-white py-20 dark:bg-black">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.5 }}
            className="mx-auto max-w-2xl text-center"
          >
            <span className="mb-4 inline-block rounded-full bg-emerald-100 px-4 py-1.5 text-sm font-medium text-emerald-700 dark:bg-emerald-900 dark:text-emerald-300">
              Our Journey
            </span>
            <h2 className="text-3xl font-bold tracking-tight text-zinc-900 dark:text-white">
              How We Grew
            </h2>
          </motion.div>

          <motion.div
            variants={container}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: '-100px' }}
            className="mx-auto mt-16 max-w-3xl"
          >
            {timeline.map((t, i) => (
              <motion.div key={t.year + t.event} variants={item} className="relative flex gap-6 pb-12 last:pb-0">
                <div className="flex flex-col items-center">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-emerald-100 text-sm font-bold text-emerald-600 dark:bg-emerald-900 dark:text-emerald-400">
                    {t.year}
                  </div>
                  {i < timeline.length - 1 && (
                    <div className="mt-2 h-full w-0.5 bg-gradient-to-b from-emerald-200 to-transparent dark:from-emerald-800" />
                  )}
                </div>
                <div className="pt-1">
                  <p className="text-base leading-relaxed text-zinc-600 dark:text-zinc-400">{t.event}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      <section className="bg-zinc-50 py-20 dark:bg-zinc-950">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.5 }}
            className="mx-auto max-w-2xl text-center"
          >
            <span className="mb-4 inline-block rounded-full bg-emerald-100 px-4 py-1.5 text-sm font-medium text-emerald-700 dark:bg-emerald-900 dark:text-emerald-300">
              Our Team
            </span>
            <h2 className="text-3xl font-bold tracking-tight text-zinc-900 dark:text-white">
              Meet the People Behind TravelBuddy
            </h2>
          </motion.div>

          <motion.div
            variants={container}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: '-100px' }}
            className="mx-auto mt-16 grid max-w-4xl gap-8 sm:grid-cols-2 lg:grid-cols-4"
          >
            {team.map((t) => (
              <motion.div
                key={t.name}
                variants={item}
                className="rounded-2xl border border-zinc-200 bg-white p-6 text-center transition-shadow hover:shadow-md dark:border-zinc-800 dark:bg-zinc-900"
              >
                <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-emerald-100 text-2xl font-bold text-emerald-600 dark:bg-emerald-900 dark:text-emerald-400">
                  {t.initials}
                </div>
                <h3 className="mt-4 font-semibold text-zinc-900 dark:text-white">{t.name}</h3>
                <p className="mt-1 text-sm text-zinc-500 dark:text-zinc-400">{t.role}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      <section className="bg-gradient-to-br from-emerald-500 to-teal-600 py-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mx-auto max-w-2xl px-4 text-center sm:px-6 lg:px-8"
        >
          <h2 className="text-3xl font-bold tracking-tight text-white">
            Ready to Join Our Community?
          </h2>
          <p className="mt-4 text-lg text-emerald-100">
            Create your account today and start planning your next adventure with fellow travelers.
          </p>
          <div className="mt-8">
            <Link
              href="/register"
              className="inline-flex items-center rounded-xl bg-white px-8 py-3.5 text-sm font-semibold text-emerald-600 shadow-sm transition-all hover:bg-emerald-50 hover:shadow-md"
            >
              Get Started Free
              <svg className="ml-2 h-4 w-4" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
              </svg>
            </Link>
          </div>
        </motion.div>
      </section>
    </div>
  )
}
