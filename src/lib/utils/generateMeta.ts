import type { Metadata } from 'next'

import type { Page } from '@/payload-types'

export const generateMeta = async (args: { doc: Partial<Page> }): Promise<Metadata> => {
  const { doc } = args || {}

  const title = doc?.title ? doc?.title + ' | GTW Web' : 'GTW Web'

  return {
    title,
  }
}
