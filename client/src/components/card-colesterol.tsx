
import {
    Card,
    CardDescription,
    CardFooter,
    CardTitle,
} from "@/components/ui/card"
import { ChartBarMixed } from "./chart-bar-cholesterol"
import { Badge } from "./ui/badge"
import { Dna, HeartPulse, SquareActivity } from "lucide-react"
import { useAuthContext } from "@/context/AuthContext"

export function CholesterolCard() {
    const {results} = useAuthContext()
    return (
        <Card className="p-6 h-full gap-5 w-full" >
            {/* HEADER */}
            <div className="flex flex-row justify-between items-start">
                <div className="flex flex-col items-start gap-2">
                    <div className="flex flex-row gap-2 items-center">
                        <SquareActivity className=" text-purple-700" />
                        <CardTitle className="font-light text-2xl">Latest Checkup Summary</CardTitle>
                    </div>
                    <div >
                        <div className="flex  flex-row items-center gap-2">
                            <Badge className="bg-pink-100" variant="outline">
                                <HeartPulse className=" text-pink-700" />
                            </Badge>
                            <CardDescription className="text-xs">Blood Pressure</CardDescription>
                        </div>
                        <div className="flex flex-row items-center gap-2 mt-1">
                            <Badge className="bg-fuchsia-100 " variant="outline">
                                <Dna className="text-fuchsia-700" />
                            </Badge>
                            <CardDescription className="text-xs">Cholesterol</CardDescription>
                        </div>
                    </div>
                </div>
            </div>

            {/* IMAGE */}
            <div className="flex justify-center ">
                <div className="w-full max-w-[300px] aspect-square bg-zinc-50 rounded-full flex items-center justify-center">
                    <div className="w-2/3 aspect-square bg-zinc-100 rounded-full flex items-center justify-center p-2">
                        <img src="/heart.png" alt="Logo" className="w-full h-full object-contain" />
                    </div>
                </div>
            </div>
            <Card>

            <ChartBarMixed />

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
                    {
                        results.length?
                       ` Blood pressure up by 5.2% 📈 and cholesterol down by 5.2% 📉`
                        :`You have never checked up`
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
