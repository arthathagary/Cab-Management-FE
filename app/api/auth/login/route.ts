import { NextResponse } from "next/server"

export async function POST(request: Request) {
  const body = await request.json()
  // Here you would typically validate the credentials and fetch the user from your database
  // For this example, we'll just return a mock user
  const user = { id: 1, name: "John Doe", email: body.email }

  return NextResponse.json({ user })
}

