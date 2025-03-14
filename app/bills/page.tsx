"use client"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import withAuth from "@/utils/withAuth"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"

function BillsPage() {
  const [bookingId, setBookingId] = useState("")
  const [billData, setBillData] = useState<any>(null)

  async function fetchBill() {
    try {
      const response = await fetch(`http://localhost:8080/api/bill/${bookingId}`)
      const data = await response.json()
      setBillData(data.bill)
    } catch (error) {
      console.error("Failed to fetch bill:", error)
    }
  }

  function handleDownload() {
    // Redirect to the download API endpoint
    window.location.href = `http://localhost:8080/api/bill/download/${bookingId}`
  }

  return (
    <div className="container mx-auto py-6">
      <Link href="/dashboard" className="font-bold cursor-pointer flex gap-2 mb-8"> <ArrowLeft /> Back To Dashboard</Link>
      <h1 className="text-2xl font-bold mb-4">Bill Details</h1>
      <div className="mb-4">
        <input
          type="text"
          placeholder="Enter Booking ID"
          value={bookingId}
          onChange={(e) => setBookingId(e.target.value)}
          className="border p-2 mr-2"
        />
        <Button onClick={fetchBill}>Fetch Bill</Button>
      </div>
      {billData ? (
        <div className="border p-4">
          {/* Display all bill details */}
          <p><strong>Bill ID:</strong> {billData.billId}</p>
          <p><strong>Booking ID:</strong> {billData.bookingId}</p>
          <p><strong>Issued On:</strong> {new Date(billData.issuedOn).toLocaleString()}</p>
          <p><strong>Customer Name:</strong> {billData.customer.name}</p>
          <p><strong>Email:</strong> {billData.customer.email}</p>
          <p><strong>Phone:</strong> {billData.customer.phone}</p>
          <p><strong>Address:</strong> {billData.customer.address}</p>
          <p><strong>Pickup Location:</strong> {billData.trip.pickupLocation}</p>
          <p><strong>Drop Location:</strong> {billData.trip.dropLocation}</p>
          <p><strong>Trip Date:</strong> {new Date(billData.trip.date).toLocaleString()}</p>
          <p><strong>Car Model:</strong> {billData.car.model}</p>
          <p><strong>Plate Number:</strong> {billData.car.plateNumber}</p>
          <p><strong>Driver ID:</strong> {billData.driver.id}</p>
          <p><strong>Driver Name:</strong> {billData.driver.name}</p>
          <p><strong>Fare:</strong> {billData.fare}</p>
          <p><strong>Booking Status:</strong> {billData.bookingStatus}</p>
          <Button onClick={handleDownload}>Download Bill</Button>
        </div>
      ) : (
        <p>No bill fetched yet.</p>
      )}
    </div>
  )
}

export default withAuth(BillsPage);
