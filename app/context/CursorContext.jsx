'use client'
import React, { createContext, useContext, useState, useEffect, useCallback } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'

export const CursorContext = createContext()

export const useCursor = () => useContext(CursorContext)

export const CursorProvider = ({ children }) => {
  const [cursorType, setCursorType] = useState('default')
  const [cursorText, setCursorText] = useState('')
  const [isVisible, setIsVisible] = useState(false)
  const [magneticEnabled, setMagneticEnabled] = useState(true)
  
  // Initial position outside viewport
  const cursorX = useMotionValue(-100)
  const cursorY = useMotionValue(-100)
  
  // Smooth spring animation for cursor
  const springConfig = { damping: 22, stiffness: 350, mass: 0.45 }
  const smoothX = useSpring(cursorX, springConfig)
  const smoothY = useSpring(cursorY, springConfig)
  
  // Scale spring for hover effects
  const scale = useMotionValue(1)
  const scaleSpring = useSpring(scale, { damping: 15, stiffness: 300 })

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

    window.addEventListener('mousemove', moveCursor, { passive: true })
    document.addEventListener('mouseleave', handleMouseLeave)
    document.addEventListener('mouseenter', handleMouseEnter)
    
    return () => {
      window.removeEventListener('mousemove', moveCursor)
      document.removeEventListener('mouseleave', handleMouseLeave)
      document.removeEventListener('mouseenter', handleMouseEnter)
    }
  }, [cursorX, cursorY, isVisible])
  
  // Initialize magnetic effects
  useEffect(() => {
    if (!magneticEnabled) return;
    
    const setupMagneticElements = () => {
      const elements = document.querySelectorAll('.magnetic-element');
      
      const handleMouseEnter = (e) => {
        const el = e.currentTarget;
        setCursor('button');
        scale.set(1.2);
      };
      
      const handleMouseLeave = () => {
        resetCursor();
        scale.set(1);
      };
      
      elements.forEach(element => {
        element.addEventListener('mouseenter', handleMouseEnter);
        element.addEventListener('mouseleave', handleMouseLeave);
      });
      
      return () => {
        elements.forEach(element => {
          element.removeEventListener('mouseenter', handleMouseEnter);
          element.removeEventListener('mouseleave', handleMouseLeave);
        });
      };
    };
    
    // Add magnetic class to interactive elements that don't have it yet
    const enhanceDefaultInteractiveElements = () => {
      const interactiveElements = document.querySelectorAll('a, button, [role="button"]');
      
      interactiveElements.forEach(element => {
        if (!element.classList.contains('magnetic-element')) {
          element.classList.add('magnetic-element');
        }
      });
    };
    
    const initialize = () => {
      enhanceDefaultInteractiveElements();
      return setupMagneticElements();
    };
    
    // Delayed initialization to ensure DOM is fully loaded
    const timer = setTimeout(initialize, 500);
    
    return () => {
      clearTimeout(timer);
    };
  }, [magneticEnabled, scale]);

  // Hide cursor on mobile devices
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const checkMobile = () => {
        // Check for user agent
        const userAgentMobile = /iPhone|iPad|iPod|Android|webOS|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
        // Check for touch capability
        const hasTouchScreen = ('ontouchstart' in window) || (navigator.maxTouchPoints > 0) || (navigator.msMaxTouchPoints > 0);
        // Check for small screen (typical mobile breakpoint)
        const isSmallScreen = window.innerWidth < 768;
        
        if (userAgentMobile || hasTouchScreen || isSmallScreen) {
          setIsVisible(false);
        } else {
          setIsVisible(true);
        }
      };
      
      // Check initially
      checkMobile();
      
      // Check on resize
      window.addEventListener('resize', checkMobile);
      
      return () => {
        window.removeEventListener('resize', checkMobile);
      };
    }
  }, [])

  const setCursor = useCallback((type, text = '') => {
    setCursorType(type)
    setCursorText(text)
    
    // Set scale based on cursor type
    if (type === 'button' || type === 'link') {
      scale.set(1.2);
    } else if (type === 'text') {
      scale.set(1.1);
    } else {
      scale.set(1);
    }
  }, [scale])

  const resetCursor = useCallback(() => {
    setCursorType('default')
    setCursorText('')
    scale.set(1);
  }, [scale])

  // Enable/disable magnetic effect
  const toggleMagnetic = (enabled) => {
    setMagneticEnabled(enabled);
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
        toggleMagnetic,
        magneticEnabled,
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
          scale: scaleSpring,
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
            damping: 20,
            stiffness: 300,
            bounce: 0.15
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