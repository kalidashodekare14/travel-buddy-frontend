import Link from 'next/link'

const quickLinks = [
  { label: 'Home', href: '/' },
  { label: 'Explore', href: '/feed' },
  { label: 'Create Post', href: '/create-post' },
  { label: 'Chat', href: '/chat' },
]

const supportLinks = [
  { label: 'Help Center', href: '#' },
  { label: 'Safety Tips', href: '#' },
  { label: 'Privacy Policy', href: '#' },
  { label: 'Terms of Service', href: '#' },
]

export default function Footer() {
  return (
    <footer className="border-t border-zinc-200 bg-white dark:border-zinc-800 dark:bg-black">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          <div className="sm:col-span-2 lg:col-span-2">
            <Link href="/" className="flex items-center gap-2 text-xl font-bold tracking-tight text-zinc-900 dark:text-white">
              <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-500 text-sm font-bold text-white">
                T
              </span>
              TravelBuddy
            </Link>
            <p className="mt-3 max-w-sm text-base leading-6 text-zinc-600 dark:text-zinc-400">
              Connect with like-minded travelers, share adventures, and explore the world together. Your next journey starts here.
            </p>
          </div>
          <div>
            <h3 className="text-sm font-semibold text-zinc-900 dark:text-white">Quick Links</h3>
            <ul className="mt-4 space-y-3">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-base text-zinc-600 transition-colors hover:text-emerald-500 dark:text-zinc-400 dark:hover:text-emerald-400"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="text-sm font-semibold text-zinc-900 dark:text-white">Support</h3>
            <ul className="mt-4 space-y-3">
              {supportLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-base text-zinc-600 transition-colors hover:text-emerald-500 dark:text-zinc-400 dark:hover:text-emerald-400"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="mt-10 flex flex-col items-center justify-between gap-4 border-t border-zinc-200 pt-8 sm:flex-row dark:border-zinc-800">
          <p className="text-sm text-zinc-500 dark:text-zinc-500">
            &copy; {new Date().getFullYear()} TravelBuddy. All rights reserved.
          </p>
          <div className="flex gap-6">
            {['Twitter', 'Instagram', 'Facebook'].map((social) => (
              <Link
                key={social}
                href="#"
                className="text-sm text-zinc-500 transition-colors hover:text-emerald-500 dark:text-zinc-500 dark:hover:text-emerald-400"
              >
                {social}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}
