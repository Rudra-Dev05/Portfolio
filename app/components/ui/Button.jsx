import { motion } from 'framer-motion';

export const Button = ({ 
  children, 
  variant = 'primary',
  className = '',
  ...props 
}) => {
  const baseClass = `inline-flex items-center justify-center gap-2 px-6 py-3
    rounded-xl font-medium transition-all duration-300`;
  
  const variants = {
    primary: `bg-gradient-to-r from-violet-600 to-indigo-600 text-white
      hover:from-violet-700 hover:to-indigo-700 shadow-lg hover:shadow-indigo-500/25`,
    secondary: `bg-white/10 hover:bg-white/20 text-white`,
    outline: `border-2 border-violet-500/20 hover:border-violet-500/40
      text-violet-500 hover:text-violet-600`
  };

  return (
    <motion.button
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className={`${baseClass} ${variants[variant]} ${className}`}
      {...props}
    >
      {children}
    </motion.button>
  );
};
