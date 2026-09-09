import type { Metadata } from 'next'
import { getServerSideURL } from './getURL'

const defaultOpenGraph: Metadata['openGraph'] = {
  type: 'website',
  description: "Graham Wright's personal website.",
  images: [
    {
      url: `${getServerSideURL()}/beethoven-symph.png`,
    },
  ],
  siteName: 'GTW Web',
  title: 'GTW Web',
}

export const mergeOpenGraph = (og?: Metadata['openGraph']): Metadata['openGraph'] => {
  return {
    ...defaultOpenGraph,
    ...og,
    images: og?.images ? og.images : defaultOpenGraph.images,
  }
}
