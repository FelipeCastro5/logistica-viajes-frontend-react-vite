// src/pages/Login.tsx
import { useState } from "react"
import { useNavigate, Link } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { loginUser } from "@/services/adapters/auth.adapter" // ✅ Importa el adapter

export default function Login() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const navigate = useNavigate()

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")

    try {
      const response = await loginUser(email, password)

      if (response.status === 200) {
        const userData = response.data

        // ✅ Guarda los datos necesarios en localStorage
        localStorage.setItem("auth", "true")
        localStorage.setItem("user", JSON.stringify(userData))

        navigate("/menu-principal")
      } else {
        setError(response.msg)
      }
    } catch (err) {
      console.error("Login error:", err)
      setError("Error al iniciar sesión. Intenta más tarde.")
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-blue-900 dark:text-white">
      <div className="bg-white p-8 rounded shadow-md w-full max-w-sm dark:bg-gray-900 dark:text-white">
        <h3 className="text-2xl font-bold mb-4 text-center">Version 0.2.0</h3>
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

        {/* ✅ Mostrar errores si existen */}
        {error && (
          <div className="text-red-500 text-sm mt-2 text-center">
            {error}
          </div>
        )}

        <div className="mt-4 text-sm text-center">
          <Link to="/recuperar" className="text-blue-600 hover:underline">
            ¿Olvidaste tu contraseña?
          </Link>
        </div>
      </div>
    </div>
  )
}
