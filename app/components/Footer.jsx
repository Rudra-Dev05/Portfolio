'use client'
import React, { memo } from 'react'
import { motion } from "framer-motion"
import { useTheme } from '../context/ThemeContext'
import { FaGithub, FaLinkedin, FaTwitter } from 'react-icons/fa'

const Footer = memo(() => {
  const { isDarkMode } = useTheme()

  const socialLinks = [
    { name: 'Github', url: 'https://github.com/Rudra-Dev05', icon: <FaGithub /> },
    { name: 'LinkedIn', url: 'https://www.linkedin.com/in/rudradev-myadara/', icon: <FaLinkedin /> },
    { name: 'X', url: 'https://x.com/RMyadara', icon: <FaTwitter /> }
  ];

  return (
    <footer className={`py-8 px-4 ${isDarkMode ? 'bg-black' : 'bg-white'}`}>
      <div className="max-w-4xl mx-auto flex flex-col items-center gap-6">
        {/* Social Links */}
        <div className="flex gap-6">
          {socialLinks.map((link) => (
            <motion.a
              key={link.name}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ y: -2 }}
              className={`text-xl hover:opacity-70 transition-opacity ${
                isDarkMode ? 'text-white' : 'text-black'
              }`}
            >
              {link.icon}
            </motion.a>
          ))}
        </div>

        {/* Email */}
        <a
          href="mailto:myadararudradev@gmail.com"
          className={`text-sm hover:opacity-70 transition-opacity ${
            isDarkMode ? 'text-gray-400' : 'text-gray-600'
          }`}
        >
          myadararudradev@gmail.com
        </a>

        {/* Copyright */}
        <div className={`text-sm ${isDarkMode ? 'text-gray-500' : 'text-gray-400'}`}>
          © {new Date().getFullYear()} Rudradev
        </div>
      </div>
    </footer>
  );
});

Footer.displayName = 'Footer';
export default Footer;
