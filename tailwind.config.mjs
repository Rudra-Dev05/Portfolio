import { Outfit, Ovo } from 'next/font/google';

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: 'class', // or 'media' if you want to respect system preferences
  theme: {
    extend: {
      colors: {
        lightHover: {
          DEFAULT: '#fcf4ff',
          dark: '#2a004a',
        },
        darkTheme: '#121212',
        primary: {
          DEFAULT: '#2563eb', // Blue
          dark: '#60a5fa',
        },
        secondary: {
          DEFAULT: '#475569', // Slate
          dark: '#94a3b8',
        },
        gray: {
          850: '#1f2937',
        }
      },
      fontFamily: {
        Outfit: ['Outfit', 'sans-serif'],
        Ovo: ['Ovo', 'sans-serif'],
      },
      boxShadow: {
        'black': '4px 4px 0 #000',
        'white': '4px 4px 0 #fff',
        'dark-sm': '0 1px 2px 0 rgba(255, 255, 255, 0.05)',
        'dark-lg': '0 10px 15px -3px rgba(255, 255, 255, 0.1)',
        '3xl': '0 35px 60px -15px rgba(0, 0, 0, 0.3)',
        'soft': '0 2px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -4px rgba(0, 0, 0, 0.05)',
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
      },
      gridTemplateColumns: {
        'auto-fill': 'repeat(auto-fill, minmax(200px, 1fr))',
      },
      transitionProperty: {
        height: 'height',
      },
      maxWidth: {
        '7xl': '80rem',
      },
      spacing: {
        'nav': '4.5rem',
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
      }
    },
  },
  plugins: [
    require('@tailwindcss/aspect-ratio'),
    function({ addUtilities }) {
      const newUtilities = {
        '.text-gradient': {
          'background-clip': 'text',
          '-webkit-background-clip': 'text',
          '-webkit-text-fill-color': 'transparent',
        },
      }
      addUtilities(newUtilities)
    }
  ],
};
