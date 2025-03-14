"use client"
import { useRouter, useParams } from "next/navigation"
import { useEffect, useState } from "react"
import axios from "axios"
import NewDriverForm from "@/components/new-driver-form"
import withAuth from "@/utils/withAuth"

function EditDriverPage() {
  const { id } = useParams()
  const [driver, setDriver] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    axios.get(`http://localhost:8080/api/drivers/${id}`).then((res) => {
      setDriver(res.data)
      setLoading(false)
    })
  }, [id])

  if (loading) return <div>Loading...</div>

  return (
    <div className="container mx-auto py-6">
      <h1 className="text-2xl font-bold mb-6">Edit Driver</h1>
      <NewDriverForm driver={driver} isEdit />
    </div>
  )
}

export default withAuth(EditDriverPage);