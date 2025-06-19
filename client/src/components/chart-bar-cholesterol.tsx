"use client"

import { Bar, BarChart, XAxis, YAxis } from "recharts"

import {
  Card,
  CardContent,
} from "@/components/ui/card"
import {
  type ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"

export const description = "A mixed bar chart"

const chartData = [
  { browser: "chrome", label: "LDL", visitors: 275, fill: "var(--chart-1)" },
  { browser: "safari", visitors: 200, fill: "var(--color-safari)" },
  { browser: "firefox", visitors: 187, fill: "var(--color-firefox)" },
]

const chartConfig = {
  
  chrome: {
    label: "LDL",
    color: "var(--chart-1)",
  },
  safari: {
    label: "HDL",
    color: "var(--chart-2)",
  },
  firefox: {
    label: "TOTAL",
    color: "var(--chart-3)",
  },
  
} satisfies ChartConfig

export function ChartBarCholesterol() {
  return (
    <Card>
      
      <CardContent>
        <ChartContainer className="h-24" config={chartConfig}>
          <BarChart
            accessibilityLayer
            data={chartData}
            layout="vertical"
            margin={{
              left: 0,
            }}
          >
            <YAxis
              dataKey="browser"
              type="category"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              tickFormatter={(value) =>
                chartConfig[value as keyof typeof chartConfig]?.label
              }
            />
            <XAxis dataKey="visitors" type="number" hide />
            <ChartTooltip
            
              cursor={false}
              content={<ChartTooltipContent 
              labelKey="browser"
              nameKey="browser" hideLabel />}
            />
            <Bar dataKey="visitors" layout="vertical" radius={5} barSize={24}/>
          </BarChart>
        </ChartContainer>
      </CardContent>
      
    </Card>
  )
}
