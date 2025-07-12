import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"

// 🔹 Datos simulados de tipos de gasto — reemplázalos por un fetch real si es necesario
const tiposDeGasto = [
  { id_gasto: 1, nombre_gasto: "Combustible" },
  { id_gasto: 2, nombre_gasto: "Peaje" },
  { id_gasto: 3, nombre_gasto: "Hospedaje" },
]

export default function GastoForm({
  onCreated,
  viajeId,
}: {
  onCreated?: (data: any) => void
  viajeId: number
}) {
  const [gasto, setGasto] = useState({
    fk_viaje: viajeId,
    fk_gasto: "", // id del tipo de gasto
    valor: "",
    detalles: "",
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setGasto((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("Nuevo gasto:", gasto)
    onCreated?.(gasto)
    // Aquí iría un POST real al backend
  }

  return (
    <form onSubmit={handleSubmit} className="grid gap-4 mt-4">
      <div>
        <Label htmlFor="fk_gasto">Tipo de Gasto</Label>
        <select
          id="fk_gasto"
          name="fk_gasto"
          value={gasto.fk_gasto}
          onChange={handleChange}
          required
          className="w-full border rounded px-3 py-2"
        >
          <option value="">Selecciona un tipo</option>
          {tiposDeGasto.map((tipo) => (
            <option key={tipo.id_gasto} value={tipo.id_gasto}>
              {tipo.nombre_gasto}
            </option>
          ))}
        </select>
      </div>

      <div>
        <Label htmlFor="valor">Valor</Label>
        <Input
          id="valor"
          name="valor"
          type="number"
          step="0.01"
          placeholder="Valor del gasto"
          value={gasto.valor}
          onChange={handleChange}
          required
        />
      </div>

      <div>
        <Label htmlFor="detalles">Detalles</Label>
        <Textarea
          id="detalles"
          name="detalles"
          placeholder="Detalles del gasto"
          value={gasto.detalles}
          onChange={handleChange}
          className="min-h-[80px]"
        />
      </div>

      <Button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white">
        Registrar gasto
      </Button>
    </form>
  )
}
