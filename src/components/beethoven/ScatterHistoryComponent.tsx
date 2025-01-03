import { ScatterHistoryChart, PerformanceStats } from './ScatterHistoryChart'
import { fetchPerformances } from '@/actions/fetch'
import { PerformancePieChart } from './PerformancePieChart'

export async function ScatterHistoryComponent({ conductor }: { conductor: string }) {
  const performances = await fetchPerformances(conductor)
  const data = performances.success ? (performances.data as PerformanceStats[]) : []
  return (
    <div className="space-y-8">
      <ScatterHistoryChart performances={data} />
      <PerformancePieChart performances={data} />
    </div>
  )
}
