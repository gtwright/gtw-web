import { authenticated } from '@/access/authenticated'
import { authenticatedOrPublished } from '@/access/authenticatedOrPublished'
import { slugField } from '@/fields/slug'
import type { CollectionConfig } from 'payload'
import { BlocksFeature, lexicalEditor } from '@payloadcms/richtext-lexical'
import { Banner } from '@/blocks/Banner/config'
export const Posts: CollectionConfig = {
  slug: 'posts',
  admin: {
    useAsTitle: 'slug',
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
    },
    {
      name: 'content',
      type: 'richText',
      editor: lexicalEditor({
        features: ({ defaultFeatures, rootFeatures }) => [
          ...defaultFeatures,
          ...rootFeatures,
          BlocksFeature({
            blocks: [Banner],
          }),
        ],
      }),
      label: false,
      required: true,
    },
    ...slugField(),
    {
      name: 'publishedAt',
      type: 'date',
      admin: {
        position: 'sidebar',
      },
    },
  ],
  access: {
    read: authenticatedOrPublished,
    create: authenticated,
    update: authenticated,
    delete: authenticated,
  },
  versions: {
    drafts: {
      schedulePublish: true,
      autosave: {
        interval: 100, // We set this interval for optimal live preview
      },
    },
    maxPerDoc: 50,
  },
  timestamps: true,
}
