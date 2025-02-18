'use client'
import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from "framer-motion"
import { useTheme } from '../context/ThemeContext'
import { HiSun, HiMoon } from 'react-icons/hi'
import { PiCodeBold } from 'react-icons/pi'
import { IoMenuOutline, IoCloseOutline } from 'react-icons/io5'

const Navbar = () => {
  const { isDarkMode, toggleTheme } = useTheme()
  const [isScrolled, setIsScrolled] = useState(false)
  const [isOpen, setIsOpen] = useState(false)
  const [activeSection, setActiveSection] = useState('home')

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const navItems = [
    { name: 'Home', href: '#home' },
    { name: 'About', href: '#about' },
    { name: 'Projects', href: '#projects' },
    { name: 'Contact', href: '#contact' }
  ]

  const fadeInUp = {
    initial: { y: 20, opacity: 0 },
    animate: { y: 0, opacity: 1 },
    exit: { y: -20, opacity: 0 }
  }

  return (
    <header className={`fixed w-full z-50 transition-all duration-300 ${
      isScrolled 
        ? isDarkMode 
          ? 'bg-black/80 backdrop-blur-xl border-b border-white/10' 
          : 'bg-white/80 backdrop-blur-xl border-b border-black/5'
        : ''
    }`}>
      <nav className="max-w-6xl mx-auto px-6 h-20">
        <div className="flex items-center justify-between h-full">
          {/* Logo */}
          <motion.a
            href="#"
            className="flex items-center gap-2 group"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <PiCodeBold className={`w-8 h-8 ${
              isDarkMode ? 'text-violet-400' : 'text-violet-600'
            }`} />
            <span className="text-xl font-bold bg-gradient-to-r from-violet-600 to-indigo-600 
              bg-clip-text text-transparent"
            >
              Rudradev
            </span>
          </motion.a>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-8">
            <div className="flex items-center gap-1">
              {navItems.map((item) => (
                <motion.a
                  key={item.name}
                  href={item.href}
                  className={`relative px-4 py-2 text-sm font-medium ${
                    isDarkMode ? 'text-gray-300 hover:text-white' : 'text-gray-600 hover:text-black'
                  }`}
                  whileHover="hover"
                >
                  {item.name}
                  <motion.span
                    className="absolute bottom-0 left-0 w-full h-0.5 bg-violet-600 origin-left"
                    initial={{ scaleX: 0 }}
                    variants={{
                      hover: { scaleX: 1 }
                    }}
                    transition={{ duration: 0.2 }}
                  />
                </motion.a>
              ))}
            </div>

            {/* Theme Toggle */}
            <motion.button
              onClick={toggleTheme}
              className={`p-2.5 rounded-full ${
                isDarkMode 
                  ? 'bg-white/10 hover:bg-white/20' 
                  : 'bg-black/5 hover:bg-black/10'
              }`}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <AnimatePresence mode="wait">
                <motion.div
                  key={isDarkMode ? "dark" : "light"}
                  initial={{ scale: 0, rotate: -180 }}
                  animate={{ scale: 1, rotate: 0 }}
                  exit={{ scale: 0, rotate: 180 }}
                  transition={{ duration: 0.2 }}
                >
                  {isDarkMode ? (
                    <HiMoon className="w-5 h-5 text-yellow-300" />
                  ) : (
                    <HiSun className="w-5 h-5 text-yellow-500" />
                  )}
                </motion.div>
              </AnimatePresence>
            </motion.button>
          </div>

          {/* Mobile Menu Button */}
          <motion.button
            className="p-2 md:hidden"
            onClick={() => setIsOpen(!isOpen)}
            whileTap={{ scale: 0.95 }}
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={isOpen ? "close" : "open"}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                {isOpen ? (
                  <IoCloseOutline className="w-6 h-6" />
                ) : (
                  <IoMenuOutline className="w-6 h-6" />
                )}
              </motion.div>
            </AnimatePresence>
          </motion.button>
        </div>
      </nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className={`md:hidden overflow-hidden ${
              isDarkMode ? 'bg-black' : 'bg-white'
            }`}
          >
            <div className="px-6 py-4 space-y-2">
              {navItems.map((item, i) => (
                <motion.a
                  key={item.name}
                  href={item.href}
                  variants={fadeInUp}
                  initial="initial"
                  animate="animate"
                  exit="exit"
                  transition={{ duration: 0.3, delay: i * 0.1 }}
                  className={`block py-3 text-lg font-medium ${
                    isDarkMode ? 'text-gray-300 hover:text-white' : 'text-gray-600 hover:text-black'
                  }`}
                  onClick={() => setIsOpen(false)}
                >
                  {item.name}
                </motion.a>
              ))}
              
              {/* Mobile Theme Toggle */}
              <motion.button
                onClick={toggleTheme}
                variants={fadeInUp}
                initial="initial"
                animate="animate"
                exit="exit"
                transition={{ duration: 0.3, delay: navItems.length * 0.1 }}
                className={`w-full mt-4 p-3 rounded-lg flex items-center justify-center gap-2 ${
                  isDarkMode 
                    ? 'bg-white/10 hover:bg-white/20' 
                    : 'bg-black/5 hover:bg-black/10'
                }`}
              >
                {isDarkMode ? (
                  <>
                    <HiMoon className="w-5 h-5 text-yellow-300" />
                    <span className="text-gray-300">Dark Mode</span>
                  </>
                ) : (
                  <>
                    <HiSun className="w-5 h-5 text-yellow-500" />
                    <span className="text-gray-600">Light Mode</span>
                  </>
                )}
              </motion.button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}

export default Navbar
