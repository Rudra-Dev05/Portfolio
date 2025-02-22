'use client'
import React, { useEffect, useRef } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { assets } from '@/assets/assets';
import { useTheme } from '../context/ThemeContext';
import { HiOutlineSparkles, HiArrowRight, HiDownload, HiCode, HiDatabase, HiChartBar } from 'react-icons/hi';

const Header = () => {
  const { isDarkMode } = useTheme();
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll();
  
  // Parallax effects
  const bgY = useTransform(scrollYProgress, [0, 1], ['0%', '100%']);
  const textY = useTransform(scrollYProgress, [0, 1], ['0%', '200%']);
  
  // Stats with animations
  const stats = [
    { icon: <HiCode />, label: 'Full Stack Developer' },
    { icon: <HiDatabase />, label: 'Data Scientist' },
    { icon: <HiChartBar />, label: 'ML Engineer' }
  ];

  return (
    <header id="header" className="relative min-h-[100vh] flex items-center overflow-hidden pt-20">
      {/* Animated Background */}
      <div className="absolute inset-0 w-full h-full">
        <motion.div 
          className={`absolute inset-0 ${isDarkMode ? 'bg-black' : 'bg-white'}`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          {/* Gradient Orbs */}
          <motion.div
            className="absolute top-0 left-0 w-[500px] h-[500px] rounded-full"
            style={{
              background: isDarkMode 
                ? 'radial-gradient(circle, rgba(124,58,237,0.15) 0%, rgba(0,0,0,0) 70%)'
                : 'radial-gradient(circle, rgba(124,58,237,0.1) 0%, rgba(255,255,255,0) 70%)',
              y: bgY
            }}
          />
          <motion.div
            className="absolute bottom-0 right-0 w-[500px] h-[500px] rounded-full"
            style={{
              background: isDarkMode 
                ? 'radial-gradient(circle, rgba(59,130,246,0.15) 0%, rgba(0,0,0,0) 70%)'
                : 'radial-gradient(circle, rgba(59,130,246,0.1) 0%, rgba(255,255,255,0) 70%)',
              y: bgY
            }}
          />
        </motion.div>

        {/* Grid Pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[size:100px_100px] [mask-image:radial-gradient(ellipse_50%_50%_at_50%_50%,black_70%,transparent_100%)]" />
      </div>

      <div className="relative w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-0 items-center">
          {/* Content */}
          <motion.div 
            className="space-y-8"
            style={{ y: textY }}
          >
            {/* Animated Badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              className={`inline-flex items-center gap-2 px-4 py-2 rounded-full 
                ${isDarkMode 
                  ? 'bg-white/5 text-violet-300 border border-violet-500/20' 
                  : 'bg-violet-50 text-violet-600 border border-violet-100'}`}
            >
              <HiOutlineSparkles className="w-5 h-5" />
              <span className="text-sm font-medium">Available for Projects</span>
            </motion.div>

            {/* Title Section */}
            <div className="space-y-4">
              <motion.h1 
                className={`text-5xl sm:text-6xl lg:text-7xl font-bold
                  ${isDarkMode ? 'text-white' : 'text-gray-900'}`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
              >
                Building the
                <span className="block mt-2 text-transparent bg-clip-text bg-gradient-to-r from-violet-500 to-blue-500">
                  Future with AI
                </span>
              </motion.h1>

              {/* Animated Stats */}
              <div className="flex flex-wrap gap-4 pt-4">
                {stats.map((stat, index) => (
                  <motion.div
                    key={stat.label}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className={`flex items-center gap-2 px-4 py-2 rounded-lg
                      ${isDarkMode ? 'bg-white/5' : 'bg-black/5'}`}
                  >
                    <span className={isDarkMode ? 'text-violet-400' : 'text-violet-600'}>
                      {stat.icon}
                    </span>
                    <span className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                      {stat.label}
                    </span>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <motion.a
                href="#contact"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`group flex items-center justify-center gap-2 px-8 py-4 rounded-2xl
                  font-medium text-white transition-all duration-300
                  bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700
                  shadow-lg hover:shadow-xl hover:shadow-purple-500/20`}
              >
                Start a Project
                <HiArrowRight className="w-5 h-5 group-hover:rotate-12 transition-transform" />
              </motion.a>

              <motion.a
                href="/resume.pdf"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`group flex items-center justify-center gap-2 px-8 py-4 rounded-2xl
                  font-medium transition-all duration-300
                  ${isDarkMode 
                    ? 'bg-white/10 hover:bg-white/20 text-white' 
                    : 'bg-black/5 hover:bg-black/10 text-gray-900'}
                  backdrop-blur-sm`}
              >
                Download CV
                <HiDownload className="w-5 h-5 group-hover:translate-y-1 transition-transform" />
              </motion.a>
            </div>
          </motion.div>

          {/* Updated Image Section */}
          <motion.div
            ref={containerRef}
            className="relative w-full max-w-[320px] aspect-[3/4] mx-auto" // Updated sizing
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            <div className="relative h-full">
              {/* Subtle Glow Effect */}
              <div className="absolute inset-0 -left-4 -top-4 bg-gradient-to-r 
                from-purple-500/20 to-blue-500/20 rounded-2xl blur-2xl" />
              
              {/* Main Image Container */}
              <div className={`relative h-full rounded-2xl overflow-hidden
                ${isDarkMode ? 'border border-white/10' : 'border border-black/5'}
                shadow-lg hover:shadow-xl transition-shadow duration-300`}
              >
                <Image
                  src={assets.profile_img.src}
                  alt="Rudradev"
                  fill
                  className="object-cover object-center hover:scale-105 transition-transform duration-700"
                  sizes="(max-width: 768px) 100vw, 320px"
                  priority
                  quality={95}
                />
                <div className={`absolute inset-0 bg-gradient-to-t 
                  ${isDarkMode 
                    ? 'from-black/40 to-transparent' 
                    : 'from-black/20 to-transparent'}`} 
                />
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </header>
  );
};

export default Header;
