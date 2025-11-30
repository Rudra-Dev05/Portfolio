import { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://rudradev.com' // Replace with actual domain

  // You can add dynamic routes here by fetching data from your CMS/database
  // const projects = await getProjects()
  // const projectUrls = projects.map(project => ({
  //   url: `${baseUrl}/work/${project.slug}`,
  //   lastModified: new Date(project.updatedAt),
  // }))

  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 1,
    },
    // ...projectUrls,
  ]
}
