
import {
    Card,
    CardDescription,
    CardFooter,
    CardHeader,
} from "@/components/ui/card"
import { ChartBarMixed } from "./chart-bar-cholesterol"
import { Badge } from "./ui/badge"
import { Dna, HeartPulse, Stethoscope } from "lucide-react"
import { useAuthContext } from "@/context/AuthContext"
import { findPercent } from "@/lib/utils"

export function CholesterolCard() {
    const { results } = useAuthContext()
    const {
        cholPercent, bloodPercent, 
        bloodPrev, cholNow, sysNow, diasNow
    } = findPercent(results)
   
    return (
        <Card className="p-6 h-full gap-12 w-full flex flex-col justify-between" >
            {/* HEADER */}
            <div className="flex flex-row justify-between items-start">
                <div className="flex flex-col items-start gap-2">
                    <div className="flex flex-row gap-2 items-center">
                        <div className="flex flex-col items-start  justify-between">
                            <div className="flex flex-row items-center gap-2">
                                <Stethoscope />
                                <h2 className="text-xl ">
                                    Blood Pressure & Cholesterol
                                </h2>
                            </div>
                            <span className="text-sm text-muted-foreground ml-8">
                                Latest checkup insights
                            </span>
                        </div>
                    </div>
                </div>
            </div>

            {/* IMAGE */}
            <div className="flex justify-center ">
                <div className="w-full dark:bg-zinc-800 max-w-[350px] aspect-square bg-zinc-50 rounded-full flex items-center justify-center">
                    <div className="w-2/3 dark:bg-zinc-700 aspect-square bg-zinc-100 rounded-full flex items-center justify-center p-2">
                        <img src="/heart.png" alt="Logo" className="w-full h-full object-contain" />
                    </div>
                </div>
            </div>
            <Card className="px-2">
                <CardHeader className="gap-0" >
                    <div className="flex  flex-row items-center gap-2">
                        <Badge className="bg-pink-100 dark:bg-zinc-800" variant="outline">
                            <HeartPulse className="text-pink-700 dark:text-pink-400" />
                        </Badge>
                        <CardDescription className="text-sm dark:text-zinc-100" >Blood Pressure (mmHg)</CardDescription>
                    </div>
                    <div className="flex flex-row items-center gap-2 mt-1">
                        <Badge className="bg-fuchsia-100 dark:bg-zinc-800" variant="outline">
                            <Dna className="text-fuchsia-700 dark:text-fuchsia-400" />
                        </Badge>
                        <CardDescription className="text-sm dark:text-zinc-100" >Cholesterol (mg/dL)</CardDescription>
                    </div>
                </CardHeader>

                <ChartBarMixed />

                {/* FOOTER */}
                <CardFooter className="flex-col items-start gap-2 text-sm -ml-3 -mt-20">
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
                        {
                            results.length ?
                                !bloodPrev ? `Now your total cholesterol is ${cholNow} mg/dL and blood pressure is ${sysNow}/${diasNow} mg/dL`

                                    : `${bloodPercent < 0 ? `Blood pressure down by ${bloodPercent.toFixed(2)}% 📉`
                                        : `Blood pressure up by ${bloodPercent.toFixed(2)}% 📈`
                                    } and cholesterol ${cholPercent < 0 ? `down by ${cholPercent.toFixed(2)}% 📉`
                                        : `up by ${(cholPercent).toFixed(2)}% 📈`}`


                                : `You have never checked up`
                        }
                    </div>
                    <div className="text-muted-foreground ">
                        Showing details of both this month
                    </div>
                </CardFooter>
            </Card>
        </Card>


    )
}
