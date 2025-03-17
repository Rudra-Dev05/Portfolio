'use client'
import React, { createContext, useState, useEffect, useContext } from 'react'

export const ThemeContext = createContext()

export const ThemeProvider = ({ children }) => {
  // Always set to false (light mode)
  const [isDarkMode, setIsDarkMode] = useState(false)
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    // Always ensure light mode is set
    setIsDarkMode(false)
    document.documentElement.classList.remove('dark')
    localStorage.setItem('theme', 'light')
    setIsLoaded(true)
  }, [])

  // Keep the toggle function for API compatibility but make it do nothing
  const toggleTheme = () => {
    // Function kept for compatibility but does nothing
    return false
  }

  return (
    <ThemeContext.Provider
      value={{
        isDarkMode: false, // Always false
        toggleTheme,
        isLoaded
      }}
    >
      {children}
    </ThemeContext.Provider>
  )
}

// Custom hook for using the theme context
export const useTheme = () => {
  const context = useContext(ThemeContext)
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider')
  }
  return context
}

export default ThemeProvider
