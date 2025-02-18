'use client'
import { motion } from 'framer-motion';

export const GradientOverlay = () => (
  <div className="absolute inset-0 overflow-hidden">
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
      className="absolute inset-0 bg-gradient-overlay opacity-20"
    />
    <div className="absolute inset-0 bg-[url('/noise-texture.png')] mix-blend-soft-light opacity-30" />
  </div>
);
