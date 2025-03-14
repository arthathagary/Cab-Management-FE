import { NextResponse } from "next/server"

export async function POST(request: Request) {
  const body = await request.json()
  // Here you would typically create a new user in your database
  // For this example, we'll just return a success message
  return NextResponse.json({ message: "User registered successfully" })
}

