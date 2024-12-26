import { Metadata } from 'next'
import { getPayload } from 'payload'
import configPromise from '@/payload.config'
import { cache } from 'react'
import { notFound } from 'next/navigation'
import { generateMeta } from '@/lib/utils/generateMeta'
type Args = {
  params: Promise<{
    slug?: string
  }>
}

export default async function Page({ params: paramsPromise }: Args) {
  const { slug = 'home' } = await paramsPromise
  const url = `/${slug}`
  const page = await queryPageBySlug(slug)
  if (!page) {
    notFound()
  }

  return (
    <article className="flex flex-col items-center justify-center prose container mt-12">
      <h1 className="font-serif">{page.title}</h1>
    </article>
  )
}

export async function generateMetadata({ params: paramsPromise }: Args): Promise<Metadata> {
  const { slug = 'home' } = await paramsPromise
  const page = await queryPageBySlug(slug)
  return generateMeta({ doc: page })
}

const queryPageBySlug = cache(async (slug: string) => {
  const payload = await getPayload({ config: configPromise })
  const result = await payload.find({
    collection: 'pages',
    // draft,
    limit: 1,
    pagination: false,
    // overrideAccess: draft,
    where: {
      slug: {
        equals: slug,
      },
    },
  })
  return result.docs?.[0] || null
})
