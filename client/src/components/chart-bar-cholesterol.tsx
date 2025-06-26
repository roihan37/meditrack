import { Bar, BarChart, LabelList, XAxis, YAxis } from "recharts"

import {
  CardContent,
} from "@/components/ui/card"
import {
  type ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"
import { useAuthContext } from "@/context/AuthContext"

export const description = "A mixed bar chart"

const chartConfig = {
  systolic: {
    label: "Systolic",
    color: "oklch(64.5% 0.246 16.439)",
  },
  diastolic: {
    label: "Diastolic",
    color: "oklch(71.2% 0.194 13.428)",
  },
  ldl: {
    label: "LDL",
    color: "oklch(74% 0.238 322.16)",
  },
  hdl: {
    label: "HDL",
    color: "oklch(83.3% 0.145 321.434)",
  },
} satisfies ChartConfig

export function ChartBarMixed() {
  const { results } = useAuthContext()

  const latest = results[0]
  let chartData
  // if (!latest) return chartData = []
  chartData = [
    {
      dataLab: "systolic",
      value: latest?.results?.bloodPressure.systolic || 0,
      fill: "var(--color-systolic)",
    },
    {
      dataLab: "diastolic",
      value: latest?.results?.bloodPressure.diastolic || 0,
      fill: "var(--color-diastolic)",
    },
    {
      dataLab: "ldl",
      value: latest?.results?.cholesterol.ldl || 0,
      fill: "var(--color-ldl)",
    },
    {
      dataLab: "hdl",
      value: latest?.results?.cholesterol.hdl || 0,
      fill: "var(--color-hdl)",
    },
  ]

  return (
    < >
      {/* CHART */}
      <CardContent className=" -mt-9 p-5">
        <ChartContainer config={chartConfig}>
          <BarChart
            className="h-[100px]"
            data={chartData}
            layout="vertical"
            margin={{ top: 25, bottom: 75, right: 50, left: 10 }}
            barCategoryGap={1}
            barGap={1}
          >
            <YAxis
              dataKey="dataLab"
              type="category"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              hide
            />
            <XAxis dataKey="value" type="number" hide />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Bar dataKey="value" hide={!latest} layout="vertical" barSize={35} radius={3}>
              <LabelList
                dataKey="value"
                position="right"
                style={{
                  fontSize: 12,
                  fill: "#000",
                  fontWeight: 500,
                }}
              />
            </Bar>
          </BarChart>
        </ChartContainer>
      </CardContent>

      
    </>
  )
}

