"use client"

import { useSelector } from "react-redux"
import type { RootState } from "../lib/store"

const DashboardContent = () => {
  const user = useSelector((state: RootState) => state.auth.user)
  console.log("user")

  if (!user) {
    return <div>Loading...</div>
  }

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Welcome, {user.name}</h1>
      {/* Add dashboard content based on user role */}
    </div>
  )
}

export default DashboardContent

