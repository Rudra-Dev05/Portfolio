'use client'
import React, { useRef, useState, useEffect } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { useTheme } from '../context/ThemeContext'
import { useCursorHandlers } from '../context/CursorContext'
import Link from 'next/link'

const Header = () => {
  const { isDarkMode } = useTheme()
  const headerRef = useRef(null)
  const buttonHandlers = useCursorHandlers('button')
  const linkHandlers = useCursorHandlers('link')
  const [isLoaded, setIsLoaded] = useState(false)
  
  // Trigger animations after initial load
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoaded(true)
    }, 100)
    return () => clearTimeout(timer)
  }, [])
  
  // Advanced scroll animations
  const { scrollYProgress } = useScroll({
    target: headerRef,
    offset: ["start start", "end start"]
  })
  
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0])
  const y = useTransform(scrollYProgress, [0, 0.5], [0, 100])
  const scale = useTransform(scrollYProgress, [0, 0.25], [1, 0.98])
  const textY = useTransform(scrollYProgress, [0, 0.3], [0, -30])
  
  // Professional titles with more variety
  const statementLines = [
    "AI Engineer",
    "ML Developer",
    "Creative Technologist"
  ]
  
  return (
    <section 
      ref={headerRef}
      className="relative min-h-screen flex flex-col justify-center overflow-hidden bg-white dark:bg-black"
    >
      <div className="container mx-auto px-6 md:px-16 py-24 relative z-10">
        <motion.div 
          style={{ scale, y: textY }}
          className="max-w-7xl mx-auto"
        >
          <div className="grid grid-cols-1 md:grid-cols-12 gap-y-8 md:gap-x-12">
            <div className="md:col-span-12 lg:col-span-10 xl:col-span-9">
              {/* Professional badge pill */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4, ease: [0.165, 0.84, 0.44, 1] }}
                className="glass-light dark:glass-dark backdrop-blur-md mb-10 md:mb-16 inline-flex items-center px-6 py-2.5 rounded-full text-black/80 dark:text-white/90 text-sm font-medium font-unbounded tracking-wide shadow-sm"
              >
                <span className="relative flex h-2 w-2 mr-3">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 dark:bg-emerald-500 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500 dark:bg-emerald-400"></span>
                </span>
                Available for Projects
              </motion.div>
              
              {/* Main name heading with sophisticated typography and layout */}
              <div className="mb-12 md:mb-16">
                <div className="relative overflow-hidden">
                  <motion.div
                    initial={{ y: 120 }}
                    animate={{ y: 0 }}
                    transition={{ duration: 1.2, delay: 0.5, ease: [0.165, 0.84, 0.44, 1] }}
                  >
                    <h1 className="text-7xl md:text-[100px] lg:text-[130px] xl:text-[150px] font-dmSerif text-black dark:text-white leading-[0.85] tracking-tight">
                      <span className="block">Rudradev</span>
                    </h1>
                  </motion.div>
                </div>
                
                <div className="relative overflow-hidden mt-3">
                  <motion.div
                    initial={{ y: 80 }}
                    animate={{ y: 0 }}
                    transition={{ duration: 1.2, delay: 0.65, ease: [0.165, 0.84, 0.44, 1] }}
                  >
                    <h1 className="text-7xl md:text-[100px] lg:text-[130px] xl:text-[150px] font-dmSerif italic text-black/75 dark:text-white/75 leading-[0.85] tracking-tight">
                      <span className="block">Myadara</span>
                    </h1>
                  </motion.div>
                </div>
                
                {/* Refined accent line with sophisticated animation */}
                <motion.div 
                  initial={{ scaleX: 0, opacity: 0 }}
                  animate={{ scaleX: 1, opacity: 1 }}
                  transition={{ duration: 1.5, delay: 1.2, ease: [0.165, 0.84, 0.44, 1] }}
                  className="mt-6 w-24 h-[2px] bg-black/30 dark:bg-white/30 origin-left"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16">
                <div>
                  {/* Professional title in an elegant glass container */}
                  <motion.div 
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.8, ease: [0.165, 0.84, 0.44, 1] }}
                    className="glass-light dark:glass-dark backdrop-blur-md rounded-2xl p-6 md:p-8 relative overflow-hidden shadow-sm mb-12 md:mb-0"
                  >
                    <div className="relative h-16">
                      {statementLines.map((line, index) => (
                        <motion.div 
                          key={index}
                          initial={{ opacity: 0 }}
                          animate={{ 
                            opacity: [0, 1, 1, 0],
                            y: [20, 0, 0, -20]
                          }}
                          transition={{ 
                            duration: 5,
                            times: [0, 0.1, 0.9, 1],
                            delay: index * 5,
                            repeat: Infinity,
                            repeatDelay: (statementLines.length - 1) * 5
                          }}
                          className={`absolute inset-0 flex items-center ${index !== 0 ? 'opacity-0' : ''}`}
                        >
                          <span className="text-3xl md:text-3xl lg:text-4xl font-medium font-playfair italic text-black/90 dark:text-white/90">{line}</span>
                        </motion.div>
                      ))}
                    </div>
                    
                    {/* Elegant decorative elements */}
                    <div className="absolute right-8 bottom-8 flex space-x-1.5">
                      {[0, 1, 2].map((_, i) => (
                        <motion.div
                          key={i}
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          transition={{ delay: 1.8 + (i * 0.1), ease: [0.165, 0.84, 0.44, 1] }}
                          className="w-1.5 h-1.5 rounded-full bg-black/40 dark:bg-white/40"
                        />
                      ))}
                    </div>
                  </motion.div>
                </div>
                
                <div className="flex flex-col justify-between">
                  {/* Description with refined typography and border */}
                  <motion.p 
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.9, ease: [0.165, 0.84, 0.44, 1] }}
                    className="text-lg md:text-xl text-black/70 dark:text-white/70 font-grotesk leading-relaxed pb-6 pl-5 border-l-[2px] border-black/15 dark:border-white/15"
                  >
                    I create intelligent systems and immersive experiences that bridge the gap between 
                    technology and creativity, focusing on AI innovation, machine learning solutions, and
                    human-centered design.
                  </motion.p>
                  
                  {/* CTA buttons with refined glass morphism */}
                  <motion.div 
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 1, ease: [0.165, 0.84, 0.44, 1] }}
                    className="flex flex-col sm:flex-row gap-4 mt-auto"
                  >
                    <Link href="#work" className="group">
                      <motion.button
                        {...buttonHandlers}
                        className="glass-light dark:glass-dark backdrop-blur-md px-7 py-4 text-base rounded-full text-black dark:text-white font-medium transition-all duration-300 hover:scale-105 transform-gpu flex items-center gap-2 font-unbounded shadow-sm"
                        whileHover={{ 
                          scale: 1.03,
                          boxShadow: isDarkMode 
                            ? '0 0 15px 2px rgba(255, 255, 255, 0.1)' 
                            : '0 0 15px 2px rgba(0, 0, 0, 0.05)' 
                        }}
                        whileTap={{ scale: 0.98 }}
                      >
                        View my work
                        <svg className="w-5 h-5 transform transition-transform duration-300 group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                        </svg>
                      </motion.button>
                    </Link>
                    
                    <Link href="#contact" className="group">
                      <motion.button
                        {...buttonHandlers}
                        className="px-7 py-4 text-base rounded-full border border-black/20 dark:border-white/20 bg-transparent text-black dark:text-white font-medium transition-all duration-300 hover:scale-105 transform-gpu flex items-center gap-2 font-unbounded"
                        whileHover={{ 
                          scale: 1.03,
                          boxShadow: isDarkMode 
                            ? '0 0 15px 2px rgba(255, 255, 255, 0.05)' 
                            : '0 0 15px 2px rgba(0, 0, 0, 0.02)' 
                        }}
                        whileTap={{ scale: 0.98 }}
                      >
                        Contact me
                      </motion.button>
                    </Link>
                  </motion.div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Elegant scroll indicator */}
          <motion.div
            style={{ opacity, y }}
            className="absolute bottom-10 left-1/2 -translate-x-1/2 pointer-events-none"
          >
            <motion.div
              animate={{ 
                y: [0, 8, 0],
              }}
              transition={{
                duration: 2.5,
                repeat: Infinity,
                ease: "easeInOut"
              }}
              className="glass-light dark:glass-dark backdrop-blur-md rounded-full px-5 py-2.5 flex items-center gap-3 shadow-sm"
            >
              <span className="text-sm font-unbounded tracking-wide text-black/70 dark:text-white/70">Scroll</span>
              <svg className="w-4 h-4 text-black/70 dark:text-white/70" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
              </svg>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}

export default Header
