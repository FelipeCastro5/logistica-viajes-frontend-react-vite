import { useNavigate } from "react-router-dom"
import { Button } from "../ui/button"

export default function LogoutButton() {
  const navigate = useNavigate()

  const handleLogout = () => {
    localStorage.removeItem("auth")
    navigate("/login")
  }

  return (
    <Button
      onClick={handleLogout}
      className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded"
    >
      Cerrar Sesión
    </Button>
  )
}
