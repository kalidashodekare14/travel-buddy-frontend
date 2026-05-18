'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useForm, SubmitHandler } from 'react-hook-form'
import { skipToken } from '@reduxjs/toolkit/query/react'
import {
  useGetMyPostsQuery,
  useUpdatePostMutation,
  useDeletePostMutation,
  useGetPostRequestsQuery,
  useRespondToRequestMutation,
  Post,
  JoinRequest,
} from '@/lib/api'

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08 } },
}

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.4, ease: 'easeOut' as const } },
}

const inputClass =
  'mt-1.5 block w-full rounded-xl border border-zinc-200 bg-white px-4 py-2.5 text-base text-zinc-900 placeholder-zinc-400 transition-colors focus:border-emerald-400 focus:outline-none focus:ring-2 focus:ring-emerald-100 dark:border-zinc-700 dark:bg-zinc-800 dark:text-white dark:placeholder-zinc-500 dark:focus:border-emerald-500 dark:focus:ring-emerald-900'

const invalidInputClass =
  'mt-1.5 block w-full rounded-xl border border-red-300 bg-white px-4 py-2.5 text-base text-zinc-900 placeholder-zinc-400 transition-colors focus:border-red-400 focus:outline-none focus:ring-2 focus:ring-red-100 dark:border-red-800 dark:bg-zinc-800 dark:text-white dark:placeholder-zinc-500 dark:focus:border-red-500 dark:focus:ring-red-900'

const labelClass = 'block text-sm font-medium text-zinc-700 dark:text-zinc-300'

function Shimmer({ className }: { className?: string }) {
  return (
    <div
      className={`relative isolate overflow-hidden rounded-md bg-zinc-200 dark:bg-zinc-800 ${className ?? ''}`}
    >
      <div className="absolute inset-0 -translate-x-full animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-transparent via-white/40 to-transparent dark:via-white/10" />
    </div>
  )
}

function SkeletonCard() {
  return (
    <div className="overflow-hidden rounded-2xl border border-zinc-200 bg-white dark:border-zinc-800 dark:bg-zinc-900">
      <div className="flex flex-col sm:flex-row">
        <div className="relative h-40 w-full shrink-0 overflow-hidden bg-zinc-200 dark:bg-zinc-800 sm:h-auto sm:w-48">
          <div className="absolute inset-0 -translate-x-full animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-transparent via-white/40 to-transparent dark:via-white/10" />
        </div>
        <div className="flex flex-1 flex-col gap-3 p-5">
          <div className="flex items-start justify-between gap-3">
            <div className="flex-1 space-y-2">
              <Shimmer className="h-5 w-48" />
              <Shimmer className="h-4 w-32" />
            </div>
            <Shimmer className="h-6 w-20 rounded-full" />
          </div>
          <div className="flex flex-wrap gap-4">
            <Shimmer className="h-4 w-28" />
            <Shimmer className="h-4 w-20" />
          </div>
          <div className="mt-2 flex gap-2">
            <Shimmer className="h-9 w-20 rounded-lg" />
            <Shimmer className="h-9 w-20 rounded-lg" />
            <Shimmer className="h-9 w-20 rounded-lg" />
          </div>
        </div>
      </div>
    </div>
  )
}

function ConfirmModal({
  open,
  onClose,
  onConfirm,
  title,
  message,
  confirmLabel = 'Delete',
  confirmClass = 'bg-red-500 hover:bg-red-600',
}: {
  open: boolean
  onClose: () => void
  onConfirm: () => void
  title: string
  message: string
  confirmLabel?: string
  confirmClass?: string
}) {
  if (!open) return null

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/40 px-4 backdrop-blur-sm">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="w-full max-w-sm overflow-hidden rounded-2xl border border-zinc-200 bg-white shadow-xl dark:border-zinc-800 dark:bg-zinc-900"
      >
        <div className="p-6">
          <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-red-50 dark:bg-red-950">
            <svg className="h-6 w-6 text-red-500" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" />
            </svg>
          </div>
          <h3 className="text-center text-lg font-semibold text-zinc-900 dark:text-white">{title}</h3>
          <p className="mt-2 text-center text-sm text-zinc-600 dark:text-zinc-400">{message}</p>
        </div>
        <div className="flex gap-3 border-t border-zinc-100 px-6 py-4 dark:border-zinc-800">
          <button
            onClick={onClose}
            className="flex-1 rounded-lg border border-zinc-200 px-4 py-2.5 text-sm font-medium text-zinc-700 transition-colors hover:bg-zinc-50 dark:border-zinc-700 dark:text-zinc-300 dark:hover:bg-zinc-800"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className={`flex-1 rounded-lg px-4 py-2.5 text-sm font-semibold text-white transition-colors ${confirmClass}`}
          >
            {confirmLabel}
          </button>
        </div>
      </motion.div>
    </div>
  )
}

function StatusBadge({ status }: { status: JoinRequest['status'] }) {
  const styles = {
    pending:
      'bg-amber-50 text-amber-700 ring-amber-200 dark:bg-amber-950 dark:text-amber-400 dark:ring-amber-800',
    accepted:
      'bg-emerald-50 text-emerald-700 ring-emerald-200 dark:bg-emerald-950 dark:text-emerald-400 dark:ring-emerald-800',
    rejected:
      'bg-red-50 text-red-700 ring-red-200 dark:bg-red-950 dark:text-red-400 dark:ring-red-800',
  }

  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-xs font-semibold ring-1 ring-inset ${styles[status]}`}
    >
      <span
        className={`h-1.5 w-1.5 rounded-full ${
          status === 'pending'
            ? 'bg-amber-500'
            : status === 'accepted'
              ? 'bg-emerald-500'
              : 'bg-red-500'
        }`}
      />
      {status.charAt(0).toUpperCase() + status.slice(1)}
    </span>
  )
}

type EditInputs = {
  title: string
  destination: string
  travelDate: string
  budget: string
  description: string
  peopleNeeded: string
  tags: string
}

function EditModal({
  post,
  open,
  onClose,
}: {
  post: Post | null
  open: boolean
  onClose: () => void
}) {
  const [updatePost, { isLoading: isUpdating }] = useUpdatePostMutation()

  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm<EditInputs>({
    values: post
      ? {
          title: post.title,
          destination: post.destination,
          travelDate: post.travelDate ? post.travelDate.split('T')[0] : '',
          budget: String(post.budget || ''),
          description: post.description,
          peopleNeeded: String(post.peopleNeeded || ''),
          tags: post.tags?.join(', ') || '',
        }
      : undefined,
  })

  const onSubmit: SubmitHandler<EditInputs> = async (data) => {
    if (!post) return
    const tags = data.tags
      .split(',')
      .map((t) => t.trim())
      .filter(Boolean)

    const body = {
      title: data.title,
      destination: data.destination,
      travelDate: data.travelDate,
      budget: Number(data.budget),
      description: data.description,
      peopleNeeded: Number(data.peopleNeeded),
      tags,
    }

    try {
      await updatePost({ id: post.id, body }).unwrap()
      onClose()
    } catch (err) {
      const rtqErr = err as { data?: { message?: string } }
      setError('root', {
        message: rtqErr?.data?.message || 'Failed to update post.',
      })
    }
  }

  if (!open) return null

  return (
    <div className="fixed inset-0 z-[100] flex items-start justify-center overflow-y-auto bg-black/40 px-4 py-10 backdrop-blur-sm">
      <motion.div
        initial={{ opacity: 0, y: 30, scale: 0.97 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        className="w-full max-w-2xl overflow-hidden rounded-2xl border border-zinc-200 bg-white shadow-xl dark:border-zinc-800 dark:bg-zinc-900"
      >
        <div className="flex items-center justify-between border-b border-zinc-100 px-6 py-4 dark:border-zinc-800">
          <h2 className="text-lg font-bold text-zinc-900 dark:text-white">Edit Trip</h2>
          <button
            onClick={onClose}
            className="flex h-8 w-8 items-center justify-center rounded-lg text-zinc-400 transition-colors hover:bg-zinc-100 hover:text-zinc-600 dark:hover:bg-zinc-800 dark:hover:text-zinc-300"
          >
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5 p-6">
          {errors.root && (
            <motion.div
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700 dark:border-red-800 dark:bg-red-950 dark:text-red-400"
            >
              {errors.root.message}
            </motion.div>
          )}

          <div className="grid gap-5 sm:grid-cols-2">
            <div>
              <label className={labelClass}>Title</label>
              <input
                type="text"
                className={errors.title ? invalidInputClass : inputClass}
                {...register('title', { required: true })}
              />
              {errors.title && <span className="mt-1 text-xs text-red-500">Required</span>}
            </div>
            <div>
              <label className={labelClass}>Destination</label>
              <input
                type="text"
                className={errors.destination ? invalidInputClass : inputClass}
                {...register('destination', { required: true })}
              />
              {errors.destination && <span className="mt-1 text-xs text-red-500">Required</span>}
            </div>
          </div>

          <div className="grid gap-5 sm:grid-cols-2">
            <div>
              <label className={labelClass}>Travel Date</label>
              <input
                type="date"
                className={errors.travelDate ? invalidInputClass : inputClass}
                {...register('travelDate', { required: true })}
              />
              {errors.travelDate && <span className="mt-1 text-xs text-red-500">Required</span>}
            </div>
            <div>
              <label className={labelClass}>Budget ($)</label>
              <input
                type="number"
                className={errors.budget ? invalidInputClass : inputClass}
                {...register('budget', { required: true, min: 0 })}
              />
              {errors.budget && <span className="mt-1 text-xs text-red-500">Required</span>}
            </div>
          </div>

          <div>
            <label className={labelClass}>Description</label>
            <textarea
              rows={3}
              className={errors.description ? invalidInputClass : inputClass}
              {...register('description', { required: true })}
            />
            {errors.description && <span className="mt-1 text-xs text-red-500">Required</span>}
          </div>

          <div className="grid gap-5 sm:grid-cols-2">
            <div>
              <label className={labelClass}>People Needed</label>
              <input
                type="number"
                className={errors.peopleNeeded ? invalidInputClass : inputClass}
                {...register('peopleNeeded', { required: true, min: 1 })}
              />
              {errors.peopleNeeded && <span className="mt-1 text-xs text-red-500">Required</span>}
            </div>
            <div>
              <label className={labelClass}>Tags</label>
              <input
                type="text"
                placeholder="hiking, beach"
                className={inputClass}
                {...register('tags')}
              />
            </div>
          </div>

          <div className="flex items-center gap-3 pt-2">
            <button
              type="submit"
              disabled={isUpdating}
              className="rounded-xl bg-emerald-500 px-8 py-2.5 text-sm font-semibold text-white shadow-sm transition-all hover:bg-emerald-600 hover:shadow-md disabled:opacity-60"
            >
              {isUpdating ? (
                <span className="flex items-center gap-2">
                  <span className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                  Saving...
                </span>
              ) : (
                'Save Changes'
              )}
            </button>
            <button
              type="button"
              onClick={onClose}
              className="rounded-xl border border-zinc-200 px-6 py-2.5 text-sm font-medium text-zinc-700 transition-colors hover:bg-zinc-50 dark:border-zinc-700 dark:text-zinc-300 dark:hover:bg-zinc-800"
            >
              Cancel
            </button>
          </div>
        </form>
      </motion.div>
    </div>
  )
}

function ParticipantsDrawer({
  postId,
  postTitle,
  open,
  onClose,
}: {
  postId: string
  postTitle: string
  open: boolean
  onClose: () => void
}) {
  const { data: requests, isLoading } = useGetPostRequestsQuery(open ? postId : skipToken)
  const [respondToRequest, { isLoading: isResponding }] = useRespondToRequestMutation()

  if (!open) return null

  return (
    <div className="fixed inset-0 z-[100] flex justify-end bg-black/40 backdrop-blur-sm">
      <motion.div
        initial={{ opacity: 0, x: 80 }}
        animate={{ opacity: 1, x: 0 }}
        className="w-full max-w-md overflow-y-auto border-l border-zinc-200 bg-white dark:border-zinc-800 dark:bg-zinc-900"
      >
        <div className="flex items-center justify-between border-b border-zinc-100 px-5 py-4 dark:border-zinc-800">
          <div>
            <h2 className="text-lg font-bold text-zinc-900 dark:text-white">Participants</h2>
            <p className="mt-0.5 text-sm text-zinc-500 dark:text-zinc-400 truncate max-w-64">{postTitle}</p>
          </div>
          <button
            onClick={onClose}
            className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg text-zinc-400 transition-colors hover:bg-zinc-100 hover:text-zinc-600 dark:hover:bg-zinc-800 dark:hover:text-zinc-300"
          >
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div className="p-5">
          {isLoading ? (
            <div className="flex justify-center py-10">
              <div className="h-6 w-6 animate-spin rounded-full border-2 border-emerald-500 border-t-transparent" />
            </div>
          ) : !requests || requests.length === 0 ? (
            <div className="flex flex-col items-center py-10 text-center">
              <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-xl bg-zinc-100 dark:bg-zinc-800">
                <svg className="h-6 w-6 text-zinc-400" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z" />
                </svg>
              </div>
              <p className="text-sm font-medium text-zinc-500 dark:text-zinc-400">No participants yet</p>
              <p className="mt-1 text-xs text-zinc-400 dark:text-zinc-500">When someone requests to join, they will appear here.</p>
            </div>
          ) : (
            <div className="space-y-3">
              {requests.map((req) => (
                <div
                  key={req._id}
                  className="rounded-xl border border-zinc-100 p-4 dark:border-zinc-800"
                >
                  <div className="flex items-center gap-3">
                    <div className="flex h-9 w-9 shrink-0 items-center justify-center overflow-hidden rounded-full bg-emerald-100 text-sm font-semibold text-emerald-700 dark:bg-emerald-900 dark:text-emerald-300">
                      {req.userId?.name?.charAt(0)?.toUpperCase()}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="truncate text-sm font-semibold text-zinc-900 dark:text-white">
                        {req.userId?.name}
                      </p>
                      <p className="text-xs text-zinc-500 dark:text-zinc-400">
                        {new Date(req.createdAt).toLocaleDateString()}
                      </p>
                    </div>
                    <StatusBadge status={req.status} />
                  </div>

                  {req.status === 'pending' && (
                    <div className="mt-3 flex gap-2 border-t border-zinc-100 pt-3 dark:border-zinc-800">
                      <button
                        onClick={() => respondToRequest({ id: req._id, status: 'accepted' })}
                        disabled={isResponding}
                        className="flex-1 rounded-lg bg-emerald-500 py-1.5 text-xs font-semibold text-white transition-colors hover:bg-emerald-600 disabled:opacity-60"
                      >
                        Accept
                      </button>
                      <button
                        onClick={() => respondToRequest({ id: req._id, status: 'rejected' })}
                        disabled={isResponding}
                        className="flex-1 rounded-lg border border-zinc-200 py-1.5 text-xs font-medium text-zinc-600 transition-colors hover:bg-red-50 hover:text-red-600 dark:border-zinc-700 dark:text-zinc-400 dark:hover:bg-red-950 dark:hover:text-red-400 disabled:opacity-60"
                      >
                        Decline
                      </button>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </motion.div>
    </div>
  )
}

function TripCard({
  post,
  onEdit,
  onDelete,
  onViewRequests,
}: {
  post: Post
  onEdit: (post: Post) => void
  onDelete: (post: Post) => void
  onViewRequests: (post: Post) => void
}) {
  const baseUrl = process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:5000'
  const imageUrl = post.image
    ? post.image.startsWith('http')
      ? post.image
      : `${baseUrl}${post.image}`
    : null

  return (
    <motion.div
      variants={item}
      className="overflow-hidden rounded-2xl border border-zinc-200 bg-white shadow-sm transition-shadow hover:shadow-md dark:border-zinc-800 dark:bg-zinc-900"
    >
      <div className="flex flex-col sm:flex-row">
        <div className="relative h-40 w-full shrink-0 sm:h-auto sm:w-44">
          {imageUrl ? (
            <div
              className="h-full w-full bg-cover bg-center"
              style={{ backgroundImage: `url(${imageUrl})` }}
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-emerald-100 to-teal-100 dark:from-emerald-950 dark:to-teal-950">
              <svg className="h-8 w-8 text-emerald-400" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909M3.75 21h16.5A2.25 2.25 0 0022.5 18.75V5.25A2.25 2.25 0 0020.25 3H3.75A2.25 2.25 0 001.5 5.25v13.5A2.25 2.25 0 003.75 21z" />
              </svg>
            </div>
          )}
        </div>

        <div className="flex flex-1 flex-col p-5">
          <div>
            <h3 className="truncate text-lg font-bold text-zinc-900 dark:text-white">{post.title}</h3>
            <p className="mt-0.5 text-sm text-emerald-600 dark:text-emerald-400">{post.destination}</p>
          </div>

          <div className="mt-2 flex flex-wrap items-center gap-3 text-sm text-zinc-500 dark:text-zinc-400">
            {post.travelDate && (
              <span className="flex items-center gap-1">
                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5" />
                </svg>
                {new Date(post.travelDate).toLocaleDateString()}
              </span>
            )}
            <span className="flex items-center gap-1">
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v12m-3-2.818l.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              ${post.budget}
            </span>
            <span className="flex items-center gap-1">
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z" />
              </svg>
              {post.peopleNeeded} needed
            </span>
          </div>

          <div className="mt-auto flex flex-wrap gap-2 pt-4">
            <button
              onClick={() => onViewRequests(post)}
              className="inline-flex items-center gap-1.5 rounded-lg border border-zinc-200 px-3.5 py-2 text-xs font-medium text-zinc-600 transition-colors hover:bg-zinc-50 hover:text-emerald-600 dark:border-zinc-700 dark:text-zinc-400 dark:hover:bg-zinc-800 dark:hover:text-emerald-400"
            >
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z" />
              </svg>
              Participants
            </button>
            <button
              onClick={() => onEdit(post)}
              className="inline-flex items-center gap-1.5 rounded-lg border border-zinc-200 px-3.5 py-2 text-xs font-medium text-zinc-600 transition-colors hover:bg-zinc-50 hover:text-emerald-600 dark:border-zinc-700 dark:text-zinc-400 dark:hover:bg-zinc-800 dark:hover:text-emerald-400"
            >
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
              </svg>
              Edit
            </button>
            <button
              onClick={() => onDelete(post)}
              className="inline-flex items-center gap-1.5 rounded-lg border border-red-200 px-3.5 py-2 text-xs font-medium text-red-600 transition-colors hover:bg-red-50 dark:border-red-800 dark:text-red-400 dark:hover:bg-red-950"
            >
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
              </svg>
              Delete
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  )
}

export default function MyTripsSection() {
  const { data: posts, isLoading, isError, error } = useGetMyPostsQuery()
  const [deletePost, { isLoading: isDeleting }] = useDeletePostMutation()

  const [editingPost, setEditingPost] = useState<Post | null>(null)
  const [deletingPost, setDeletingPost] = useState<Post | null>(null)
  const [requestsPost, setRequestsPost] = useState<Post | null>(null)

  const apiError =
    (error as { data?: { message?: string } })?.data?.message

  const handleDelete = async () => {
    if (!deletingPost) return
    try {
      await deletePost(deletingPost.id).unwrap()
      setDeletingPost(null)
    } catch {
      /* handled by mutation error */
    }
  }

  return (
    <div className="min-h-screen bg-zinc-50 px-4 py-10 dark:bg-zinc-950 sm:py-14">
      <div className="mx-auto max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: 'easeOut' as const }}
        >
          <div className="mb-8">
            <div className="flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-emerald-400 to-teal-500 shadow-sm">
                <svg className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 8.25h19.5M2.25 9h19.5m-16.5 5.25h6m-6 2.25h3m-3.75 3h15a2.25 2.25 0 002.25-2.25V6.75A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25v10.5A2.25 2.25 0 004.5 19.5z" />
                </svg>
              </div>
              <div>
                <h1 className="text-2xl font-bold tracking-tight text-zinc-900 dark:text-white">
                  My Trips
                </h1>
                <p className="mt-0.5 text-sm text-zinc-500 dark:text-zinc-400">
                  Manage your travel posts
                </p>
              </div>
            </div>
          </div>

          {apiError && (
            <motion.div
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-6 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700 dark:border-red-800 dark:bg-red-950 dark:text-red-400"
            >
              {apiError}
            </motion.div>
          )}

          {isLoading ? (
            <div className="space-y-4">
              {[...Array(3)].map((_, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1, duration: 0.35 }}
                >
                  <SkeletonCard />
                </motion.div>
              ))}
            </div>
          ) : posts && posts.length > 0 ? (
            <motion.div
              variants={container}
              initial="hidden"
              animate="show"
              className="space-y-4"
            >
              {posts.map((post) => (
                <TripCard
                  key={post.id}
                  post={post}
                  onEdit={setEditingPost}
                  onDelete={setDeletingPost}
                  onViewRequests={setRequestsPost}
                />
              ))}
            </motion.div>
          ) : (
            <div className="flex flex-col items-center justify-center py-20 text-center">
              <div className="mb-5 flex h-16 w-16 items-center justify-center rounded-2xl bg-zinc-100 dark:bg-zinc-800">
                <svg className="h-8 w-8 text-zinc-400" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 8.25h19.5M2.25 9h19.5m-16.5 5.25h6m-6 2.25h3m-3.75 3h15a2.25 2.25 0 002.25-2.25V6.75A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25v10.5A2.25 2.25 0 004.5 19.5z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-zinc-900 dark:text-white">No trips yet</h3>
              <p className="mt-1 max-w-sm text-sm text-zinc-500 dark:text-zinc-400">
                Create your first travel post and find travel companions.
              </p>
            </div>
          )}
        </motion.div>
      </div>

      <EditModal
        post={editingPost}
        open={!!editingPost}
        onClose={() => setEditingPost(null)}
      />

      <ConfirmModal
        open={!!deletingPost}
        onClose={() => setDeletingPost(null)}
        onConfirm={handleDelete}
        title="Delete Trip?"
        message={`Are you sure you want to delete "${deletingPost?.title || 'this trip'}"? This action cannot be undone.`}
        confirmLabel={isDeleting ? 'Deleting...' : 'Delete'}
        confirmClass="bg-red-500 hover:bg-red-600"
      />

      <ParticipantsDrawer
        postId={requestsPost?.id || ''}
        postTitle={requestsPost?.title || ''}
        open={!!requestsPost}
        onClose={() => setRequestsPost(null)}
      />
    </div>
  )
}
