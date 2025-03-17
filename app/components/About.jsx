'use client'
import React, { useRef } from 'react'
import { motion, useScroll, useTransform, useInView } from 'framer-motion'
import { useTheme } from '../context/ThemeContext'
import { useCursorHandlers } from '../context/CursorContext'
import { 
  HiCode, 
  HiDatabase, 
  HiLightningBolt, 
  HiTerminal,
  HiGlobe,
  HiChip,
  HiCloud,
  HiDesktopComputer,
  HiDeviceMobile
} from 'react-icons/hi'

const About = () => {
  const { isDarkMode } = useTheme()
  const sectionRef = useRef(null)
  const headingRef = useRef(null)
  const isHeadingInView = useInView(headingRef, { once: true, margin: "-100px 0px -100px 0px" })
  const textHandlers = useCursorHandlers('text')
  
  // Enhanced scroll animations
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  })
  
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0])
  const y = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [100, 0, 0, -100])

  // Experience timeline data
  const experience = [
    {
      period: "2023 - Present",
      role: "Final Year BE Student",
      company: "CSE AI and ML Specialization",
      description: "Completing Bachelor of Engineering with focus on Artificial Intelligence and Machine Learning, working on innovative projects applying AI to real-world problems."
    },
    {
      period: "2022 - 2023",
      role: "AI Research Assistant",
      company: "University Research Lab",
      description: "Assisted in implementing machine learning models for data analysis, focusing on computer vision applications and model optimization techniques."
    },
    {
      period: "2020 - 2022",
      role: "Programming Mentor",
      company: "Campus Tech Club",
      description: "Led programming workshops teaching fundamentals of Python, AI concepts, and web development to junior students."
    }
  ];

  // Skills categorized by domain
  const frontendSkills = [
    { name: 'React', icon: <HiCode /> },
    { name: 'Next.js', icon: <HiGlobe /> },
    { name: 'TypeScript', icon: <HiTerminal /> },
    { name: 'Tailwind CSS', icon: <HiDesktopComputer /> },
    { name: 'JavaScript', icon: <HiCode /> },
    { name: 'CSS/HTML', icon: <HiDeviceMobile /> }
  ];
  
  const backendSkills = [
    { name: 'Python', icon: <HiTerminal /> },
    { name: 'Flask', icon: <HiCode /> },
    { name: 'FastAPI', icon: <HiCloud /> },
    { name: 'Node.js', icon: <HiCode /> },
    { name: 'MongoDB', icon: <HiDatabase /> },
    { name: 'SQL', icon: <HiDatabase /> }
  ];
  
  const aiSkills = [
    { name: 'TensorFlow', icon: <HiChip /> },
    { name: 'PyTorch', icon: <HiChip /> },
    { name: 'Scikit-learn', icon: <HiLightningBolt /> },
    { name: 'Computer Vision', icon: <HiDeviceMobile /> },
    { name: 'NLP', icon: <HiCloud /> },
    { name: 'LLM Fine-tuning', icon: <HiLightningBolt /> }
  ];

  return (
    <section
      id="about"
      ref={sectionRef}
      className="relative py-24 md:py-32 overflow-hidden bg-white"
    >
      {/* Background elements */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-white" />
        
        {/* Grid Pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(0,0,0,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(0,0,0,0.03)_1px,transparent_1px)]
          bg-[size:4rem_4rem] mask-image-radial"
        />
        
        {/* Gradient accent */}
        <div className="absolute right-0 bottom-0 w-[800px] h-[800px] rounded-full opacity-10 blur-3xl
          bg-gradient-to-tl from-primary-100 via-primary-50/50 to-transparent"
        />
      </div>

      <div className="container-lg relative z-10">
        <motion.div 
          style={{ opacity, y }}
          className="max-w-6xl mx-auto"
        >
          {/* Section heading with AOI styling */}
          <div className="flex flex-col items-center text-center mb-24 md:mb-36 space-y-4">
            <motion.div
              ref={headingRef}
              initial={{ opacity: 0, y: 50 }}
              animate={isHeadingInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
              className="flex flex-col items-center"
            >
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={isHeadingInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
                className="inline-flex items-center justify-center mb-6 px-4 py-1.5 rounded-full bg-black text-white text-xs font-medium tracking-wider"
              >
                ABOUT ME
              </motion.div>
              <h2 className="aoi-heading text-5xl md:text-6xl lg:text-7xl font-medium leading-[0.9] text-black max-w-xl">
                AI Engineer Building <span className="text-stroke">Intelligent Solutions</span>
              </h2>
            </motion.div>
          </div>

          {/* Bio and image grid with enhanced animations */}
          <div className="grid md:grid-cols-12 gap-16 md:gap-12 mb-36">
            {/* Bio content */}
            <motion.div 
              className="md:col-span-7 space-y-8"
              initial={{ opacity: 0, x: -50 }}
              animate={isHeadingInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 1, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
            >
              <div className="prose prose-lg max-w-none">
                <p className="aoi-subheading text-xl text-black mb-6" {...textHandlers}>
                  I'm Rudradev Myadara, an AI engineer and final year CSE student specializing in 
                  creating intelligent solutions that combine AI innovation with practical applications.
                </p>
                
                <p className="text-lg text-black/70 mb-6" {...textHandlers}>
                  Currently completing my Bachelor of Engineering in Computer Science with 
                  specialization in AI and Machine Learning. I focus on developing 
                  applications that leverage neural networks, computer vision, and NLP to 
                  solve meaningful problems. My approach combines technical expertise with 
                  a strong understanding of AI ethics and responsible deployment.
                </p>
                
                <p className="text-lg text-black/70" {...textHandlers}>
                  I'm passionate about the intersection of AI and software engineering, 
                  creating systems that are not just intelligent but also robust, scalable, 
                  and user-friendly. My goal is to build AI solutions that make a positive 
                  impact through thoughtful implementation of cutting-edge technologies.
                </p>
              </div>
            </motion.div>
            
            {/* Image with accent decorations */}
            <motion.div 
              className="md:col-span-5"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={isHeadingInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 1, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
            >
              <div className="relative aspect-[4/5] rounded-xl overflow-hidden">
                {/* Replace this with your actual profile image */}
                <div className="absolute inset-0 flex items-center justify-center bg-slate-100">
                  <span className="text-slate-400 text-sm">
                    Profile Image
                  </span>
                </div>
                
                {/* Decorative elements */}
                <motion.div 
                  className="absolute bottom-0 left-0 right-0 h-1/3 bg-gradient-to-t from-black/30 to-transparent z-10"
                  initial={{ opacity: 0 }}
                  animate={isHeadingInView ? { opacity: 1 } : {}}
                  transition={{ duration: 0.8, delay: 0.7 }}
                />
                
                {/* Badge overlays with AOI styling */}
                <motion.div 
                  className="absolute top-4 right-4 px-3 py-1 rounded-full bg-black text-white text-xs font-medium tracking-wider z-20"
                  initial={{ opacity: 0, y: -10 }}
                  animate={isHeadingInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.8, delay: 0.8 }}
                >
                  AI Engineer
                </motion.div>
                
                <motion.div 
                  className="absolute bottom-4 left-4 px-3 py-1 rounded-full bg-black text-white text-xs font-medium tracking-wider z-20"
                  initial={{ opacity: 0, y: 10 }}
                  animate={isHeadingInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.8, delay: 0.9 }}
                >
                  Full Stack Dev
                </motion.div>
              </div>
            </motion.div>
          </div>

          {/* Experience timeline with AOI styling */}
          <motion.div 
            className="mb-36"
            initial={{ opacity: 0, y: 50 }}
            animate={isHeadingInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 1, delay: 0.6, ease: [0.22, 1, 0.36, 1] }}
          >
            <h3 className="aoi-heading text-4xl md:text-5xl text-black text-center mb-16">Professional Experience</h3>
            
            <div className="space-y-16 relative">
              {/* Timeline line */}
              <div className="absolute left-0 md:left-1/2 top-0 bottom-0 w-px bg-black/10 transform md:translate-x-[-0.5px]"></div>
              
              {experience.map((item, index) => (
                <motion.div 
                  key={index}
                  className={`relative grid md:grid-cols-2 gap-12 items-center ${
                    index % 2 === 0 ? 'md:text-right' : 'md:text-left md:flex-row-reverse'
                  }`}
                  initial={{ opacity: 0, y: 30 }}
                  animate={isHeadingInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.8, delay: 0.3 + (index * 0.2), ease: [0.22, 1, 0.36, 1] }}
                >
                  {/* Timeline dot */}
                  <motion.div 
                    className="absolute left-[-8px] md:left-1/2 top-0 md:top-1/2 w-5 h-5 rounded-full bg-black border-2 border-white transform md:translate-x-[-50%] md:translate-y-[-50%] z-10"
                    initial={{ scale: 0 }}
                    animate={isHeadingInView ? { scale: 1 } : {}}
                    transition={{ duration: 0.5, delay: 0.4 + (index * 0.2), type: 'spring' }}
                  ></motion.div>
                  
                  {/* Content */}
                  <div className={`${index % 2 === 0 ? 'md:text-right' : 'md:text-left'} ${index % 2 === 1 ? 'md:col-start-1' : ''}`}>
                    <span className="text-sm font-medium text-black inline-block mb-2 px-3 py-1 rounded-full bg-black/5">{item.period}</span>
                    <h4 className="text-2xl font-medium mb-2">{item.role}</h4>
                    <div className="text-xl text-black/80 mb-3">{item.company}</div>
                    <p className="text-black/70">{item.description}</p>
                  </div>
                  
                  <div></div> {/* Empty div to maintain grid layout */}
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Skills section with AOI styling */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={isHeadingInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 1, delay: 0.8, ease: [0.22, 1, 0.36, 1] }}
          >
            <h3 className="aoi-heading text-4xl md:text-5xl text-black text-center mb-16">Skills & Technologies</h3>
            
            <div className="grid md:grid-cols-3 gap-12">
              {/* Frontend skills with enhanced styling */}
              <motion.div 
                className="p-8 rounded-2xl bg-white border border-black/10 hover-lift"
                initial={{ opacity: 0, y: 30 }}
                animate={isHeadingInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.8, delay: 0.9, ease: [0.22, 1, 0.36, 1] }}
              >
                <h4 className="text-2xl font-medium mb-6 text-center">Frontend</h4>
                <div className="grid grid-cols-2 gap-4">
                  {frontendSkills.map((skill, index) => (
                    <motion.div 
                      key={index}
                      className="flex items-center gap-2 text-black/80"
                      initial={{ opacity: 0, x: -10 }}
                      animate={isHeadingInView ? { opacity: 1, x: 0 } : {}}
                      transition={{ duration: 0.5, delay: 1 + (index * 0.05) }}
                    >
                      <span className="text-lg">{skill.icon}</span>
                      <span>{skill.name}</span>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
              
              {/* Backend skills with enhanced styling */}
              <motion.div 
                className="p-8 rounded-2xl bg-white border border-black/10 hover-lift"
                initial={{ opacity: 0, y: 30 }}
                animate={isHeadingInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.8, delay: 1.0, ease: [0.22, 1, 0.36, 1] }}
              >
                <h4 className="text-2xl font-medium mb-6 text-center">Backend</h4>
                <div className="grid grid-cols-2 gap-4">
                  {backendSkills.map((skill, index) => (
                    <motion.div 
                      key={index}
                      className="flex items-center gap-2 text-black/80"
                      initial={{ opacity: 0, x: -10 }}
                      animate={isHeadingInView ? { opacity: 1, x: 0 } : {}}
                      transition={{ duration: 0.5, delay: 1.1 + (index * 0.05) }}
                    >
                      <span className="text-lg">{skill.icon}</span>
                      <span>{skill.name}</span>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
              
              {/* AI skills with enhanced styling */}
              <motion.div 
                className="p-8 rounded-2xl bg-white border border-black/10 hover-lift"
                initial={{ opacity: 0, y: 30 }}
                animate={isHeadingInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.8, delay: 1.1, ease: [0.22, 1, 0.36, 1] }}
              >
                <h4 className="text-2xl font-medium mb-6 text-center">AI & ML</h4>
                <div className="grid grid-cols-2 gap-4">
                  {aiSkills.map((skill, index) => (
                    <motion.div 
                      key={index}
                      className="flex items-center gap-2 text-black/80"
                      initial={{ opacity: 0, x: -10 }}
                      animate={isHeadingInView ? { opacity: 1, x: 0 } : {}}
                      transition={{ duration: 0.5, delay: 1.2 + (index * 0.05) }}
                    >
                      <span className="text-lg">{skill.icon}</span>
                      <span>{skill.name}</span>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}

export default About
