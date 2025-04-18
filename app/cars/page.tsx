"use client"
import { ArrowLeft, CalendarDays, MoreHorizontal, Search, UserPlus } from "lucide-react"
import axios from "axios"
import { useState, useEffect } from "react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import Link from "next/link"
import withAuth from "@/utils/withAuth"

function CarsPage() {
  const [cars, setCars] = useState([])
  const [searchTerm, setSearchTerm] = useState("")

  useEffect(() => {
    axios.get("http://localhost:8080/api/cars").then((response) => {
      setCars(response.data)
    })
  }, [])

  // Format date to a more readable format
  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return new Intl.DateTimeFormat("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    }).format(date)
  }

  const handleDeleteCar = async (id: string) => {
    try {
      await axios.delete(`http://localhost:8080/api/cars/${id}`)
      setCars(cars.filter((car: any) => car._id !== id))
    } catch (error) {
      console.error(error)
    }
  }

  // Filter cars based on search term
  const filteredCars = cars.filter((car: any) =>
    car.model.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <div className="container mx-auto py-6">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between mb-6">
      <Link href="/dashboard" className="font-bold cursor-pointer flex justify-center gap-2"> <ArrowLeft /> Back To Dashboard</Link>
        <div className="flex flex-col gap-2 sm:flex-row">
          <div className="relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input 
              type="search" 
              placeholder="Search cars..." 
              className="pl-8 w-full md:w-[250px]"
              onChange={(e) => setSearchTerm(e.target.value)} // added onChange handler
            />
          </div>
          <Link href={`/cars/new`}> 
          <Button>
            <UserPlus className="mr-2 h-4 w-4" />
            Add Car
          </Button>
          </Link>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>All Cars</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Model</TableHead>
                <TableHead>Plate Number</TableHead>
                <TableHead>Capacity</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Registered</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredCars.map((car:any) => (
                <TableRow key={car.id}>
                  <TableCell className="font-medium">{car.model}</TableCell>
                  <TableCell>{car.plateNumber}</TableCell>
                  <TableCell>{car.capacity}</TableCell>
                  <TableCell>{car.status}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <CalendarDays className="h-4 w-4 text-muted-foreground" />
                      {formatDate(car.createdAt)}
                    </div>
                  </TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon">
                          <MoreHorizontal className="h-4 w-4" />
                          <span className="sr-only">Actions</span>
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem asChild>
                          <Link href={`/cars/${car._id}/edit`}>Edit car</Link>
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem className="text-red-600" onClick={() => handleDeleteCar(car._id)}>
                          Delete car
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}

export default withAuth(CarsPage);
