import { IconTrendingDown, IconTrendingUp } from "@tabler/icons-react"

import { Badge } from "@/components/ui/badge"
import {
  Card,
  CardAction,
  CardDescription,
  CardTitle,
} from "@/components/ui/card"
import { useAuthContext } from "@/context/AuthContext"
import { ClipboardMinus, Dna, HeartPulse } from "lucide-react"
import { findPercent } from "@/lib/utils"

export function SectionCards() {
  const { results } = useAuthContext()
  const {bloodPercent, cholPercent, gluPercent} = findPercent(results)
  const result = results[0]?.results

  return (
    <div className="grid grid-cols-1 gap-4  md:grid-cols-2 lg:grid-cols-3 *:data-[slot=card]:from-primary/5 
    *:data-[slot=card]:to-card dark:*:data-[slot=card]:bg-card  *:data-[slot=card]:bg-gradient-to-t *:data-[slot=card]:shadow-xs ">

      {/* CARD Glucose*/}
      <Card className="p-6 justify-between gap-3" >
        <div className="flex justify-between items-center gap-2">
          <CardDescription className="font-normal text-sm text-zinc-900 dark:text-zinc-100 " >Glucose</CardDescription>
          <CardAction>
            <Badge className="bg-purple-100 dark:bg-zinc-800 p-2" variant="outline">
              <ClipboardMinus className="text-purple-700 dark:text-purple-400" />
            </Badge>
          </CardAction>
        </div>
        <CardTitle className=" font-normal text-3xl">
          {
            results.length ? (
              <>
                {result?.glucose}
                <span className="font-normal text-xl ml-2">mg/dL</span>
              </>
            ) : (
              <p className="font-normal text-sm text-center">No results.</p>
            )
          }

        </CardTitle>

        <div className="flex-col items-start gap-1.5 text-sm">
          <div className="line-clamp-1 flex gap-2 font-medium dark:text-zinc-400">
            Glu for This month {
            gluPercent < 0 ?
            <IconTrendingDown className="size-4" />
            : <IconTrendingUp className="size-4"/>
            }
          </div>
        </div>
      </Card>

      {/* CARD Cholesterol*/}
      <Card className="p-6 justify-between gap-6" >
        <div className="flex justify-between items-center gap-2">
          <CardDescription className="font-normal text-sm text-zinc-900 dark:text-zinc-100" >Total Cholesterol</CardDescription>
          <CardAction>
            <Badge className="dark:bg-zinc-800 bg-fuchsia-100 p-2" variant="outline">
              <Dna className="text-fuchsia-700 dark:text-fuchsia-400" />
            </Badge>
          </CardAction>
        </div>
        <CardTitle className=" font-normal text-3xl">
          {
            results.length ? (
              <>
                {result?.cholesterol?.total}
                <span className="font-normal text-xl ml-2">mg/dL</span>
              </>
            ) : (
              <p className="font-normal text-sm text-center">No results.</p>
            )
          }

        </CardTitle>

        <div className="flex-col items-start gap-1.5 text-sm">
          <div className="line-clamp-1 flex gap-2 font-medium dark:text-zinc-400">
            Chol for This month {
            cholPercent < 0 ?
            <IconTrendingDown className="size-4" />
            : <IconTrendingUp className="size-4"/>
            }
          </div>
        </div>

      </Card>

      {/* CARD Blood Preasure*/}
      <Card className="p-6 justify-between gap-3" >
        <div className="flex justify-between items-center gap-2">
          <CardDescription className="font-normal text-sm text-zinc-900 dark:text-zinc-100" >Blood Pressure</CardDescription>
          <CardAction>
            <Badge className="dark:bg-zinc-800 bg-pink-100 p-2" variant="outline">
              <HeartPulse className="w-24 h-24 dark:text-pink-400 text-pink-700" />
            </Badge>
          </CardAction>
        </div>
        <CardTitle className=" font-normal ">
          {
            results.length > 0 ? (
              <div >
                <p className="xl:text-2xl text-3xl">
                  {result?.bloodPressure?.systolic}/
                  <span >{result?.bloodPressure?.diastolic}</span>
                  <span className="font-normal xl:text-sm text-lg ml-2">mmHg</span>
                </p>
              </div>
            ) : (
              <p className="font-normal text-sm text-center">No results.</p>
            )
          }

        </CardTitle>

        <div className="flex-col items-start gap-1.5 text-sm">
          <div className="line-clamp-1 flex gap-2 font-medium dark:text-zinc-400">
            BP for This month {
            bloodPercent < 0 ?
            <IconTrendingDown className="size-4" />
            : <IconTrendingUp className="size-4"/>
            }
          </div>
        </div>

      </Card>
    </div>
  )
}
