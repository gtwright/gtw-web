'use client'

import { useMemo } from 'react'
import { PieChart, Pie, Cell } from 'recharts'
import { Card, CardContent } from '@/components/ui/card'
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from '@/components/ui/chart'
import { stringToColor } from '@/lib/utils/stringToColor'
import type { PerformanceStats } from './ScatterHistoryChart'

const chartConfig = {
  default: {
    label: 'Default',
    color: '#8884d8',
  },
} satisfies ChartConfig

export function PerformancePieChart({ performances }: { performances: PerformanceStats[] }) {
  const pieData = useMemo(() => {
    const workTotals = performances.reduce(
      (acc, curr) => {
        if (!acc[curr.work]) {
          acc[curr.work] = 0
        }
        acc[curr.work] += curr.performances
        return acc
      },
      {} as Record<string, number>,
    )

    return Object.entries(workTotals).map(([work, total]) => ({
      name: work.split(' in ')[0].trim(),
      value: total,
      fullName: work,
    }))
  }, [performances])

  if (performances.length === 0) {
    return (
      <Card className="w-full">
        <CardContent className="pt-6">
          <div>No data available</div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <PieChart>
            <Pie
              data={pieData}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="50%"
              outerRadius="90%"
              innerRadius="50%"
              label={(entry) => entry.name}
              labelLine
            >
              {pieData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={stringToColor(entry.fullName)} />
              ))}
            </Pie>
            <ChartTooltip
              content={
                <ChartTooltipContent
                  formatter={(value, name, item) => (
                    <div key={item.payload.name} className="flex flex-col gap-1">
                      <p className="font-medium">{item.payload.name}</p>
                      <p>Total Performances: {item.payload.value}</p>
                    </div>
                  )}
                />
              }
            />
          </PieChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}
