"use client"
import Dashboard from "@/components/dashboard"
import withAuth from "@/utils/withAuth";

function DashboardPage() {
  return (
    <div className="p-4">
      <Dashboard />
    </div>
  )
}

export default withAuth(DashboardPage);


