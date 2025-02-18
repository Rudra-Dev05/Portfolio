import { useRef, useEffect } from 'react'

const useIntersectionObserver = (callback, options = {}) => {
  const observerRef = useRef()

  useEffect(() => {
    if (typeof window === 'undefined') return

    const observer = new IntersectionObserver(([entry]) => {
      if (entry?.isIntersecting) {
        callback(true)
      }
    }, { threshold: 0.1, ...options })

    observerRef.current = observer

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect()
      }
    }
  }, [callback, options])

  return (element) => {
    if (element && observerRef.current) {
      observerRef.current.observe(element)
    }
  }
}

export default useIntersectionObserver
