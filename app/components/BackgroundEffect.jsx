'use client'

import { useEffect, useRef } from 'react'
import * as THREE from 'three'

// Custom shader for galaxy effect
const vertexShader = `
  varying vec2 vUv;
  varying float vDisplacement;
  uniform float uTime;
  
  void main() {
    vUv = uv;
    vec3 pos = position;
    pos.z += sin(pos.x * 2.0 + uTime) * 0.2;
    vDisplacement = pos.z;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
  }
`

const fragmentShader = `
  varying vec2 vUv;
  varying float vDisplacement;
  uniform vec3 uColor1;
  uniform vec3 uColor2;
  uniform float uTime;

  void main() {
    vec3 color = mix(uColor1, uColor2, vDisplacement * 0.5 + 0.5);
    color += sin(vUv.x * 10.0 + uTime) * 0.1;
    gl_FragColor = vec4(color, 1.0);
  }
`

const BackgroundEffect = () => {
  const containerRef = useRef(null)
  const sceneRef = useRef(null)
  const timeRef = useRef(0)
  const frameRef = useRef(null)
  const mountedRef = useRef(true)
  const rotationRef = useRef({ x: 0, y: 0 })

  useEffect(() => {
    let scene, camera, renderer, material, geometry, mesh, particles, particlesGeometry, particlesMaterial

    const init = () => {
      try {
        scene = new THREE.Scene()
        sceneRef.current = scene
        camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000)
        renderer = new THREE.WebGLRenderer({ 
          antialias: true,
          alpha: true,
          powerPreference: "high-performance"
        })
        
        renderer.setPixelRatio(window.devicePixelRatio)
        renderer.setSize(window.innerWidth, window.innerHeight)
        containerRef.current.appendChild(renderer.domElement)

        // Create animated background
        geometry = new THREE.PlaneGeometry(20, 20, 64, 64)
        material = new THREE.ShaderMaterial({
          vertexShader,
          fragmentShader,
          uniforms: {
            uTime: { value: 0 },
            uColor1: { value: new THREE.Color('#4a9eff') },
            uColor2: { value: new THREE.Color('#9b4aff') }
          },
          wireframe: false,
        })

        mesh = new THREE.Mesh(geometry, material)
        scene.add(mesh)
        camera.position.z = 5

        // Optimize particle system
        particlesGeometry = new THREE.BufferGeometry()
        const particlesCount = Math.min(5000, window.innerWidth * 2) // Adjust based on screen size
        const positions = new Float32Array(particlesCount * 3)
        
        for(let i = 0; i < particlesCount * 3; i++) {
          positions[i] = (Math.random() - 0.5) * 10
        }
        
        particlesGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3))
        particlesMaterial = new THREE.PointsMaterial({
          size: 0.02,
          color: '#ffffff',
          transparent: true,
          opacity: 0.8,
          blending: THREE.AdditiveBlending,
          sizeAttenuation: true,
        })
        
        particles = new THREE.Points(particlesGeometry, particlesMaterial)
        scene.add(particles)

        // Replace GSAP with native smooth animation
        let targetRotation = { x: 0, y: 0 }
        let currentRotation = { x: 0, y: 0 }
        
        const handleMouseMove = (event) => {
          const now = Date.now()
          if (now - lastMove < 16) return // Limit to ~60fps
          lastMove = now

          const x = (event.clientX / window.innerWidth) * 2 - 1
          const y = -(event.clientY / window.innerHeight) * 2 + 1
          
          targetRotation = {
            x: y * 0.2,
            y: x * 0.2
          }
        }

        // Smooth rotation update
        const updateRotation = () => {
          if (!mesh) return
          
          const lerp = (start, end, factor) => 
            start + (end - start) * factor

          currentRotation.x = lerp(currentRotation.x, targetRotation.x, 0.1)
          currentRotation.y = lerp(currentRotation.y, targetRotation.y, 0.1)
          
          mesh.rotation.x = currentRotation.x
          mesh.rotation.y = currentRotation.y
        }

        window.addEventListener('mousemove', handleMouseMove)
        return () => window.removeEventListener('mousemove', handleMouseMove)
      } catch (err) {
        console.error('Three.js initialization error:', err)
        return () => {}
      }
    }

    const animate = () => {
      if (!mountedRef.current) return
      
      frameRef.current = requestAnimationFrame(animate)
      if (!material?.uniforms) return
      
      timeRef.current += 0.005
      material.uniforms.uTime.value = timeRef.current
      updateRotation() // Add rotation update to animation loop
      renderer?.render(scene, camera)
    }

    const cleanup = init()

    animate()

    const handleResize = () => {
      if (!camera || !renderer) return
      camera.aspect = window.innerWidth / window.innerHeight
      camera.updateProjectionMatrix()
      renderer.setSize(window.innerWidth, window.innerHeight)
    }

    window.addEventListener('resize', handleResize)
    
    return () => {
      mountedRef.current = false
      cleanup()
      window.removeEventListener('resize', handleResize)
      if (frameRef.current) cancelAnimationFrame(frameRef.current)
      
      // Proper cleanup of Three.js resources
      if (containerRef.current && renderer?.domElement) {
        containerRef.current.removeChild(renderer.domElement)
      }
      
      if (geometry) geometry.dispose()
      if (material) material.dispose()
      if (particlesGeometry) particlesGeometry.dispose()
      if (particlesMaterial) particlesMaterial.dispose()
      if (renderer) renderer.dispose()
    }
  }, [])

  return <div ref={containerRef} className="fixed inset-0 -z-10" />
}

export default BackgroundEffect
