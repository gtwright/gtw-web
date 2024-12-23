import { Suspense } from "react";
import { ScatterHistoryComponent } from "@/components/beethoven/ScatterHistoryComponent";
import { ConductorComponent } from "@/components/beethoven/ConductorComponent";
import type { Metadata } from 'next'

export default async function Page(props: {
  searchParams?: Promise<{ conductor?: string }>;
}) {
  const searchParams = await props.searchParams;
  const conductor = searchParams?.conductor || "";
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-3xl font-bold py-4">The BSO and Beethoven Symphonies</h1>
      <p className="text-lg text-gray-500 pb-4 max-w-4xl">This chart shows the number of times each Beethoven symphony has been performed by the Boston Symphony Orchestra, grouped by the starting year of the season.</p>
      <div>
        <Suspense fallback={<div className="flex h-10 w-[180px] items-center justify-between rounded-md border border-slate-200 bg-white px-3 py-2 text-sm text-slate-500 dark:border-slate-800 dark:bg-slate-950">
            Loading conductors...
          </div>}>
          <ConductorComponent />
        </Suspense>
      </div>
      <Suspense fallback={
        <div className="min-h-[400px] w-full max-w-4xl animate-pulse rounded-lg border border-slate-200 bg-slate-100 p-8 dark:border-slate-800 dark:bg-slate-900">
          <div className="flex h-full items-center justify-center">
            <div className="text-sm text-slate-500 dark:text-slate-400">Loading chart data...</div>
          </div>
        </div>
      }>
        <ScatterHistoryComponent conductor={conductor} />
      </Suspense>

    </div>
  )
}

export const metadata: Metadata = {
  title: 'Beethoven Symphonies',
  description: "The BSO and Beethoven Symphonies",
  openGraph: {
    images: '/beethoven-symph.png',
  },
}