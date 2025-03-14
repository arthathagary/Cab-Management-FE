"use client"

import { Sidebar, SidebarContent, SidebarHeader, SidebarMenu, SidebarMenuItem, SidebarMenuButton } from "@/components/ui/sidebar"
import { Car, LayoutDashboard, ShoppingBag, Users, CreditCard } from "lucide-react"
import Link from "next/link"
import { SidebarProvider } from "@/components/ui/sidebar"
import { ReactNode, useState } from "react"

interface ProtectedLayoutProps {
  children: ReactNode
}

export default function ProtectedLayout({ children }: ProtectedLayoutProps) {
  const [activeItem, setActiveItem] = useState("Dashboard")

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
            <SidebarMenu>
              <SidebarMenuItem>
                <Link href="/dashboard">
                  <SidebarMenuButton
                    isActive={activeItem === "Dashboard"}
                    onClick={() => setActiveItem("Dashboard")}
                  >
                    <LayoutDashboard className="h-4 w-4" />
                    <span>Dashboard</span>
                  </SidebarMenuButton>
                </Link>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <Link href="/bookings">
                  <SidebarMenuButton
                    isActive={activeItem === "Bookings"}
                    onClick={() => setActiveItem("Bookings")}
                  >
                    <ShoppingBag className="h-4 w-4" />
                    <span>Bookings</span>
                  </SidebarMenuButton>
                </Link>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <Link href="/customers">
                  <SidebarMenuButton
                    isActive={activeItem === "Customers"}
                    onClick={() => setActiveItem("Customers")}
                  >
                    <Users className="h-4 w-4" />
                    <span>Customers</span>
                  </SidebarMenuButton>
                </Link>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <Link href="/cars">
                  <SidebarMenuButton
                    isActive={activeItem === "Cars"}
                    onClick={() => setActiveItem("Cars")}
                  >
                    <Car className="h-4 w-4" />
                    <span>Cars</span>
                  </SidebarMenuButton>
                </Link>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <Link href="/reports">
                  <SidebarMenuButton
                    isActive={activeItem === "Reports"}
                    onClick={() => setActiveItem("Reports")}
                  >
                    <CreditCard className="h-4 w-4" />
                    <span>Reports</span>
                  </SidebarMenuButton>
                </Link>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarContent>
        </Sidebar>

        <div className="flex flex-1 flex-col overflow-hidden">
          {children}
        </div>
      </div>
    </SidebarProvider>
  )
}