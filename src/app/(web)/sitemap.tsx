import type { MetadataRoute } from 'next'
import { getPayload } from 'payload'
import configPromise from '@/payload.config'

export const revalidate = 3600 // 60 seconds * 60 minutes

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const SITE_URL = process.env.NEXT_PUBLIC_SERVER_URL || process.env.VERCEL_PROJECT_PRODUCTION_URL
  const payload = await getPayload({
    config: configPromise,
  })
  const results = await payload.find({
    collection: 'pages',
    overrideAccess: false,
    draft: false,
    depth: 0,
    limit: 1000,
    pagination: false,
    where: {
      _status: {
        equals: 'published',
      },
    },
    select: {
      slug: true,
      updatedAt: true,
    },
  })

  const dateFallback = new Date().toISOString()

  const defaultSitemap = [
    {
      url: `${SITE_URL}/beethoven`,
      lastModified: dateFallback,
    },
  ]

  const sitemap = results.docs
    ? results.docs
        .filter((page) => Boolean(page?.slug))
        .map((page) => {
          return {
            url: page?.slug === 'home' ? `${SITE_URL}/` : `${SITE_URL}/${page?.slug}`,
            lastModified: page.updatedAt || dateFallback,
          }
        })
    : []

  return [...defaultSitemap, ...sitemap]
}
