import { motion } from 'framer-motion';
import { useReducedMotion } from 'framer-motion';

export const MotionTitle = ({ children, className = '', ...props }) => {
  const shouldReduceMotion = useReducedMotion();

  const titleVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        damping: 20,
        stiffness: 100,
        duration: 0.8,
        staggerChildren: 0.1
      }
    }
  };

  const letterVariants = shouldReduceMotion 
    ? {} 
    : {
        hidden: { opacity: 0, y: 50 },
        visible: {
          opacity: 1,
          y: 0,
          transition: { type: "spring", damping: 20, stiffness: 200 }
        }
      };

  return (
    <motion.h1
      variants={titleVariants}
      className={`relative ${className}`}
      {...props}
    >
      {typeof children === 'string' 
        ? children.split('').map((char, i) => (
            <motion.span
              key={i}
              variants={letterVariants}
              className="inline-block"
            >
              {char === ' ' ? '\u00A0' : char}
            </motion.span>
          ))
        : children}
    </motion.h1>
  );
};

export const MotionParagraph = ({ children, className = '', ...props }) => {
  const paragraphVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        damping: 20,
        stiffness: 100
      }
    }
  };

  return (
    <motion.p
      variants={paragraphVariants}
      className={`relative ${className}`}
      {...props}
    >
      {children}
    </motion.p>
  );
};