import { IconTrendingDown } from "@tabler/icons-react"

import { Badge } from "@/components/ui/badge"
import {
  Card,
  CardAction,
  CardDescription,
  CardTitle,
} from "@/components/ui/card"
import type {  ResultLab } from "@/types/lab"
import { useAuthContext } from "@/context/AuthContext"
import { ClipboardMinus, Dna, HeartPulse } from "lucide-react"




export function SectionCards( ) {
  const { results }  = useAuthContext()
  const result : ResultLab  = results?.[0] 

  return (
    <div className="grid grid-cols-1 gap-4  md:grid-cols-2 lg:grid-cols-3 *:data-[slot=card]:from-primary/5 *:data-[slot=card]:to-card dark:*:data-[slot=card]:bg-card  *:data-[slot=card]:bg-gradient-to-t *:data-[slot=card]:shadow-xs ">
      <Card className="p-6 justify-between gap-3" >
        <div className="flex justify-between items-center gap-2">
          <CardDescription className="font-normal text-sm text-zinc-900" >Glucose</CardDescription>
          <CardAction>
            <Badge className="bg-purple-100 p-2" variant="outline">
              <ClipboardMinus className="text-purple-700" />
            </Badge>
          </CardAction>
        </div>
        <CardTitle className=" font-normal text-3xl">
          {result?.results.glucose}
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
            <Badge className="bg-fuchsia-100 p-2" variant="outline">
              <Dna className="text-fuchsia-700"/>
            </Badge>
          </CardAction>
        </div>
        <CardTitle className=" font-normal text-3xl">
          {result?.results.cholesterol.total}
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
            <Badge className="bg-pink-100 p-2" variant="outline">
              <HeartPulse className="w-24 h-24 text-pink-700"/>
            </Badge>
          </CardAction>
        </div>
        <CardTitle className=" font-normal text-3xl">
          {`${result?.results.bloodPressure.systolic}/`}<span className="text-3xl">{result?.results.bloodPressure.diastolic}</span>
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
