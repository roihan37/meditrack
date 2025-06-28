"use client"

import * as React from "react"
import { Area, AreaChart, CartesianGrid, Line, LineChart, XAxis } from "recharts"

import { useIsMobile } from "@/hooks/use-mobile"
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,

} from "@/components/ui/card"
import {
  type ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { useAuthContext } from "@/context/AuthContext"
import { formatDate } from "date-fns"
import { ClipboardMinus, Dna, GitCommitVertical } from "lucide-react"
import { Badge } from "./ui/badge"
import { findPercent } from "@/lib/utils"

// export const description = "An interactive area chart"
const chartConfig = {
  glucose: {
    label: "Glucose",
    color: "oklch(55.8% 0.288 302.321)",
  },
  cholHdl: {
    label: "HDL",
    color: "oklch(59.1% 0.293 322.896)",
  },
  cholLdl: {
    label: "LDL",
    color: "oklch(74% 0.238 322.16)",
  },

} satisfies ChartConfig



export function ChartAreaInteractive() {
  const { results } = useAuthContext()
  const { gluPercent, cholPercent } = findPercent(results)

  const chartData = results.length > 0
    ? results.map((el) => ({
      date: formatDate(new Date(el.date), "yyyy-MM-dd"),
      glucose: el.results.glucose,
      cholHdl: el.results.cholesterol.hdl,
      cholLdl: el.results.cholesterol.ldl,
    }))
    : []

  const isMobile = useIsMobile()
  const [timeRange, setTimeRange] = React.useState("90d")

  React.useEffect(() => {
    if (isMobile) {
      setTimeRange("7d")
    }
  }, [isMobile])

  let filteredData: typeof chartData = []
  if (chartData.length > 0) {
    const referenceDate = new Date(chartData[0].date)
    filteredData = chartData.filter((item) => {
      const date = new Date(item.date)
      let daysToSubtract = 90
      if (timeRange === "30d") {
        daysToSubtract = 30
      } else if (timeRange === "7d") {
        daysToSubtract = 7
      }
      const startDate = new Date(referenceDate)
      startDate.setDate(startDate.getDate() - daysToSubtract)
      return date >= startDate
    })
  }

  return (
    <Card className="@container/card h-full justify-between">

      {/* Chart Glu */}
      <CardHeader>
        <div className="flex flex-row items-center gap-2">
          <Badge className="bg-purple-100 p-3 dark:bg-zinc-800" variant="outline">
            <ClipboardMinus className="text-purple-700 dark:text-purple-400" />
          </Badge>
          <div className="flex flex-col ">
            <CardTitle className="text-md">Glucose & Cholesterol Tracker</CardTitle>
            <CardDescription>
              <span className="hidden @[540px]/card:block">
                Total glucose for the last 3 months
              </span>
              <span className="@[540px]/card:hidden ">Last 3 months</span>
            </CardDescription>
          </div>
        </div>
        <CardDescription className="ml-11 text-lime-400 text-xs text-start sm:text-md">
          {
            `${gluPercent < 0 ? `${gluPercent.toFixed(2)}% Decrease` : `${gluPercent.toFixed(2)}% Increase`}`
          }
        </CardDescription>
        <CardAction>
          <Select value={timeRange} onValueChange={setTimeRange}>
            <SelectTrigger
              className="flex w-30 sm:w-40 **:data-[slot=select-value]:block **:data-[slot=select-value]:truncate "
              size="sm"
              aria-label="Select a value"
            >
              <SelectValue placeholder="Last 3 months" />
            </SelectTrigger>
            <SelectContent className="rounded-xl">
              <SelectItem value="90d" className="rounded-lg">
                Last 3 months
              </SelectItem>
              <SelectItem value="30d" className="rounded-lg">
                Last 30 days
              </SelectItem>
              <SelectItem value="7d" className="rounded-lg">
                Last 7 days
              </SelectItem>
            </SelectContent>
          </Select>
        </CardAction>
      </CardHeader>

      <CardContent className="px-2 pt-4 sm:px-6 sm:pt-6">
        <ChartContainer
          config={chartConfig}
          className="aspect-auto h-[250px] w-full"
        >
          <LineChart
            accessibilityLayer
            data={filteredData}
            margin={{
              left: 12,
              right: 12,
            }}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="date"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              minTickGap={32}
              tickFormatter={(value) => {
                const date = new Date(value)
                return date.toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                })
              }}
            />
            <ChartTooltip
              content={
                <ChartTooltipContent
                  labelFormatter={(value) => {
                    return new Date(value).toLocaleDateString("en-US", {
                      day: "numeric",
                      month: "long",
                      year: "numeric",
                    })
                  }}
                />
              }
              cursor={false}
              defaultIndex={1}
            />
            <Line
              dataKey="glucose"
              type="natural"
              stroke="var(--color-glucose)"
              strokeWidth={2}
              dot={({ cx, cy, payload }) => {
                const r = 24
                return (
                  <GitCommitVertical
                    key={payload.month}
                    x={cx - r / 2}
                    y={cy - r / 2}
                    width={r}
                    height={r}
                    fill="hsl(var(--background))"
                    stroke="var(--color-glucose)"
                  />
                )
              }}
            />
          </LineChart>
        </ChartContainer>

      </CardContent>

      {/* Chart Chol */}
      <CardHeader>
        <div className="flex flex-row items-center gap-2 ">
          <Badge className="bg-purple-100 p-3 dark:bg-zinc-800" variant="outline">
            <Dna className="text-fuchsia-700 dark:text-fuchsia-400" />
          </Badge>
          <div className="flex flex-col ">
            <CardTitle className="text-md">Cholesterol Tracker</CardTitle>
            <CardDescription>
              <CardDescription className=" text-lime-400 text-xs text-start sm:text-md">
                {
                  `${cholPercent < 0 ? `${cholPercent.toFixed(2)}% Decrease` : `${cholPercent.toFixed(2)}% Increase`}`
                }
              </CardDescription>
            </CardDescription>
          </div>
        </div>

        <CardAction>
          <Select value={timeRange} onValueChange={setTimeRange}>
            <SelectTrigger
              className="flex w-30 sm:w-40 **:data-[slot=select-value]:block **:data-[slot=select-value]:truncate "
              size="sm"
              aria-label="Select a value"
            >
              <SelectValue placeholder="Last 3 months" />
            </SelectTrigger>
            <SelectContent className="rounded-xl">
              <SelectItem value="90d" className="rounded-lg">
                Last 3 months
              </SelectItem>
              <SelectItem value="30d" className="rounded-lg">
                Last 30 days
              </SelectItem>
              <SelectItem value="7d" className="rounded-lg">
                Last 7 days
              </SelectItem>
            </SelectContent>
          </Select>
        </CardAction>
      </CardHeader>

      <ChartContainer
        config={chartConfig}
        className="aspect-auto h-[250px] w-full mt-5">
        <AreaChart
          accessibilityLayer
          data={filteredData}
          margin={{
            left: 12,
            right: 12,
          }}
        >
          <CartesianGrid vertical={false} />
          <XAxis
            dataKey="date"
            tickLine={false}
            axisLine={false}
            tickMargin={8}
            minTickGap={32}
            tickFormatter={(value) => {
              const date = new Date(value)
              return date.toLocaleDateString("en-US", {
                month: "short",
                day: "numeric",
              })
            }}
          />
          <ChartTooltip
              content={
                <ChartTooltipContent
                  hideLabel
                  className="w-[180px]"
                  formatter={(value, name, item, index) => (
                    <>
                      <div
                        className="h-2.5 w-2.5 shrink-0 rounded-[2px] bg-(--color-bg)"
                        style={
                          {
                            "--color-bg": `var(--color-${name})`,
                          } as React.CSSProperties
                        }
                      />
                      {chartConfig[name as keyof typeof chartConfig]?.label ||
                        name}
                      <div className="text-foreground ml-auto flex items-baseline gap-0.5 font-mono font-medium tabular-nums">
                        {value}
                        <span className="text-muted-foreground font-normal">
                          mg/dL
                        </span>
                      </div>
                      {/* Add this after the last item */}
                      {index === 1 && (
                        <div className="text-foreground mt-1.5 flex basis-full items-center border-t pt-1.5 text-xs font-medium">
                          Total
                          <div className="text-foreground ml-auto flex items-baseline gap-0.5 font-mono font-medium tabular-nums">
                            {item.payload.cholHdl + item.payload.cholLdl}
                            <span className="text-muted-foreground font-normal">
                              mg/dL
                            </span>
                          </div>
                        </div>
                      )}
                    </>
                  )}
                />
              }
              cursor={false}
              defaultIndex={1}
            />
          <defs>
            <linearGradient id="fillDesktop" x1="0" y1="0" x2="0" y2="1">
              <stop
                offset="5%"
                stopColor="var(--color-cholHdl)"
                stopOpacity={0.8}
              />
              <stop
                offset="95%"
                stopColor="var(--color-cholHdl)"
                stopOpacity={0.1}
              />
            </linearGradient>
            <linearGradient id="fillMobile" x1="0" y1="0" x2="0" y2="1">
              <stop
                offset="5%"
                stopColor="var(--color-cholLdl)"
                stopOpacity={0.8}
              />
              <stop
                offset="95%"
                stopColor="var(--color-cholLdl)"
                stopOpacity={0.1}
              />
            </linearGradient>
          </defs>
          <Area
            dataKey="cholHdl"
            type="natural"
            fill="url(#fillMobile)"
            fillOpacity={0.4}
            stroke="var(--color-cholHdl)"
            stackId="a"
          />
          <Area
            dataKey="cholLdl"
            type="natural"
            fill="url(#fillDesktop)"
            fillOpacity={0.4}
            stroke="var(--color-cholLdl)"
            stackId="a"
          />
        </AreaChart>
      </ChartContainer>
    </Card>
  )
}
