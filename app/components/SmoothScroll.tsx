'use client'

import { ScrollProvider } from '../context/ScrollContext'

const SmoothScroll = ({ children }: { children: React.ReactNode }) => {
  return <ScrollProvider>{children}</ScrollProvider>
}

export default SmoothScroll
