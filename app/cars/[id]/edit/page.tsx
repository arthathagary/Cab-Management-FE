"use client"
import { useSearchParams } from "next/navigation"
import axios from "axios"
import { useEffect, useState } from "react"
import NewCarForm from "@/components/new-car-form"

export default function EditCarPage({ params }: { params: { id: string } }) {
  const [car, setCar] = useState(null)
  const searchParams = useSearchParams()

  useEffect(() => {
    axios.get(`http://localhost:8080/api/cars/${params.id}`)
      .then((res) => setCar(res.data))
      .catch((err) => console.error(err))
  }, [params.id])

  return (
    <div className="container mx-auto py-6">
      <h1 className="text-2xl font-bold mb-6">Edit Car</h1>
      {car && (
        <NewCarForm existingCar={car} />
      )}
    </div>
  )
}
