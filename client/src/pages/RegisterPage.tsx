import { GalleryVerticalEnd } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"


export function RegisterPage() {
    return (
        <div className="bg-muted flex min-h-svh flex-col items-center justify-center gap-6 p-6 md:p-10">
            <div className="flex w-full max-w-sm flex-col gap-6">
                <Card>
                    <CardHeader className="text-center">
                        <CardTitle className="text-xl">Create an Account</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <form>
                            <div className="grid gap-6">
                                <div className="grid gap-6">
                                    <div className="grid gap-3">
                                        <Label htmlFor="email">Username</Label>
                                        <Input
                                            id="username"
                                            type="username"
                                            required
                                        />
                                    </div>
                                    <div className="grid gap-3">
                                        <Label htmlFor="email">Email</Label>
                                        <Input
                                            id="email"
                                            type="email"
                                            placeholder="m@example.com"
                                            required
                                        />
                                    </div>
                                    <div className="grid gap-3">
                                        <div className="flex items-center">
                                            <Label htmlFor="password">Password</Label>
                                        </div>
                                        <Input id="password" type="password" required />
                                    </div>
                                    <div className="grid gap-3">
                                        <Label htmlFor="email">Address</Label>
                                        <Input
                                            id="address"
                                            type="address"
                                            required
                                        />
                                    </div>
                                    <div className="grid gap-3">
                                        <Label htmlFor="email">Phone Number</Label>
                                        <Input
                                            id="phoneNumber"
                                            type="phoneNumber"
                                            required
                                        />
                                    </div>
                                    <Button type="submit" className="w-full">
                                        Sign up
                                    </Button>
                                </div>
                                <div className="text-center text-sm">
                                    have an account?{" "}
                                    <a href="#" className="underline underline-offset-4">
                                        Login
                                    </a>
                                </div>
                            </div>
                        </form>
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}