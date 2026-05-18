'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import {
  JoinRequest,
  useGetMyRequestsQuery,
  useCancelRequestMutation,
} from '@/lib/api'

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08 } },
}

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.4, ease: 'easeOut' as const } },
}

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
          <Shimmer className="h-5 w-48" />
          <Shimmer className="h-4 w-32" />
          <Shimmer className="h-6 w-20 rounded-full" />
          <div className="flex flex-wrap gap-4">
            <Shimmer className="h-4 w-28" />
            <Shimmer className="h-4 w-20" />
            <Shimmer className="h-4 w-24" />
          </div>
          <div className="flex items-center gap-3 border-t border-zinc-100 pt-4 dark:border-zinc-800">
            <Shimmer className="h-8 w-8 rounded-full" />
            <Shimmer className="h-4 w-36" />
          </div>
        </div>
      </div>
    </div>
  )
}

function SkeletonList() {
  return (
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
      className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold ring-1 ring-inset ${styles[status]}`}
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

function EmptyState() {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="flex flex-col items-center justify-center py-20 text-center"
    >
      <div className="mb-5 flex h-16 w-16 items-center justify-center rounded-2xl bg-zinc-100 dark:bg-zinc-800">
        <svg className="h-8 w-8 text-zinc-400" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 01-1.043 3.296 3.745 3.745 0 01-3.296 1.043A3.745 3.745 0 0112 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 01-3.296-1.043 3.745 3.745 0 01-1.043-3.296A3.745 3.745 0 013 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 011.043-3.296 3.746 3.746 0 013.296-1.043A3.746 3.746 0 0112 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 013.296 1.043 3.746 3.746 0 011.043 3.296A3.745 3.745 0 0121 12z" />
        </svg>
      </div>
      <h3 className="text-lg font-semibold text-zinc-900 dark:text-white">No requests yet</h3>
      <p className="mt-1 max-w-sm text-sm text-zinc-500 dark:text-zinc-400">
        When you request to join a trip, it will appear here.
      </p>
    </motion.div>
  )
}

function ConfirmModal({
  open,
  onClose,
  onConfirm,
  title,
  message,
}: {
  open: boolean
  onClose: () => void
  onConfirm: () => void
  title: string
  message: string
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
            No
          </button>
          <button
            onClick={onConfirm}
            className="flex-1 rounded-lg bg-red-500 px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-red-600"
          >
            Yes, Cancel
          </button>
        </div>
      </motion.div>
    </div>
  )
}

function RequestCard({ req }: { req: JoinRequest }) {
  const [cancelRequest, { isLoading: isCancelling }] = useCancelRequestMutation()
  const [cancelled, setCancelled] = useState(false)
  const [showConfirm, setShowConfirm] = useState(false)

  const baseUrl = process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:5000'
  const imageUrl = req.post?.image
    ? req.post.image.startsWith('http')
      ? req.post.image
      : `${baseUrl}${req.post.image}`
    : null

  const isPending = req.status === 'pending' && !cancelled

  return (
    <motion.div
      variants={item}
      className="overflow-hidden rounded-2xl border border-zinc-200 bg-white shadow-sm transition-shadow hover:shadow-md dark:border-zinc-800 dark:bg-zinc-900"
    >
      <div className="flex flex-col sm:flex-row">
        <div className="relative h-40 w-full shrink-0 sm:h-auto sm:w-48">
          {imageUrl ? (
            <div
              className="h-full w-full bg-cover bg-center"
              style={{ backgroundImage: `url(${imageUrl})` }}
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-emerald-100 to-teal-100 dark:from-emerald-950 dark:to-teal-950">
              <svg className="h-10 w-10 text-emerald-400" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909M3.75 21h16.5A2.25 2.25 0 0022.5 18.75V5.25A2.25 2.25 0 0020.25 3H3.75A2.25 2.25 0 001.5 5.25v13.5A2.25 2.25 0 003.75 21z" />
              </svg>
            </div>
          )}
        </div>

        <div className="flex flex-1 flex-col p-5">
          <div className="flex items-start justify-between gap-3">
            <div className="min-w-0 flex-1">
              <h3 className="truncate text-lg font-bold text-zinc-900 dark:text-white">
                {req.post?.title || 'Untitled Trip'}
              </h3>
              <p className="mt-0.5 text-sm text-emerald-600 dark:text-emerald-400">
                {req.post?.destination || 'Unknown destination'}
              </p>
            </div>
            <StatusBadge status={cancelled ? 'rejected' : req.status} />
          </div>

          <div className="mt-3 flex flex-wrap items-center gap-4 text-sm text-zinc-500 dark:text-zinc-400">
            <span className="flex items-center gap-1.5">
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              {new Date(req.createdAt).toLocaleDateString()}
            </span>
          </div>

          <div className="mt-4 flex items-center gap-3 border-t border-zinc-100 pt-4 dark:border-zinc-800">
            <div
              className="flex h-8 w-8 shrink-0 items-center justify-center overflow-hidden rounded-full bg-emerald-100 bg-cover bg-center text-sm font-semibold text-emerald-700 dark:bg-emerald-900 dark:text-emerald-300"
              style={req.sender?.avatar ? { backgroundImage: `url(${req.sender.avatar.startsWith('http') ? req.sender.avatar : `${process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:5000'}${req.sender.avatar}`})` } : undefined}
            >
              {!req.sender?.avatar && (req.sender?.name?.charAt(0)?.toUpperCase() || '?')}
            </div>
            <p className="text-sm text-zinc-600 dark:text-zinc-400">
              Requested by{' '}
              <span className="font-semibold text-zinc-900 dark:text-white">{req.sender?.name}</span>
            </p>
          </div>

          {cancelled ? (
            <div className="mt-4 border-t border-zinc-100 pt-4 dark:border-zinc-800">
              <span className="inline-flex items-center gap-1.5 text-sm text-zinc-400 dark:text-zinc-500">
                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                Request cancelled
              </span>
            </div>
          ) : isPending && (
            <div className="mt-4 border-t border-zinc-100 pt-4 dark:border-zinc-800">
              <button
                onClick={() => setShowConfirm(true)}
                disabled={isCancelling}
                className="inline-flex items-center gap-1.5 rounded-lg border border-red-200 px-4 py-2 text-sm font-medium text-red-600 transition-all hover:bg-red-50 hover:border-red-300 dark:border-red-800 dark:text-red-400 dark:hover:bg-red-950 dark:hover:border-red-700 disabled:opacity-60"
              >
                {isCancelling ? (
                  <span className="h-4 w-4 animate-spin rounded-full border-2 border-red-400 border-t-transparent" />
                ) : (
                  <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                  </svg>
                )}
                Cancel Request
              </button>
              <ConfirmModal
                open={showConfirm}
                onClose={() => setShowConfirm(false)}
                onConfirm={async () => {
                  setShowConfirm(false)
                  try {
                    await cancelRequest(req._id).unwrap()
                    setCancelled(true)
                  } catch {
                    /* handled by mutation error */
                  }
                }}
                title="Cancel Request?"
                message={`Are you sure you want to cancel your request to join "${req.post?.title || 'this trip'}"?`}
              />
            </div>
          )}
        </div>
      </div>
    </motion.div>
  )
}

export default function MyRequestsSection() {
  const { data: requests, isLoading, isError, error } = useGetMyRequestsQuery()
  const apiError = (error as { data?: { message?: string } })?.data?.message

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
                  <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 9v.906a2.25 2.25 0 01-1.183 1.981l-6.478 3.488M2.25 9v.906a2.25 2.25 0 001.183 1.981l6.478 3.488m8.839 2.51l-4.66-2.51m0 0l-1.023-.55a2.25 2.25 0 00-2.134 0l-1.022.55m0 0l-4.661 2.51m16.5 1.615a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V8.844a2.25 2.25 0 011.183-1.981l7.5-4.039a2.25 2.25 0 012.134 0l7.5 4.039a2.25 2.25 0 011.183 1.98V19.5z" />
                </svg>
              </div>
              <div>
                <h1 className="text-2xl font-bold tracking-tight text-zinc-900 dark:text-white">My Requests</h1>
                <p className="mt-0.5 text-sm text-zinc-500 dark:text-zinc-400">Trips you have requested to join</p>
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
            <SkeletonList />
          ) : requests && requests.length > 0 ? (
            <motion.div variants={container} initial="hidden" animate="show" className="space-y-4">
              {requests.map((req) => (
                <RequestCard key={req._id} req={req} />
              ))}
            </motion.div>
          ) : (
            <EmptyState />
          )}
        </motion.div>
      </div>
    </div>
  )
}
