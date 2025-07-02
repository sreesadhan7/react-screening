'use client'

import { useEffect } from 'react'

export function GlobalErrorHandler() {
  useEffect(() => {
    // Handle unhandled promise rejections from wallet extensions
    const handleUnhandledRejection = (event: PromiseRejectionEvent) => {
      const error = event.reason
      
      // Check if this is a common wallet extension communication error
      const isExtensionError = 
        typeof error === 'object' && 
        error !== null && 
        'message' in error &&
        typeof error.message === 'string' && (
          error.message.includes('message channel closed') ||
          error.message.includes('listener indicated an asynchronous response') ||
          error.message.includes('Extension context invalidated') ||
          error.message.includes('Could not establish connection') ||
          error.message.includes('The message port closed before a response was received')
        )

      if (isExtensionError) {
        // Prevent the error from showing in console for extension communication issues
        event.preventDefault()
        return
      }
      
      // Let other errors through normally
    }

    // Handle general errors from wallet extensions
    const handleError = (event: ErrorEvent) => {
      const error = event.error
      
      const isExtensionError = 
        error && 
        typeof error.message === 'string' && (
          error.message.includes('message channel closed') ||
          error.message.includes('listener indicated an asynchronous response') ||
          error.message.includes('Extension context invalidated') ||
          error.message.includes('Could not establish connection')
        )

      if (isExtensionError) {
        event.preventDefault()
        return
      }
    }

    window.addEventListener('unhandledrejection', handleUnhandledRejection)
    window.addEventListener('error', handleError)
    
    return () => {
      window.removeEventListener('unhandledrejection', handleUnhandledRejection)
      window.removeEventListener('error', handleError)
    }
  }, [])

  return null // This component doesn't render anything
}
