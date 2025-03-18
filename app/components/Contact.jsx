'use client'
import React, { useRef, useState } from 'react'
import { motion, useScroll, useTransform, useInView } from 'framer-motion'
import { useTheme } from '../context/ThemeContext'
import { useCursorHandlers } from '../context/CursorContext'
import { HiMail, HiPhone, HiLocationMarker, HiArrowRight, HiCheck, HiX } from 'react-icons/hi'
import { FaGithub, FaLinkedinIn, FaTwitter } from 'react-icons/fa'

const Contact = () => {
  const { isDarkMode } = useTheme()
  const sectionRef = useRef(null)
  const headingRef = useRef(null)
  const formRef = useRef(null)
  const isHeadingInView = useInView(headingRef, { once: true, margin: "-100px 0px -100px 0px" })
  const isFormInView = useInView(formRef, { once: true, margin: "-50px 0px" })
  const textHandlers = useCursorHandlers('text')
  const inputHandlers = useCursorHandlers('input')
  const buttonHandlers = useCursorHandlers('button')
  const linkHandlers = useCursorHandlers('link')

  // Form state
  const [formData, setFormData] = useState({ name: '', email: '', message: '' })
  const [formState, setFormState] = useState({ isSubmitting: false, isSubmitted: false, error: null })
  
  // Scroll animations
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  })
  
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0])
  const y = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [100, 0, 0, -100])

  // Form handlers
  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setFormState({ isSubmitting: true, isSubmitted: false, error: null })
    
    // Simulate form submission
    try {
      await new Promise(resolve => setTimeout(resolve, 1500))
      setFormState({ isSubmitting: false, isSubmitted: true, error: null })
      setFormData({ name: '', email: '', message: '' })
    } catch (error) {
      setFormState({ isSubmitting: false, isSubmitted: false, error: 'There was an error submitting the form. Please try again.' })
    }
  }

  return (
    <section
      id="contact"
      ref={sectionRef}
      className="relative py-24 md:py-32 overflow-hidden"
    >
      {/* Background elements */}
      <div className="absolute inset-0 z-0">
        <div className={`absolute inset-0 ${
          isDarkMode
            ? 'bg-slate-950'
            : 'bg-slate-50'
        }`} />
        
        {/* Grid Pattern */}
        <div className={`absolute inset-0 ${
          isDarkMode 
            ? 'bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)]' 
            : 'bg-[linear-gradient(rgba(0,0,0,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(0,0,0,0.05)_1px,transparent_1px)]'}
          bg-[size:4rem_4rem] mask-image-radial
        `} />
        
        {/* Gradient accent */}
        <div className={`absolute right-0 top-0 w-[800px] h-[800px] rounded-full opacity-10 blur-3xl
          ${isDarkMode 
            ? 'bg-gradient-to-bl from-accent-500/30 via-accent-800/20 to-transparent' 
            : 'bg-gradient-to-bl from-accent-100 via-accent-50/50 to-transparent'}
        `} />
      </div>

      <div className="container-lg relative z-10">
        <motion.div 
          style={{ opacity, y }}
          className="max-w-6xl mx-auto"
        >
          {/* Section heading */}
          <div className="flex flex-col items-center text-center mb-16 md:mb-24 space-y-4">
            <motion.div
              ref={headingRef}
              initial={{ opacity: 0, y: 20 }}
              animate={isHeadingInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, ease: [0.19, 1, 0.22, 1] }}
              className="flex flex-col items-center"
            >
              <div className="inline-flex items-center justify-center mb-3 px-3 py-1 rounded-full bg-accent-100 dark:bg-accent-900/30 text-accent-600 dark:text-accent-400 text-xs font-medium tracking-wider">
                GET IN TOUCH
              </div>
              <h2 className="heading-lg max-w-xl">
                Let's <span className="text-gradient-accent">Connect</span> & Create Together
              </h2>
            </motion.div>
          </div>

          {/* Contact content */}
          <div className="grid md:grid-cols-12 gap-12 md:gap-8">
            {/* Contact info */}
            <motion.div 
              className="md:col-span-5 space-y-8"
              initial={{ opacity: 0, x: -20 }}
              animate={isHeadingInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.2, ease: [0.19, 1, 0.22, 1] }}
            >
              <div className="prose prose-lg dark:prose-invert max-w-none mb-8">
                <p className="text-body-lg text-slate-700 dark:text-slate-300" {...textHandlers}>
                  I'm currently open to new opportunities and collaborations. Whether you have a project in mind, a question, or just want to say hello, feel free to reach out.
                </p>
              </div>
              
              {/* Contact details */}
              <div className="space-y-4">
                <ContactItem 
                  icon={<HiMail />}
                  title="Email"
                  content="myadararudradev@gmail.com"
                  link="mailto:myadararudradev@gmail.com"
                  isDarkMode={isDarkMode}
                  {...linkHandlers}
                />
                
                <ContactItem 
                  icon={<HiPhone />}
                  title="Phone"
                  content="+1 (555) 123-4567"
                  link="tel:+15551234567"
                  isDarkMode={isDarkMode}
                  {...linkHandlers}
                />
                
                <ContactItem 
                  icon={<HiLocationMarker />}
                  title="Location"
                  content="Hyderabad, India"
                  isDarkMode={isDarkMode}
                />
              </div>
              
              {/* Social links */}
              <div className="pt-4">
                <h3 className="text-lg font-medium mb-4">Connect on social media</h3>
                <div className="flex gap-4">
                  <SocialLink 
                    icon={<FaGithub />} 
                    href="https://github.com/yourusername" 
                    label="GitHub"
                    isDarkMode={isDarkMode}
                    {...linkHandlers}
                  />
                  <SocialLink 
                    icon={<FaLinkedinIn />} 
                    href="https://linkedin.com/in/yourusername" 
                    label="LinkedIn"
                    isDarkMode={isDarkMode}
                    {...linkHandlers}
                  />
                  <SocialLink 
                    icon={<FaTwitter />} 
                    href="https://twitter.com/yourusername" 
                    label="Twitter"
                    isDarkMode={isDarkMode}
                    {...linkHandlers}
                  />
                </div>
              </div>
            </motion.div>
            
            {/* Contact form */}
            <motion.div 
              ref={formRef}
              className="md:col-span-7"
              initial={{ opacity: 0, x: 20 }}
              animate={isHeadingInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.4, ease: [0.19, 1, 0.22, 1] }}
            >
              <div className={`card p-6 md:p-8 ${
                isDarkMode 
                  ? 'bg-slate-900 border-slate-800' 
                  : 'bg-white border-slate-200'
              }`}>
                <h3 className="text-xl font-display font-medium mb-6">Send a message</h3>
                
                {formState.isSubmitted ? (
                  <motion.div 
                    className="flex flex-col items-center justify-center py-8 text-center"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.4 }}
                  >
                    <div className={`w-16 h-16 rounded-full flex items-center justify-center mb-6 ${
                      isDarkMode ? 'bg-accent-900/30 text-accent-400' : 'bg-accent-100 text-accent-600'
                    }`}>
                      <HiCheck className="w-8 h-8" />
                    </div>
                    <h4 className="text-xl font-medium mb-2">Message sent!</h4>
                    <p className="text-slate-600 dark:text-slate-400 mb-6">
                      Thank you for reaching out. I'll get back to you as soon as possible.
                    </p>
                    <button
                      type="button"
                      onClick={() => setFormState(prev => ({ ...prev, isSubmitted: false }))}
                      className="btn-secondary btn-sm"
                      {...buttonHandlers}
                    >
                      Send another message
                    </button>
                  </motion.div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="space-y-4">
                      <div>
                        <label 
                          htmlFor="name" 
                          className="block text-sm font-medium mb-2 text-slate-700 dark:text-slate-300"
                        >
                          Name
                        </label>
                        <input
                          type="text"
                          id="name"
                          name="name"
                          required
                          value={formData.name}
                          onChange={handleChange}
                          className={`form-input w-full ${
                            isDarkMode
                              ? 'bg-slate-800 border-slate-700 focus:border-accent-500 text-white'
                              : 'bg-white border-slate-300 focus:border-accent-500 text-slate-900'
                          }`}
                          {...inputHandlers}
                        />
                      </div>
                      
                      <div>
                        <label 
                          htmlFor="email" 
                          className="block text-sm font-medium mb-2 text-slate-700 dark:text-slate-300"
                        >
                          Email
                        </label>
                        <input
                          type="email"
                          id="email"
                          name="email"
                          required
                          value={formData.email}
                          onChange={handleChange}
                          className={`form-input w-full ${
                            isDarkMode
                              ? 'bg-slate-800 border-slate-700 focus:border-accent-500 text-white'
                              : 'bg-white border-slate-300 focus:border-accent-500 text-slate-900'
                          }`}
                          {...inputHandlers}
                        />
                      </div>
                      
                      <div>
                        <label 
                          htmlFor="message" 
                          className="block text-sm font-medium mb-2 text-slate-700 dark:text-slate-300"
                        >
                          Message
                        </label>
                        <textarea
                          id="message"
                          name="message"
                          required
                          rows="5"
                          value={formData.message}
                          onChange={handleChange}
                          className={`form-textarea w-full resize-none ${
                            isDarkMode
                              ? 'bg-slate-800 border-slate-700 focus:border-accent-500 text-white'
                              : 'bg-white border-slate-300 focus:border-accent-500 text-slate-900'
                          }`}
                          {...inputHandlers}
                        />
                      </div>
                    </div>
                    
                    {formState.error && (
                      <div className="p-3 bg-red-50 border border-red-200 rounded-md text-red-600 text-sm flex items-start">
                        <HiX className="w-5 h-5 mr-2 flex-shrink-0 mt-0.5" />
                        <span>{formState.error}</span>
                      </div>
                    )}
                    
                    <div>
                      <button
                        type="submit"
                        disabled={formState.isSubmitting}
                        className={`btn-accent btn-lg w-full group ${formState.isSubmitting ? 'opacity-80 cursor-not-allowed' : ''}`}
                        {...buttonHandlers}
                      >
                        {formState.isSubmitting ? (
                          <span className="flex items-center justify-center">
                            <svg className="animate-spin -ml-1 mr-3 h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                            Sending...
                          </span>
                        ) : (
                          <span className="flex items-center justify-center">
                            Send Message
                            <HiArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" />
                          </span>
                        )}
                      </button>
                    </div>
                  </form>
                )}
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

const ContactItem = ({ icon, title, subtitle, content, link, isDarkMode, ...props }) => (
  <div className="flex items-start gap-4">
    <div className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 ${
      isDarkMode
        ? 'bg-slate-800 text-accent-400'
        : 'bg-slate-100 text-accent-600'
    }`}>
      {icon}
    </div>
    <div>
      <h4 className="text-sm font-medium mb-1 text-slate-500 dark:text-slate-400">{title}</h4>
      {link ? (
        <a 
          href={link} 
          className="text-lg font-medium text-slate-900 dark:text-white hover:text-accent-600 dark:hover:text-accent-400 transition-colors"
          {...props}
        >
          {content}
        </a>
      ) : (
        <p className="text-lg font-medium text-slate-900 dark:text-white">{content}</p>
      )}
    </div>
  </div>
)

const SocialLink = ({ icon, href, label, isDarkMode, ...props }) => (
  <a
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    aria-label={label}
    className={`w-12 h-12 rounded-full flex items-center justify-center transition-colors ${
      isDarkMode
        ? 'bg-slate-800 text-white hover:bg-accent-900/50 hover:text-accent-400'
        : 'bg-slate-100 text-slate-600 hover:bg-accent-100 hover:text-accent-600'
    }`}
    {...props}
  >
    {icon}
  </a>
)

export default Contact
