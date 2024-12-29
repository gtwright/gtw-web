import { Metadata } from 'next'
import { getPayload } from 'payload'
import configPromise from '@/payload.config'
import { cache } from 'react'
import { notFound } from 'next/navigation'
import { generateMeta } from '@/lib/utils/generateMeta'
import { draftMode } from 'next/headers'
import RichText from '@/components/RichText'

type Args = {
  params: Promise<{
    slug?: string
  }>
}

export const dynamicParams = true
export const revalidate = 86400 // 60 seconds * 60 minutes * 24 hours

export async function generateStaticParams() {
  const payload = await getPayload({ config: configPromise })
  const posts = await payload.find({
    collection: 'posts',
    draft: false,
    limit: 1000,
    overrideAccess: false,
    select: { slug: true },
  })

  const params = posts.docs?.filter((post) => post.slug !== 'home').map(({ slug }) => ({ slug }))

  return params
}

export default async function Page({ params: paramsPromise }: Args) {
  const { slug = 'home' } = await paramsPromise
  const url = `/${slug}`
  const post = await queryPostBySlug(slug)
  if (!post) {
    notFound()
  }

  return (
    <article className="flex flex-col items-center justify-center container pt-12 min-h-dvh">
      <div className="prose dark:prose-invert ">
        <h1>{post.title}</h1>
        <RichText data={post.content} enableGutter={false} enableProse={true} />
      </div>
    </article>
  )
}

export async function generateMetadata({ params: paramsPromise }: Args): Promise<Metadata> {
  const { slug = 'home' } = await paramsPromise
  const post = await queryPostBySlug(slug)
  return generateMeta({ doc: post })
}

const queryPostBySlug = cache(async (slug: string) => {
  const { isEnabled: draft } = await draftMode()
  const payload = await getPayload({ config: configPromise })
  const result = await payload.find({
    collection: 'posts',
    draft,
    limit: 1,
    pagination: false,
    overrideAccess: draft,
    where: {
      slug: {
        equals: slug,
      },
    },
  })
  return result.docs?.[0] || null
})
