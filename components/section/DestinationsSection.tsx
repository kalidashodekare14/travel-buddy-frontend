'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'

const destinations = [
  {
    name: 'Bali, Indonesia',
    image: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?q=80&w=400&h=500&fit=crop',
    travelers: 24,
    rating: 4.8,
    activities: 36,
    price: '$800',
    badge: 'Popular',
  },
  {
    name: 'Paris, France',
    image: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?q=80&w=400&h=500&fit=crop',
    travelers: 18,
    rating: 4.6,
    activities: 52,
    price: '$1,200',
    badge: 'Culture',
  },
  {
    name: 'Tokyo, Japan',
    image: 'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?q=80&w=400&h=500&fit=crop',
    travelers: 31,
    rating: 4.9,
    activities: 44,
    price: '$1,500',
    badge: 'Trending',
  },
  {
    name: 'Santorini, Greece',
    image: 'https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?q=80&w=400&h=500&fit=crop',
    travelers: 15,
    rating: 4.7,
    activities: 28,
    price: '$950',
    badge: 'Romantic',
  },
  {
    name: 'Machu Picchu, Peru',
    image: 'https://images.unsplash.com/photo-1587595431973-160d0d94add1?q=80&w=400&h=500&fit=crop',
    travelers: 12,
    rating: 4.8,
    activities: 19,
    price: '$1,100',
    badge: 'Adventure',
  },
  {
    name: 'Bangkok, Thailand',
    image: 'https://images.unsplash.com/photo-1504214208698-ea1916a2195a?q=80&w=400&h=500&fit=crop',
    travelers: 27,
    rating: 4.5,
    activities: 41,
    price: '$600',
    badge: 'Budget',
  },
]

const container = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.1 },
  },
}

const item = {
  hidden: { opacity: 0, y: 40 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' as const } },
}

const badgeColors: Record<string, string> = {
  Popular: 'bg-rose-100 text-rose-700 dark:bg-rose-900 dark:text-rose-300',
  Culture: 'bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300',
  Trending: 'bg-amber-100 text-amber-700 dark:bg-amber-900 dark:text-amber-300',
  Romantic: 'bg-pink-100 text-pink-700 dark:bg-pink-900 dark:text-pink-300',
  Adventure: 'bg-orange-100 text-orange-700 dark:bg-orange-900 dark:text-orange-300',
  Budget: 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900 dark:text-emerald-300',
}

export default function DestinationsSection() {
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
            Explore the World
          </span>
          <h2 className="text-3xl font-bold tracking-tight text-zinc-900 sm:text-4xl dark:text-white">
            Popular Destinations
          </h2>
          <p className="mt-4 text-lg text-zinc-600 dark:text-zinc-400">
            Join fellow travelers heading to these amazing places around the globe.
          </p>
        </motion.div>

        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-100px' }}
          className="mx-auto mt-16 grid max-w-6xl gap-6 sm:grid-cols-2 lg:grid-cols-3"
        >
          {destinations.map((dest) => (
            <motion.div
              key={dest.name}
              variants={item}
              className="group relative overflow-hidden rounded-2xl"
            >
              <div
                className="h-80 bg-cover bg-center transition-transform duration-500 group-hover:scale-110"
                style={{ backgroundImage: `url(${dest.image})` }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

              <div className="absolute right-3 top-3">
                <span
                  className={`rounded-full px-3 py-1 text-xs font-semibold ${badgeColors[dest.badge] || badgeColors.Popular}`}
                >
                  {dest.badge}
                </span>
              </div>

              <div className="absolute bottom-0 w-full p-5">
                <h3 className="text-lg font-bold text-white">{dest.name}</h3>

                <div className="mt-2 flex items-center gap-3 text-sm text-zinc-300">
                  <span className="flex items-center gap-1">
                    <svg className="h-4 w-4 text-amber-400" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                    {dest.rating}
                  </span>
                  <span className="flex items-center gap-1">
                    <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z" />
                    </svg>
                    {dest.travelers} travelers
                  </span>
                  <span className="flex items-center gap-1">
                    <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9 6.75V15m6-6v8.25m.503 3.498l4.875-2.437c.381-.19.622-.58.622-1.006V4.82c0-.836-.88-1.38-1.628-1.006l-3.869 1.934c-.317.159-.69.159-1.006 0L9.503 3.252a1.125 1.125 0 00-1.006 0L3.622 5.689C3.24 5.88 3 6.27 3 6.695V19.18c0 .836.88 1.38 1.628 1.006l3.869-1.934c.317-.159.69-.159 1.006 0l4.994 2.497c.317.158.69.158 1.006 0z" />
                    </svg>
                    {dest.activities} activities
                  </span>
                </div>

                <div className="mt-3 flex items-center justify-between">
                  <span className="text-sm font-semibold text-emerald-400">
                    Avg. {dest.price}
                  </span>
                  <Link
                    href="/feed"
                    className="rounded-lg bg-white/20 px-3 py-1.5 text-xs font-semibold text-white backdrop-blur-sm transition-colors hover:bg-white/30"
                  >
                    View Trips
                  </Link>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
