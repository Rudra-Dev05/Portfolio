import { Outfit } from 'next/font/google';

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        // Premium, sophisticated color palette
        slate: {
          50: '#f8fafc',
          100: '#f1f5f9',
          200: '#e2e8f0',
          300: '#cbd5e1',
          400: '#94a3b8',
          500: '#64748b',
          600: '#475569',
          700: '#334155',
          800: '#1e293b',
          900: '#0f172a',
          950: '#020617',
        },
        primary: {
          50: '#eef2ff',
          100: '#e0e7ff', 
          200: '#c7d2fe',
          300: '#a5b4fc',
          400: '#818cf8',
          500: '#6366f1', // Primary indigo
          600: '#4f46e5',
          700: '#4338ca',
          800: '#3730a3',
          900: '#312e81',
          950: '#1e1b4b',
        },
        secondary: {
          50: '#f8fafc',
          100: '#f1f5f9',
          200: '#e2e8f0',
          300: '#cbd5e1',
          400: '#94a3b8',
          500: '#64748b', // Secondary slate
          600: '#475569',
          700: '#334155',
          800: '#1e293b',
          900: '#0f172a',
          950: '#020617',
        },
        accent: {
          50: '#eff6ff',
          100: '#dbeafe',
          200: '#bfdbfe',
          300: '#93c5fd',
          400: '#60a5fa',
          500: '#3b82f6', // Accent blue
          600: '#2563eb',
          700: '#1d4ed8',
          800: '#1e40af',
          900: '#1e3a8a',
          950: '#172554',
        },
        // Neutral colors
        background: {
          light: '#ffffff',
          dark: '#111827',
        },
        surface: {
          light: '#f9fafb',
          dark: '#1f2937',
        },
        // Added color options for versatility
        rose: {
          500: '#f43f5e',
          600: '#e11d48',
        },
        amber: {
          400: '#fbbf24',
          500: '#f59e0b',
        },
        emerald: {
          400: '#34d399',
          500: '#10b981',
        },
      },
      fontFamily: {
        display: ['var(--font-dm-serif)', 'var(--font-unbounded)', 'serif'],
        serif: ['var(--font-playfair)', 'var(--font-bodoni)', 'serif'],
        sans: ['var(--font-inter)', 'var(--font-space-grotesk)', 'sans-serif'],
        mono: ['var(--font-jetbrains)', 'monospace'],
        syne: ['var(--font-syne)', 'sans-serif'],
        grotesk: ['var(--font-space-grotesk)', 'sans-serif'],
        outfit: ['var(--font-outfit)', 'sans-serif'],
        unbounded: ['var(--font-unbounded)', 'sans-serif'],
        playfair: ['var(--font-playfair)', 'serif'],
        bodoni: ['var(--font-bodoni)', 'serif'],
        dmSerif: ['var(--font-dm-serif)', 'serif'],
      },
      boxShadow: {
        'subtle': '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
        'elevation-1': '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)',
        'elevation-2': '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
        'elevation-3': '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
        'elevation-4': '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
        'elevation-5': '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
        'inner-top': 'inset 0 1px 2px 0 rgba(0, 0, 0, 0.05)',
        'inner': 'inset 0 2px 4px 0 rgba(0, 0, 0, 0.06)',
        // Dark mode shadows
        'dark-elevation-1': '0 1px 3px 0 rgba(0, 0, 0, 0.3), 0 1px 2px 0 rgba(0, 0, 0, 0.2)',
        'dark-elevation-2': '0 4px 6px -1px rgba(0, 0, 0, 0.3), 0 2px 4px -1px rgba(0, 0, 0, 0.2)',
        'dark-elevation-3': '0 10px 15px -3px rgba(0, 0, 0, 0.3), 0 4px 6px -2px rgba(0, 0, 0, 0.15)',
        'dark-subtle': '0 1px 2px 0 rgba(255, 255, 255, 0.05)',
      },
      keyframes: {
        wave: {
          '0%': { transform: 'rotate(0deg)' },
          '10%': { transform: 'rotate(14deg)' },
          '20%': { transform: 'rotate(-8deg)' },
          '30%': { transform: 'rotate(14deg)' },
          '40%': { transform: 'rotate(-4deg)' },
          '50%': { transform: 'rotate(10.0deg)' },
          '60%, 100%': { transform: 'rotate(0.0deg)' },
        },
        fadeIn: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        gradient: {
          '0%, 100%': {
            'background-size': '200% 200%',
            'background-position': 'left center'
          },
          '50%': {
            'background-size': '200% 200%',
            'background-position': 'right center'
          },
        },
        glow: {
          '0%, 100%': { opacity: 0.5 },
          '50%': { opacity: 1 },
        },
        shimmer: {
          '0%, 100%': { opacity: 1 },
          '50%': { opacity: 0.5 }
        },
        'gradient-x': {
          '0%, 100%': {
            'background-size': '200% 200%',
            'background-position': 'left center'
          },
          '50%': {
            'background-size': '200% 200%',
            'background-position': 'right center'
          }
        },
        marquee: {
          '0%': { transform: 'translateX(0%)' },
          '100%': { transform: 'translateX(-100%)' }
        },
        'marquee-reverse': {
          '0%': { transform: 'translateX(-100%)' },
          '100%': { transform: 'translateX(0%)' }
        },
        reveal: {
          '0%': { transform: 'scaleX(0)' },
          '100%': { transform: 'scaleX(1)' }
        },
        'reveal-up': {
          '0%': { transform: 'translateY(100%)', opacity: 0 },
          '100%': { transform: 'translateY(0)', opacity: 1 }
        },
        'cursor-blink': {
          '0%, 100%': { opacity: 1 },
          '50%': { opacity: 0 }
        },
        'magnetic-cursor': {
          '0%, 100%': { transform: 'translate(0, 0)' },
          '50%': { transform: 'translate(calc(var(--x) * 0.5px), calc(var(--y) * 0.5px))' }
        }
      },
      animation: {
        'wave': 'wave 2s linear infinite',
        'fade-in': 'fadeIn 1s ease-out forwards',
        'float': 'float 6s ease-in-out infinite',
        'gradient': 'gradient 8s linear infinite',
        'glow': 'glow 2s ease-in-out infinite',
        'shimmer': 'shimmer 15s linear infinite',
        'gradient-x': 'gradient-x 15s ease infinite',
        'pulse-slow': 'pulse 6s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'marquee': 'marquee 25s linear infinite',
        'marquee-reverse': 'marquee-reverse 25s linear infinite',
        'reveal': 'reveal 1.5s cubic-bezier(0.77, 0, 0.175, 1) forwards',
        'reveal-up': 'reveal-up 1.2s cubic-bezier(0.19, 1, 0.22, 1) forwards',
        'cursor-blink': 'cursor-blink 1s step-end infinite',
        'magnetic-cursor': 'magnetic-cursor 0.3s ease-out'
      },
      gridTemplateColumns: {
        'auto-fill': 'repeat(auto-fill, minmax(200px, 1fr))',
      },
      transitionProperty: {
        'height': 'height',
        'spacing': 'margin, padding',
      },
      maxWidth: {
        '7xl': '80rem',
        '8xl': '88rem',
      },
      spacing: {
        'nav': '4.5rem',
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'noise': "url('/noise.svg')",
      }
    },
  },
  plugins: [
    require('@tailwindcss/aspect-ratio'),
    function({ addUtilities }) {
      const newUtilities = {
        '.text-gradient-primary': {
          'background-clip': 'text',
          '-webkit-background-clip': 'text',
          '-webkit-text-fill-color': 'transparent',
          'background-image': 'linear-gradient(135deg, var(--tw-gradient-stops))',
          '--tw-gradient-from': '#4f46e5',
          '--tw-gradient-to': '#2563eb',
          '--tw-gradient-stops': 'var(--tw-gradient-from), var(--tw-gradient-to)',
        },
        '.text-gradient-purple': {
          'background-clip': 'text',
          '-webkit-background-clip': 'text',
          '-webkit-text-fill-color': 'transparent',
          'background-image': 'linear-gradient(135deg, var(--tw-gradient-stops))',
          '--tw-gradient-from': '#8b5cf6',
          '--tw-gradient-to': '#6366f1',
          '--tw-gradient-stops': 'var(--tw-gradient-from), var(--tw-gradient-to)',
        },
        '.bg-gradient-primary': {
          'background-image': 'linear-gradient(135deg, var(--tw-gradient-stops))',
          '--tw-gradient-from': '#4f46e5',
          '--tw-gradient-to': '#2563eb',
          '--tw-gradient-stops': 'var(--tw-gradient-from), var(--tw-gradient-to)',
        },
        '.mask-image-radial': {
          'mask-image': 'radial-gradient(ellipse 70% 70% at 50% 50%, black 40%, transparent 71%)',
        },
        '.backdrop-blur-xs': {
          'backdrop-filter': 'blur(2px)',
          '-webkit-backdrop-filter': 'blur(2px)',
        },
        '.backdrop-saturate-150': {
          'backdrop-filter': 'saturate(150%)',
          '-webkit-backdrop-filter': 'saturate(150%)',
        },
        '.blend-difference': {
          'mix-blend-mode': 'difference',
        },
        '.blend-exclusion': {
          'mix-blend-mode': 'exclusion',
        },
        '.blend-overlay': {
          'mix-blend-mode': 'overlay',
        },
        '.perspective': {
          'perspective': '1000px',
        },
        '.preserve-3d': {
          'transform-style': 'preserve-3d',
        },
        '.content-hidden': {
          'content-visibility': 'auto',
        },
        '.scrollbar-hide': {
          '-ms-overflow-style': 'none',
          'scrollbar-width': 'none',
          '&::-webkit-scrollbar': {
            'display': 'none',
          },
        },
        '.glass-light': {
          'background': 'rgba(255, 255, 255, 0.7)',
          'backdrop-filter': 'blur(10px) saturate(160%)',
          'border': '1px solid rgba(255, 255, 255, 0.2)',
        },
        '.glass-dark': {
          'background': 'rgba(17, 24, 39, 0.7)',
          'backdrop-filter': 'blur(10px) saturate(180%)',
          'border': '1px solid rgba(255, 255, 255, 0.08)',
        },
      }
      addUtilities(newUtilities)
    }
  ],
};
