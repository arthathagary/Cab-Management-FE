"use client"

import { useState } from "react"
import { useDispatch } from "react-redux"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { createBooking } from "../lib/slices/bookingSlice"
import type { AppDispatch } from "../lib/store"
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar"
import Link from "next/link"
import { Car, CreditCard, LayoutDashboard, ShoppingBag, Users } from "lucide-react"

const BookingForm = () => {
  const [pickup, setPickup] = useState("")
  const [dropoff, setDropoff] = useState("")
  const dispatch = useDispatch<AppDispatch>()
  const [activeItem, setActiveItem] = useState("Dashboard")


  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      await dispatch(createBooking({ pickup, dropoff })).unwrap()
      // Handle successful booking (e.g., show a success message, redirect)
    } catch (error) {
      console.error("Failed to create booking:", error)
    }
  }

  return (
    <SidebarProvider>
      <div className="flex h-screen w-full overflow-hidden bg-background">
        <Sidebar>
          <SidebarHeader className="border-b">
            <div className="flex items-center gap-2 px-4 py-2">
              <Car className="h-6 w-6" />
              <span className="text-lg font-bold">RideAdmin</span>
            </div>
          </SidebarHeader>
          <SidebarContent>
            <SidebarGroup>
              <SidebarGroupContent>
                <SidebarMenu>
                  <SidebarMenuItem>
                    <Link href="/dashboard">
                      <SidebarMenuButton isActive={activeItem === "Dashboard"} onClick={() => setActiveItem("Dashboard")}>
                        <LayoutDashboard className="h-4 w-4" />
                        <span>Dashboard</span>
                      </SidebarMenuButton>
                    </Link>
                  </SidebarMenuItem>
                  <SidebarMenuItem>
                    <Link href="/bookings">
                      <SidebarMenuButton isActive={activeItem === "Bookings"} onClick={() => setActiveItem("Bookings")}>
                        <ShoppingBag className="h-4 w-4" />
                        <span>Bookings</span>
                      </SidebarMenuButton>
                    </Link>
                  </SidebarMenuItem>
                  <SidebarMenuItem>
                    <Link href="/customers">
                      <SidebarMenuButton isActive={activeItem === "Customers"} onClick={() => setActiveItem("Customers")}>
                        <Users className="h-4 w-4" />
                        <span>Customers</span>
                      </SidebarMenuButton>
                    </Link>
                  </SidebarMenuItem>
                  <SidebarMenuItem>
                    <Link href="/drivers">
                      <SidebarMenuButton isActive={activeItem === "Drivers"} onClick={() => setActiveItem("Drivers")}>
                        <Users className="h-4 w-4" />
                        <span>Drivers</span>
                      </SidebarMenuButton>
                    </Link>
                  </SidebarMenuItem>
                  <SidebarMenuItem>
                    <Link href="/cars">
                      <SidebarMenuButton isActive={activeItem === "Cars"} onClick={() => setActiveItem("Cars")}>
                        <Car className="h-4 w-4" />
                        <span>Cars</span>
                      </SidebarMenuButton>
                    </Link>
                  </SidebarMenuItem>
                  <SidebarMenuItem>
                    <Link href="/reports">
                      <SidebarMenuButton isActive={activeItem === "Reports"} onClick={() => setActiveItem("Reports")}>
                        <CreditCard className="h-4 w-4" />
                        <span>Reports</span>
                      </SidebarMenuButton>
                    </Link>
                  </SidebarMenuItem>
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
          </SidebarContent>
        </Sidebar>
        <div className="flex flex-1 flex-col overflow-hidden">
    <Card className="w-[400px]">
      <CardHeader>
        <CardTitle>Book a Ride</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Input
              type="text"
              placeholder="Pickup Location"
              value={pickup}
              onChange={(e) => setPickup(e.target.value)}
              required
            />
          </div>
          <div className="space-y-2">
            <Input
              type="text"
              placeholder="Drop-off Location"
              value={dropoff}
              onChange={(e) => setDropoff(e.target.value)}
              required
            />
          </div>
          <Button type="submit" className="w-full">
            Book Ride
          </Button>
        </form>
      </CardContent>
    </Card>
    </div>
    </div>
    </SidebarProvider>
  )
}

export default BookingForm

