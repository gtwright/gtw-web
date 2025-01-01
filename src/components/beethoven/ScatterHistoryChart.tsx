'use client'

import { useMemo } from 'react'
import {
  ScatterChart,
  Scatter,
  Cell,
  CartesianGrid,
  XAxis,
  YAxis,
  ZAxis,
  ResponsiveContainer,
} from 'recharts'
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

export function ScatterHistoryChart({ performances }: { performances: PerformanceStats[] }) {
  const uniqueWorks = useMemo(
    () => Array.from(new Set(performances.map((item) => item.work))),
    [performances],
  )

  const colorMap = useMemo(() => {
    const map = new Map<string, string>()
    uniqueWorks.forEach((work) => {
      map.set(work, stringToColor(work))
    })
    return map
  }, [uniqueWorks])

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
    <Card className="w-full">
      <CardContent>
        <ChartContainer config={chartConfig} className="h-[600px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <ScatterChart
              data={performances || []}
              accessibilityLayer
              margin={{
                top: 20,
                right: 20,
                bottom: 20,
                left: 10,
              }}
            >
              <CartesianGrid vertical={false} />
              <XAxis
                type="number"
                dataKey="season_start"
                name="Season Start"
                allowDecimals={false}
                tickCount={8}
                interval={0}
                domain={['dataMin', 'dataMax']}
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
          </ResponsiveContainer>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}
