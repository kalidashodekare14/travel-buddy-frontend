'use client'

import { useState, useRef, useEffect, useCallback } from 'react'
import { motion } from 'framer-motion'
import { useSession } from 'next-auth/react'
import { skipToken } from '@reduxjs/toolkit/query/react'
import {
  useGetProfileQuery,
  useUpdateProfileMutation,
  useUploadAvatarMutation,
} from '@/lib/api'

function getToken() {
  if (typeof window !== 'undefined') return localStorage.getItem('accessToken')
  return null
}

export default function ProfileSection() {
  const { data: session } = useSession()
  const fileRef = useRef<HTMLInputElement>(null)

  const [editing, setEditing] = useState(false)
  const [name, setName] = useState('')
  const [bio, setBio] = useState('')
  const [location, setLocation] = useState('')

  const [canQuery, setCanQuery] = useState(!!getToken())

  useEffect(() => {
    if (!canQuery && session?.accessToken) {
      localStorage.setItem('accessToken', session.accessToken)
      setCanQuery(true)
    }
  }, [canQuery, session])

  const {
    data: profile,
    isLoading,
    isError,
    error,
  } = useGetProfileQuery(canQuery ? undefined : skipToken)

  const [updateProfile, { isLoading: isUpdating, error: updateError }] =
    useUpdateProfileMutation()
  const [uploadAvatar, { isLoading: isUploading, error: uploadError }] =
    useUploadAvatarMutation()

  useEffect(() => {
    if (profile) {
      setName(profile.name || '')
      setBio(profile.bio || '')
      setLocation(profile.location || '')
    }
  }, [profile])

  const handleSave = useCallback(async () => {
    try {
      await updateProfile({ name, bio, location }).unwrap()
      setEditing(false)
    } catch {
      /* handled by mutation error state */
    }
  }, [updateProfile, name, bio, location])

  const handleAvatarChange = useCallback(
    async (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0]
      if (!file) return
      const formData = new FormData()
      formData.append('avatar', file)
      try {
        await uploadAvatar(formData).unwrap()
      } catch {
        /* handled by mutation error state */
      }
    },
    [uploadAvatar],
  )

  const apiError =
    (error as { data?: { message?: string } })?.data?.message ||
    (updateError as { data?: { message?: string } })?.data?.message ||
    (uploadError as { data?: { message?: string } })?.data?.message

  if (isLoading || !canQuery) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-emerald-500 border-t-transparent" />
      </div>
    )
  }

  if (isError) {
    return (
      <div className="flex min-h-[60vh] flex-col items-center justify-center gap-4">
        <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-red-50 dark:bg-red-950">
          <svg className="h-7 w-7 text-red-500" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" />
          </svg>
        </div>
        <div className="text-center">
          <p className="font-semibold text-zinc-900 dark:text-white">Failed to load profile</p>
          {apiError && (
            <p className="mt-1 text-sm text-red-600 dark:text-red-400">{apiError}</p>
          )}
        </div>
      </div>
    )
  }

  const baseUrl = process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:5000'
  const avatarUrl = profile?.avatar
    ? profile.avatar.startsWith('http')
      ? profile.avatar
      : `${baseUrl}${profile.avatar}`
    : session?.user?.avatar
      ? session.user.avatar.startsWith('http')
        ? session.user.avatar
        : `${baseUrl}${session.user.avatar}`
      : null

  return (
    <div className="mx-auto max-w-2xl px-4 py-12 sm:px-6 lg:px-8">
      {apiError && (
        <motion.div
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-6 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700 dark:border-red-800 dark:bg-red-950 dark:text-red-400"
        >
          {apiError}
        </motion.div>
      )}

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="overflow-hidden rounded-2xl border border-zinc-200 bg-white dark:border-zinc-800 dark:bg-zinc-900"
      >
        <div className="relative h-32 bg-gradient-to-r from-emerald-400 to-teal-500" />

        <div className="relative px-6 pb-6">
          <div className="flex justify-center sm:justify-start">
            <div className="relative -mt-14">
              <div className="flex h-28 w-28 items-center justify-center overflow-hidden rounded-2xl border-4 border-white bg-zinc-100 dark:border-zinc-900 dark:bg-zinc-800">
                {avatarUrl ? (
                  <div
                    className="h-full w-full bg-cover bg-center"
                    style={{ backgroundImage: `url(${avatarUrl})` }}
                  />
                ) : (
                  <span className="text-3xl font-bold text-zinc-400">
                    {session?.user?.name?.charAt(0)?.toUpperCase()}
                  </span>
                )}
              </div>
              <button
                onClick={() => fileRef.current?.click()}
                disabled={isUploading}
                className="absolute -bottom-1 -right-1 flex h-8 w-8 items-center justify-center rounded-full border-2 border-white bg-emerald-500 text-white shadow-sm transition-colors hover:bg-emerald-600 disabled:opacity-60"
              >
                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6.827 6.175A2.31 2.31 0 015.186 7.23c-.38.054-.757.112-1.134.175C2.999 7.58 2.25 8.507 2.25 9.574V18a2.25 2.25 0 002.25 2.25h15A2.25 2.25 0 0021.75 18V9.574c0-1.067-.75-1.994-1.802-2.169a47.865 47.865 0 00-1.134-.175 2.31 2.31 0 01-1.64-1.055l-.822-1.316a2.192 2.192 0 00-1.736-1.039 48.774 48.774 0 00-5.232 0 2.192 2.192 0 00-1.736 1.039l-.821 1.316z" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 12.75a4.5 4.5 0 11-9 0 4.5 4.5 0 019 0z" />
                </svg>
              </button>
              <input
                ref={fileRef}
                type="file"
                accept="image/*"
                onChange={handleAvatarChange}
                className="hidden"
              />
            </div>
          </div>

          <div className="mt-4 flex items-start justify-between">
            <div className="flex-1">
              {editing ? (
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300">Name</label>
                    <input
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="mt-1 block w-full rounded-xl border border-zinc-200 bg-white px-4 py-2 text-base text-zinc-900 transition-colors focus:border-emerald-400 focus:outline-none focus:ring-2 focus:ring-emerald-100 dark:border-zinc-700 dark:bg-zinc-800 dark:text-white dark:focus:border-emerald-500 dark:focus:ring-emerald-900"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300">Bio</label>
                    <textarea
                      value={bio}
                      onChange={(e) => setBio(e.target.value)}
                      rows={3}
                      className="mt-1 block w-full rounded-xl border border-zinc-200 bg-white px-4 py-2 text-base text-zinc-900 transition-colors focus:border-emerald-400 focus:outline-none focus:ring-2 focus:ring-emerald-100 dark:border-zinc-700 dark:bg-zinc-800 dark:text-white dark:focus:border-emerald-500 dark:focus:ring-emerald-900"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300">Location</label>
                    <input
                      value={location}
                      onChange={(e) => setLocation(e.target.value)}
                      placeholder="e.g. New York, USA"
                      className="mt-1 block w-full rounded-xl border border-zinc-200 bg-white px-4 py-2 text-base text-zinc-900 transition-colors focus:border-emerald-400 focus:outline-none focus:ring-2 focus:ring-emerald-100 dark:border-zinc-700 dark:bg-zinc-800 dark:text-white dark:focus:border-emerald-500 dark:focus:ring-emerald-900"
                    />
                  </div>
                </div>
              ) : (
                <>
                  <h1 className="text-2xl font-bold text-zinc-900 dark:text-white">
                    {profile?.name || session?.user?.name}
                  </h1>
                  {profile?.location && (
                    <p className="mt-1 text-sm text-zinc-500 dark:text-zinc-400">{profile.location}</p>
                  )}
                  {profile?.bio && (
                    <p className="mt-3 text-base leading-6 text-zinc-600 dark:text-zinc-400">{profile.bio}</p>
                  )}
                </>
              )}
            </div>

            {!editing ? (
              <button
                onClick={() => setEditing(true)}
                className="shrink-0 rounded-xl border border-zinc-200 px-4 py-2 text-sm font-medium text-zinc-700 transition-colors hover:bg-zinc-50 dark:border-zinc-700 dark:text-zinc-300 dark:hover:bg-zinc-800"
              >
                Edit profile
              </button>
            ) : null}
          </div>

          {editing && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-6 flex gap-3"
            >
              <button
                onClick={handleSave}
                disabled={isUpdating}
                className="rounded-xl bg-emerald-500 px-6 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-emerald-600 disabled:opacity-60"
              >
                {isUpdating ? 'Saving...' : 'Save'}
              </button>
              <button
                onClick={() => setEditing(false)}
                className="rounded-xl border border-zinc-200 px-6 py-2.5 text-sm font-medium text-zinc-700 transition-colors hover:bg-zinc-50 dark:border-zinc-700 dark:text-zinc-300 dark:hover:bg-zinc-800"
              >
                Cancel
              </button>
            </motion.div>
          )}
        </div>
      </motion.div>
    </div>
  )
}
