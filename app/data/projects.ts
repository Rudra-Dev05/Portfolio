export interface Project {
  id: number
  title: string
  slug: string
  link: string
  image: string
  category: string
  description: string
  techStack: string[]
}

export const projects: Project[] = [
  {
    id: 1,
    title: "ANTIGRAVITY 3D",
    slug: "antigravity-3d",
    link: "https://github.com/Rudra-Dev05/antigravity-3d",
    image: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?q=80&w=1000&auto=format&fit=crop",
    category: "Immersive Experience",
    description: "A powerful 3D spatial design tool allowing users to create and manipulate 3D environments. Features include terrain editing, object placement, and gamification elements.",
    techStack: ["React", "Three.js", "TypeScript", "Tailwind CSS"]
  },
  {
    id: 2,
    title: "THE RUN CLUB WEBAPP",
    slug: "run-club-webapp",
    link: "https://example.com/sixd",
    image: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=1000&auto=format&fit=crop",
    category: "Web Application",
    description: "A comprehensive community platform for runners. Features include event management, real-time tracking, social feed, and performance analytics dashboard.",
    techStack: ["Next.js", "TypeScript", "Tailwind CSS", "Supabase"]
  },
  {
    id: 3,
    title: "AI-POWERED OPTIMIZATION",
    slug: "ai-optimization",
    link: "https://example.com/oxygen",
    image: "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?q=80&w=1000&auto=format&fit=crop",
    category: "AI & Machine Learning",
    description: "An intelligent content optimization tool that uses NLP to analyze and improve digital content for better engagement and SEO performance.",
    techStack: ["Python", "TensorFlow", "FastAPI", "React"]
  }
];
