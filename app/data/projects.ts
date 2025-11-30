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
    title: "VIRTUAL ART GALLERY",
    slug: "virtual-art-gallery",
    link: "https://example.com/red-bull-tv",
    image: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?q=80&w=1000&auto=format&fit=crop",
    category: "Immersive Experience",
    description: "An immersive 3D virtual art gallery experience built with Three.js and React. Users can navigate through different rooms, interact with art pieces, and learn about the artists in a spatially aware environment.",
    techStack: ["React", "Three.js", "WebGL", "Framer Motion"]
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
