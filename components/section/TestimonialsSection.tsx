'use client'

import { motion } from 'framer-motion'

const testimonials = [
  {
    name: 'Sarah Chen',
    location: 'Traveled to Japan',
    quote: 'TravelBuddy made my solo trip to Japan unforgettable. I found two amazing travel partners and we ended up exploring Tokyo, Kyoto, and Osaka together for two weeks! The smart matching feature is incredible.',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=100&h=100&fit=crop&crop=face',
    initials: 'SC',
    rating: 5,
    date: 'March 2026',
  },
  {
    name: 'Marcus Johnson',
    location: 'Traveled to Bali',
    quote: 'I was nervous about traveling alone for the first time. The community here is so welcoming and supportive. Our Bali trip was absolutely incredible — I made friends for life.',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=100&h=100&fit=crop&crop=face',
    initials: 'MJ',
    rating: 5,
    date: 'February 2026',
  },
  {
    name: 'Elena Rodriguez',
    location: 'Traveled to Greece',
    quote: 'The trip planning tools are fantastic. We coordinated our Santorini trip seamlessly, split costs through the app, and the group chat made communication so easy. Highly recommend!',
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=100&h=100&fit=crop&crop=face',
    initials: 'ER',
    rating: 5,
    date: 'January 2026',
  },
  {
    name: 'Akira Tanaka',
    location: 'Traveled to New Zealand',
    quote: 'Budget-friendly and incredibly well-organized. I found three travel buddies for my New Zealand road trip and we split everything evenly. The cost-splitting feature is a game changer.',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=100&h=100&fit=crop&crop=face',
    initials: 'AT',
    rating: 4,
    date: 'December 2025',
  },
]

const container = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.12 },
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
          <span className="mb-4 inline-block rounded-full bg-emerald-50 px-4 py-1.5 text-sm font-medium text-emerald-600 dark:bg-emerald-950 dark:text-emerald-400">
            Testimonials
          </span>
          <h2 className="text-3xl font-bold tracking-tight text-zinc-900 sm:text-4xl dark:text-white">
            What Travelers Say
          </h2>
          <p className="mt-4 text-lg text-zinc-600 dark:text-zinc-400">
            Real stories from our community of travelers around the world.
          </p>
        </motion.div>

        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-100px' }}
          className="mx-auto mt-16 grid max-w-6xl gap-6 sm:grid-cols-2 lg:grid-cols-4"
        >
          {testimonials.map((t) => (
            <motion.div
              key={t.name}
              variants={item}
              className="flex flex-col rounded-2xl border border-zinc-200 bg-white p-6 transition-shadow hover:shadow-md dark:border-zinc-800 dark:bg-zinc-900"
            >
              <div className="flex items-center gap-1">
                {Array.from({ length: 5 }).map((_, i) => (
                  <svg
                    key={i}
                    className={`h-4 w-4 ${i < t.rating ? 'text-amber-400' : 'text-zinc-200 dark:text-zinc-700'}`}
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>

              <blockquote className="mt-4 flex-1 text-base leading-relaxed text-zinc-600 dark:text-zinc-400">
                &ldquo;{t.quote}&rdquo;
              </blockquote>

              <div className="mt-5 flex items-center gap-3 border-t border-zinc-100 pt-4 dark:border-zinc-800">
                <img
                  src={t.avatar}
                  alt={t.name}
                  className="h-10 w-10 rounded-full object-cover"
                  onError={(e) => {
                    (e.target as HTMLImageElement).style.display = 'none'
                    const parent = (e.target as HTMLImageElement).parentElement
                    if (parent) {
                      const span = document.createElement('span')
                      span.className =
                        'flex h-10 w-10 items-center justify-center rounded-full bg-emerald-100 text-sm font-semibold text-emerald-700 dark:bg-emerald-900 dark:text-emerald-300'
                      span.textContent = t.initials
                      parent.insertBefore(span, e.target as HTMLImageElement)
                    }
                  }}
                />
                <div className="flex-1">
                  <p className="text-sm font-semibold text-zinc-900 dark:text-white">{t.name}</p>
                  <p className="text-xs text-zinc-500 dark:text-zinc-400">{t.location}</p>
                </div>
                <span className="text-xs text-zinc-400 dark:text-zinc-500">{t.date}</span>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
