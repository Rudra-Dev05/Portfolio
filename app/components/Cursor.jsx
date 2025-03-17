'use client'
import React, { useEffect, useState } from 'react'
import { motion, AnimatePresence, useSpring, useMotionValue } from 'framer-motion'
import { CursorContext } from '../context/CursorContext'
import { useTheme } from '../context/ThemeContext'

const Cursor = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [cursorVariant, setCursorVariant] = useState('default')
  const { cursorType, cursorText } = React.useContext(CursorContext)
  const { isDarkMode } = useTheme()
  
  // Create smoother cursor using springs
  const cursorX = useMotionValue(-100)
  const cursorY = useMotionValue(-100)
  
  const springConfig = { damping: 25, stiffness: 350 }
  const cursorXSpring = useSpring(cursorX, springConfig)
  const cursorYSpring = useSpring(cursorY, springConfig)
  
  // Update mouse position
  useEffect(() => {
    const mouseMove = (e) => {
      cursorX.set(e.clientX)
      cursorY.set(e.clientY)
      setMousePosition({
        x: e.clientX,
        y: e.clientY,
      })
    }
    
    window.addEventListener('mousemove', mouseMove)
    
    return () => {
      window.removeEventListener('mousemove', mouseMove)
    }
  }, [cursorX, cursorY])
  
  // Update cursor variant based on cursor type
  useEffect(() => {
    setCursorVariant(cursorType)
  }, [cursorType])
  
  // Define cursor variants - inspired by Acts of Imagination's artistic cursor
  const variants = {
    default: {
      height: 40,
      width: 40,
      x: "-50%",
      y: "-50%",
      backgroundColor: 'transparent',
      border: '1px solid rgba(0, 0, 0, 0.5)',
      mixBlendMode: 'difference',
    },
    text: {
      height: 64,
      width: 64,
      x: "-50%",
      y: "-50%",
      backgroundColor: 'transparent',
      border: '1.5px solid rgba(0, 0, 0, 0.7)',
      mixBlendMode: 'difference',
    },
    button: {
      height: 80,
      width: 80,
      x: "-50%",
      y: "-50%",
      backgroundColor: 'transparent',
      border: '1.5px solid rgba(0, 0, 0, 0.7)',
      mixBlendMode: 'difference',
    },
    link: {
      height: 60,
      width: 60,
      x: "-50%",
      y: "-50%",
      backgroundColor: 'transparent',
      border: '1.5px solid rgba(0, 0, 0, 0.7)',
      mixBlendMode: 'difference',
    },
    input: {
      height: 32,
      width: 5,
      x: "-50%",
      y: "-50%",
      backgroundColor: 'rgba(0, 0, 0, 0.7)',
      mixBlendMode: 'difference',
    },
  }
  
  // Dot follows cursor with a slight delay - inspired by AOI dot effect
  const dotVariants = {
    default: {
      height: 8,
      width: 8,
      x: "-50%",
      y: "-50%",
      backgroundColor: 'black',
      mixBlendMode: 'difference',
    },
    text: {
      opacity: 1,
      height: 6,
      width: 6,
      x: "-50%",
      y: "-50%",
      backgroundColor: 'black',
      mixBlendMode: 'difference',
    },
    button: {
      opacity: 1,
      height: 10,
      width: 10,
      x: "-50%",
      y: "-50%",
      backgroundColor: 'black',
      mixBlendMode: 'difference',
    },
    link: {
      opacity: 1,
      height: 10,
      width: 10,
      x: "-50%",
      y: "-50%",
      backgroundColor: 'black',
      mixBlendMode: 'difference',
    },
    input: {
      opacity: 0,
      x: "-50%",
      y: "-50%",
    },
  }

  // Only render custom cursor on devices that support hover
  const [supportsHover, setSupportsHover] = useState(false)
  
  useEffect(() => {
    // Check if device supports hover
    const mediaQuery = window.matchMedia('(hover: hover)')
    setSupportsHover(mediaQuery.matches)
    
    // Hide default cursor if hover is supported
    if (mediaQuery.matches) {
      document.body.classList.add('hide-cursor')
    }
    
    return () => {
      document.body.classList.remove('hide-cursor')
    }
  }, [])
  
  if (!supportsHover) return null

  return (
    <div className="cursor-container pointer-events-none fixed inset-0 z-[9999]">
      <motion.div
        className="cursor-outer rounded-full fixed top-0 left-0 mix-blend-difference"
        style={{ 
          left: cursorXSpring,
          top: cursorYSpring,
        }}
        variants={variants}
        animate={cursorVariant}
        transition={{ 
          type: 'spring', 
          mass: 0.5, 
          damping: 30, 
          stiffness: 400 
        }}
      />
      
      <motion.div
        className="cursor-dot rounded-full fixed top-0 left-0 mix-blend-difference"
        style={{ 
          left: cursorXSpring,
          top: cursorYSpring,
        }}
        variants={dotVariants}
        animate={cursorVariant}
        transition={{ 
          type: 'spring', 
          mass: 0.1, 
          damping: 20, 
          stiffness: 800 
        }}
      />
      
      <AnimatePresence>
        {cursorText && (
          <motion.div
            className="cursor-text text-sm uppercase tracking-wider font-medium flex items-center justify-center fixed top-0 left-0 text-white mix-blend-difference"
            style={{
              left: cursorXSpring,
              top: cursorYSpring,
            }}
            initial={{ opacity: 0, scale: 0.8, x: "-50%", y: "-50%" }}
            animate={{ 
              opacity: 1, 
              scale: 1,
              x: "-50%",
              y: "-50%",
            }}
            exit={{ opacity: 0, scale: 0.8, x: "-50%", y: "-50%" }}
            transition={{ type: 'spring', mass: 0.3, damping: 28, stiffness: 900 }}
          >
            {cursorText}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default Cursor 