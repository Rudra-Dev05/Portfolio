'use client'
import React, { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion'
import { useTheme } from '../context/ThemeContext'

import { HiX } from 'react-icons/hi'
import { RiMenu4Line } from 'react-icons/ri'
import { useScrollContext } from '../context/ScrollContext'

// Simplified page transition
export const PageTransition = ({ children }: { children: React.ReactNode }) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="w-full"
    >
      {children}
    </motion.div>
  );
};

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [hoveredLink, setHoveredLink] = useState<string | null>(null)
  const [isLogoHovered, setIsLogoHovered] = useState(false)
  const [hashValue, setHashValue] = useState('')
  const [isMounted, setIsMounted] = useState(false)
  const { isDarkMode, toggleTheme } = useTheme()
  const pathname = usePathname()
  const router = useRouter()

  const navRef = useRef<HTMLDivElement>(null)
  const pillNavRef = useRef<HTMLDivElement>(null)
  
  // Client-side only operations
  useEffect(() => {
    setIsMounted(true)
  }, [])
  
  // Advanced scroll effect
  const { scrollY } = useScroll()
  const navOpacity = useTransform(scrollY, [0, 100], [0.9, 1])
  const navBlur = useTransform(scrollY, [0, 100], [8, 12])
  const navY = useTransform(scrollY, [0, 100], [0, -8])
  
  // Dynamic pill expansion on scroll
  const pillPadding = useTransform(scrollY, [0, 100], [1, 1.5])
  const pillScale = useTransform(scrollY, [0, 100], [1, 1.03])
  
  // Handle scroll effect with refined animation
  useEffect(() => {
    if (typeof window === 'undefined') return;
    
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
    }
    
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])
  
  // Update hash value safely on client side only
  useEffect(() => {
    if (typeof window === 'undefined') return;
    
    const updateHash = () => {
      setHashValue(window.location.hash)
    }
    
    // Initial update
    updateHash()
    
    // Listen for hash changes
    window.addEventListener('hashchange', updateHash)
    return () => window.removeEventListener('hashchange', updateHash)
  }, [])
  
  // Implement smooth scrolling
  const { scrollTo } = useScrollContext()
  
  const scrollToSection = (e: React.MouseEvent, href: string) => {
    e.preventDefault()
    
    // Close mobile menu if open
    setIsMobileMenuOpen(false)
    
    // If it's a hash link, smoothly scroll to the section
    if (href.startsWith('#')) {
      const sectionId = href.substring(1)
      
      // For #work link, always navigate to home page first if not already there
      if (sectionId === 'work' && pathname !== '/') {
        router.push('/?scrollTo=work');
        return;
      }
      
      // Stay on current page for footer links regardless of current page
      if (sectionId === 'footer') {
        scrollTo('#footer', { offset: -100 })
        return
      }
      
      // If we're not on the home page and this isn't a footer link, navigate first then scroll
      if (pathname !== '/' && sectionId !== 'footer') {
        router.push(`/?scrollTo=${sectionId}`)
      } else {
        // Smooth scroll on current page
        scrollTo(`#${sectionId}`, { offset: -100 })
      }
    } else {
      // Regular navigation
      router.push(href)
    }
  }
  
  // Navigation links
  const navLinks = [
    { href: '#work', label: 'Projects' },
    { href: '/about', label: 'Craft' },
    { href: '#footer', label: 'Connect', noHover: true },
  ]

  // Determine the single active link
  const getActiveHref = () => {
    if (!isMounted) return null;

    // 1. Check for hash matches on home page
    if (pathname === '/' && hashValue === '#work') {
      return '#work'
    }

    // 2. Check for page routes
    if (pathname === '/about') {
      return '/about'
    }
    
    // 3. Default to projects on home page if no other hash
    if (pathname === '/' && !hashValue) {
      return '#work'
    }

    return null
  }

  const activeHref = getActiveHref()
  
  return (
    <motion.header 
      ref={navRef}
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
      className="fixed top-0 left-0 right-0 z-50 py-6 px-6 md:px-12"
    >
      <div className="max-w-[1400px] mx-auto">
        <div className={`flex items-center justify-between transition-all duration-300`}>
          {/* Logo with hover animation */}
          <div className="flex-none relative z-10">
            <Link 
              href="/" 
              className="flex items-center gap-2"
              onMouseEnter={() => setIsLogoHovered(true)}
              onMouseLeave={() => setIsLogoHovered(false)}
            >
              <motion.div 
                className="w-8 h-8 md:w-8 md:h-8 rounded-full border-2 border-black dark:border-white bg-white/5 dark:bg-black/5 flex items-center justify-center flex-shrink-0"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                transition={{ duration: 0.2 }}

              >
                <div className="w-3 h-3 md:w-3 md:h-3 bg-black dark:bg-white rounded-full"></div>
              </motion.div>
              
              {/* The text container with fixed width */}
              <div className="relative h-8 overflow-visible flex items-center min-w-[12rem] whitespace-nowrap">
                {/* RM (only shown when not hovered) */}
                <motion.span 
                  className="text-base md:text-lg tracking-tight text-black dark:text-white uppercase font-medium font-unbounded"
                  animate={{ 
                    opacity: isLogoHovered ? 0 : 1,
                    x: isLogoHovered ? -10 : 0 
                  }}
                  transition={{ duration: 0.2 }}
                >
                  RM
                </motion.span>
                
                {/* Full name (only shown when hovered) */}
                <motion.span 
                  className="text-base md:text-lg tracking-tight text-black dark:text-white absolute left-0 uppercase font-medium whitespace-nowrap overflow-hidden font-unbounded"
                  animate={{ 
                    opacity: isLogoHovered ? 1 : 0,
                    x: isLogoHovered ? 0 : 10 
                  }}
                  transition={{ duration: 0.2 }}
                >
                  Rudradev Myadara
                </motion.span>
              </div>
            </Link>
          </div>
          
          {/* Placeholder div to ensure proper centering */}
          <div className="w-[12rem] hidden md:block"></div>
          
          {/* Absolutely centered Pill Navbar with Glass Morphism */}
          <div className="absolute left-1/2 transform -translate-x-1/2 hidden md:block">
            <motion.nav 
              ref={pillNavRef}
              style={{ 
                scale: pillScale,
                padding: pillPadding.get(), // Dynamic padding based on scroll
                opacity: navOpacity,
                y: navY
              }}
              className={`
                flex items-center rounded-full backdrop-blur-md transition-all duration-300
                ${isScrolled 
                  ? 'glass-light dark:glass-dark shadow-elevation-2 dark:shadow-dark-elevation-2' 
                  : 'glass-light dark:glass-dark'
                }
              `}
            >
              {navLinks.map(({ href, label, noHover }, index) => {
                const active = activeHref === href;
                return (
                  <motion.div
                    key={href}
                    className="relative"
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Link
                      href={href}
                      onClick={(e) => scrollToSection(e, href)}
                      className={`relative px-5 py-3 text-sm tracking-wide transition-all duration-300 ${
                        active 
                          ? 'text-white dark:text-black' 
                          : noHover 
                            ? 'text-black/80 dark:text-white/80' 
                            : 'text-black/80 dark:text-white/80 hover:opacity-80'
                      } rounded-full font-medium font-unbounded inline-block`}
                      onMouseEnter={() => {
                        if (!noHover) {
                          setHoveredLink(href);
                        }
                      }}
                      onMouseLeave={() => {
                        if (!noHover) {
                          setHoveredLink(null);
                        }
                      }}
                    >
                      <span className="relative z-10">{label}</span>
                      
                      {/* Active pill indicator with subtle animation */}
                      {active && (
                        <motion.div 
                          layoutId="activeNavIndicator"
                          className="absolute inset-0 bg-black dark:bg-white rounded-full shadow-sm" 
                          initial={{ opacity: 0.9 }}
                          animate={{ opacity: 1 }}
                          transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                          style={{ zIndex: 0 }}
                        />
                      )}
                      
                      {/* Enhanced hover effect with subtle glow */}
                      {!active && !noHover && hoveredLink === href && (
                        <motion.div 
                          className="absolute inset-0 rounded-full" 
                          layoutId="hoverNavIndicator"
                          initial={{ opacity: 0 }}
                          animate={{ 
                            opacity: 1,
                            boxShadow: isDarkMode 
                              ? '0 0 20px 3px rgba(255, 255, 255, 0.15)' 
                              : '0 0 20px 3px rgba(0, 0, 0, 0.05)' 
                          }}
                          exit={{ opacity: 0 }}
                          transition={{ duration: 0.3 }}
                          style={{ 
                            zIndex: 0,
                            background: isDarkMode 
                              ? 'rgba(255, 255, 255, 0.1)' 
                              : 'rgba(0, 0, 0, 0.05)'
                          }}
                        />
                      )}
                    </Link>
                  </motion.div>
                )
              })}
            </motion.nav>
          </div>
          
          {/* Mobile menu button in a pill */}
          <div className="flex-none">
            <motion.button 
              className="md:hidden flex items-center p-2 rounded-full glass-light dark:glass-dark backdrop-blur-md"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}

            >
              <span className="sr-only">{isMobileMenuOpen ? "Close menu" : "Open menu"}</span>
              {isMobileMenuOpen ? (
                <HiX className="w-5 h-5 text-black dark:text-white" />
              ) : (
                <RiMenu4Line className="w-5 h-5 text-black dark:text-white" />
              )}
            </motion.button>
          </div>
        </div>
      </div>
      
      {/* Mobile menu overlay with glass morphism */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            className="fixed inset-0 z-40 glass-light dark:glass-dark backdrop-blur-xl"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
          >
            {/* Decorative grid background for mobile menu */}
            <div className="absolute inset-0 opacity-[0.03] bg-[linear-gradient(rgba(0,0,0,0.2)_1px,transparent_1px),linear-gradient(90deg,rgba(0,0,0,0.2)_1px,transparent_1px)] bg-[size:8rem_8rem]"></div>
            
            {/* Close button positioned at top right */}
            <div className="absolute top-6 right-6">
              <motion.button 
                className="flex items-center justify-center p-2 rounded-full glass-dark dark:glass-light"
                onClick={() => setIsMobileMenuOpen(false)}
                aria-label="Close menu"
                whileTap={{ scale: 0.95 }}
              >
                <HiX className="w-6 h-6 text-white dark:text-black" />
              </motion.button>
            </div>
            
            <div className="flex flex-col h-full justify-center items-center p-6 sm:p-10">
              {navLinks.map(({ href, label }, index) => {
                const active = activeHref === href;
                return (
                  <motion.div
                    key={href}
                    className="my-3 w-full max-w-xs sm:max-w-sm"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ 
                      opacity: 1, 
                      y: 0,
                      transition: {
                        delay: 0.1 + (index * 0.1)
                      }
                    }}
                    exit={{ 
                      opacity: 0, 
                      y: -10,
                      transition: {
                        delay: 0.05 * index
                      }
                    }}
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <Link
                      href={href}
                      onClick={(e) => {
                        scrollToSection(e, href);
                        setIsMobileMenuOpen(false);
                      }}
                      className={`relative py-3 sm:py-4 px-6 sm:px-10 text-xl sm:text-2xl font-medium tracking-wide text-center ${
                        active 
                          ? 'text-white dark:text-black' 
                          : 'text-black dark:text-white'
                      } rounded-full block font-unbounded`}
                    >
                      <span className="relative z-10">{label}</span>
                      
                      {/* Active indicator pill for mobile */}
                      {active && (
                        <motion.div 
                          layoutId="activeMobileIndicator"
                          className="absolute inset-0 bg-black dark:bg-white rounded-full" 
                          transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                          style={{ zIndex: 0 }}
                        />
                      )}
                    </Link>
                  </motion.div>
                )
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  )
}

export default Navbar
