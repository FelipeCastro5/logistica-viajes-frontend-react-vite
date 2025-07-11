import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useState } from "react"

export default function NuevoClienteModal() {
  const [cliente, setCliente] = useState({
    nombre: "",
    direccion: "",
    telefono: "",
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setCliente((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("Cliente creado:", cliente)
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">+ Crear nuevo cliente</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Registrar nuevo cliente</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="grid gap-4 mt-2">
          <div>
            <Label htmlFor="nombre">Nombre</Label>
            <Input
              id="nombre"
              name="nombre"
              placeholder="Nombre del cliente"
              value={cliente.nombre}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <Label htmlFor="direccion">Dirección</Label>
            <Input
              id="direccion"
              name="direccion"
              placeholder="Dirección"
              value={cliente.direccion}
              onChange={handleChange}
            />
          </div>
          <div>
            <Label htmlFor="telefono">Teléfono</Label>
            <Input
              id="telefono"
              name="telefono"
              placeholder="Teléfono"
              value={cliente.telefono}
              onChange={handleChange}
            />
          </div>
          <Button type="submit" className="bg-green-600 hover:bg-green-700 text-white">
            Guardar cliente
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  )
}
