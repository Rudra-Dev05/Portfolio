'use client'
import React, { useRef, useState } from 'react'
import { motion, useScroll, useTransform, useInView } from 'framer-motion'
import Link from 'next/link'
import Image from 'next/image'
import { useTheme } from '../context/ThemeContext'

import { projects, Project } from '../data/projects'

const Work = () => {
  const { isDarkMode } = useTheme()
  const sectionRef = useRef<HTMLElement>(null)
  const headingRef = useRef<HTMLDivElement>(null)
  const isHeadingInView = useInView(headingRef, { once: true, margin: "-100px 0px -100px 0px" })

  
  // Enhanced scroll animations


  return (
    <section
      id="work"
      ref={sectionRef}
      className="relative py-24 md:py-32 bg-white dark:bg-black transition-colors duration-500"
    >
      <div className="max-w-[1400px] mx-auto px-6 md:px-10">
        <motion.div 
          className="w-full"
        >
          {/* Enhanced section heading with AOI styling */}
          <div className="mb-24 md:mb-36">
            <motion.div
              ref={headingRef}
              initial={{ opacity: 0, y: 50 }}
              animate={isHeadingInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
              className="overflow-hidden"
            >
              <h2 className="aoi-heading text-4xl md:text-5xl lg:text-6xl font-medium leading-[1.1] text-black dark:text-white mb-8">
                I designed and prototyped multiple web apps to explore modern frameworks.
              </h2>
            </motion.div>
          </div>

          {/* Project list with enhanced animations and styling */}
          <div className="space-y-32">
            {projects.map((project, index) => (
              <ProjectCard 
                key={project.id} 
                project={project} 
                index={index}
                isHeadingInView={isHeadingInView} 
              />
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}

interface ProjectCardProps {
  project: Project
  index: number
  isHeadingInView: boolean
}

const ProjectCard = ({ project, index, isHeadingInView }: ProjectCardProps) => {
  const projectRef = useRef<HTMLDivElement>(null)
  const isProjectInView = useInView(projectRef, { once: true, margin: "-10% 0px" })
  const [isHovered, setIsHovered] = useState(false)
  
  // Split text for character animation
  const titleChars = project.title.split('')
  
  return (
    <motion.div
      ref={projectRef}
      initial={{ opacity: 0, y: 50 }}
      animate={isProjectInView ? { opacity: 1, y: 0 } : {}}
      transition={{ 
        duration: 1, 
        delay: 0.2 + (index * 0.1), 
        ease: [0.22, 1, 0.36, 1] 
      }}
      className="group relative"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Link 
        href={`/work/${project.slug}`}
        className="block"
      >
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
          {/* Project Info */}
          <div className="md:col-span-5 order-2 md:order-1 relative z-10">
            <div className="overflow-hidden mb-4">
              <span className="inline-block text-sm font-medium uppercase tracking-wider text-black/60 dark:text-white/60 mb-2">
                {project.category}
              </span>
            </div>
            
            <div className="overflow-hidden">
              <h3 className="aoi-heading text-3xl md:text-4xl lg:text-5xl font-medium text-black dark:text-white transition-colors duration-500">
                {titleChars.map((char, i) => (
                  <motion.span
                    key={i}
                    initial={{ y: '100%', opacity: 0 }}
                    animate={isProjectInView ? { y: 0, opacity: 1 } : {}}
                    transition={{
                      duration: 0.5,
                      delay: 0.3 + (index * 0.1) + (i * 0.01),
                      ease: [0.22, 1, 0.36, 1]
                    }}
                    className="inline-block"
                  >
                    {char === ' ' ? '\u00A0' : char}
                  </motion.span>
                ))}
              </h3>
            </div>
            
            <div className="mt-6 overflow-hidden">
              <motion.div
                initial={{ x: -20, opacity: 0 }}
                animate={isHovered ? { x: 0, opacity: 1 } : { x: -20, opacity: 0 }}
                transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                className="flex items-center gap-2 text-black dark:text-white font-medium"
              >
                <span>View Project</span>
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </motion.div>
            </div>
          </div>
          
          {/* Project Image */}
          <div className="md:col-span-7 order-1 md:order-2">
            <div className="relative aspect-[16/9] overflow-hidden rounded-lg">
              <motion.div
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                className="w-full h-full relative"
              >
                <Image
                  src={project.image}
                  alt={project.title}
                  fill
                  sizes="(max-width: 768px) 100vw, 60vw"
                  className="object-cover transition-all duration-700 grayscale group-hover:grayscale-0"
                />
              </motion.div>
              
              {/* Overlay */}
              <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors duration-500" />
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  )
}

export default Work
