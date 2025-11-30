'use client'
import React, { useEffect } from 'react'
import { useParams, useRouter } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { projects } from '../../data/projects'
import { useTheme } from '../../context/ThemeContext'

export default function ProjectContent() {
  const params = useParams()
  const router = useRouter()
  const { isDarkMode } = useTheme()
  
  const slug = params.slug
  const project = projects.find(p => p.slug === slug)
  
  // Find next project for navigation
  const currentIndex = projects.findIndex(p => p.slug === slug)
  const nextProject = projects[(currentIndex + 1) % projects.length]

  useEffect(() => {
    if (project) {
      document.title = `${project.title} | Rudradev Myadara`
    }
  }, [project])

  if (!project) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white dark:bg-black text-black dark:text-white">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4">Project Not Found</h1>
          <Link href="/" className="underline hover:text-black/70 dark:hover:text-white/70">Back to Home</Link>
        </div>
      </div>
    )
  }

  return (
    <main className="bg-white dark:bg-black min-h-screen transition-colors duration-500">
      {/* Hero Section */}
      <section className="relative h-[60vh] md:h-[80vh] w-full overflow-hidden">
        <Image
          src={project.image}
          alt={project.title}
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-black/40" />
        
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="container-lg text-center text-white">
            <motion.span 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
              className="inline-block text-sm md:text-base font-medium uppercase tracking-widest mb-4"
            >
              {project.category}
            </motion.span>
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="aoi-heading text-4xl md:text-6xl lg:text-8xl font-bold uppercase tracking-tight"
            >
              {project.title}
            </motion.h1>
          </div>
        </div>
      </section>

      {/* Content Section */}
      <section className="py-24 px-6 md:px-12">
        <div className="max-w-[1000px] mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-12">
            
            {/* Project Info Sidebar */}
            <div className="md:col-span-4 space-y-8">
              <div>
                <h3 className="text-sm font-medium uppercase tracking-wider text-black/50 dark:text-white/50 mb-2">Role</h3>
                <p className="text-lg text-black dark:text-white">Design & Development</p>
              </div>
              
              <div>
                <h3 className="text-sm font-medium uppercase tracking-wider text-black/50 dark:text-white/50 mb-2">Tech Stack</h3>
                <ul className="text-lg text-black dark:text-white space-y-1">
                  {project.techStack.map((tech) => (
                    <li key={tech}>{tech}</li>
                  ))}
                </ul>
              </div>
              
              <div>
                <h3 className="text-sm font-medium uppercase tracking-wider text-black/50 dark:text-white/50 mb-2">Link</h3>
                <a 
                  href={project.link} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-lg text-black dark:text-white underline hover:no-underline"
                >
                  Visit Live Site
                </a>
              </div>
            </div>

            {/* Main Description */}
            <div className="md:col-span-8">
              <h2 className="text-2xl md:text-3xl font-medium mb-8 text-black dark:text-white leading-tight">
                {project.description}
              </h2>
              
              <div className="space-y-6 text-lg text-black/80 dark:text-white/80 leading-relaxed">
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                </p>
                <p>
                  Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Next Project Navigation */}
      <section className="py-24 border-t border-black/10 dark:border-white/10">
        <div className="container-lg text-center">
          <p className="text-sm font-medium uppercase tracking-widest text-black/50 dark:text-white/50 mb-4">Next Project</p>
          <Link href={`/work/${nextProject.slug}`} className="group inline-block">
            <h2 className="aoi-heading text-4xl md:text-6xl lg:text-7xl font-bold uppercase tracking-tight text-black dark:text-white group-hover:text-black/70 dark:group-hover:text-white/70 transition-colors duration-300">
              {nextProject.title}
            </h2>
          </Link>
        </div>
      </section>
    </main>
  )
}
