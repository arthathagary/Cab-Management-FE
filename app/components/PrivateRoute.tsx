import { Navigate } from "react-router-dom"
import { useSelector } from "react-redux"
import type { RootState } from "../redux/store"
import type React from "react" // Added import for React

const PrivateRoute = ({ children }: { children: React.ReactNode }) => {
  const isAuthenticated = useSelector((state: RootState) => state.auth.isAuthenticated)

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />
  }

  return children
}

export default PrivateRoute

