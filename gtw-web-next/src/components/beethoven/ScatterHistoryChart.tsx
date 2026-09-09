'use client'

import { useMemo } from 'react'
import { ScatterChart, Scatter, Cell, CartesianGrid, XAxis, YAxis, ZAxis } from 'recharts'
import { Card, CardContent } from '@/components/ui/card'
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from '@/components/ui/chart'
import { stringToColor } from '@/lib/utils/stringToColor'

const chartConfig = {
  desktop: {
    label: 'Desktop',
    color: '#2563eb',
  },
  mobile: {
    label: 'Mobile',
    color: '#60a5fa',
  },
} satisfies ChartConfig

export interface PerformanceStats {
  work: string
  conductor: string
  season_start: number
  season_end: number
  performances: number
  season: string
}

interface ScatterHistoryChartProps {
  performances: PerformanceStats[]
}

const CHART_MARGINS = {
  top: 20,
  right: 20,
  bottom: 20,
  left: 10,
} as const

export function ScatterHistoryChart({ performances }: ScatterHistoryChartProps) {
  const uniqueWorks = useMemo(
    () => Array.from(new Set(performances.map((item) => item.work))),
    [performances],
  )

  const colorMap = useMemo(
    () => new Map(uniqueWorks.map((work) => [work, stringToColor(work)])),
    [uniqueWorks],
  )

  if (performances.length === 0) {
    return (
      <Card className="w-full">
        <CardContent className="pt-6">
          <div className="text-muted-foreground">No performance data available</div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <ScatterChart
            data={performances || []}
            accessibilityLayer
            margin={CHART_MARGINS}
            aria-label="Beethoven performance history scatter plot showing works performed over time"
          >
            <CartesianGrid
              vertical={false}
              stroke="currentColor"
              className="text-gray-200 dark:text-gray-800"
            />
            <XAxis
              type="number"
              dataKey="season_start"
              name="Season Start"
              allowDecimals={false}
              tickCount={8}
              interval={0}
              domain={['dataMin', 'dataMax']}
              stroke="currentColor"
              className="text-black dark:text-slate-50"
              label={{
                value: 'Season',
                position: 'bottom',
                className: 'fill-black dark:fill-slate-50',
              }}
            />
            <YAxis
              type="category"
              dataKey="work"
              name="Work"
              allowDuplicatedCategory={false}
              minTickGap={10}
              tickMargin={10}
              width={100}
              tickFormatter={(value) => {
                const [work] = value.split(' in ')
                return work.trim()
              }}
              stroke="currentColor"
              className="text-black dark:text-slate-50"
            />
            <ZAxis type="number" dataKey="performances" range={[10, 1000]} name="Performances" />
            <ChartTooltip
              content={
                <ChartTooltipContent
                  formatter={(value, name, item, index) => {
                    if (index !== 0) return null

                    return (
                      <div className="flex flex-col gap-1">
                        <p className="font-medium">{item.payload.work}</p>
                        <p>Season: {item.payload.season}</p>
                        <p>Performances: {item.payload.performances}</p>
                      </div>
                    )
                  }}
                />
              }
            />
            <Scatter name="Performances">
              {performances.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={colorMap.get(entry.work) || '#000000'} />
              ))}
            </Scatter>
          </ScatterChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}
