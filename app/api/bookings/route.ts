import { NextResponse } from "next/server"

export async function POST(request: Request) {
  const body = await request.json()
  // Here you would typically create a new booking in your database
  // For this example, we'll just return a mock booking
  const booking = { id: 1, ...body, status: "pending" }

  return NextResponse.json(booking)
}

