'use client'
import React, { createContext, useContext, useState, useEffect } from 'react'
import Lenis from 'lenis'

interface ScrollContextType {
  lenis: Lenis | null
  scrollTo: (target: string | number | HTMLElement, options?: any) => void
}

const ScrollContext = createContext<ScrollContextType>({
  lenis: null,
  scrollTo: () => {},
})

export const useScrollContext = () => useContext(ScrollContext)

export const ScrollProvider = ({ children }: { children: React.ReactNode }) => {
  const [lenis, setLenis] = useState<Lenis | null>(null)

  useEffect(() => {
    const newLenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 2,
    })

    setLenis(newLenis)

    function raf(time: number) {
      newLenis.raf(time)
      requestAnimationFrame(raf)
    }

    requestAnimationFrame(raf)

    return () => {
      newLenis.destroy()
    }
  }, [])

  const scrollTo = (target: string | number | HTMLElement, options?: any) => {
    if (lenis) {
      lenis.scrollTo(target, options)
    } else {
      // Fallback if lenis is not ready (though it should be)
      if (typeof target === 'string') {
        const element = document.querySelector(target)
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' })
        }
      } else if (typeof target === 'number') {
        window.scrollTo({ top: target, behavior: 'smooth' })
      } else if (target instanceof HTMLElement) {
        target.scrollIntoView({ behavior: 'smooth' })
      }
    }
  }

  return (
    <ScrollContext.Provider value={{ lenis, scrollTo }}>
      {children}
    </ScrollContext.Provider>
  )
}
