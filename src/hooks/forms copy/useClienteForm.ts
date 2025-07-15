import { useState } from "react"
import { useAuth } from "@/hooks/useAuth"
import { createCliente, type Cliente } from "@/services/adapters/clientes.adapter"

interface UseClienteFormProps {
  onCreated?: (data: any) => void
}

export const useClienteForm = ({ onCreated }: UseClienteFormProps) => {
  const { user } = useAuth()

  const [cliente, setCliente] = useState<Cliente>({
    fk_usuario: user?.id_usuario || 0,
    nit: "",
    nombre_cliente: "",
    telefono: "",
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setCliente(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    try {
      const response = await createCliente(cliente)
      console.log("Cliente creado:", response)
      onCreated?.(response.data)
    } catch (error) {
      console.error("Error al crear cliente:", error)
    }
  }

  return {
    cliente,
    handleChange,
    handleSubmit,
  }
}
