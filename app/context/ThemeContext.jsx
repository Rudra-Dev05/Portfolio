'use client'
import { createContext, useContext, useEffect, useState } from 'react'

const ThemeContext = createContext()

export function ThemeProvider({ children }) {
  const [isDarkMode, setIsDarkMode] = useState(true)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    try {
      const savedTheme = localStorage.getItem('theme')
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
      setIsDarkMode(savedTheme ? savedTheme === 'dark' : prefersDark)
    } catch (error) {
      console.error('Theme initialization error:', error)
    }
  }, [])

  const toggleTheme = () => {
    try {
      const newTheme = !isDarkMode
      setIsDarkMode(newTheme)
      localStorage.setItem('theme', newTheme ? 'dark' : 'light')
    } catch (error) {
      console.error('Theme toggle error:', error)
    }
  }

  if (!mounted) {
    return null
  }

  return (
    <ThemeContext.Provider value={{ isDarkMode, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  )
}

export const useTheme = () => {
  const context = useContext(ThemeContext)
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider')
  }
  return context
}
