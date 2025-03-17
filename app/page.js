'use client'
import { useEffect } from 'react'
import Header from './components/Header'
import Work from './components/Work'

export default function Home() {
  // Scroll to top when page loads
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])
  
  return (
    <main>
      <Header />
      <Work />
    </main>
  )
} 