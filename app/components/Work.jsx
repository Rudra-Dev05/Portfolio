'use client'
import React, { memo } from 'react'
import Image from 'next/image'
import { motion, useScroll, useTransform } from 'framer-motion'
import { useTheme } from '../context/ThemeContext'
import { HiExternalLink, HiCode, HiLightningBolt } from 'react-icons/hi'
import { workData } from '../data/projects'

const Work = memo(() => {
  const { isDarkMode } = useTheme();
  const { scrollY } = useScroll();
  const opacity = useTransform(scrollY, [0, 300], [1, 0.3]);

  const ProjectCard = ({ project }) => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      whileHover={{ y: -8 }}
      className={`group relative rounded-2xl overflow-hidden
        ${isDarkMode ? 'bg-white/5' : 'bg-white'}
        border ${isDarkMode ? 'border-white/10' : 'border-black/5'}
        shadow-lg hover:shadow-2xl transition-all duration-300`}
    >
      {/* Updated Project Image */}
      <div className="relative aspect-video overflow-hidden bg-gray-900">
        <Image
          src={project.bgImage}
          alt={project.title}
          width={600}
          height={338}
          className="object-cover w-full h-full transition-transform duration-700 group-hover:scale-110"
          onError={(e) => {
            // Use a default placeholder image if both project image and fallback fail
            e.target.src = '/images/placeholder.jpg';
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/30 to-transparent 
          opacity-0 group-hover:opacity-100 transition-opacity duration-300" 
        />
      </div>

      {/* Project Info */}
      <div className="p-6 space-y-4">
        <h3 className={`text-xl font-bold transition-colors duration-300
          ${isDarkMode ? 'text-white group-hover:text-blue-400' : 
            'text-gray-900 group-hover:text-blue-600'}`}>
          {project.title}
        </h3>
        
        <p className={`text-sm line-clamp-2
          ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
          {project.description}
        </p>

        {/* Tech Stack */}
        <div className="flex flex-wrap gap-2">
          {project.technologies?.map((tech) => (
            <span
              key={tech}
              className={`text-xs px-3 py-1 rounded-full
                ${isDarkMode 
                  ? 'bg-blue-500/10 text-blue-400' 
                  : 'bg-blue-500/10 text-blue-600'}`}
            >
              {tech}
            </span>
          ))}
        </div>

        {/* Project Links */}
        <div className="pt-4 flex items-center justify-between">
          <motion.a
            href={project.demoLink}
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ x: 4 }}
            className={`inline-flex items-center gap-2 text-sm font-medium
              ${isDarkMode ? 'text-blue-400' : 'text-blue-600'}`}
          >
            View Live
            <HiExternalLink className="w-4 h-4" />
          </motion.a>
          
          <motion.a
            href={project.codeLink}
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ x: 4 }}
            className={`inline-flex items-center gap-2 text-sm font-medium
              ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}
          >
            Source Code
            <HiCode className="w-4 h-4" />
          </motion.a>
        </div>
      </div>
    </motion.div>
  );

  return (
    <section className={`relative min-h-screen py-32 
      ${isDarkMode ? 'bg-black' : 'bg-white'}`} id="work">
      {/* Animated Background */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div 
          className="absolute w-full h-full"
          style={{ opacity }}
        >
          {[...Array(30)].map((_, i) => (
            <motion.div
              key={i}
              className={`absolute rounded-full 
                ${isDarkMode ? 'bg-blue-500' : 'bg-violet-300'}`}
              style={{
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
                width: `${Math.random() * 4}px`,
                height: `${Math.random() * 4}px`,
                opacity: isDarkMode ? 0.1 : 0.2,
              }}
              animate={{
                y: [0, Math.random() * 100 - 50],
                opacity: isDarkMode ? [0.1, 0.3, 0.1] : [0.2, 0.4, 0.2],
              }}
              transition={{
                duration: Math.random() * 5 + 5,
                repeat: Infinity,
                ease: "linear"
              }}
            />
          ))}
        </motion.div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center max-w-3xl mx-auto mb-20"
        >
          <motion.div
            className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm mb-6
              ${isDarkMode ? 'bg-blue-500/10 text-blue-400' : 'bg-blue-500/10 text-blue-600'}`}
          >
            <HiLightningBolt className="w-4 h-4" />
            Featured Projects
          </motion.div>
          <h2 className={`text-4xl md:text-5xl font-bold mb-6
            ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
            Recent Adventures in Code
          </h2>
          <p className={`text-lg ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
            A collection of projects that showcase my passion for building innovative solutions
          </p>
        </motion.div>

        {/* Projects Grid with Error Boundary */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {workData?.map((project, index) => (
            <ProjectCard key={project.title} project={project} />
          ))}
        </div>

        {/* Fallback for empty projects */}
        {(!workData || workData.length === 0) && (
          <div className={`text-center py-20 ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
            Projects coming soon...
          </div>
        )}
      </div>
    </section>
  );
});

Work.displayName = 'Work';
export default Work;
