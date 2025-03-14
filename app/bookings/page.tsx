"use client"
import { useEffect, useState } from "react"
import Link from "next/link"
import { MapPin, MoreHorizontal, ArrowLeft } from "lucide-react"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { useToast } from "@/hooks/use-toast"
import withAuth from "@/utils/withAuth"


function BookingsPage() {
  const [bookings, setBookings] = useState([])
  const { toast } = useToast();

  useEffect(() => {
    async function fetchBookings() {
      try {
        const response = await fetch("http://localhost:8080/api/bookings")
        const data = await response.json()
        setBookings(data)
      } catch (error) {
        console.error("Failed to fetch bookings:", error)
      }
    }
    fetchBookings()
  }, [])

  async function handleDeleteBooking(bookingId: string) {
    try {
      await fetch(`http://localhost:8080/api/bookings/${bookingId}`, {
        method: "DELETE",
      })
      setBookings((prev) => prev.filter((b: any) => b._id !== bookingId))
      toast({
        title: "Booking deleted",
        description: "The booking has been successfully deleted.",
      })
    } catch (error) {
      toast({
        title: "Failed to delete booking",
        description: "An error occurred while deleting the booking.",
      })
      console.error("Failed to delete booking:", error)
    }
  }

  const printBill = (bookingId: string) => {
    window.location.href = `http://localhost:8080/api/bill/download/${bookingId}`
  }

  return (
    <div className="container mx-auto py-6">
      <div className="flex items-center justify-between mb-6">
        <Link href="/dashboard" className="font-bold cursor-pointer flex justify-center gap-2"> <ArrowLeft /> Back To Dashboard</Link>
        <h1 className="text-2xl font-bold">Bookings</h1>
        <Button asChild>
          <Link href="/bookings/new">New Booking</Link>
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>All Bookings</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Booking ID</TableHead>
                <TableHead>Customer</TableHead>
                <TableHead className="hidden md:table-cell">Pickup</TableHead>
                <TableHead className="hidden md:table-cell">Dropoff</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Fare</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {bookings.map((booking:any) => (
                <TableRow key={booking._id}>
                  <TableCell className="font-medium">{booking._id}</TableCell>
                  <TableCell>
                    {booking.customer?.name ?? "N/A"}
                  </TableCell>
                  <TableCell className="hidden md:table-cell">
                    <div className="flex items-center gap-2">
                      <MapPin className="h-4 w-4 text-muted-foreground" />
                      {booking.pickupLocation}
                    </div>
                  </TableCell>
                  <TableCell className="hidden md:table-cell">
                    <div className="flex items-center gap-2">
                      <MapPin className="h-4 w-4 text-muted-foreground" />
                      {booking.dropLocation}
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge
                      variant={
                        booking.status === "completed"
                          ? "default"
                          : booking.status === "confirmed"
                            ? "secondary"
                            : booking.status === "pending"
                              ? "outline"
                              : "destructive"
                      }
                    >
                      {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
                    </Badge>
                  </TableCell>
                  <TableCell>{booking.fare}</TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon">
                          <MoreHorizontal className="h-4 w-4" />
                          <span className="sr-only">Actions</span>
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={() => printBill(booking._id)}>
                          Print Bill
                        </DropdownMenuItem>
                        <DropdownMenuItem asChild>
                          <Link href={`/bookings/${booking._id}/edit`}>
                            Edit booking
                          </Link>
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem
                          onClick={() => handleDeleteBooking(booking._id)}
                          className="text-red-600"
                        >
                          Cancel booking
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

export default withAuth(BookingsPage);
