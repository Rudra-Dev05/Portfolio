import { motion, useReducedMotion } from 'framer-motion';

// Basic fade in animation
export const fadeInVariants = {
  hidden: { 
    opacity: 0, 
    y: 20 
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: "spring",
      duration: 0.6,
      bounce: 0.3
    }
  }
};

// Container with stagger effect
export const containerVariants = {
  hidden: { 
    opacity: 0 
  },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2
    }
  }
};

// Form-specific animations
export const formAnimations = {
  input: {
    whileFocus: { scale: 1.01 },
    transition: {
      type: "spring",
      stiffness: 300,
      damping: 20
    }
  },
  button: {
    whileHover: {
      scale: 1.02,
      translateY: -2
    },
    whileTap: { scale: 0.98 },
    transition: {
      type: "spring",
      stiffness: 400,
      damping: 15
    }
  }
};

// Text animation variants
export const textVariant = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: "spring",
      stiffness: 100,
      damping: 12
    }
  }
};

// Slide in animations
export const slideInFromLeft = {
  hidden: { x: -100, opacity: 0 },
  visible: {
    x: 0,
    opacity: 1,
    transition: {
      type: "spring",
      stiffness: 100,
      damping: 20
    }
  }
};

// Image animations
export const imageScale = {
  hidden: { scale: 1.2, opacity: 0 },
  visible: {
    scale: 1,
    opacity: 1,
    transition: {
      duration: 1.4,
      ease: [0.25, 1, 0.5, 1]
    }
  }
};

// Hover animations
export const cardHoverVariants = {
  hover: {
    y: -8,
    transition: {
      duration: 0.3,
      ease: "easeOut"
    }
  }
};

export const buttonVariants = {
  hover: {
    scale: 1.05,
    transition: {
      duration: 0.3,
      ease: "easeOut"
    }
  },
  tap: { scale: 0.95 }
};

// New animations
export const pageTransition = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] }
};

export const staggerContainer = {
  initial: { opacity: 0 },
  animate: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.3
    }
  }
};

export const floatingAnimation = {
  initial: { y: 0 },
  animate: {
    y: [-10, 10, -10],
    transition: {
      duration: 6,
      repeat: Infinity,
      ease: "easeInOut"
    }
  }
};

// Reusable motion heading component
export const MotionHeading = ({ children, className = '', ...props }) => {
  const shouldReduceMotion = useReducedMotion();
  
  return (
    <motion.h2
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      variants={shouldReduceMotion ? fadeInVariants : {
        hidden: { opacity: 0, y: 20 },
        visible: {
          opacity: 1,
          y: 0,
          transition: {
            type: "spring",
            duration: 0.8,
            bounce: 0.3
          }
        }
      }}
      className={`relative ${className}`}
      {...props}
    >
      {children}
    </motion.h2>
  );
};