import React from 'react'
import Image from 'next/image'

export function AppFooter() {
  return (
    <footer className="text-center p-4 bg-purple-50 dark:bg-purple-950/50 border-t border-purple-200 dark:border-purple-800">
      <div className="flex flex-col items-center gap-2">
        <div className="flex items-center gap-2">
          <Image 
            src="/third-time-icon-tiny-white.png" 
            alt="Third Time Logo" 
            width={16}
            height={16}
            className="dark:invert-0 invert"
          />
          <span className="font-semibold text-purple-900 dark:text-purple-100">Third Time</span>
        </div>
        <p className="text-xs text-purple-700 dark:text-purple-300 font-medium">
              © 2025 Third Time. All rights reserved.
        </p>
        <p className="text-xs text-purple-600 dark:text-purple-400">
            Professional Solana Portfolio Management & Analytics
        </p>
      </div>
    </footer>
  )
}
