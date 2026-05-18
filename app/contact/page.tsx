'use client'

import { useForm, SubmitHandler } from 'react-hook-form'
import { motion } from 'framer-motion'

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1 } },
}

const item = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' as const } },
}

const inputClass =
  'mt-1.5 block w-full rounded-xl border border-zinc-200 bg-white px-4 py-3 text-base text-zinc-900 placeholder-zinc-400 transition-colors focus:border-emerald-400 focus:outline-none focus:ring-2 focus:ring-emerald-100 dark:border-zinc-700 dark:bg-zinc-800 dark:text-white dark:placeholder-zinc-500 dark:focus:border-emerald-500 dark:focus:ring-emerald-900'

const labelClass = 'block text-sm font-medium text-zinc-700 dark:text-zinc-300'

type Inputs = {
  name: string
  email: string
  subject: string
  message: string
}

const faqs = [
  { q: 'How does TravelBuddy work?', a: 'Create a profile, browse travel posts, and connect with fellow travelers planning trips to your dream destinations.' },
  { q: 'Is TravelBuddy free to use?', a: 'Yes! Basic membership is completely free. Premium features like AI trip planning are available with a subscription.' },
  { q: 'How do you verify users?', a: 'We use email verification and optional identity checks to ensure our community stays safe and authentic.' },
  { q: 'Can I cancel my trip plans?', a: 'Yes, you can cancel or modify your travel posts at any time from your profile dashboard.' },
]

export default function ContactPage() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<Inputs>()

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    await new Promise((r) => setTimeout(r, 1500))
    console.log(data)
    reset()
    alert('Thank you! Your message has been sent.')
  }

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
            Get in Touch
          </motion.span>

          <motion.h1
            variants={item}
            className="text-4xl font-bold tracking-tight text-zinc-900 sm:text-5xl dark:text-white"
          >
            We Would Love to{' '}
            <span className="bg-gradient-to-r from-emerald-500 to-teal-500 bg-clip-text text-transparent">
              Hear from You
            </span>
          </motion.h1>

          <motion.p
            variants={item}
            className="mt-6 text-lg leading-relaxed text-zinc-600 dark:text-zinc-400"
          >
            Have a question, suggestion, or just want to say hello? Drop us a message and we will
            get back to you as soon as possible.
          </motion.p>
        </motion.div>
      </section>

      <section className="bg-white py-20 dark:bg-black">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto grid max-w-5xl gap-12 lg:grid-cols-2">
            <motion.div
              variants={container}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, margin: '-100px' }}
            >
              <motion.h2 variants={item} className="text-2xl font-bold text-zinc-900 dark:text-white">
                Send Us a Message
              </motion.h2>
              <motion.p variants={item} className="mt-2 text-base text-zinc-600 dark:text-zinc-400">
                Fill out the form and our team will respond within 24 hours.
              </motion.p>

              <motion.form
                variants={item}
                onSubmit={handleSubmit(onSubmit)}
                className="mt-8 space-y-5"
              >
                <div>
                  <label htmlFor="name" className={labelClass}>Full Name</label>
                  <input
                    id="name"
                    type="text"
                    placeholder="John Doe"
                    className={errors.name ? 'mt-1.5 block w-full rounded-xl border border-red-300 bg-white px-4 py-3 text-base text-zinc-900 placeholder-zinc-400 transition-colors focus:border-red-400 focus:outline-none focus:ring-2 focus:ring-red-100 dark:border-red-800 dark:bg-zinc-800 dark:text-white dark:placeholder-zinc-500 dark:focus:border-red-500 dark:focus:ring-red-900' : inputClass}
                    {...register('name', { required: true })}
                  />
                  {errors.name && <span className="mt-1 text-xs text-red-500">This field is required</span>}
                </div>

                <div>
                  <label htmlFor="email" className={labelClass}>Email Address</label>
                  <input
                    id="email"
                    type="email"
                    placeholder="john@example.com"
                    className={errors.email ? 'mt-1.5 block w-full rounded-xl border border-red-300 bg-white px-4 py-3 text-base text-zinc-900 placeholder-zinc-400 transition-colors focus:border-red-400 focus:outline-none focus:ring-2 focus:ring-red-100 dark:border-red-800 dark:bg-zinc-800 dark:text-white dark:placeholder-zinc-500 dark:focus:border-red-500 dark:focus:ring-red-900' : inputClass}
                    {...register('email', { required: true })}
                  />
                  {errors.email && <span className="mt-1 text-xs text-red-500">This field is required</span>}
                </div>

                <div>
                  <label htmlFor="subject" className={labelClass}>Subject</label>
                  <input
                    id="subject"
                    type="text"
                    placeholder="How can we help?"
                    className={errors.subject ? 'mt-1.5 block w-full rounded-xl border border-red-300 bg-white px-4 py-3 text-base text-zinc-900 placeholder-zinc-400 transition-colors focus:border-red-400 focus:outline-none focus:ring-2 focus:ring-red-100 dark:border-red-800 dark:bg-zinc-800 dark:text-white dark:placeholder-zinc-500 dark:focus:border-red-500 dark:focus:ring-red-900' : inputClass}
                    {...register('subject', { required: true })}
                  />
                  {errors.subject && <span className="mt-1 text-xs text-red-500">This field is required</span>}
                </div>

                <div>
                  <label htmlFor="message" className={labelClass}>Message</label>
                  <textarea
                    id="message"
                    rows={5}
                    placeholder="Tell us more about your inquiry..."
                    className={errors.message ? 'mt-1.5 block w-full rounded-xl border border-red-300 bg-white px-4 py-3 text-base text-zinc-900 placeholder-zinc-400 transition-colors focus:border-red-400 focus:outline-none focus:ring-2 focus:ring-red-100 dark:border-red-800 dark:bg-zinc-800 dark:text-white dark:placeholder-zinc-500 dark:focus:border-red-500 dark:focus:ring-red-900' : inputClass}
                    {...register('message', { required: true })}
                  />
                  {errors.message && <span className="mt-1 text-xs text-red-500">This field is required</span>}
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full rounded-xl bg-emerald-500 px-6 py-3 text-sm font-semibold text-white shadow-sm transition-all hover:bg-emerald-600 hover:shadow-md disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? (
                    <span className="flex items-center justify-center gap-2">
                      <span className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                      Sending...
                    </span>
                  ) : (
                    'Send Message'
                  )}
                </button>
              </motion.form>
            </motion.div>

            <motion.div
              variants={container}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, margin: '-100px' }}
              className="space-y-8"
            >
              <motion.div variants={item}>
                <h2 className="text-2xl font-bold text-zinc-900 dark:text-white">
                  Contact Information
                </h2>
                <p className="mt-2 text-base text-zinc-600 dark:text-zinc-400">
                  Here are other ways to reach us.
                </p>
              </motion.div>

              {[
                {
                  label: 'Email Us',
                  value: 'hello@travelbuddy.com',
                  icon: 'M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75',
                },
                {
                  label: 'Call Us',
                  value: '+1 (555) 123-4567',
                  icon: 'M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z',
                },
                {
                  label: 'Visit Us',
                  value: '123 Travel Street, Suite 100, San Francisco, CA 94102',
                  icon: 'M15 10.5a3 3 0 11-6 0 3 3 0 016 0z',
                },
              ].map((info) => (
                <motion.div
                  key={info.label}
                  variants={item}
                  className="flex gap-4 rounded-2xl border border-zinc-200 bg-zinc-50 p-5 dark:border-zinc-800 dark:bg-zinc-900"
                >
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-emerald-100 text-emerald-600 dark:bg-emerald-900 dark:text-emerald-400">
                    <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" d={info.icon} />
                    </svg>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-zinc-500 dark:text-zinc-400">{info.label}</p>
                    <p className="mt-0.5 text-base font-semibold text-zinc-900 dark:text-white">{info.value}</p>
                  </div>
                </motion.div>
              ))}

              <motion.div variants={item} className="rounded-2xl border border-zinc-200 bg-zinc-50 p-5 dark:border-zinc-800 dark:bg-zinc-900">
                <p className="text-sm font-medium text-zinc-500 dark:text-zinc-400">Follow Us</p>
                <div className="mt-3 flex gap-3">
                  {['Twitter', 'Instagram', 'Facebook', 'LinkedIn'].map((platform) => (
                    <span
                      key={platform}
                      className="rounded-lg bg-white px-4 py-2 text-sm font-medium text-zinc-600 shadow-sm transition-colors hover:bg-emerald-50 hover:text-emerald-600 dark:bg-zinc-800 dark:text-zinc-400 dark:hover:bg-emerald-900 dark:hover:text-emerald-300"
                    >
                      {platform}
                    </span>
                  ))}
                </div>
              </motion.div>
            </motion.div>
          </div>
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
              FAQ
            </span>
            <h2 className="text-3xl font-bold tracking-tight text-zinc-900 dark:text-white">
              Frequently Asked Questions
            </h2>
            <p className="mt-4 text-lg text-zinc-600 dark:text-zinc-400">
              Quick answers to common questions. If you need more help, feel free to contact us.
            </p>
          </motion.div>

          <motion.div
            variants={container}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: '-100px' }}
            className="mx-auto mt-16 max-w-3xl space-y-4"
          >
            {faqs.map((faq) => (
              <motion.div
                key={faq.q}
                variants={item}
                className="rounded-2xl border border-zinc-200 bg-white p-6 dark:border-zinc-800 dark:bg-zinc-900"
              >
                <h3 className="font-semibold text-zinc-900 dark:text-white">{faq.q}</h3>
                <p className="mt-2 text-base leading-relaxed text-zinc-600 dark:text-zinc-400">{faq.a}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>
    </div>
  )
}
