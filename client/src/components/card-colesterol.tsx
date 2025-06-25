
import {
    Card,
    CardDescription,
    CardTitle,
} from "@/components/ui/card"
import { ChartBarMixed } from "./chart-bar-cholesterol"
import { Badge } from "./ui/badge"
import { Dna, HeartPulse, SquareActivity } from "lucide-react"

export function CholesterolCard() {
    return (
            <Card className="p-6  h-full gap-5 " >

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

                <ChartBarMixed />
                
            </Card>

        
    )
}
