import { IconTrendingDown, IconTrendingUp } from "@tabler/icons-react"

import { Badge } from "@/components/ui/badge"
import {
    Card,
    CardAction,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { ChartBarCholesterol } from "./chart-bar-cholesterol"

export function CholesterolCard() {
    return (
        <div  >

            <Card className="p-6 h-full gap-5" >
                <h1 className="text-2xl">Latest Cholesterol</h1>
                <div className="flex justify-center ">
                    <div className="w-full max-w-[300px] aspect-square bg-zinc-50 rounded-full flex items-center justify-center">
                    <div className="w-2/3 aspect-square bg-zinc-100 rounded-full flex items-center justify-center p-2">
                        <img src="/heart.png" alt="Logo" className="w-full h-full object-contain" />
                    </div>  
                </div>
                </div>
                <div className="flex flex-row gap-2">
                    <Card className="px-2 gap-3 w-full">
                        <CardDescription className="text-xs sm:text-sm">Low-Density Lipoprotein</CardDescription>
                        <div className="flex flex-row items-end gap-2">
                            <h1 className="text-2xl">100</h1>
                            <CardDescription className="text-sm">mg/dL</CardDescription>
                        </div>
                    </Card>
                    <Card className="px-2 gap-3 w-full">
                        <CardDescription className="text-xs sm:text-sm">High-Density Lipoprotein</CardDescription>
                        <div className="flex flex-row items-end gap-2">
                            <h1 className="text-2xl">60</h1>
                            <CardDescription className="text-sm">mg/dL</CardDescription>
                        </div>
                    </Card>
                    <Card className="px-2 gap-3 w-full">
                        <CardDescription className="text-xs sm:text-sm" >Total Cholesterol</CardDescription>
                        <div className="flex flex-row items-end gap-2">
                            <h1 className="text-2xl">200</h1>
                            <CardDescription className="text-sm">mg/dL</CardDescription>
                        </div>
                    </Card>
                </div>
                <ChartBarCholesterol />
            </Card>

        </div>
    )
}
