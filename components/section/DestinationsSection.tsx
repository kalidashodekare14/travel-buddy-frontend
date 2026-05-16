'use client'

import { motion } from 'framer-motion'

const destinations = [
  { name: 'Bali, Indonesia', image: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?q=80&w=400&h=500&fit=crop', travelers: 24 },
  { name: 'Paris, France', image: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?q=80&w=400&h=500&fit=crop', travelers: 18 },
  { name: 'Tokyo, Japan', image: 'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?q=80&w=400&h=500&fit=crop', travelers: 31 },
  { name: 'Santorini, Greece', image: 'https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?q=80&w=400&h=500&fit=crop', travelers: 15 },
]

const container = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.12 },
  },
}

const item = {
  hidden: { opacity: 0, y: 40 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' as const } },
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
          <h2 className="text-3xl font-bold tracking-tight text-zinc-900 sm:text-4xl dark:text-white">
            Popular Destinations
          </h2>
          <p className="mt-4 text-lg text-zinc-600 dark:text-zinc-400">
            Join fellow travelers heading to these amazing places.
          </p>
        </motion.div>
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-100px' }}
          className="mx-auto mt-16 grid max-w-5xl gap-6 sm:grid-cols-2 lg:grid-cols-4"
        >
          {destinations.map((dest) => (
            <motion.div
              key={dest.name}
              variants={item}
              className="group relative overflow-hidden rounded-2xl"
            >
              <div
                className="h-72 bg-cover bg-center transition-transform duration-300 group-hover:scale-105"
                style={{ backgroundImage: `url(${dest.image})` }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
              <div className="absolute bottom-0 p-5">
                <h3 className="text-lg font-semibold text-white">{dest.name}</h3>
                <p className="mt-1 text-sm text-zinc-300">
                  {dest.travelers} travelers looking
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
