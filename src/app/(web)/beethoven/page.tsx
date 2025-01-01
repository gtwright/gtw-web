import { Suspense } from 'react'
import { ScatterHistoryComponent } from '@/components/beethoven/ScatterHistoryComponent'
import { ConductorComponent } from '@/components/beethoven/ConductorComponent'
import type { Metadata } from 'next'
import Link from '@/components/Link'

export default async function Page(props: { searchParams?: Promise<{ conductor?: string }> }) {
  const searchParams = await props.searchParams
  const conductor = searchParams?.conductor || ''
  return (
    <div className="flex flex-col items-center justify-start min-h-screen py-8 px-4">
      <h1 className="text-3xl font-bold py-4 font-serif font-condensed">
        The BSO and Beethoven Symphonies
      </h1>
      <p className="text-lg pb-4 max-w-4xl font-serif">
        This chart shows the number of times each Beethoven symphony has been performed by the
        Boston Symphony Orchestra, grouped by the starting year of the season. Data from{' '}
        <Link href="https://archives.bso.org/">HENRY</Link>.
      </p>
      <div className="mb-4">
        <Suspense
          fallback={
            <div className="flex h-10 w-[180px] items-center justify-between rounded-md border border-slate-200 bg-white px-3 py-2 text-sm text-slate-500 dark:border-slate-800 dark:bg-slate-950">
              Loading conductors...
            </div>
          }
        >
          <ConductorComponent />
        </Suspense>
      </div>
      <div className="w-full max-w-6xl mb-8">
        <Suspense
          fallback={
            <div className="min-h-[400px] w-full animate-pulse rounded-lg border border-slate-200 bg-slate-100 p-8 dark:border-slate-800 dark:bg-slate-900">
              <div className="flex h-full items-center justify-center">
                <div className="text-sm text-slate-500 dark:text-slate-400">
                  Loading chart data...
                </div>
              </div>
            </div>
          }
        >
          <ScatterHistoryComponent conductor={conductor} />
        </Suspense>
      </div>
    </div>
  )
}

export const metadata: Metadata = {
  title: 'Beethoven Symphonies',
  description: 'The BSO and Beethoven Symphonies',
  openGraph: {
    images: '/beethoven-symph.png',
  },
}
