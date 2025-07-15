import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { useState } from "react"
import { useAuth } from "@/hooks/useAuth"
import { createCliente, type Cliente } from "@/services/adapters/clientes.adapter"

export default function ClienteForm({ onCreated }: { onCreated?: (data: any) => void }) {
  const { user } = useAuth()

  const [cliente, setCliente] = useState<Cliente>({
    fk_usuario: user?.id_usuario || 0, // asegura que esté presente
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

  return (
    <form onSubmit={handleSubmit} className="grid gap-4 mt-2">
      <div>
        <Label htmlFor="nombre_cliente">Nombre</Label>
        <Input
          id="nombre_cliente"
          name="nombre_cliente"
          placeholder="Nombre del cliente"
          value={cliente.nombre_cliente}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <Label htmlFor="nit">Nit Cliente</Label>
        <Input
          id="nit"
          name="nit"
          placeholder="Nit del Cliente"
          value={cliente.nit}
          onChange={handleChange}
        />
      </div>
      <div>
        <Label htmlFor="telefono">Teléfono Cliente</Label>
        <Input
          id="telefono"
          name="telefono"
          placeholder="Teléfono del Cliente"
          value={cliente.telefono}
          onChange={handleChange}
        />
      </div>
      <Button type="submit">Guardar cliente</Button>
    </form>
  )
}
