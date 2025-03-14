"use client"

import { useState } from "react"
import { useDispatch } from "react-redux"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { login } from "../lib/slices/authSlice"
import type { AppDispatch } from "../lib/store"
import type React from "react" // Added import for React

const LoginForm = () => {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [errorMessage, setErrorMessage] = useState("")
  const dispatch = useDispatch<AppDispatch>()
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      const user =await dispatch(login({ email, password })).unwrap()
      console.log("user2", user)
      localStorage.setItem("token", user.token)
      localStorage.setItem("user", JSON.stringify(user))
      router.push("/dashboard")
    } catch (error: any) {
      console.error("Failed to log in:", error)
      if (error.name === "AxiosError" && error.code === "ERR_BAD_REQUEST") {
        setErrorMessage("Invalid credentials. Please check your email or password.")
      } else {
        setErrorMessage("An unexpected error occurred. Please try again.")
      }
    }
  }

  return (
    <Card className="w-[350px]">
      <CardHeader>
        <CardTitle>Login</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
          </div>
          <div className="space-y-2">
            <Input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          {errorMessage && (
            <p className="text-red-500 text-sm">{errorMessage}</p>
          )}
          <Button type="submit" className="w-full">
            Login
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}

export default LoginForm

