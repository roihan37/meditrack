import { Bar, BarChart, LabelList, XAxis, YAxis } from "recharts"

import {
  CardContent,
  CardDescription,
  CardFooter,
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
  if (!latest) return chartData = []
  chartData = [
    {
      dataLab: "systolic",
      value: latest.results.bloodPressure.systolic,
      fill: "var(--color-systolic)",
    },
    {
      dataLab: "diastolic",
      value: latest.results.bloodPressure.diastolic,
      fill: "var(--color-diastolic)",
    },
    {
      dataLab: "ldl",
      value: latest.results.cholesterol.ldl,
      fill: "var(--color-ldl)",
    },
    {
      dataLab: "hdl",
      value: latest.results.cholesterol.hdl,
      fill: "var(--color-hdl)",
    },
  ]

  return (
    < >
      {/* CHART */}
      <CardContent >
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
            <Bar dataKey="value" layout="vertical" barSize={25} radius={3}>
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

      {/* FOOTER */}
      <CardFooter className="flex-col items-start gap-2 text-sm -ml-3 -mt-15">
        <div className="flex flex-row w-full justify-between">
          <div className="flex felx-row items-center gap-2">
            <div className="p-[4px] bg-[#EA0044] rounded-full"></div>
            <CardDescription className="text-xs">Systolic</CardDescription>
          </div>
          <div className="flex felx-row items-center gap-2">
            <div className="p-[4px] bg-[#FF6580] rounded-full"></div>
            <CardDescription className="text-xs">Diastolic</CardDescription>
          </div>
          <div className="flex felx-row items-center gap-2">
            <div className="p-[4px] bg-[#EB71FE] rounded-full"></div>
            <CardDescription className="text-xs">LDL</CardDescription>
          </div>
          <div className="flex felx-row items-center gap-2">
            <div className="p-[4px] bg-[#F2AAFF] rounded-full"></div>
            <CardDescription className="text-xs">DHL</CardDescription>
          </div>
        </div>
        <div className="flex gap-2 mt-2 font-medium">
          Blood pressure up by 5.2% 📈 and cholesterol down by 5.2% 📉
        </div>
        <div className="text-muted-foreground ">
          Showing details of both this month
        </div>
      </CardFooter>
    </>
  )
}

