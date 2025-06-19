import { IconTrendingDown } from "@tabler/icons-react"

import { Badge } from "@/components/ui/badge"
import {
  Card,
  CardAction,
  CardDescription,
  CardTitle,
} from "@/components/ui/card"

export function SectionCards() {
  return (
    <div className="grid grid-cols-1 gap-4  md:grid-cols-2 lg:grid-cols-3 *:data-[slot=card]:from-primary/5 *:data-[slot=card]:to-card dark:*:data-[slot=card]:bg-card  *:data-[slot=card]:bg-gradient-to-t *:data-[slot=card]:shadow-xs ">

      <Card className="p-6 justify-between gap-3" >
        <div className="flex justify-between items-center gap-2">
          <CardDescription className="font-normal text-sm text-zinc-900" >Glucose</CardDescription>
          <CardAction>
            <Badge variant="outline">
              <IconTrendingDown />
              -20%
            </Badge>
          </CardAction>
        </div>
        <CardTitle className=" font-normal text-3xl">
          95
          <span className="font-normal text-xl ml-2">mg/dL</span>
        </CardTitle>

        <div className="flex-col items-start gap-1.5 text-sm">
          <div className="line-clamp-1 flex gap-2 font-medium">
            Glucose for This month <IconTrendingDown className="size-4" />
          </div>
        </div>
      </Card>

      <Card className="p-6 justify-between gap-3" >
        <div className="flex justify-between items-center gap-2">
          <CardDescription className="font-normal text-sm text-zinc-900" >Total Cholesterol</CardDescription>
          <CardAction>
            <Badge variant="outline">
              <IconTrendingDown />
              -20%
            </Badge>
          </CardAction>
        </div>
        <CardTitle className=" font-normal text-3xl">
          160
          <span className="font-normal text-xl ml-2">mg/dL</span>
        </CardTitle>

        <div className="flex-col items-start gap-1.5 text-sm">
          <div className="line-clamp-1 flex gap-2 font-medium">
            Cholesterol for This month <IconTrendingDown className="size-4" />
          </div>
        </div>

      </Card>


      <Card className="p-6 justify-between gap-3" >
        <div className="flex justify-between items-center gap-2">
          <CardDescription className="font-normal text-sm text-zinc-900" >Blood Pressure</CardDescription>
          <CardAction>
            <Badge variant="outline">
              <IconTrendingDown />
              -20%
            </Badge>
          </CardAction>
        </div>
        <CardTitle className=" font-normal text-3xl">
          120/<span className="text-2xl">80</span>
          <span className="font-normal text-xl ml-2">mg/dL</span>
        </CardTitle>

        <div className="flex-col items-start gap-1.5 text-sm">
          <div className="line-clamp-1 flex gap-2 font-medium">
            Blood Pressure for This month <IconTrendingDown className="size-4" />
          </div>
        </div>

      </Card>


    </div>
  )
}
