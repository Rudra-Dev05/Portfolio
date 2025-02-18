"use client"
import { Suspense } from 'react'
import dynamic from 'next/dynamic'
import { useState, useEffect } from 'react'

// Add LoadingScreen import
const LoadingScreen = dynamic(() => import('./components/LoadingScreen'))

// Dynamic imports with loading fallbacks
const Navbar = dynamic(() => import('./components/Navbar'), {
  ssr: true,
  loading: () => <div className="h-16" /> // Navbar height placeholder
})

const Header = dynamic(() => import('./components/Header'), {
  ssr: true,
  loading: () => <div className="min-h-screen animate-pulse bg-gray-100 dark:bg-gray-900" />
})

const About = dynamic(() => import('./components/About'), {
  loading: () => <div className="min-h-[600px] animate-pulse bg-gray-50 dark:bg-gray-950" />
})

const Work = dynamic(() => import('./components/Work'), {
  loading: () => <div className="min-h-[600px] animate-pulse bg-gray-100 dark:bg-gray-900" />
})

const Contact = dynamic(() => import('./components/Contact'))
const Footer = dynamic(() => import('./components/Footer'))

export default function Home() {
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Simulate loading time
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 3000)

    return () => clearTimeout(timer)
  }, [])

  return (
    <>
      {isLoading ? (
        <LoadingScreen />
      ) : (
        <main>
          <Suspense fallback={<div className="h-16" />}>
            <Navbar />
          </Suspense>
          
          <Suspense fallback={<div className="min-h-screen animate-pulse" />}>
            <Header />
          </Suspense>
          
          <Suspense fallback={<div className="min-h-[600px] animate-pulse" />}>
            <About />
          </Suspense>
          
          <Suspense fallback={<div className="min-h-[600px] animate-pulse" />}>
            <Work />
          </Suspense>
          
          <Suspense>
            <Contact />
          </Suspense>
          
          <Suspense>
            <Footer />
          </Suspense>
        </main>
      )}
    </>
  )
}
