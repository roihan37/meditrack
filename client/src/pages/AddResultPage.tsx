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


export function AddResultPage() {
    return (
        <div className="flex min-h-svh flex-col items-center justify-center gap-6 p-6 md:p-10">
            <div className="flex w-full max-w-sm flex-col gap-6">

                <CardHeader className="text-center">
                    <CardTitle className="text-xl">Add Result Lab</CardTitle>
                </CardHeader>
                <CardContent>
                    <form>
                        <div className="grid gap-6">
                            <DatePickerForm />
                            <div className="grid gap-6">
                                <div className="grid gap-3">
                                    <Label >Glucose</Label>
                                    <Input
                                        id="glucose"
                                        type="glucose"
                                    />
                                </div>
                                <div className="grid gap-3">
                                    <Label >Cholesterol</Label>
                                    <Input
                                        id="hdl"
                                        type="hdl"
                                        placeholder="High-Density Lipoprotein"
                                    />
                                    <Input
                                        id="ldl"
                                        type="ldl"
                                        placeholder="Low-Density Lipoprotein"
                                    />
                                </div>
                                <div className="grid gap-3">
                                    <Label >Blood Pressure</Label>
                                    <Input
                                        id="systolic"
                                        type="systolic"
                                        placeholder="Systolic"
                                    />
                                    <Input
                                        id="diastolic"
                                        type="diastolic"
                                        placeholder="Diastolic"
                                    />
                                </div>
                                <Button type="submit" className="w-full">
                                    Submit
                                </Button>
                            </div>
                        </div>
                    </form>
                </CardContent>

            </div>
        </div>
    )
}