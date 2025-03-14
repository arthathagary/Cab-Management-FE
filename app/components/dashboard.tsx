"use client"

import { useState, useEffect } from "react"
import { Car, CreditCard, LayoutDashboard, MapPin, MoreHorizontal, Search, ShoppingBag, Users } from "lucide-react"
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
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import Link from "next/link"
import { useRouter } from "next/navigation"

// Sample data for the dashboard
const stats = [
  {
    title: "Total Bookings",
    value: "2,543",
    icon: ShoppingBag,
    change: "+12.5%",
    changeType: "positive",
  },
  {
    title: "Available Cars",
    value: "45",
    icon: Car,
    change: "-3.2%",
    changeType: "negative",
  },
  {
    title: "Registered Customers",
    value: "1,249",
    icon: Users,
    change: "+5.7%",
    changeType: "positive",
  },
  {
    title: "Revenue",
    value: "$45,231",
    icon: CreditCard,
    change: "+8.3%",
    changeType: "positive",
  },
]

export default function Dashboard() {
  const [activeItem, setActiveItem] = useState("Dashboard")
  const router = useRouter()
  const [bookings, setBookings] = useState([])
  const [stats, setStats] = useState({ users: 0, cars: 0, drivers: 0, customers: 0, bookings: 0 })

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const response = await fetch("http://localhost:8080/api/bookings")
        const data = await response.json()
        setBookings(data)
      } catch (error) {
        console.error(error)
      }
    }
    fetchBookings()

    fetch("http://localhost:8080/api/users/count-of-all")
      .then((res) => res.json())
      .then((data) => setStats(data))
      .catch((error) => console.error(error))
  }, [])

  const handleLogout = () => {
    localStorage.clear()
    router.push("/login")
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
          {/* Top Navigation */}
          <header className="flex h-14 items-center gap-4 border-b bg-background px-4 lg:h-[60px] lg:px-6">
            <SidebarTrigger />
            <div className="w-full flex-1">
              <form className="hidden md:block">
                <div className="relative">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    type="search"
                    placeholder="Search..."
                    className="w-full appearance-none bg-background pl-8 shadow-none md:w-2/3 lg:w-1/3"
                  />
                </div>
              </form>
            </div>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="icon" className="rounded-full">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src="/placeholder-user.jpg" alt="Avatar" />
                    <AvatarFallback>AD</AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>Profile</DropdownMenuItem>
                <DropdownMenuItem>Settings</DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={handleLogout}>Logout</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </header>

          {/* Main Content */}
          <main className="flex-1 overflow-y-auto p-4 md:p-6">
            <div className="flex items-center justify-between">
              <h1 className="text-2xl font-bold">Dashboard</h1>
              <Link href={"/bookings/new"}><Button>New Booking</Button></Link>
            </div>

            {/* Stats Cards */}
            <div className="mt-6 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              {[
                { title: "Total Bookings", value: stats.bookings, icon: ShoppingBag },
                { title: "Available Cars", value: stats.cars, icon: Car },
                { title: "Registered Customers", value: stats.customers, icon: Users },
                { title: "Registered Drivers", value: stats.drivers, icon: Users },
                { title: "Total Users", value: stats.users, icon: Users },
              ].map((stat, index) => (
                <Card key={index}>
                  <CardHeader className="flex flex-row items-center justify-between pb-2">
                    <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
                    <stat.icon className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{stat.value}</div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Bookings Table */}
            <h2 className="mt-8 mb-4 text-xl font-semibold">Recent Bookings</h2>
            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Booking ID</TableHead>
                    <TableHead>Customer Name</TableHead>
                    <TableHead className="hidden md:table-cell">Pickup Location</TableHead>
                    <TableHead className="hidden md:table-cell">Drop Location</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {bookings.map((booking) => (
                    <TableRow key={booking._id}>
                      <TableCell className="font-medium">{booking._id}</TableCell>
                      <TableCell>{booking.customer?.name ?? "N/A"}</TableCell>
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
                            booking.status === "Completed"
                              ? "default"
                              : booking.status === "In Progress"
                                ? "secondary"
                                : booking.status === "Pending"
                                  ? "outline"
                                  : "destructive"
                          }
                        >
                          {booking.status}
                        </Badge>
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
                            <DropdownMenuItem>View details</DropdownMenuItem>
                            <DropdownMenuItem>Edit booking</DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem className="text-red-600">Cancel booking</DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </main>
        </div>
      </div>
    </SidebarProvider>
  )
}

