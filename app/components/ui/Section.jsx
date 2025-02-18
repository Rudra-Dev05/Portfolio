import { motion } from 'framer-motion';

export const Section = ({ children, className = '', isDarkMode }) => (
  <motion.section
    initial={{ opacity: 0 }}
    whileInView={{ opacity: 1 }}
    viewport={{ once: true }}
    transition={{ duration: 0.6 }}
    className={`relative min-h-screen flex items-center py-24 px-4 sm:px-6 lg:px-8 
      ${isDarkMode ? 'bg-gray-950' : 'bg-gray-50'} ${className}`}
  >
    <div className="absolute inset-0">
      <div className="absolute inset-0 bg-gradient-to-br from-violet-500/5 via-fuchsia-500/5 to-cyan-500/5" />
      <div className="absolute inset-y-0 right-0 w-1/3 bg-gradient-to-l from-transparent to-white/5 backdrop-blur-3xl" />
    </div>
    {children}
  </motion.section>
);
