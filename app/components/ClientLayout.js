'use client'

import { useState, useEffect } from 'react'
import { AnimatePresence } from 'framer-motion'
import LoadingScreen from './LoadingScreen'
import TransitionProvider from './TransitionProvider'

export default function ClientLayout({ children }) {
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 2000)

    return () => clearTimeout(timer)
  }, [])

  return (
    <AnimatePresence mode="wait">
      {isLoading ? (
        <LoadingScreen />
      ) : (
        <TransitionProvider>
          {children}
        </TransitionProvider>
      )}
    </AnimatePresence>
  )
}