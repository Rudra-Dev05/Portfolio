import { motion } from 'framer-motion';

export const GradientWrapper = ({ children, className = '' }) => (
  <div className={`relative overflow-hidden ${className}`}>
    <div className="absolute inset-0 opacity-30">
      <div className="absolute inset-0 bg-gradient-to-br from-violet-500/20 via-fuchsia-500/20 to-cyan-500/20" />
      <motion.div
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.2, 0.3],
        }}
        transition={{ duration: 8, repeat: Infinity }}
        className="absolute -top-40 -right-40 w-96 h-96 bg-fuchsia-500/30 rounded-full blur-3xl"
      />
      <motion.div
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.2, 0.3],
        }}
        transition={{ duration: 8, repeat: Infinity, delay: 4 }}
        className="absolute -bottom-40 -left-40 w-96 h-96 bg-cyan-500/30 rounded-full blur-3xl"
      />
    </div>
    {children}
  </div>
);
