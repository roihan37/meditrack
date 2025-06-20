
import {
    Card,
    CardDescription,
} from "@/components/ui/card"
import { ChartBarCholesterol } from "./chart-bar-cholesterol"
import type { Cholesterol, PropsResultLab } from "@/types/lab"
import { useAuthContext } from "@/context/AuthContext"

export function CholesterolCard() {
    const { results }  = useAuthContext()
    const cholest : Cholesterol   = results?.[0].results.cholesterol
    
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
                        <CardDescription className="text-xs ">Low-Density Lipoprotein</CardDescription>
                        <div className="flex flex-row items-end gap-2">
                            <h1 className="text-2xl">{cholest?.ldl}</h1>
                            <CardDescription className="text-sm">mg/dL</CardDescription>
                        </div>
                    </Card>
                    <Card className="px-2 gap-3 w-full">
                        <CardDescription className="text-xs ">High-Density Lipoprotein</CardDescription>
                        <div className="flex flex-row items-end gap-2">
                            <h1 className="text-2xl">{cholest?.hdl}</h1>
                            <CardDescription className="text-sm">mg/dL</CardDescription>
                        </div>
                    </Card>
                    <Card className="px-2 gap-3 w-full">
                        <CardDescription className="text-xs " >Total Cholesterol</CardDescription>
                        <div className="flex flex-row items-end gap-2">
                            <h1 className="text-2xl">{cholest?.total}</h1>
                            <CardDescription className="text-sm">mg/dL</CardDescription>
                        </div>
                    </Card>
                </div>
                <ChartBarCholesterol cholesterol={cholest} />
            </Card>

        </div>
    )
}
