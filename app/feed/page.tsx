'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import FeedPost from '@/components/shared/FeedPost'

const filters = ['All', 'Trending', 'Recent', 'Near Me']

const posts = [
  {
    user: { name: 'Amina Patel', avatar: 'AP', location: 'Mumbai, India' },
    image: 'https://images.unsplash.com/photo-1506973035872-a4ec16b8e8d9?q=80&w=800&h=600&fit=crop',
    caption: 'Sunset hike in the Himalayas was absolutely breathtaking! Found amazing trekking partners here.',
    tags: ['hiking', 'himalayas', 'adventure'],
    likes: 142,
    comments: 18,
  },
  {
    user: { name: 'Lucas Weber', avatar: 'LW', location: 'Berlin, Germany' },
    image: 'https://images.unsplash.com/photo-1523906834658-6e24ef2386f9?q=80&w=800&h=600&fit=crop',
    caption: 'Venice canals at golden hour. TravelBuddy made this spontaneous trip possible!',
    tags: ['venice', 'italy', 'solo-travel'],
    likes: 98,
    comments: 12,
  },
  {
    user: { name: 'Yuki Tanaka', avatar: 'YT', location: 'Tokyo, Japan' },
    image: 'https://images.unsplash.com/photo-1545569341-9eb8b30979d9?q=80&w=800&h=600&fit=crop',
    caption: 'Exploring the temples of Kyoto with my new travel crew. Match made in heaven!',
    tags: ['japan', 'kyoto', 'culture'],
    likes: 215,
    comments: 27,
  },
  {
    user: { name: 'Sophia Martinez', avatar: 'SM', location: 'Barcelona, Spain' },
    image: 'https://images.unsplash.com/photo-1533105079780-92b9be482077?q=80&w=800&h=600&fit=crop',
    caption: 'Road trip along the Amalfi Coast with friends from the app. Unforgettable!',
    tags: ['roadtrip', 'italy', 'coast'],
    likes: 176,
    comments: 21,
  },
  {
    user: { name: 'James Okafor', avatar: 'JO', location: 'Lagos, Nigeria' },
    image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=800&h=600&fit=crop',
    caption: 'Beach vibes in Thailand! Met some incredible people who are now lifelong friends.',
    tags: ['thailand', 'beach', 'travel-family'],
    likes: 310,
    comments: 42,
  },
  {
    user: { name: 'Elena Voss', avatar: 'EV', location: 'Amsterdam, Netherlands' },
    image: 'https://images.unsplash.com/photo-1495562569060-2eec283d3391?q=80&w=800&h=600&fit=crop',
    caption: 'Northern Lights in Tromsø — a bucket list experience shared with the best travel buddies.',
    tags: ['norway', 'northern-lights', 'bucket-list'],
    likes: 489,
    comments: 53,
  },
]

const container = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.1 },
  },
}

const item = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.4, ease: 'easeOut' as const } },
}

export default function FeedPage() {
  const [activeFilter, setActiveFilter] = useState('All')
  const [search, setSearch] = useState('')

  const filtered = posts.filter((post) => {
    const matchesSearch =
      post.caption.toLowerCase().includes(search.toLowerCase()) ||
      post.user.name.toLowerCase().includes(search.toLowerCase()) ||
      post.tags.some((t) => t.includes(search.toLowerCase()))
    const matchesFilter = activeFilter === 'All' || true
    return matchesSearch && matchesFilter
  })

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950">
      <div className="mx-auto max-w-2xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="space-y-6">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-2xl font-bold tracking-tight text-zinc-900 dark:text-white">
              Explore
            </h1>
            <p className="mt-1 text-base text-zinc-600 dark:text-zinc-400">
              Discover travel stories from the community.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.1 }}
            className="relative"
          >
            <svg
              className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-zinc-400"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
            </svg>
            <input
              type="text"
              placeholder="Search destinations, people, tags..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full rounded-xl border border-zinc-200 bg-white py-2.5 pl-10 pr-4 text-sm text-zinc-900 placeholder-zinc-400 transition-colors focus:border-emerald-400 focus:outline-none focus:ring-2 focus:ring-emerald-100 dark:border-zinc-800 dark:bg-zinc-900 dark:text-white dark:placeholder-zinc-500 dark:focus:border-emerald-600 dark:focus:ring-emerald-900"
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.2 }}
            className="flex gap-2 overflow-x-auto pb-1"
          >
            {filters.map((f) => (
              <button
                key={f}
                onClick={() => setActiveFilter(f)}
                className={`shrink-0 rounded-full px-4 py-1.5 text-sm font-medium transition-colors ${
                  activeFilter === f
                    ? 'bg-emerald-500 text-white'
                    : 'bg-white text-zinc-600 hover:bg-zinc-100 dark:bg-zinc-900 dark:text-zinc-400 dark:hover:bg-zinc-800'
                }`}
              >
                {f}
              </button>
            ))}
          </motion.div>
        </div>

        {filtered.length === 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="mt-20 text-center"
          >
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-zinc-100 dark:bg-zinc-800">
              <svg className="h-8 w-8 text-zinc-400" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
              </svg>
            </div>
            <h3 className="mt-4 text-base font-semibold text-zinc-900 dark:text-white">No posts found</h3>
            <p className="mt-1 text-base text-zinc-500">Try a different search or filter.</p>
          </motion.div>
        ) : (
          <motion.div
            variants={container}
            initial="hidden"
            animate="show"
            className="mt-6 space-y-6"
          >
            {filtered.map((post) => (
              <motion.div key={post.caption} variants={item}>
                <FeedPost {...post} />
              </motion.div>
            ))}
          </motion.div>
        )}
      </div>
    </div>
  )
}
