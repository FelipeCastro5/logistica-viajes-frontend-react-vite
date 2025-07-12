// src/pages/Login.tsx
import { useState } from "react"
import { useNavigate, Link } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export default function Login() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const navigate = useNavigate()

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()

    // Aquí puedes validar o llamar a tu API
    if (email && password) {
      localStorage.setItem("auth", "true")
      navigate("/menu-principal")
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-blue-900 dark:text-white">
      <div className="bg-white p-8 rounded shadow-md w-full max-w-sm dark:bg-gray-900 dark:text-white">
        <h1 className="text-2xl font-bold mb-4 text-center">Iniciar sesión</h1>
        <form onSubmit={handleLogin} className="space-y-4">
          <Input
            type="email"
            placeholder="Correo electrónico"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <Input
            type="password"
            placeholder="Contraseña"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <Button type="submit" className="w-full bg-blue-500 hover:bg-blue-600 text-white">
            Entrar
          </Button>
        </form>
        <div className="mt-4 text-sm text-center">
          <Link to="/recuperar" className="text-blue-600 hover:underline">
            ¿Olvidaste tu contraseña?
          </Link>
        </div>
      </div>
    </div>
  )
}
