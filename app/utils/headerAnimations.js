export const backgroundAnimation = {
  variants: {
    animate: { 
      scale: (shouldReduceMotion) => shouldReduceMotion ? 1 : [1, 1.02, 1],
      transition: { duration: 8, repeat: Infinity, ease: "easeInOut" }
    }
  }
};

export const gradientAnimation = {
  style: {
    backgroundImage: `
      radial-gradient(circle at top left, 
        rgba(37, 99, 235, 0.1),
        transparent 50%),
      radial-gradient(circle at bottom right, 
        rgba(147, 51, 234, 0.1),
        transparent 50%)
    `
  },
  animate: {
    backgroundPosition: ["0% 0%", "100% 100%"],
    transition: {
      duration: 10,
      repeat: Infinity,
      repeatType: "reverse",
      ease: "linear"
    }
  }
};

export const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0, 
    transition: { 
      type: 'spring', 
      stiffness: 200,
      damping: 25 
    } 
  }
};
