'use client'
import React, { useEffect } from 'react'
import { motion } from 'framer-motion'
import { useTheme } from '../context/ThemeContext'
import Link from 'next/link'
import Image from 'next/image'

export default function About() {
  const { isDarkMode } = useTheme()
  
  useEffect(() => {
    document.title = 'About | Rudradev Myadara'
  }, [])
  
  return (
    <main>
      <section className="pt-32 pb-24 px-6 md:px-12">
        <div className="max-w-[1400px] mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="space-y-32 md:space-y-48"
          >
            {/* Hero headline section - large typography */}
            <div>
              <h1 className="text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-medium tracking-tight leading-[1.1] mb-8 text-black">
                Hey! I study code, design, and AI :)
              </h1>
              
              <h2 className="text-xl md:text-2xl lg:text-3xl font-normal max-w-3xl leading-relaxed text-black/80">
                I'm John! Currently a Full Stack Developer & AI Engineer, I'm a problem solver with a passion for creating intuitive digital experiences that blend technology with thoughtful design.
              </h2>
            </div>
            
            {/* Photo grid section */}
            <div className="grid grid-cols-12 gap-4 md:gap-6">
              <motion.div 
                className="col-span-12 md:col-span-8 relative aspect-[16/9] rounded-2xl overflow-hidden"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.2 }}
              >
                <Image
                  src="https://images.unsplash.com/photo-1605379399642-870262d3d051?q=80&w=2812&auto=format&fit=crop"
                  alt="Coding on laptop"
                  fill
                  className="object-cover"
                />
              </motion.div>
              
              <motion.div 
                className="col-span-6 md:col-span-4 relative aspect-square rounded-2xl overflow-hidden"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.3 }}
              >
                <Image
                  src="https://images.unsplash.com/photo-1535223289827-42f1e9919769?q=80&w=1887&auto=format&fit=crop"
                  alt="AI visualization"
                  fill
                  className="object-cover"
                />
              </motion.div>
              
              <motion.div 
                className="col-span-6 md:col-span-4 relative aspect-square rounded-2xl overflow-hidden"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.4 }}
              >
                <Image
                  src="https://images.unsplash.com/photo-1589149098258-3e9102cd63d3?q=80&w=1839&auto=format&fit=crop"
                  alt="Design work"
                  fill
                  className="object-cover"
                />
              </motion.div>
              
              <motion.div 
                className="col-span-12 md:col-span-8 relative aspect-[16/9] rounded-2xl overflow-hidden"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.5 }}
              >
                <Image
                  src="https://images.unsplash.com/photo-1484417894907-623942c8ee29?q=80&w=1932&auto=format&fit=crop"
                  alt="Workspace setup"
                  fill
                  className="object-cover"
                />
              </motion.div>
            </div>
            
            {/* Let's chat section */}
            <div>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-medium leading-tight mb-6 text-black">
                Let's chat!
              </h2>
              
              <p className="text-xl md:text-2xl max-w-3xl mb-12 leading-relaxed text-black/80">
                When I say I'm curious, I'm serious. Would love to hear about your story and if I can assist :)
              </p>
              
              <Link 
                href="#footer"
                className="inline-block text-xl md:text-2xl py-4 px-8 rounded-full bg-black text-white hover:bg-black/90 hover-lift shadow-lg transition-all duration-300 relative overflow-hidden group"
              >
                <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-gray-800 to-black opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
                <span className="relative z-10">Let's Talk</span>
              </Link>
            </div>
            
            {/* Skills section */}
            <div>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-medium leading-tight mb-12 text-black">
                My skills & experience
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-16">
                <div>
                  <h3 className="text-xl md:text-2xl font-medium mb-6 text-black">
                    Development
                  </h3>
                  <ul className="space-y-3 text-lg text-black/80">
                    <li>React & Next.js</li>
                    <li>Node.js & Express</li>
                    <li>Python & Django</li>
                    <li>MongoDB & PostgreSQL</li>
                    <li>TensorFlow & PyTorch</li>
                  </ul>
                </div>
                
                <div>
                  <h3 className="text-xl md:text-2xl font-medium mb-6 text-black">
                    Design
                  </h3>
                  <ul className="space-y-3 text-lg text-black/80">
                    <li>User Experience Design</li>
                    <li>User Interface Design</li>
                    <li>Interaction Design</li>
                    <li>Figma & Adobe Creative Suite</li>
                    <li>Design Systems</li>
                  </ul>
                </div>
              </div>
            </div>
            
            {/* Current status section */}
            <div className="relative">
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-medium leading-tight mb-6 text-black">
                What I'm up to now
              </h2>
              
              <p className="text-xl md:text-2xl max-w-3xl mb-6 leading-relaxed text-black/80">
                Currently accepting new clients for Q1 2023.
              </p>
              
              <ul className="space-y-6 text-lg max-w-3xl text-black/80">
                <li>• Working on AI-powered applications that make complex data accessible and actionable</li>
                <li>• Exploring new interaction patterns for web interfaces using Framer Motion</li>
                <li>• Learning more about 3D visualization techniques with Three.js</li>
                <li>• Based in New York, but working with clients globally</li>
              </ul>
            </div>
          </motion.div>
        </div>
      </section>
    </main>
  )
} 