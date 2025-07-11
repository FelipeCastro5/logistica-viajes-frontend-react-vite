import { Navigate } from "react-router-dom"

interface PrivateRouteProps {
  children: React.ReactNode
}

export default function PrivateRoute({ children }: PrivateRouteProps) {
  const isAuth = localStorage.getItem("auth") === "true"
  return isAuth ? children : <Navigate to="/login" />
}
