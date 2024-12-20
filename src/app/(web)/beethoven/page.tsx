import { Suspense } from "react";
import { ScatterHistoryChart } from "@/components/beethoven/ScatterHistoryChart";
import { ConductorComponent } from "@/components/beethoven/ConductorComponent";
import { fetchPerformances } from "@/actions/fetch"
import type { Metadata } from 'next'

export default async function Page(props: {
  searchParams?: Promise<{ conductor?: string }>;
}) {
  const searchParams = await props.searchParams;
  const conductor = searchParams?.conductor || "";
  const performances = await fetchPerformances(conductor);
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-3xl font-bold py-4">The BSO and Beethoven Symphonies</h1>
      <p className="text-lg text-gray-500 pb-4 max-w-4xl">This chart shows the number of times each Beethoven symphony has been performed by the Boston Symphony Orchestra, grouped by the starting year of the season.</p>
      <div>
        <Suspense fallback={<div>Loading...</div>}>
          <ConductorComponent />
        </Suspense>
      </div>
      <Suspense fallback={<div>Loading...</div>}>
        <ScatterHistoryChart data={performances.success ? performances.data : []} />
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