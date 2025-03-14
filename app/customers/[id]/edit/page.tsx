"use client"
import { useEffect, useState } from "react"
import axios from "axios"
import NewCustomerForm from "@/components/new-customer-form"
import { useRouter } from "next/navigation"

export default function EditCustomerPage({ params }: { params: { id: string } }) {
  const [customer, setCustomer] = useState<any>(null)
  const router = useRouter()

  useEffect(() => {
    axios.get(`http://localhost:8080/api/customers/${params.id}`).then((response) => {
      setCustomer(response.data)
    })
  }, [params.id])

  const handleSubmit = async (updatedCustomer: any) => {
    await axios.put(`http://localhost:8080/api/customers/${params.id}`, updatedCustomer)
    router.push("/customers")
  }

  if (!customer) return <div>Loading...</div>

  return (
    <div className="container mx-auto py-6">
      <h1 className="text-2xl font-bold mb-6">Edit Customer</h1>
      <NewCustomerForm initialData={customer} onSubmit={handleSubmit} />
    </div>
  )
}