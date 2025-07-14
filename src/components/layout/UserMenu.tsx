import { useNavigate } from "react-router-dom"
import { useState } from "react"

export default function UserMenu() {
  const [isOpen, setIsOpen] = useState(false)
  const navigate = useNavigate()

  const handleLogout = () => {
    localStorage.removeItem("auth")
    navigate("/login")
  }

  return (
    <div
      className="relative"
      onMouseEnter={() => setIsOpen(true)}
      onMouseLeave={() => setIsOpen(false)}
    >
      {/* Contenedor visible */}
      <div className="flex items-center gap-2 px-4 py-2 cursor-pointer text-white hover:text-gray-300">
        <div className="w-6 h-6 rounded-full bg-white text-black text-center text-sm font-bold">
          U
        </div>
        <span>Nombre Usuario</span>
      </div>

      {/* Menú flotante */}
      <div
        className={`absolute right-0 w-48 bg-white text-black rounded-md shadow-lg z-50 transition-all duration-300 transform ${isOpen ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2 pointer-events-none"
          }`}
      >
        <ul className="py-2">
          <li>
            <button
              onClick={() => console.log("Ir a configuración")}
              className="w-full text-left px-4 py-2 hover:bg-gray-100"
            >
              Configurar Cuenta
            </button>
          </li>
          <li>
            <button
              onClick={handleLogout}
              className="w-full text-left px-4 py-2 text-red-600 hover:bg-gray-100"
            >
              Cerrar Sesión
            </button>
          </li>
        </ul>
      </div>
    </div>
  )
}
