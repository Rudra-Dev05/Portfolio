'use client'

import { motion, AnimatePresence } from 'framer-motion';
import React, { useState, useEffect } from 'react';

const LoadingScreen = () => {
  const [currentTextIndex, setCurrentTextIndex] = useState(0);

  const loadingTexts = [
    "Welcome",
    "Exploring",
    "Creating",
    "Designing"
  ];

  useEffect(() => {
    const textInterval = setInterval(() => {
      setCurrentTextIndex(prev => (prev + 1) % loadingTexts.length);
    }, 2000);

    return () => clearInterval(textInterval);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 flex flex-col items-center justify-center bg-[#FDF5E6]"
    >
      <div className="relative w-full max-w-md px-8">
        {/* Main Text Animation */}
        <AnimatePresence mode="wait">
          <motion.div
            key={currentTextIndex}
            initial={{ opacity: 0, y: 20, filter: 'blur(8px)' }}
            animate={{ 
              opacity: 1, 
              y: 0,
              filter: 'blur(0px)',
              transition: { 
                duration: 0.8,
                ease: "easeOut"
              }
            }}
            exit={{ 
              opacity: 0,
              y: -20,
              filter: 'blur(8px)',
              transition: { duration: 0.4 }
            }}
            className="text-center"
          >
            <h2 
              className="text-7xl font-normal mb-2"
              style={{
                fontFamily: 'Raleway, sans-serif',
                background: 'linear-gradient(135deg, #2563eb, #1e40af)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                letterSpacing: '0.05em'
              }}
            >
              {loadingTexts[currentTextIndex]}
            </h2>

            {/* Animated Underline */}
            <motion.div
              className="h-0.5 mx-auto bg-blue-600"
              initial={{ width: 0 }}
              animate={{ 
                width: ['0%', '100%'],
                opacity: [0, 1]
              }}
              transition={{
                duration: 1.2,
                ease: "easeInOut",
                repeat: Infinity,
                repeatType: "reverse"
              }}
            />
          </motion.div>
        </AnimatePresence>
      </div>
    </motion.div>
  );
};

export default LoadingScreen;