import type { Metadata } from "next"
import DashboardContent from "@/components/DashboardContent"
import Dashboard from "@/components/dashboard"
import NewBookingForm from "@/components/new-booking-form"
import NewCustomerForm from "@/components/new-customer-form"
import NewDriverForm from "@/components/new-driver-form"
import NewCarForm from "@/components/new-car-form"

export const metadata: Metadata = {
  title: "Dashboard | Vehicle Reservation System",
}

export default function DashboardPage() {
  return (
    <div className="p-4">
      {/* <DashboardContent /> */}
      <Dashboard />
      {/* <NewBookingForm /> */}
      {/* <NewCustomerForm /> */}
      {/* <NewDriverForm /> */}
      {/* <NewCarForm /> */}
    </div>
  )
}

