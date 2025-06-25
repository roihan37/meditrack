import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  CardContent,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import React, { useState } from "react"
import { useAuthContext } from "@/context/AuthContext"
import { Link, useLocation, useNavigate } from "react-router-dom"
import { signupApi } from "@/api/action"
import { showErrorToast, showLoadingToast, showSuccessToast } from "@/lib/toast"

export function AuthForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const navigate = useNavigate()
  const { login } = useAuthContext()
  const { pathname } = useLocation()

  const [authForm, setAuthForm] = useState({
    username: '',
    email: '',
    password: '',
    address: '',
    phoneNumber: ''
  })

  const henddleInputForm = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    if (name === "phoneNumber") {
      if (!/^\d*$/.test(value)) return;
    }
    const newLoginForm = {
      ...authForm,
      [e.target.name]: e.target.value
    }
    setAuthForm(newLoginForm)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    const toastId = showLoadingToast({
      header: "🔐 Loading...",
      description: "Relax while having coffee...",
    })

    try {
      if (pathname === '/login') {
        await login(authForm)
        showSuccessToast({
          id: toastId, header: "Login successful!",
          description: "Welcome back! You're now logged in.",

        })
        navigate('/')
      } else {
        await signupApi(authForm)
        showSuccessToast({
          id: toastId, header: "Account created successfully!",
          description: "Welcome aboard! 🎉 You can now log in.",

        })
        navigate("/login")
      }

    } catch (error) {
      showErrorToast({
        id: toastId, header: "Login failed!",
        description: error instanceof Error
          ? error.message
          : "An unexpected error occurred. Please try again.",
      })
    }
  }


  return (
    <div className={cn("flex flex-col gap-6 px-6", className)} {...props}>
      <>
        <CardContent>
          <form onSubmit={handleSubmit}>
            <div className="grid gap-6">
              <div className="grid gap-6">
                {
                  pathname === "/signup" ?
                    <div className="grid gap-3">
                      <Label htmlFor="email">Username</Label>
                      <Input
                        id="username"
                        type="username"
                        name="username"
                        required
                        onChange={henddleInputForm}
                        value={authForm.username}
                      />
                    </div> : ''
                }
                <div className="grid gap-3">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    name="email"
                    placeholder="m@example.com"
                    required
                    onChange={henddleInputForm}
                    value={authForm.email}
                  />
                </div>
                <div className="grid gap-3">
                  <div className="flex items-center">
                    <Label htmlFor="password">Password</Label>
                  </div>
                  <Input
                    id="password"
                    type="password"
                    name="password"
                    onChange={henddleInputForm}
                    value={authForm.password}
                    required />
                </div>
                {
                  pathname === "/signup" ?
                    <>
                      <div className="grid gap-3">
                        <Label >Address</Label>
                        <Input
                          id="address"
                          type="address"
                          name="address"
                          onChange={henddleInputForm}
                          value={authForm.address}
                        />
                      </div>
                      <div className="grid gap-3">
                        <Label >Phone Number</Label>
                        <Input
                          id="phoneNumber"
                          name="phoneNumber"
                          type="text"
                          inputMode="numeric"
                          pattern="[0-9]*"
                          value={authForm.phoneNumber}
                          onChange={henddleInputForm}
                          required
                        />
                      </div>
                    </>
                    : ''
                }
                <Button type="submit" className="w-full">
                  {pathname === "/signup" ? 'Sign Up' : 'Login'}
                </Button>
              </div>
              <div className="text-center text-sm">
                {
                  pathname === "/signup" ? 'have an account? ' : `Don't have an account? `
                }
                <Link to={pathname === "/signup" ? '/login' : '/signup'} className="underline underline-offset-4">
                  {pathname === "/signup" ? 'Login' : 'Sign Up'}
                </Link>
              </div>
            </div>
          </form>
        </CardContent>
      </>
    </div>
  )
}
