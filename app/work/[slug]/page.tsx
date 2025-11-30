import { projects } from '../../data/projects'
import ProjectContent from './ProjectContent'

export async function generateStaticParams() {
  return projects.map((project) => ({
    slug: project.slug,
  }))
}

export default function Page() {
  return <ProjectContent />
}
