'use client'

import FeedPost from '@/components/shared/FeedPost'
import { useGetPostsQuery, useJoinTripMutation } from '@/lib/api'
import { motion } from 'framer-motion'
import { useSession } from 'next-auth/react'
import { useState } from 'react'

const filters = ['All', 'Trending', 'Recent', 'Near Me']

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
  const [joiningId, setJoiningId] = useState<string | null>(null)

  const { data: session } = useSession()
  const { data: posts, isLoading, isError, error } = useGetPostsQuery()
  const [joinTrip] = useJoinTripMutation()


  const handleJoin = async (postId: string) => {
    if (!session?.user?.id) return
    setJoiningId(postId)
    try {
      await joinTrip({ postId }).unwrap()
    } catch(error) {
      console.log(error);
      // handled by RTK Query error state
    } finally {
      setJoiningId(null)
    }
  }

  const filtered = (posts || []).filter((post) => {
    const q = search.toLowerCase()
    const matchesSearch =
      !q ||
      post.title.toLowerCase().includes(q) ||
      post.destination.toLowerCase().includes(q) ||
      post.description.toLowerCase().includes(q) ||
      post.user.name.toLowerCase().includes(q) ||
      post.tags.some((t) => t.includes(q))
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

        {isLoading ? (
          <div className="mt-20 flex justify-center">
            <div className="h-8 w-8 animate-spin rounded-full border-4 border-emerald-500 border-t-transparent" />
          </div>
        ) : isError ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="mt-20 text-center"
          >
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-red-100 dark:bg-red-900/50">
              <svg className="h-8 w-8 text-red-500" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z" />
              </svg>
            </div>
            <h3 className="mt-4 text-base font-semibold text-zinc-900 dark:text-white">Failed to load posts</h3>
            <p className="mt-1 text-base text-zinc-500">
              {(error as { data?: { message?: string } })?.data?.message || 'Something went wrong. Please try again.'}
            </p>
          </motion.div>
        ) : filtered.length === 0 ? (
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
            {filtered.map((post, i) => (
              <motion.div key={post.id || i} variants={item}>
                <FeedPost {...post} postId={post.id} onJoin={handleJoin} joining={joiningId === post.id} />
              </motion.div>
            ))}
          </motion.div>
        )}
      </div>
    </div>
  )
}
