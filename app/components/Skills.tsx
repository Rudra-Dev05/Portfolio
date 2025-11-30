'use client'
import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'


interface Skill {
  name: string
  category: 'development' | 'design' | 'ai'
  level: string
  icon?: string
}

const skills: Skill[] = [
  // Elite Stack (The "Google Scale" Tools)
  { name: 'Go (Golang)', category: 'development', level: 'Expert' },
  { name: 'Rust', category: 'development', level: 'Advanced' },
  { name: 'Kubernetes', category: 'development', level: 'Expert' },
  { name: 'gRPC & Protobuf', category: 'development', level: 'Advanced' },
  { name: 'Bazel', category: 'development', level: 'Intermediate' },
  { name: 'Terraform', category: 'development', level: 'Advanced' },

  // Core Engineering
  { name: 'React & Next.js', category: 'development', level: 'Expert' },
  { name: 'TypeScript', category: 'development', level: 'Expert' },
  { name: 'PostgreSQL', category: 'development', level: 'Advanced' },
  { name: 'CockroachDB', category: 'development', level: 'Intermediate' },
  { name: 'Cassandra', category: 'development', level: 'Intermediate' },
  
  // AI & Design
  { name: 'LLMs & RAG', category: 'ai', level: 'Advanced' },
  { name: 'System Design', category: 'design', level: 'Expert' },
  { name: 'Figma', category: 'design', level: 'Advanced' },

  // Salesforce Ecosystem
  { name: 'Apex', category: 'development', level: 'Intermediate' },
  { name: 'Lightning Web Components (LWC)', category: 'development', level: 'Intermediate' },
  { name: 'Salesforce Administration', category: 'development', level: 'Intermediate' },
]

const Skills = () => {
  const [activeCategory, setActiveCategory] = useState<'all' | 'development' | 'design' | 'ai'>('all')


  const filteredSkills = activeCategory === 'all' 
    ? skills 
    : skills.filter(skill => skill.category === activeCategory)

  const categories = [
    { id: 'all', label: 'All' },
    { id: 'development', label: 'Dev' },
    { id: 'design', label: 'Design' },
    { id: 'ai', label: 'AI' },
  ]

  return (
    <div className="w-full">
      <div className="flex flex-wrap gap-4 mb-12">
        {categories.map((cat) => (
          <button
            key={cat.id}
            onClick={() => setActiveCategory(cat.id as any)}
            className={`
              px-6 py-2 rounded-full text-lg font-medium transition-all duration-300
              ${activeCategory === cat.id 
                ? 'bg-black text-white dark:bg-white dark:text-black' 
                : 'bg-gray-100 dark:bg-white/10 text-black/60 dark:text-white/60 hover:bg-gray-200 dark:hover:bg-white/20'
              }
            `}

          >
            {cat.label}
          </button>
        ))}
      </div>

      <motion.div 
        layout
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
      >
        <AnimatePresence mode='popLayout'>
          {filteredSkills.map((skill) => (
            <motion.div
              layout
              key={skill.name}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.3 }}
              className="group p-6 rounded-2xl bg-gray-50 dark:bg-white/5 border border-transparent hover:border-black/10 dark:hover:border-white/10 transition-colors"
            >
              <div className="flex justify-between items-start mb-4">
                <span className="text-xs font-medium uppercase tracking-wider text-black/40 dark:text-white/40">
                  {skill.category}
                </span>
                <span className="text-xs font-medium px-2 py-1 rounded-md bg-black/5 dark:bg-white/10 text-black/60 dark:text-white/60">
                  {skill.level}
                </span>
              </div>
              <h3 className="text-xl font-medium text-black dark:text-white group-hover:translate-x-1 transition-transform duration-300">
                {skill.name}
              </h3>
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>
    </div>
  )
}

export default Skills
