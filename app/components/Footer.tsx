'use client'
import React, { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { useTheme } from '../context/ThemeContext'
import { footerLinks } from '../data/content'

const Footer = () => {
  const { isDarkMode } = useTheme()
  const footerRef = useRef<HTMLElement>(null)
  const isInView = useInView(footerRef, { once: true, margin: "-10% 0px" })
  
  return (
    <footer 
      id="footer" 
      ref={footerRef}
      className="pt-16 pb-12 md:pt-24 md:pb-16 bg-white dark:bg-black relative z-10"
    >
      <div className="max-w-[1400px] mx-auto px-6 md:px-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="flex flex-col items-start"
        >
          {/* Heading with updated styles */}
          <h2 className="text-2xl md:text-3xl mb-10 text-black dark:text-white font-medium font-unbounded">
            I'm willing to chat and collaborate.
          </h2>
          
          {/* Links with pill design */}
          <div className="flex flex-wrap gap-y-5 gap-x-8 md:gap-x-10">
            {footerLinks.map((link, index) => (
              <FooterLink 
                key={index}
                href={link.href}
                label={link.label}
                isDarkMode={isDarkMode}
              />
            ))}
          </div>
        </motion.div>
      </div>
    </footer>
  )
}

interface FooterLinkProps {
  href: string
  label: string
  isDarkMode: boolean
}

const FooterLink = ({ href, label, isDarkMode }: FooterLinkProps) => {
  return (
    <motion.a 
      href={href} 
      target={href.startsWith('mailto:') || href.startsWith('/') ? undefined : "_blank"}
      rel={href.startsWith('mailto:') || href.startsWith('/') ? undefined : "noopener noreferrer"}
      className="text-base tracking-wide text-black/80 dark:text-white/80 relative overflow-hidden group font-medium font-grotesk glass-light dark:glass-dark backdrop-blur-sm px-5 py-2 rounded-full flex items-center transition-all duration-300"
      whileHover={{ 
        scale: 1.03,
        boxShadow: isDarkMode 
          ? '0 0 10px 1px rgba(255, 255, 255, 0.1)' 
          : '0 0 10px 1px rgba(0, 0, 0, 0.05)' 
      }}
      whileTap={{ scale: 0.98 }}
    >
      {label}
    </motion.a>
  )
}

export default Footer
