'use client'

import { useState, useEffect } from 'react'
import { useWalletUi } from '@wallet-ui/react'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

interface PortfolioData {
  balance: number
  tokens: TokenInfo[]
  totalValue: number
}

interface TokenInfo {
  mint: string
  amount: string
  decimals: number
  symbol?: string
}

export function PortfolioDashboard() {
  const { account, cluster } = useWalletUi()
  const [portfolio, setPortfolio] = useState<PortfolioData>({
    balance: 0,
    tokens: [],
    totalValue: 0,
  })
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string>('')

  useEffect(() => {
    if (account) {
      fetchPortfolioData()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [account])

  const fetchPortfolioData = async () => {
    if (!account) return

    setIsLoading(true)
    setError('')
    try {
      const mockData = {
        balance: 2500000000,
        tokens: [
          { mint: 'EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v', amount: '1000000', decimals: 6, symbol: 'USDC' },
          { mint: 'Es9vMFrzaCERmJfrF4H2FYD4KCoNkY11McCe8BenwNYB', amount: '500000000', decimals: 6, symbol: 'USDT' },
        ],
      }

      setPortfolio(prev => ({
        ...prev,
        balance: mockData.balance / 1_000_000, // Convert lamports to SOL
        tokens: mockData.tokens.map(token => ({
          ...token,
          amount: (parseFloat(token.amount) / Math.pow(10, token.decimals)).toFixed(2),
        })),
      }))
    } catch {
      setError('Failed to fetch portfolio data')
    }
    setIsLoading(false)
  }

  const calculateTotalValue = () => {
    // For now, just sum token values as numbers (mock, not real USD)
    return portfolio.tokens.reduce((total, token) => {
      return total + parseFloat(token.amount)
    }, 0)
  }

  const formatBalance = (balance: number) => {
    return balance.toFixed(2)
  }

  if (!account) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center p-4 sm:p-6 lg:p-8">
        <div className="max-w-md mx-auto text-center space-y-4 sm:space-y-6">
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 mb-6 sm:mb-8">
            <div className="p-2 bg-purple-100 dark:bg-purple-900/30 rounded-lg">
              <Image 
                src="/third-time-icon-tiny-white.png" 
                alt="Third Time Logo" 
                width={40} 
                height={40}
                className="dark:invert-0 invert"
              />
            </div>
            <div className="text-center sm:text-left">
              <h1 className="text-2xl sm:text-3xl font-bold text-purple-900 dark:text-purple-100">Third Time</h1>
              <p className="text-sm text-purple-600 dark:text-purple-300 font-medium">Portfolio Dashboard</p>
            </div>
          </div>
          
          <div className="bg-gradient-to-r from-purple-50 to-violet-50 dark:from-purple-950/50 dark:to-violet-950/50 p-6 sm:p-8 rounded-xl border border-purple-200 dark:border-purple-700 shadow-lg">
            <div className="w-14 h-14 sm:w-16 sm:h-16 mx-auto mb-4 bg-purple-100 dark:bg-purple-800/50 rounded-full flex items-center justify-center">
              <span className="text-xl sm:text-2xl">🔗</span>
            </div>
            <h2 className="text-lg sm:text-xl font-semibold text-purple-900 dark:text-purple-100 mb-2">Connect Your Wallet</h2>
            <p className="text-sm sm:text-base text-purple-700 dark:text-purple-300 leading-relaxed">
              Please connect your Solana wallet to access your cryptocurrency portfolio and view real-time balances.
            </p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="p-4 sm:p-6 max-w-7xl mx-auto">
      <div className="flex flex-col sm:flex-row items-center sm:items-start gap-3 mb-6 sm:mb-8">
        <div className="p-2 bg-purple-100 dark:bg-purple-900/30 rounded-lg flex-shrink-0">
          <Image 
            src="/third-time-icon-tiny-white.png" 
            alt="Third Time Logo" 
            width={32} 
            height={32}
            className="dark:invert-0 invert"
          />
        </div>
        <div className="text-center sm:text-left">
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-purple-900 dark:text-purple-100">Third Time Portfolio</h1>
          <p className="text-base sm:text-lg text-purple-600 dark:text-purple-300 font-medium">Professional Cryptocurrency Asset Management</p>
        </div>
      </div>

      {error && (
        <div className="bg-red-50 dark:bg-red-950/30 border border-red-300 dark:border-red-700 text-red-800 dark:text-red-200 px-4 sm:px-6 py-3 sm:py-4 rounded-lg mb-4 sm:mb-6 shadow-sm">
          <div className="flex items-center gap-2">
            <span className="text-base sm:text-lg flex-shrink-0">⚠️</span>
            <span className="font-medium text-sm sm:text-base">{error}</span>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
        <Card className="border-purple-200 dark:border-purple-700 bg-gradient-to-br from-purple-50 to-violet-50 dark:from-purple-950/50 dark:to-violet-950/50 shadow-lg hover:shadow-xl transition-shadow duration-300">
          <CardHeader className="pb-2 sm:pb-3">
            <CardTitle className="text-lg sm:text-xl font-semibold text-purple-800 dark:text-purple-200 flex items-center gap-2">
              <div className="w-7 h-7 sm:w-8 sm:h-8 bg-purple-100 dark:bg-purple-800/50 rounded-lg flex items-center justify-center flex-shrink-0">
                <span className="text-base sm:text-lg">⚡</span>
              </div>
              <span className="truncate">SOL Balance</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-0">
            {isLoading ? (
              <div className="flex items-center gap-2 text-purple-600 dark:text-purple-300">
                <div className="w-4 h-4 border-2 border-purple-600 border-t-transparent rounded-full animate-spin flex-shrink-0"></div>
                <span className="text-base sm:text-lg font-medium">Loading balance...</span>
              </div>
            ) : (
              <div className="space-y-2 sm:space-y-3">
                <div>
                  <p className="text-2xl sm:text-3xl lg:text-4xl font-bold text-purple-900 dark:text-purple-100">
                    {formatBalance(portfolio.balance)}
                    <span className="text-lg sm:text-xl lg:text-2xl font-semibold text-purple-600 dark:text-purple-300 ml-1 sm:ml-2">SOL</span>
                  </p>
                </div>
                <div className="flex items-center gap-2 text-purple-600 dark:text-purple-400">
                  <div className="w-2 h-2 bg-green-500 rounded-full flex-shrink-0"></div>
                  <span className="text-xs sm:text-sm font-medium truncate">Network: {cluster.label}</span>
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        <Card className="border-purple-200 dark:border-purple-700 bg-gradient-to-br from-violet-50 to-purple-50 dark:from-violet-950/50 dark:to-purple-950/50 shadow-lg hover:shadow-xl transition-shadow duration-300 md:col-span-2 lg:col-span-1">
          <CardHeader className="pb-2 sm:pb-3">
            <CardTitle className="text-lg sm:text-xl font-semibold text-violet-800 dark:text-violet-200 flex items-center gap-2">
              <div className="w-7 h-7 sm:w-8 sm:h-8 bg-violet-100 dark:bg-violet-800/50 rounded-lg flex items-center justify-center flex-shrink-0">
                <span className="text-base sm:text-lg">🪙</span>
              </div>
              <span className="truncate">Token Holdings</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-0">
            {portfolio.tokens.length === 0 ? (
              <div className="text-center py-6 sm:py-8">
                <div className="w-12 h-12 sm:w-16 sm:h-16 mx-auto mb-3 sm:mb-4 bg-violet-100 dark:bg-violet-800/50 rounded-full flex items-center justify-center">
                  <span className="text-xl sm:text-2xl">💰</span>
                </div>
                <p className="text-violet-600 dark:text-violet-300 font-medium text-sm sm:text-base">No tokens found</p>
                <p className="text-xs sm:text-sm text-violet-500 dark:text-violet-400">Your token holdings will appear here</p>
              </div>
            ) : (
              <div className="space-y-3 sm:space-y-4">
                {portfolio.tokens.map((token, index) => (
                  <div key={index} className="flex justify-between items-center p-2 sm:p-3 bg-white/50 dark:bg-violet-900/20 rounded-lg border border-violet-200 dark:border-violet-700">
                    <div className="flex-1 min-w-0 pr-2">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-base sm:text-lg font-semibold text-violet-900 dark:text-violet-100 truncate">
                          {token.symbol || 'Unknown Token'}
                        </span>
                        <span className="px-2 py-1 bg-violet-100 dark:bg-violet-800/50 text-violet-700 dark:text-violet-300 text-xs font-medium rounded-full flex-shrink-0">
                          Token
                        </span>
                      </div>
                      <p className="text-xs text-violet-600 dark:text-violet-400 font-mono truncate">
                        {token.mint}
                      </p>
                    </div>
                    <div className="text-right flex-shrink-0">
                      <span className="text-base sm:text-lg font-bold text-violet-900 dark:text-violet-100">
                        {token.amount}
                      </span>
                      <p className="text-xs text-violet-600 dark:text-violet-400">tokens</p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        <Card className="border-purple-200 dark:border-purple-700 bg-gradient-to-br from-purple-50 to-indigo-50 dark:from-purple-950/50 dark:to-indigo-950/50 shadow-lg hover:shadow-xl transition-shadow duration-300">
          <CardHeader className="pb-2 sm:pb-3">
            <CardTitle className="text-lg sm:text-xl font-semibold text-indigo-800 dark:text-indigo-200 flex items-center gap-2">
              <div className="w-7 h-7 sm:w-8 sm:h-8 bg-indigo-100 dark:bg-indigo-800/50 rounded-lg flex items-center justify-center flex-shrink-0">
                <span className="text-base sm:text-lg">📊</span>
              </div>
              <span className="truncate">Portfolio Value</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-0 space-y-4 sm:space-y-6">
            <div>
              <p className="text-2xl sm:text-3xl lg:text-4xl font-bold text-indigo-900 dark:text-indigo-100">
                ${calculateTotalValue().toFixed(2)}
                <span className="text-lg sm:text-xl lg:text-2xl font-semibold text-indigo-600 dark:text-indigo-300 ml-1 sm:ml-2">USD</span>
              </p>
              <p className="text-xs sm:text-sm text-indigo-600 dark:text-indigo-400 mt-1">
                *Mock valuation for demonstration
              </p>
            </div>
            
            <Button
              onClick={fetchPortfolioData}
              disabled={isLoading}
              className="w-full bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white font-semibold py-2.5 sm:py-3 px-4 sm:px-6 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed text-sm sm:text-base"
            >
              {isLoading ? (
                <div className="flex items-center justify-center gap-2">
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin flex-shrink-0"></div>
                  <span>Refreshing...</span>
                </div>
              ) : (
                <div className="flex items-center justify-center gap-2">
                  <span>🔄</span>
                  <span>Refresh Portfolio</span>
                </div>
              )}
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
