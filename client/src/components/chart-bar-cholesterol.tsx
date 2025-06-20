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
import type { Cholesterol } from "@/types/lab"

export const description = "A mixed bar chart"

export function ChartBarCholesterol({ cholesterol }: { cholesterol: Cholesterol }) {
  // console.log(cholesterol, '<< Colesterorl');
  const chartData = [
    { data: "LDL",  value: cholesterol.ldl, fill: "var(--chart-1)" },
    { data: "HDL", value: cholesterol.hdl, fill: "var(--chart-2)" },
    { data: "TOTAL", value: cholesterol.total, fill: "var(--chart-3)" },
  ]
  
  const chartConfig = {
    
    LDL: {
      label: "LDL",
      color: "var(--chart-1)",
    },
    HDL: {
      label: "HDL",
      color: "var(--chart-2)",
    },
    TOTAL: {
      label: "TOTAL",
      color: "var(--chart-3)",
    },
    
  } satisfies ChartConfig
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
              dataKey="data"
              type="category"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              tickFormatter={(value) =>
                chartConfig[value as keyof typeof chartConfig]?.label
              }
            />
            <XAxis dataKey="value" type="number" hide />
            <ChartTooltip
            
              cursor={false}
              content={<ChartTooltipContent 
              labelKey="data"
              nameKey="data" hideLabel />}
            />
            <Bar dataKey="value" layout="vertical" radius={5} barSize={24}/>
          </BarChart>
        </ChartContainer>
      </CardContent>
      
    </Card>
  )
}
