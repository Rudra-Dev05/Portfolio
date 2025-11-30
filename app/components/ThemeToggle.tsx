'use client'
import React from 'react'
import { motion } from 'framer-motion'
import { useTheme } from '../context/ThemeContext'

import { HiSun, HiMoon } from 'react-icons/hi'

const ThemeToggle: React.FC = () => {
  const { isDarkMode, toggleTheme } = useTheme()

  
  return (
    <motion.button
      onClick={toggleTheme}
      className={`relative w-12 h-12 rounded-full flex items-center justify-center ${
        isDarkMode
          ? 'bg-slate-800 text-slate-300 hover:bg-slate-700 hover:text-white'
          : 'bg-slate-100 text-slate-700 hover:bg-slate-200 hover:text-slate-900'
      } transition-colors`}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}

      aria-label={isDarkMode ? 'Switch to light mode' : 'Switch to dark mode'}
    >
      <motion.div
        initial={false}
        animate={{ 
          rotate: isDarkMode ? 0 : 180,
          opacity: isDarkMode ? 1 : 0,
          scale: isDarkMode ? 1 : 0.5,
        }}
        transition={{ duration: 0.3, ease: [0.19, 1, 0.22, 1] }}
        className="absolute"
      >
        <HiMoon className="w-5 h-5" />
      </motion.div>
      
      <motion.div
        initial={false}
        animate={{ 
          rotate: isDarkMode ? -180 : 0,
          opacity: isDarkMode ? 0 : 1,
          scale: isDarkMode ? 0.5 : 1,
        }}
        transition={{ duration: 0.3, ease: [0.19, 1, 0.22, 1] }}
        className="absolute"
      >
        <HiSun className="w-5 h-5" />
      </motion.div>
    </motion.button>
  )
}

export default ThemeToggle