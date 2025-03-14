import NewCustomerForm from "@/components/new-customer-form"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"

export default function NewCustomerPage() {
  return (
    <div className="container mx-auto py-6">
      <div className="flex justify-between items-baseline">
        <Link href="/dashboard" className="font-bold cursor-pointer flex justify-center gap-2"> <ArrowLeft /> Back To Dashboard</Link>
        <h1 className="text-2xl font-bold mb-6">Add New Customer</h1>
      </div>
      <NewCustomerForm />
    </div>
  )
}

