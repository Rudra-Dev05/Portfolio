'use client'
import React, { useRef } from 'react'
import { motion, useScroll, useTransform, useInView } from 'framer-motion'
import Link from 'next/link'
import { useTheme } from '../context/ThemeContext'
import { useCursorHandlers } from '../context/CursorContext'

const Work = () => {
  const { isDarkMode } = useTheme()
  const sectionRef = useRef(null)
  const headingRef = useRef(null)
  const isHeadingInView = useInView(headingRef, { once: true, margin: "-100px 0px -100px 0px" })
  const linkHandlers = useCursorHandlers('link')
  
  // Enhanced scroll animations
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  })
  
  const opacity = useTransform(scrollYProgress, [0, 0.1, 0.9, 1], [0, 1, 1, 0])
  const y = useTransform(scrollYProgress, [0, 0.1, 0.9, 1], [50, 0, 0, -50])

  // Project data exactly like Haolun Yang's site
  const projects = [
    {
      id: 1,
      title: "Red Bull TV for visionOS Immersive Media",
      link: "https://example.com/red-bull-tv"
    },
    {
      id: 2,
      title: "SixD SwiftUI & Interaction Design",
      link: "https://example.com/sixd"
    },
    {
      id: 3,
      title: "Oxygen Spatial Brainstorming with AI",
      link: "https://example.com/oxygen"
    },
    {
      id: 4,
      title: "Radius Intuitive Dream Job Finder",
      link: "https://example.com/radius"
    },
    {
      id: 5,
      title: "Geometry Nodes Lab",
      link: "https://example.com/geometry-nodes"
    },
    {
      id: 6,
      title: "Spatial Loading",
      link: "https://example.com/spatial-loading"
    }
  ];

  return (
    <section
      id="work"
      ref={sectionRef}
      className="relative py-24 md:py-32 bg-white"
    >
      <div className="max-w-[1400px] mx-auto px-6 md:px-10">
        <motion.div 
          style={{ opacity, y }}
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
              <h2 className="aoi-heading text-4xl md:text-5xl lg:text-6xl font-medium leading-[1.1] text-black mb-8">
                I designed and prototyped multiple web apps to explore modern frameworks.
              </h2>
            </motion.div>
          </div>

          {/* Project list with enhanced animations and styling */}
          <div className="space-y-16 md:space-y-24">
            {projects.map((project, index) => (
              <ProjectCard 
                key={project.id} 
                project={project} 
                index={index}
                isHeadingInView={isHeadingInView} 
                linkHandlers={linkHandlers}
              />
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}

const ProjectCard = ({ project, index, isHeadingInView, linkHandlers }) => {
  const projectRef = useRef(null)
  const isProjectInView = useInView(projectRef, { once: true, margin: "-10% 0px" })
  
  // Split text for character animation
  const titleChars = project.title.split('')
  
  return (
    <motion.div
      ref={projectRef}
      initial={{ opacity: 0, y: 50 }}
      animate={isHeadingInView && isProjectInView ? { opacity: 1, y: 0 } : {}}
      transition={{ 
        duration: 1, 
        delay: 0.2 + (index * 0.1), 
        ease: [0.22, 1, 0.36, 1] 
      }}
      className="group reveal-item"
    >
      <Link 
        href={project.link} 
        className="block hover-lift"
        {...linkHandlers}
      >
        <div className="overflow-hidden">
          <h3 className="aoi-heading text-2xl md:text-3xl lg:text-4xl font-medium text-black/80 group-hover:text-black transition-colors duration-500">
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
      </Link>
    </motion.div>
  )
}

export default Work
