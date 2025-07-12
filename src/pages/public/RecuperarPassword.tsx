import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export default function RecuperarPassword() {
  const [email, setEmail] = useState("")
  const navigate = useNavigate()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (email) {
      // Aquí deberías llamar a tu API real para enviar el correo
      alert(`Instrucciones enviadas a ${email}`)
      setEmail("")

      // Redirigir después de unos milisegundos (opcional, para mostrar el alert)
      setTimeout(() => {
        navigate("/login")
      }, 500) // medio segundo
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded shadow-md w-full max-w-sm">
        <h1 className="text-2xl font-bold mb-4 text-center">Recuperar contraseña</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            type="email"
            placeholder="Correo electrónico"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <Button type="submit" className="w-full bg-blue-500 hover:bg-blue-600 text-white">
            Enviar instrucciones
          </Button>
        </form>
      </div>
    </div>
  )
}
