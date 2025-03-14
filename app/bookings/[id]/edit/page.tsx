"use client"
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import NewBookingForm from "@/components/new-booking-form";

export default function EditBookingPage() {
  const params = useParams();
  const [booking, setBooking] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchBooking() {
      try {
        const response = await fetch(`http://localhost:8080/api/bookings/${params.id}`);
        const data = await response.json();
        setBooking(data);
      } catch (error) {
        console.error("Failed to fetch booking:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchBooking();
  }, [params.id]);

  if (loading) return <div>Loading...</div>;

  return (
    <div className="container mx-auto py-6">
      <h1 className="text-2xl font-bold mb-6">Edit Booking</h1>
      {booking && <NewBookingForm bookingData={booking} isEdit />}
    </div>
  );
}