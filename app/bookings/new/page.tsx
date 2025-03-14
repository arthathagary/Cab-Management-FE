import NewBookingForm from "@/components/new-booking-form"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"

export default function NewBookingPage() {
  return (
    <div className="container mx-auto py-6">
      <div className="flex justify-between items-baseline">
        <Link href="/dashboard" className="font-bold cursor-pointer flex justify-center gap-2"> <ArrowLeft /> Back To Dashboard</Link>
        <h1 className="text-2xl font-bold mb-6">Create New Booking</h1>
      </div>
      <NewBookingForm />
    </div>
  )
}

