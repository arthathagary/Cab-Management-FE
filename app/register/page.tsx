"use client"

import { useEffect } from "react"
import { useSelector } from "react-redux"
import { useRouter } from "next/navigation"
import RegisterForm from "@/components/RegisterForm"

import { useToast } from "@/hooks/use-toast"


export default function RegisterPage() {
  const router = useRouter()
  const user = JSON.parse(localStorage.getItem("user") || "{}")
  const { toast } = useToast();

  useEffect(() => {
    
    console.log("user+11+ ", user.user)
    if (user && user.user.role !== "admin") {
      toast({
        title: "Unauthorized",
        description: "You are not authorized to access this page, try logging in with an admin account.",
      });
      router.push("/login")
    }
  }, [user, router])

  if (user && user.user.role !== "admin") {
    return null
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <RegisterForm />
    </div>
  )
}

