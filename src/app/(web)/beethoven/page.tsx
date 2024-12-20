import { Suspense } from "react";
import { ScatterHistoryChart } from "@/components/beethoven/ScatterHistoryChart";
import { ConductorComponent } from "@/components/beethoven/ConductorComponent";
import { fetchPerformances } from "@/actions/fetch"
export default async function Page(props: {
  searchParams?: Promise<{ conductor?: string }>;
}) {
  const searchParams = await props.searchParams;
  const conductor = searchParams?.conductor || "";
  const performances = await fetchPerformances(conductor);
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-3xl font-bold">The BSO and Beethoven Symphonies</h1>
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
