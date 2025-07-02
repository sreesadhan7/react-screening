'use client'
import { usePathname } from 'next/navigation'
import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { Menu, X } from 'lucide-react'
import { ThemeSelect } from '@/components/theme-select'
import { ClusterButton, WalletButton } from '@/components/solana/solana-provider'

export function AppHeader({ links = [] }: { links: { label: string; path: string }[] }) {
  const pathname = usePathname()
  const [showMenu, setShowMenu] = useState(false)

  function isActive(path: string) {
    return path === '/' ? pathname === '/' : pathname.startsWith(path)
  }

  return (
    <header className="relative z-50 px-4 sm:px-6 py-3 sm:py-4 bg-gradient-to-r from-purple-50 to-violet-50 dark:from-purple-950/50 dark:to-violet-950/50 border-b border-purple-200 dark:border-purple-800 shadow-sm">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <div className="flex items-center gap-2 sm:gap-4">
          <Link className="flex items-center gap-2 sm:gap-3 hover:opacity-80 transition-all duration-300 group" href="/">
            <div className="p-1.5 sm:p-2 bg-purple-100 dark:bg-purple-900/50 rounded-lg group-hover:scale-105 transition-transform duration-300">
              <Image 
                src="/third-time-icon-tiny-white.png" 
                alt="Third Time Logo" 
                width={24} 
                height={24}
                className="dark:invert-0 invert sm:w-7 sm:h-7"
              />
            </div>
            <div className="flex flex-col">
              <span className="text-lg sm:text-2xl font-bold text-purple-900 dark:text-purple-100">Third Time</span>
              <span className="text-xs sm:text-sm text-purple-600 dark:text-purple-300 font-medium hidden sm:block">Portfolio Dashboard</span>
            </div>
          </Link>
          <div className="hidden md:flex items-center ml-4 lg:ml-8">
            <ul className="flex gap-4 lg:gap-6 flex-nowrap items-center">{links.map(({ label, path }) => (
                <li key={path}>
                  <Link
                    className={`hover:text-purple-600 dark:hover:text-purple-300 transition-colors duration-200 px-2 lg:px-3 py-2 rounded-lg font-medium text-sm lg:text-base ${isActive(path) ? 'text-purple-700 dark:text-purple-200 bg-purple-100 dark:bg-purple-900/50' : 'text-purple-800 dark:text-purple-400'}`}
                    href={path}
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <Button variant="ghost" size="icon" className="md:hidden p-2" onClick={() => setShowMenu(!showMenu)}>
          {showMenu ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </Button>

        <div className="hidden md:flex items-center gap-2 lg:gap-3">
          <WalletButton size="sm" />
          <ClusterButton size="sm" />
          <ThemeSelect />
        </div>

        {showMenu && (
          <div className="md:hidden fixed inset-x-0 top-[64px] bottom-0 bg-purple-50/95 dark:bg-purple-950/95 backdrop-blur-sm">
            <div className="flex flex-col p-4 gap-4 border-t border-purple-200 dark:border-purple-800 h-full overflow-y-auto">
              <ul className="flex flex-col gap-3">
                {links.map(({ label, path }) => (
                  <li key={path}>
                    <Link
                      className={`hover:text-purple-600 dark:hover:text-purple-300 block text-base py-3 px-4 rounded-lg transition-colors ${isActive(path) ? 'text-purple-700 dark:text-purple-200 font-semibold bg-purple-100 dark:bg-purple-900/50' : 'text-purple-800 dark:text-purple-400'} `}
                      href={path}
                      onClick={() => setShowMenu(false)}
                    >
                      {label}
                    </Link>
                  </li>
                ))}
              </ul>
              <div className="flex flex-col gap-3 mt-4">
                <WalletButton />
                <ClusterButton />
                <div className="flex justify-center">
                  <ThemeSelect />
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  )
}
