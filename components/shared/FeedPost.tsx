'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'

interface FeedPostProps {
  user: { name: string; avatar: string; location: string }
  title: string
  destination: string
  travelDate: string
  budget: number
  description: string
  peopleNeeded: number
  image: string
  tags: string[]
  likes: number
  comments: number
}

export default function FeedPost({
  user,
  title,
  destination,
  travelDate,
  budget,
  description,
  peopleNeeded,
  image,
  tags,
  likes,
  comments,
}: FeedPostProps) {
  const [liked, setLiked] = useState(false)
  const [likeCount, setLikeCount] = useState(likes)

  const handleLike = () => {
    setLiked(!liked)
    setLikeCount(liked ? likeCount - 1 : likeCount + 1)
  }

  return (
    <div className="overflow-hidden rounded-2xl border border-zinc-200 bg-white dark:border-zinc-800 dark:bg-zinc-900">
      <div className="flex items-center gap-3 p-4">
        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-emerald-100 text-sm font-semibold text-emerald-700 dark:bg-emerald-900 dark:text-emerald-300">
          {user.avatar}
        </div>
        <div className="flex-1">
          <p className="text-sm font-semibold text-zinc-900 dark:text-white">{user.name}</p>
          <p className="text-sm text-zinc-500 dark:text-zinc-400">{user.location}</p>
        </div>
      </div>

      <div className="relative aspect-[4/3] overflow-hidden">
        <div
          className="h-full w-full bg-cover bg-center transition-transform duration-300 hover:scale-105"
          style={{ backgroundImage: `url(${image})` }}
        />
      </div>

      <div className="space-y-3 p-4">
        <div>
          <h2 className="text-lg font-bold text-zinc-900 dark:text-white">{title}</h2>
          <p className="text-base text-emerald-600 dark:text-emerald-400">{destination}</p>
        </div>

        <div className="flex flex-wrap gap-3 text-sm text-zinc-600 dark:text-zinc-400">
          <span className="flex items-center gap-1">
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5" />
            </svg>
            {new Date(travelDate).toLocaleDateString()}
          </span>
          <span className="flex items-center gap-1">
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v12m-3-2.818l.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            ${budget}
          </span>
          <span className="flex items-center gap-1">
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z" />
            </svg>
            {peopleNeeded} needed
          </span>
        </div>

        <p className="text-base leading-6 text-zinc-700 dark:text-zinc-300">{description}</p>

        <div className="flex flex-wrap gap-2">
          {tags.map((tag, i) => (
            <span
              key={i}
              className="rounded-full bg-emerald-50 px-3 py-1 text-xs font-medium text-emerald-600 dark:bg-emerald-950 dark:text-emerald-400"
            >
              #{tag}
            </span>
          ))}
        </div>

        <div className="flex items-center gap-4 border-t border-zinc-100 pt-3 dark:border-zinc-800">
          <button
            onClick={handleLike}
            className="flex items-center gap-1.5 text-sm text-zinc-500 transition-colors hover:text-red-500 dark:text-zinc-400"
          >
            <motion.svg
              animate={liked ? { scale: [1, 1.3, 1] } : {}}
              transition={{ duration: 0.3 }}
              className="h-5 w-5"
              fill={liked ? 'currentColor' : 'none'}
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z"
              />
            </motion.svg>
            <span className={liked ? 'text-red-500' : ''}>{likeCount}</span>
          </button>
          <button className="flex items-center gap-1.5 text-sm text-zinc-500 transition-colors hover:text-emerald-500 dark:text-zinc-400">
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 20.25c4.97 0 9-3.694 9-8.25s-4.03-8.25-9-8.25S3 7.444 3 12c0 2.104.859 4.023 2.273 5.48.432.447.74 1.04.586 1.641a4.483 4.483 0 01-.923 1.785A5.969 5.969 0 006 21c1.282 0 2.47-.402 3.445-1.087.81.22 1.668.337 2.555.337z" />
            </svg>
            <span>{comments}</span>
          </button>
          <button className="flex items-center gap-1.5 text-sm text-zinc-500 transition-colors hover:text-emerald-500 dark:text-zinc-400">
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M7.217 10.907a2.25 2.25 0 100 2.186m0-2.186c.18.324.283.696.283 1.093s-.103.77-.283 1.093m0-2.186l9.566-5.314m-9.566 7.5l9.566 5.314m0 0a2.25 2.25 0 103.935 2.186 2.25 2.25 0 00-3.935-2.186zm0-12.814a2.25 2.25 0 103.933-2.185 2.25 2.25 0 00-3.933 2.185z" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  )
}
