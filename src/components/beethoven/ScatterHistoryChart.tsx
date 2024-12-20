"use client";

import { useMemo } from "react";
import {
  ScatterChart,
  Scatter,
  Cell,
  CartesianGrid,
  XAxis,
  YAxis,
  ZAxis,
} from "recharts";

import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { stringToColor } from "@/lib/utils";
type PerformanceData = {
  work: string;
  season_start: number;
  conductor: string;
  performances: number;
};

const chartConfig = {
  desktop: {
    label: "Desktop",
    color: "#2563eb",
  },
  mobile: {
    label: "Mobile",
    color: "#60a5fa",
  },
} satisfies ChartConfig;

export function ScatterHistoryChart({ data }: { data: PerformanceData[] }) {
  const uniqueWorks = useMemo(
    () => Array.from(new Set(data.map((item) => item.work))),
    [data]
  );

  const colorMap = useMemo(() => {
    const map = new Map<string, string>();
    uniqueWorks.forEach((work) => {
      map.set(work, stringToColor(work));
    });
    return map;
  }, [uniqueWorks]);
  if (data.length === 0) {
    return <div>No data available</div>;
  }

  return (
    <ChartContainer config={chartConfig} className="min-h-[200px] w-full p-8">
      <ScatterChart
        data={data || []}
        accessibilityLayer
        margin={{
          left: 20,
          right: 20,
        }}
      >
        <CartesianGrid vertical={false} />
        <XAxis
          type="number"
          dataKey="season_start"
          name="Season Start"
          allowDecimals={false}
          // tickCount={
          //   data.length > 10 ? Math.ceil(data.length / 10) : data.length
          // }
          domain={["dataMin", "dataMax"]}
        />
        <YAxis
          type="category"
          dataKey="work"
          name="Work"
          allowDuplicatedCategory={false}
          minTickGap={10}
          tickMargin={10}
          tickFormatter={(value) => {
            const [work] = value.split(" in ");
            return work.trim();
          }}
        />
        <ZAxis
          type="number"
          dataKey="performances"
          range={[10, 1000]}
          name="Performances"
        />
        <ChartTooltip
          content={
            <ChartTooltipContent
              formatter={(value, name, item, index) => {
                if (index !== 0) return null;

                return (
                  <div className="flex flex-col gap-1">
                    <p className="font-medium">{item.payload.work}</p>
                    <p>Season: {item.payload.season}</p>
                    {/* <p>Conductor: {item.payload.conductor}</p> */}
                    <p>Performances: {item.payload.performances}</p>
                  </div>
                );
              }}
            />
          }
        />
        <Scatter name="Performances">
          {data.map((entry, index) => (
            <Cell
              key={`cell-${index}`}
              fill={colorMap.get(entry.work) || "#000000"}
            />
          ))}
        </Scatter>
      </ScatterChart>
    </ChartContainer>
  );
}
