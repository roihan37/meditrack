import { DatePickerForm } from "@/components/data-picker-form"
import { Button } from "@/components/ui/button"
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { FlaskConical } from "lucide-react"


export default function AddResultPage() {
    return (
        <div >
            <div className="px-7 py-8 border-1 border-zinc-100 rounded-md shadow-sm ">
                <div className="flex flex-row items-center gap-2">
                    <FlaskConical />
                    <h1 className="text-2xl">Laboratory Results</h1>
                </div>
                <h1 className="text-xl text-purple-700">Add lab results</h1>
                <DatePickerForm />
            </div>
        </div>
    )
}