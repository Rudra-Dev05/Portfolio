'use client'
import React, { createContext, useContext, useState, useEffect } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'

export const CursorContext = createContext()

export const useCursor = () => useContext(CursorContext)

export const CursorProvider = ({ children }) => {
  const [cursorType, setCursorType] = useState('default')
  const [cursorText, setCursorText] = useState('')
  const [isVisible, setIsVisible] = useState(false)
  
  // Initial position outside viewport
  const cursorX = useMotionValue(-100)
  const cursorY = useMotionValue(-100)
  
  // Smooth spring animation for cursor
  const springConfig = { damping: 25, stiffness: 300 }
  const smoothX = useSpring(cursorX, springConfig)
  const smoothY = useSpring(cursorY, springConfig)

  useEffect(() => {
    const moveCursor = (e) => {
      cursorX.set(e.clientX)
      cursorY.set(e.clientY)
      
      if (!isVisible) {
        setIsVisible(true)
      }
    }
    
    const handleMouseLeave = () => {
      setIsVisible(false)
    }
    
    const handleMouseEnter = () => {
      setIsVisible(true)
    }

    window.addEventListener('mousemove', moveCursor)
    document.addEventListener('mouseleave', handleMouseLeave)
    document.addEventListener('mouseenter', handleMouseEnter)
    
    return () => {
      window.removeEventListener('mousemove', moveCursor)
      document.removeEventListener('mouseleave', handleMouseLeave)
      document.removeEventListener('mouseenter', handleMouseEnter)
    }
  }, [cursorX, cursorY, isVisible])

  // Hide cursor on mobile devices
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent)
      if (isMobile) {
        setIsVisible(false)
      }
    }
  }, [])

  const setCursor = (type, text = '') => {
    setCursorType(type)
    setCursorText(text)
  }

  const resetCursor = () => {
    setCursorType('default')
    setCursorText('')
  }

  // Custom hook to handle common cursor interactions
  const useCursorHandlers = (type, text = '') => {
    return {
      onMouseEnter: () => setCursor(type, text),
      onMouseLeave: () => resetCursor(),
    }
  }

  return (
    <CursorContext.Provider
      value={{
        cursorType,
        cursorText,
        setCursor,
        resetCursor,
        useCursorHandlers,
      }}
    >
      {children}
      
      {/* Main cursor */}
      <motion.div
        className="fixed top-0 left-0 w-4 h-4 rounded-full bg-cream-500 z-[999] mix-blend-difference pointer-events-none"
        style={{
          x: smoothX,
          y: smoothY,
          translateX: '-50%',
          translateY: '-50%',
          opacity: isVisible ? 1 : 0,
        }}
        transition={{ duration: 0 }}
      />
      
      {/* Secondary cursor */}
      <motion.div
        className="fixed top-0 left-0 w-9 h-9 rounded-full border-2 border-cream-500 z-[999] mix-blend-difference pointer-events-none"
        style={{
          x: smoothX,
          y: smoothY,
          translateX: '-50%',
          translateY: '-50%',
          opacity: isVisible ? 1 : 0,
          scale: cursorType === 'default' ? 1 : cursorType === 'button' ? 1.5 : 0.8,
        }}
        transition={{ 
          duration: 0.2,
          scale: { 
            type: 'spring',
            damping: 25,
            stiffness: 300
          }, 
        }}
      />
    </CursorContext.Provider>
  )
}

// Export the hook for easy usage
export function useCursorHandlers(type, text = '') {
  const { setCursor, resetCursor } = React.useContext(CursorContext)
  
  return {
    onMouseEnter: () => setCursor(type, text),
    onMouseLeave: () => resetCursor(),
  }
}

export default CursorProvider 