'use client'

import { useForm, SubmitHandler } from 'react-hook-form'
import { motion } from 'framer-motion'
import { useRouter } from 'next/navigation'
import { useCreatePostMutation } from '@/lib/api'

const container = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.06 },
  },
}

const item = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0, transition: { duration: 0.35, ease: 'easeOut' as const } },
}

const inputClass =
  'mt-1.5 block w-full rounded-xl border border-zinc-200 bg-white px-4 py-2.5 text-base text-zinc-900 placeholder-zinc-400 transition-colors focus:border-emerald-400 focus:outline-none focus:ring-2 focus:ring-emerald-100 dark:border-zinc-700 dark:bg-zinc-800 dark:text-white dark:placeholder-zinc-500 dark:focus:border-emerald-500 dark:focus:ring-emerald-900'

const invalidInputClass =
  'mt-1.5 block w-full rounded-xl border border-red-300 bg-white px-4 py-2.5 text-base text-zinc-900 placeholder-zinc-400 transition-colors focus:border-red-400 focus:outline-none focus:ring-2 focus:ring-red-100 dark:border-red-800 dark:bg-zinc-800 dark:text-white dark:placeholder-zinc-500 dark:focus:border-red-500 dark:focus:ring-red-900'

const labelClass = 'block text-sm font-medium text-zinc-700 dark:text-zinc-300'

type Inputs = {
  title: string
  destination: string
  travelDate: string
  budget: string
  description: string
  peopleNeeded: string
  tags: string
  image: FileList
}

export default function CreatePostSection() {
  const router = useRouter()
  const [createPost, { isLoading }] = useCreatePostMutation()

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    setError,
    formState: { errors },
  } = useForm<Inputs>()

  const imageFile = watch('image')
  const preview = imageFile?.[0] ? URL.createObjectURL(imageFile[0]) : null

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    const file = data.image?.[0]
    if (!file) {
      setError('image', { message: 'Please select an image for your post.' })
      return
    }

    const tags = data.tags
      .split(',')
      .map((t) => t.trim())
      .filter(Boolean)

    const formData = new FormData()
    formData.append('image', file)
    formData.append('title', data.title)
    formData.append('destination', data.destination)
    formData.append('travelDate', data.travelDate)
    formData.append('budget', data.budget)
    formData.append('description', data.description)
    formData.append('peopleNeeded', data.peopleNeeded)
    tags.forEach((t) => formData.append('tags', t))

    try {
      await createPost(formData).unwrap()
      router.push('/feed')
      router.refresh()
    } catch (err) {
      const rtqErr = err as { data?: { message?: string } }
      setError('root', {
        message: rtqErr?.data?.message || 'Failed to create post. Please try again.',
      })
    }
  }

  function removeImage() {
    setValue('image', undefined as unknown as FileList)
  }

  return (
    <div className="flex min-h-[60vh] items-start justify-center bg-zinc-50 px-4 py-12 dark:bg-zinc-950">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: 'easeOut' as const }}
        className="w-full max-w-3xl"
      >
        <div className="rounded-2xl border border-zinc-200 bg-white p-8 shadow-sm dark:border-zinc-800 dark:bg-zinc-900">
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8"
          >
            <h1 className="text-2xl font-bold tracking-tight text-zinc-900 dark:text-white">
              Create Trip Post
            </h1>
            <p className="mt-1 text-base text-zinc-600 dark:text-zinc-400">
              Share your travel plan and find travel companions.
            </p>
          </motion.div>

          {errors.root && (
            <motion.div
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-6 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700 dark:border-red-800 dark:bg-red-950 dark:text-red-400"
            >
              {errors.root.message}
            </motion.div>
          )}

          <motion.form
            variants={container}
            initial="hidden"
            animate="show"
            onSubmit={handleSubmit(onSubmit)}
            className="space-y-6"
          >
            <motion.div variants={item}>
              <label className={labelClass}>Photo</label>
              {preview ? (
                <div className="relative mt-1.5 overflow-hidden rounded-xl">
                  <img
                    src={preview}
                    alt="Preview"
                    className="h-72 w-full object-cover"
                  />
                  <button
                    type="button"
                    onClick={removeImage}
                    className="absolute right-3 top-3 flex h-8 w-8 items-center justify-center rounded-full bg-black/50 text-white backdrop-blur-sm transition-colors hover:bg-black/70"
                  >
                    <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
              ) : (
                <label className="mt-1.5 flex cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed border-zinc-300 bg-zinc-50 px-6 py-10 transition-colors hover:border-emerald-400 hover:bg-emerald-50/30 dark:border-zinc-700 dark:bg-zinc-800/50 dark:hover:border-emerald-600 dark:hover:bg-emerald-950/20">
                  <svg className="mb-3 h-10 w-10 text-zinc-400" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909M3.75 21h16.5A2.25 2.25 0 0022.5 18.75V5.25A2.25 2.25 0 0020.25 3H3.75A2.25 2.25 0 001.5 5.25v13.5A2.25 2.25 0 003.75 21z" />
                  </svg>
                  <p className="text-sm font-medium text-zinc-600 dark:text-zinc-400">
                    Click to upload
                  </p>
                  <p className="mt-1 text-xs text-zinc-400 dark:text-zinc-500">
                    PNG, JPG or WebP (max 10MB)
                  </p>
                  <input
                    type="file"
                    accept="image/png,image/jpeg,image/webp"
                    className="hidden"
                    {...register('image', { required: 'Image is required' })}
                  />
                </label>
              )}
              {errors.image && (
                <p className="mt-1 text-xs text-red-500">{errors.image.message}</p>
              )}
            </motion.div>

            <div className="grid gap-6 sm:grid-cols-2">
              <motion.div variants={item}>
                <label htmlFor="title" className={labelClass}>Title</label>
                <input
                  id="title"
                  type="text"
                  placeholder="e.g. Weekend Trip to Bali"
                  className={errors.title ? invalidInputClass : inputClass}
                  {...register('title', { required: true })}
                />
                {errors.title && <span className="mt-1 text-xs text-red-500">This field is required</span>}
              </motion.div>

              <motion.div variants={item}>
                <label htmlFor="destination" className={labelClass}>Destination</label>
                <input
                  id="destination"
                  type="text"
                  placeholder="e.g. Bali, Indonesia"
                  className={errors.destination ? invalidInputClass : inputClass}
                  {...register('destination', { required: true })}
                />
                {errors.destination && <span className="mt-1 text-xs text-red-500">This field is required</span>}
              </motion.div>
            </div>

            <div className="grid gap-6 sm:grid-cols-2">
              <motion.div variants={item}>
                <label htmlFor="travelDate" className={labelClass}>Travel Date</label>
                <input
                  id="travelDate"
                  type="date"
                  className={errors.travelDate ? invalidInputClass : inputClass}
                  {...register('travelDate', { required: true })}
                />
                {errors.travelDate && <span className="mt-1 text-xs text-red-500">This field is required</span>}
              </motion.div>

              <motion.div variants={item}>
                <label htmlFor="budget" className={labelClass}>Budget ($)</label>
                <input
                  id="budget"
                  type="number"
                  placeholder="e.g. 500"
                  className={errors.budget ? invalidInputClass : inputClass}
                  {...register('budget', { required: true, min: 0 })}
                />
                {errors.budget && <span className="mt-1 text-xs text-red-500">This field is required</span>}
              </motion.div>
            </div>

            <motion.div variants={item}>
              <label htmlFor="description" className={labelClass}>Description</label>
              <textarea
                id="description"
                rows={4}
                placeholder="Tell us about your travel plan, itinerary, and what you're looking for in companions..."
                className={errors.description ? invalidInputClass : inputClass}
                {...register('description', { required: true })}
              />
              {errors.description && <span className="mt-1 text-xs text-red-500">This field is required</span>}
            </motion.div>

            <div className="grid gap-6 sm:grid-cols-2">
              <motion.div variants={item}>
                <label htmlFor="peopleNeeded" className={labelClass}>People Needed</label>
                <input
                  id="peopleNeeded"
                  type="number"
                  placeholder="e.g. 3"
                  className={errors.peopleNeeded ? invalidInputClass : inputClass}
                  {...register('peopleNeeded', { required: true, min: 1 })}
                />
                {errors.peopleNeeded && <span className="mt-1 text-xs text-red-500">This field is required</span>}
              </motion.div>

              <motion.div variants={item}>
                <label htmlFor="tags" className={labelClass}>Tags</label>
                <input
                  id="tags"
                  type="text"
                  placeholder="hiking, beach, adventure"
                  className={inputClass}
                  {...register('tags')}
                />
              </motion.div>
            </div>

            <motion.div variants={item} className="flex items-center gap-3 pt-2">
              <button
                type="submit"
                disabled={isLoading}
                className="rounded-xl bg-emerald-500 px-8 py-2.5 text-sm font-semibold text-white shadow-sm transition-all hover:bg-emerald-600 hover:shadow-md disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {isLoading ? (
                  <span className="flex items-center gap-2">
                    <span className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                    Posting...
                  </span>
                ) : (
                  'Share Post'
                )}
              </button>
              <button
                type="button"
                onClick={() => router.back()}
                className="rounded-xl border border-zinc-200 px-6 py-2.5 text-sm font-medium text-zinc-700 transition-colors hover:bg-zinc-50 dark:border-zinc-700 dark:text-zinc-300 dark:hover:bg-zinc-800"
              >
                Cancel
              </button>
            </motion.div>
          </motion.form>
        </div>
      </motion.div>
    </div>
  )
}
