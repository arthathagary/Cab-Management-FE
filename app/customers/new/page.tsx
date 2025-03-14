import NewCustomerForm from "@/components/new-customer-form"

export default function NewCustomerPage() {
  return (
    <div className="container mx-auto py-6">
      <h1 className="text-2xl font-bold mb-6">Add New Customer</h1>
      <NewCustomerForm />
    </div>
  )
}

