import { ScatterHistoryChart, PerformanceStats } from "./ScatterHistoryChart";
import { fetchPerformances } from "@/actions/fetch";



export async function ScatterHistoryComponent({ conductor }: { conductor: string }) {
    const performances = await fetchPerformances(conductor);
    return <ScatterHistoryChart performances={performances.success ? performances.data as PerformanceStats[] : []} />;
  }