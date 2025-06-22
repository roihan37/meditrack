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


export default function AddResultPage() {
    return (
        <div className="flex min-h-svh flex-col items-center justify-center p-6 md:p-10">
            <Card className="flex w-full max-w-sm flex-col gap-6">

                <CardHeader className="text-center">
                    <CardTitle className="text-xl">Add Result Lab</CardTitle>
                </CardHeader>
                <CardContent>
                            <DatePickerForm />      
                </CardContent>

            </Card>
        </div>
    )
}