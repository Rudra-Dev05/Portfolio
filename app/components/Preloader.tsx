'use client'
import React, { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const Preloader = () => {
  const [count, setCount] = useState(0)
  const [isLoading, setIsLoading] = useState(true)
  const [showInk, setShowInk] = useState(false)

  // Generate 10 columns for the ink effect
  const columns = Array.from({ length: 10 })

  useEffect(() => {
    const duration = 1500 // 1.5 seconds loading time
    const interval = 20 // Update every 20ms
    const steps = duration / interval
    const increment = 100 / steps

    const timer = setInterval(() => {
      setCount((prev) => {
        const next = prev + increment
        if (next >= 100) {
          clearInterval(timer)
          // Start ink effect slightly before removing the loader completely
          setTimeout(() => setShowInk(true), 200)
          setTimeout(() => setIsLoading(false), 1200) // Allow time for ink animation
          return 100
        }
        return next
      })
    }, interval)

    return () => clearInterval(timer)
  }, [])

  return (
    <AnimatePresence mode="wait">
      {isLoading && (
        <>
          {/* Main Loading Screen */}
          <motion.div
            key="loader"
            className="fixed inset-0 z-[9999] flex items-center justify-center bg-white dark:bg-black"
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }} // Fade out content while ink takes over
          >
            <div className="relative w-full h-full flex items-center justify-center overflow-hidden px-4">
              {/* Background decorative text */}
              <div className="absolute inset-0 flex items-center justify-center opacity-[0.03] pointer-events-none select-none overflow-hidden">
                <div className="text-[20vw] font-bodoni font-bold uppercase whitespace-nowrap leading-none text-black dark:text-white">
                  Portfolio
                </div>
              </div>

              {/* Main Counter */}
              <div className="relative z-10 flex flex-col items-center">
                <div className="flex items-baseline gap-2">
                  <span className="text-sm md:text-base font-medium font-unbounded tracking-widest text-black dark:text-white uppercase">
                    Loading
                  </span>
                  <span className="text-sm md:text-base font-medium font-unbounded tracking-widest text-black dark:text-white">
                    —
                  </span>
                  <div className="w-12 text-right">
                    <span className="text-sm md:text-base font-medium font-unbounded tracking-widest text-black dark:text-white">
                      {Math.round(count)}%
                    </span>
                  </div>
                </div>
                
                {/* Progress Bar */}
                <div className="mt-4 w-64 h-[2px] bg-black/10 dark:bg-white/10 overflow-hidden rounded-full">
                  <motion.div 
                    className="h-full bg-black dark:bg-white"
                    style={{ width: `${count}%` }}
                  />
                </div>
              </div>

              {/* Corner details */}
              <div className="absolute top-8 left-8 text-xs font-unbounded text-black/50 dark:text-white/50 uppercase tracking-wider">
                Rudradev Myadara
              </div>
              <div className="absolute top-8 right-8 text-xs font-unbounded text-black/50 dark:text-white/50 uppercase tracking-wider">
                © 2025
              </div>
              <div className="absolute bottom-8 left-8 text-xs font-unbounded text-black/50 dark:text-white/50 uppercase tracking-wider">
                Hyderabad, IN
              </div>
              <div className="absolute bottom-8 right-8 text-xs font-unbounded text-black/50 dark:text-white/50 uppercase tracking-wider">
                Creative Dev
              </div>
            </div>
          </motion.div>

          {/* Ink/Geometric Reveal Effect */}
          {showInk && (
            <div className="fixed inset-0 z-[9998] flex pointer-events-none">
              {columns.map((_, i) => (
                <motion.div
                  key={i}
                  className="flex-1 bg-black dark:bg-white relative"
                  initial={{ scaleY: 1, transformOrigin: 'top' }}
                  animate={{ 
                    scaleY: 0,
                    transition: {
                      duration: 0.8,
                      ease: [0.76, 0, 0.24, 1],
                      delay: i * 0.05 // Stagger effect
                    }
                  }}
                  exit={{ scaleY: 0 }}
                >
                  {/* Optional: Add decorative "drip" or shape at the bottom of each bar */}
                  <div className="absolute bottom-0 left-0 right-0 h-4 bg-black dark:bg-white rounded-b-full opacity-50" />
                </motion.div>
              ))}
            </div>
          )}
        </>
      )}
    </AnimatePresence>
  )
}

export default Preloader
