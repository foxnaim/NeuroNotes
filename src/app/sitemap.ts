import type { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  const base = 'https://neuronotes.app'
  const routes = ['', '/notes', '/tasks', '/ai', '/settings']
  const now = new Date()
  return routes.map((route) => ({
    url: `${base}${route}`,
    lastModified: now,
    changeFrequency: 'weekly',
    priority: route === '' ? 1 : 0.7,
  }))
}


