import { motion } from 'framer-motion';

export const Card = ({ children, className = '', hover = true }) => {
  const baseClass = `relative overflow-hidden rounded-2xl backdrop-blur-sm
    transition-all duration-300`;
  
  return (
    <motion.div
      whileHover={hover ? { y: -5, scale: 1.01 } : {}}
      className={`${baseClass} ${className}`}
    >
      {children}
    </motion.div>
  );
};
