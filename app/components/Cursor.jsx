'use client'
import React, { useEffect, useState, useRef } from 'react'
import { motion, AnimatePresence, useSpring, useMotionValue, useTransform } from 'framer-motion'
import { CursorContext } from '../context/CursorContext'
import { useTheme } from '../context/ThemeContext'

const Cursor = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [cursorVariant, setCursorVariant] = useState('default')
  const { cursorType, cursorText } = React.useContext(CursorContext)
  const { isDarkMode } = useTheme()
  
  // Create smoother cursor using springs with optimized values
  const cursorX = useMotionValue(-100)
  const cursorY = useMotionValue(-100)
  
  // Enhanced spring config for more fluid movement
  const springConfig = { damping: 18, stiffness: 450, mass: 0.35 }
  const cursorXSpring = useSpring(cursorX, springConfig)
  const cursorYSpring = useSpring(cursorY, springConfig)
  
  // Additional springs for hover effects with lag
  const dotSpringConfig = { damping: 25, stiffness: 700, mass: 0.1 }
  const dotXSpring = useSpring(cursorX, dotSpringConfig)
  const dotYSpring = useSpring(cursorY, dotSpringConfig)
  
  // Scale effect for hover states
  const scale = useMotionValue(1)
  const scaleSpring = useSpring(scale, { damping: 15, stiffness: 300 })
  
  // Rotation effect for dynamic movement
  const rotation = useMotionValue(0)
  const rotationSpring = useSpring(rotation, { damping: 15, stiffness: 150 })
  
  // Track magnetic elements
  const [magneticElement, setMagneticElement] = useState(null)
  const magneticStrength = useRef(0.35) // Magnetic pull strength
  
  // Update mouse position with optimized event handling
  useEffect(() => {
    let rafId;
    let prevX = 0;
    let prevY = 0;
    
    const mouseMove = (e) => {
      cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(() => {
        const { clientX, clientY } = e;
        
        // Calculate speed for dynamic effects
        const speedX = Math.abs(clientX - prevX);
        const speedY = Math.abs(clientY - prevY);
        const speed = Math.sqrt(speedX * speedX + speedY * speedY);
        
        // Update rotation based on movement speed and direction
        const maxRotation = 10; // max rotation in degrees
        const rotationValue = (speedX > speedY) 
          ? Math.min(speedX * 0.05, maxRotation) * (clientY > prevY ? 1 : -1)
          : Math.min(speedY * 0.05, maxRotation) * (clientX > prevX ? -1 : 1);
        
        rotation.set(rotationValue);
        
        // Apply magnetic effect if near a magnetic element
        if (magneticElement) {
          const rect = magneticElement.getBoundingClientRect();
          const centerX = rect.left + rect.width / 2;
          const centerY = rect.top + rect.height / 2;
          
          // Calculate distance from cursor to element center
          const distX = centerX - clientX;
          const distY = centerY - clientY;
          const distance = Math.sqrt(distX * distX + distY * distY);
          
          // Apply magnetic pull if cursor is close enough
          const pullRadius = Math.max(rect.width, rect.height) * 0.8;
          
          if (distance < pullRadius) {
            const pull = 1 - (distance / pullRadius);
            const pullX = distX * pull * magneticStrength.current;
            const pullY = distY * pull * magneticStrength.current;
            
            cursorX.set(clientX + pullX);
            cursorY.set(clientY + pullY);
          } else {
            cursorX.set(clientX);
            cursorY.set(clientY);
          }
        } else {
          cursorX.set(clientX);
          cursorY.set(clientY);
        }
        
        setMousePosition({
          x: clientX,
          y: clientY,
        });
        
        prevX = clientX;
        prevY = clientY;
      });
    };
    
    // Setup magnetic effect listeners
    const setupMagneticElements = () => {
      const elements = document.querySelectorAll('.magnetic-element, a, button, [role="button"]');
      
      elements.forEach(element => {
        element.addEventListener('mouseenter', () => {
          setMagneticElement(element);
          scale.set(1.2);
        });
        
        element.addEventListener('mouseleave', () => {
          setMagneticElement(null);
          scale.set(1);
        });
      });
      
      return () => {
        elements.forEach(element => {
          element.removeEventListener('mouseenter', () => {});
          element.removeEventListener('mouseleave', () => {});
        });
      };
    };
    
    const cleanupMagnetic = setupMagneticElements();
    window.addEventListener('mousemove', mouseMove, { passive: true });
    
    return () => {
      window.removeEventListener('mousemove', mouseMove);
      cancelAnimationFrame(rafId);
      cleanupMagnetic();
    };
  }, [cursorX, cursorY, magneticStrength, scale]);
  
  // Update cursor variant based on cursor type with smooth transition
  useEffect(() => {
    setCursorVariant(cursorType);
    
    // Scale effect based on cursor type
    if (cursorType === 'button' || cursorType === 'link') {
      scale.set(1.2);
    } else if (cursorType === 'text') {
      scale.set(1.1);
    } else {
      scale.set(1);
    }
  }, [cursorType, scale]);
  
  // Enhanced cursor variants with smoother transitions
  const variants = {
    default: {
      height: 40,
      width: 40,
      x: "-50%",
      y: "-50%",
      backgroundColor: 'transparent',
      border: '1.5px solid rgba(0, 0, 0, 0.5)',
      mixBlendMode: 'difference',
      transition: {
        type: 'spring',
        mass: 0.5,
        damping: 25,
        stiffness: 350,
        bounce: 0.1
      }
    },
    text: {
      height: 64,
      width: 64,
      x: "-50%",
      y: "-50%",
      backgroundColor: 'transparent',
      border: '1.5px solid rgba(0, 0, 0, 0.7)',
      mixBlendMode: 'difference',
      transition: {
        type: 'spring',
        mass: 0.5,
        damping: 25,
        stiffness: 350,
        bounce: 0.1
      }
    },
    button: {
      height: 80,
      width: 80,
      x: "-50%",
      y: "-50%",
      backgroundColor: 'transparent',
      border: '1.5px solid rgba(0, 0, 0, 0.7)',
      mixBlendMode: 'difference',
      transition: {
        type: 'spring',
        mass: 0.5,
        damping: 25,
        stiffness: 350,
        bounce: 0.1
      }
    },
    link: {
      height: 60,
      width: 60,
      x: "-50%",
      y: "-50%",
      backgroundColor: 'transparent',
      border: '1.5px solid rgba(0, 0, 0, 0.7)',
      mixBlendMode: 'difference',
      transition: {
        type: 'spring',
        mass: 0.5,
        damping: 25,
        stiffness: 350,
        bounce: 0.1
      }
    },
    input: {
      height: 32,
      width: 5,
      x: "-50%",
      y: "-50%",
      backgroundColor: 'rgba(0, 0, 0, 0.7)',
      mixBlendMode: 'difference',
      transition: {
        type: 'spring',
        mass: 0.5,
        damping: 25,
        stiffness: 350,
        bounce: 0
      }
    },
  }
  
  // Enhanced dot variants with smoother animations
  const dotVariants = {
    default: {
      height: 8,
      width: 8,
      x: "-50%",
      y: "-50%",
      backgroundColor: 'black',
      mixBlendMode: 'difference',
      transition: {
        type: 'spring',
        mass: 0.1,
        damping: 20,
        stiffness: 800,
        bounce: 0.1
      }
    },
    text: {
      opacity: 1,
      height: 6,
      width: 6,
      x: "-50%",
      y: "-50%",
      backgroundColor: 'black',
      mixBlendMode: 'difference',
      transition: {
        type: 'spring',
        mass: 0.1,
        damping: 20,
        stiffness: 800,
        bounce: 0.1
      }
    },
    button: {
      opacity: 1,
      height: 10,
      width: 10,
      x: "-50%",
      y: "-50%",
      backgroundColor: 'black',
      mixBlendMode: 'difference',
      transition: {
        type: 'spring',
        mass: 0.1,
        damping: 20,
        stiffness: 800,
        bounce: 0.1
      }
    },
    link: {
      opacity: 1,
      height: 10,
      width: 10,
      x: "-50%",
      y: "-50%",
      backgroundColor: 'black',
      mixBlendMode: 'difference',
      transition: {
        type: 'spring',
        mass: 0.1,
        damping: 20,
        stiffness: 800,
        bounce: 0.1
      }
    },
    input: {
      opacity: 0,
      x: "-50%",
      y: "-50%",
      transition: {
        type: 'spring',
        mass: 0.1,
        damping: 20,
        stiffness: 800,
        bounce: 0
      }
    },
  }

  // Only render custom cursor on devices that support hover
  const [supportsHover, setSupportsHover] = useState(false)
  
  useEffect(() => {
    // Comprehensive check for mobile/touch devices
    const isMobileOrTouch = () => {
      // Check for hover capability
      const hoverMediaQuery = window.matchMedia('(hover: hover)');
      
      // Check for touch capability
      const hasTouchScreen = ('ontouchstart' in window) || 
                             (navigator.maxTouchPoints > 0) || 
                             (navigator.msMaxTouchPoints > 0);
      
      // Check user agent for mobile devices
      const userAgentMobile = /iPhone|iPad|iPod|Android|webOS|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
      
      // Check for small screen (typical mobile breakpoint)
      const isSmallScreen = window.innerWidth < 768;
      
      return !hoverMediaQuery.matches || hasTouchScreen || userAgentMobile || isSmallScreen;
    };
    
    const isDesktopWithHover = !isMobileOrTouch();
    setSupportsHover(isDesktopWithHover);
    
    // Hide default cursor if hover is supported
    if (isDesktopWithHover) {
      document.body.classList.add('hide-cursor');
    } else {
      document.body.classList.remove('hide-cursor');
    }
    
    // Update on resize
    const handleResize = () => {
      const shouldShowCursor = !isMobileOrTouch();
      setSupportsHover(shouldShowCursor);
      
      if (shouldShowCursor) {
        document.body.classList.add('hide-cursor');
      } else {
        document.body.classList.remove('hide-cursor');
      }
    };
    
    window.addEventListener('resize', handleResize);
    
    return () => {
      document.body.classList.remove('hide-cursor');
      window.removeEventListener('resize', handleResize);
    };
  }, []);
  
  if (!supportsHover) return null

  return (
    <div className="cursor-container pointer-events-none fixed inset-0 z-[9999]">
      <motion.div
        className="cursor-outer rounded-full fixed top-0 left-0 mix-blend-difference"
        style={{ 
          left: cursorXSpring,
          top: cursorYSpring,
          scale: scaleSpring,
          rotate: rotationSpring
        }}
        variants={variants}
        animate={cursorVariant}
        transition={{ 
          type: 'spring', 
          mass: 0.5, 
          damping: 25, 
          stiffness: 350 
        }}
      />
      
      <motion.div
        className="cursor-dot rounded-full fixed top-0 left-0 mix-blend-difference"
        style={{ 
          left: dotXSpring,
          top: dotYSpring,
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
            transition={{ 
              type: 'spring', 
              mass: 0.3, 
              damping: 28, 
              stiffness: 900 
            }}
          >
            {cursorText}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default Cursor 