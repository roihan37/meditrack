import {
    Card,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"

import { AuthForm } from "@/components/form-auth"
import { Activity } from "lucide-react"


export function SignupPage() {
    return (
        <div className="bg-muted flex min-h-svh flex-col items-center justify-center gap-6 p-6 md:p-10">
            <div className="flex w-full max-w-sm flex-col gap-6">
                <div className="flex items-center gap-2 self-center font-medium">
                    <div className="bg-primary bg-purple-800 text-primary-foreground flex size-6 items-center justify-center rounded-md">
                        <Activity className="size-4 dark:text-white" />
                    </div>
                    MediTract
                </div>
                <Card>
                    <CardHeader className="text-center">
                        <CardTitle className="text-xl">Create an Account</CardTitle>
                    </CardHeader>

                    <AuthForm />
                </Card>
                <div className="text-muted-foreground *:[a]:hover:text-primary text-center text-xs text-balance *:[a]:underline *:[a]:underline-offset-4">
                    By clicking continue, you agree to our <a href="#">Terms of Service</a>{" "}
                    and <a href="#">Privacy Policy</a>.
                </div>
            </div>
        </div>
    )
}