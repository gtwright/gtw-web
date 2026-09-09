import type { MetadataRoute } from 'next'
import { getPayload } from 'payload'
import configPromise from '@/payload.config'

export const revalidate = 3600 // 60 seconds * 60 minutes

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const SITE_URL =
    process.env.NEXT_PUBLIC_SERVER_URL ||
    process.env.VERCEL_PROJECT_PRODUCTION_URL ||
    'http://localhost:3000'

  const payload = await getPayload({
    config: configPromise,
  })

  const [pageResults, postResults] = await Promise.all([
    payload.find({
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
    }),
    payload.find({
      collection: 'posts',
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
    }),
  ])

  const dateFallback = new Date().toISOString()

  const defaultSitemap = [
    {
      url: `${SITE_URL}/posts`,
      lastModified: dateFallback,
    },
    {
      url: `${SITE_URL}/beethoven`,
      lastModified: dateFallback,
    },
  ]

  const pageSitemap = pageResults.docs
    ? pageResults.docs
        .filter((page) => Boolean(page?.slug))
        .map((page) => ({
          url: page?.slug === 'home' ? `${SITE_URL}/` : `${SITE_URL}/${page?.slug}`,
          lastModified: page.updatedAt || dateFallback,
        }))
    : []

  const postSitemap = postResults.docs
    ? postResults.docs
        .filter((post) => Boolean(post?.slug))
        .map((post) => ({
          url: `${SITE_URL}/posts/${post?.slug}`,
          lastModified: post.updatedAt || dateFallback,
        }))
    : []

  return [...defaultSitemap, ...pageSitemap, ...postSitemap]
}
