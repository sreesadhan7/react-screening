'use client'

import React, { Component, ReactNode } from 'react'
import { AppAlert } from './app-alert'
import { Button } from './ui/button'

interface Props {
  children: ReactNode
  fallback?: ReactNode
}

interface State {
  hasError: boolean
  error: Error | null
}

export class WalletErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props)
    this.state = { hasError: false, error: null }
  }

  static getDerivedStateFromError(error: Error): State {
    // Check if this is a wallet extension communication error
    const isExtensionError = 
      error.message.includes('message channel closed') ||
      error.message.includes('listener indicated an asynchronous response') ||
      error.message.includes('Extension context invalidated') ||
      error.message.includes('Could not establish connection')

    if (isExtensionError) {
      // Don't show error boundary for extension communication issues
      return { hasError: false, error: null }
    }

    return { hasError: true, error }
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    // Log actual application errors, not extension communication errors
    const isExtensionError = 
      error.message.includes('message channel closed') ||
      error.message.includes('listener indicated an asynchronous response') ||
      error.message.includes('Extension context invalidated') ||
      error.message.includes('Could not establish connection')

    if (!isExtensionError) {
      console.error('Application Error:', error, errorInfo)
    }
  }

  render() {
    if (this.state.hasError && this.state.error) {
      return this.props.fallback || (
        <AppAlert
          action={
            <Button 
              variant="outline" 
              onClick={() => this.setState({ hasError: false, error: null })}
            >
              Try Again
            </Button>
          }
        >
          Something went wrong. Please refresh the page or try again.
        </AppAlert>
      )
    }

    return this.props.children
  }
}
