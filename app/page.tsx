'use client'
import { useEffect, Suspense } from 'react'
import { useSearchParams } from 'next/navigation'
import Header from './components/Header'
import Work from './components/Work'
import { useScrollContext } from './context/ScrollContext'

function HomeContent() {
  const searchParams = useSearchParams()
  const scrollToParam = searchParams.get('scrollTo')
  const { scrollTo } = useScrollContext()

  // Handle initial scroll based on URL params
  useEffect(() => {
    if (scrollToParam) {
      // Small delay to ensure layout is ready and transition has started
      const timer = setTimeout(() => {
        const targetId = scrollToParam === 'work' ? '#work' : `#${scrollToParam}`
        scrollTo(targetId, { offset: -100 })
      }, 100)
      return () => clearTimeout(timer)
    } else {
      window.scrollTo(0, 0)
    }
  }, [scrollToParam, scrollTo])

  return (
    <main>
      <Header />
      <Work />
    </main>
  )
}

export default function Home() {
  return (
    <Suspense fallback={<main><Header /><Work /></main>}>
      <HomeContent />
    </Suspense>
  )
}