"use client"

import * as React from "react"
import { CartesianGrid, Line, LineChart, XAxis } from "recharts"

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
import {
  ToggleGroup,
  ToggleGroupItem,
} from "@/components/ui/toggle-group"
import { useAuthContext } from "@/context/AuthContext"
import { formatDate } from "date-fns"
import { ClipboardMinus, GitCommitVertical } from "lucide-react"
import { Badge } from "./ui/badge"

export const description = "An interactive area chart"
const chartConfig = {
  glucose: {
    label: "Glucose",
    color: "oklch(55.8% 0.288 302.321)",
  }
} satisfies ChartConfig

export function ChartAreaInteractive() {
  const { results } = useAuthContext()
  const gluNow = results[0]?.results?.glucose
  const gluPrev = results[1]?.results?.glucose
  const percentChange = ((gluNow - gluPrev) / gluPrev) * 100;

  const chartData = results.length > 0
    ? results.map((el) => ({
      date: formatDate(new Date(el.date), "yyyy-MM-dd"),
      glucose: el.results.glucose,
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

      <CardHeader>
        <div className="flex flex-row items-center gap-2">
          <Badge className="bg-purple-100 p-3 dark:bg-zinc-800" variant="outline">
            <ClipboardMinus className="text-purple-700 dark:text-purple-400" />
          </Badge>
          <div className="flex flex-col ">
            <CardTitle className="text-md">Glucose Tracker</CardTitle>
            <CardDescription>
              <span className="hidden @[540px]/card:block">
                Total for the last 3 months
              </span>
              <span className="@[540px]/card:hidden ">Last 3 months</span>
            </CardDescription>
          </div>
        </div>
        <CardDescription className="ml-11 text-lime-400 text-xs text-start sm:text-md">
          {
            `${percentChange < 0 ? `${percentChange.toFixed(2)}% Decrease` : `${percentChange.toFixed(2)}% Increase`}`
          }
        </CardDescription>
        <CardAction>
          <ToggleGroup
            type="single"
            value={timeRange}
            onValueChange={setTimeRange}
            variant="outline"
            className="hidden *:data-[slot=toggle-group-item]:!px-4 @[767px]/card:flex"
          >
            <ToggleGroupItem value="90d">Last 3 months</ToggleGroupItem>
            <ToggleGroupItem value="30d">Last 30 days</ToggleGroupItem>
            <ToggleGroupItem value="7d">Last 7 days</ToggleGroupItem>
          </ToggleGroup>
          <Select value={timeRange} onValueChange={setTimeRange}>
            <SelectTrigger
              className="flex w-30 sm:w-40 **:data-[slot=select-value]:block **:data-[slot=select-value]:truncate @[767px]/card:hidden"
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
    </Card>
  )
}
