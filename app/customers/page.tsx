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

function CustomersPage() {
  const [customers, setCustomers] = useState([])
  const [search, setSearch] = useState("") // added state for search

  useEffect(() => {
    axios.get("http://localhost:8080/api/customers").then((response) => {
      setCustomers(response.data)
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

  function handleDelete(id: string) {
    axios
      .delete(`http://localhost:8080/api/customers/${id}`)
      .then(() => {
        setCustomers((existing) => existing.filter((c: any) => c._id !== id))
      })
      .catch((error) => {
        console.error("Failed to delete customer:", error)
      })
  }

  // Filter customers based on search query (by name)
  const filteredCustomers = customers.filter((customer: any) =>
    customer.name.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <div className="container mx-auto py-6">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between mb-6">
        <div className="flex gap-2 justify-center items-center">
          <Link href="/dashboard" className="font-bold cursor-pointer flex justify-center gap-2"> <ArrowLeft /> Back To Dashboard</Link>
          {/* <h1 className="text-2xl font-bold">Customers</h1> */}
        </div>
        <div className="flex flex-col gap-2 sm:flex-row">
          <div className="relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input 
              type="search" 
              placeholder="Search customers..." 
              className="pl-8 w-full md:w-[250px]" 
              value={search}
              onChange={(e) => setSearch(e.target.value)} // added onChange handler
            />
          </div>
          <Link href={`/customers/new`}> 
          <Button>
            <UserPlus className="mr-2 h-4 w-4" />
            Add Customer
          </Button>
          </Link>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>All Customers</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead className="hidden md:table-cell">Email</TableHead>
                <TableHead>Phone</TableHead>
                <TableHead className="hidden lg:table-cell">Address</TableHead>
                <TableHead className="hidden md:table-cell">Registered</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredCustomers.map((customer:any) => (
                <TableRow key={customer.id}>
                  <TableCell className="font-medium">{customer.name}</TableCell>
                  <TableCell className="hidden md:table-cell">{customer.email}</TableCell>
                  <TableCell>{customer.phone}</TableCell>
                  <TableCell className="hidden lg:table-cell">{customer.address}</TableCell>
                  <TableCell className="hidden md:table-cell">
                    <div className="flex items-center gap-2">
                      <CalendarDays className="h-4 w-4 text-muted-foreground" />
                      {formatDate(customer.createdAt)}
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

                        <DropdownMenuItem>
                          <Link href={`/customers/${customer._id}/edit`}>Edit customer</Link>
                        </DropdownMenuItem>
                       
                        <DropdownMenuSeparator />
                        <DropdownMenuItem
                          className="text-red-600"
                          onClick={() => handleDelete(customer._id)}
                        >
                          Delete customer
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

export default withAuth(CustomersPage);

