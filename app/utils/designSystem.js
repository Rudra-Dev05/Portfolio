export const glassEffect = (isDarkMode) => `
  backdrop-filter: blur(12px);
  background: ${isDarkMode ? 'rgba(10, 10, 13, 0.7)' : 'rgba(255, 255, 255, 0.7)'};
  border: 1px solid ${isDarkMode ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)'};
`

export const gradients = {
  primary: 'bg-gradient-to-br from-violet-600 via-indigo-600 to-blue-700',
  secondary: 'bg-gradient-to-br from-rose-500 via-fuchsia-500 to-indigo-500',
  glass: (isDarkMode) => `
    background: linear-gradient(
      135deg,
      ${isDarkMode ? 'rgba(255,255,255,0.05)' : 'rgba(255,255,255,0.7)'} 0%,
      ${isDarkMode ? 'rgba(255,255,255,0.02)' : 'rgba(255,255,255,0.3)'} 100%
    );
  `
}

export const animations = {
  slideUp: {
    initial: { y: 30, opacity: 0 },
    animate: { y: 0, opacity: 1 },
    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] }
  },
  fadeIn: {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    transition: { duration: 0.5 }
  }
}
