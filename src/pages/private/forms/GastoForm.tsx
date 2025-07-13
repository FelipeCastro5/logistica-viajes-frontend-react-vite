import { useState, useEffect } from "react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { getAllGastos } from "@/services/adapters/gastos.adapter" // ⚠️ Asegúrate que el path sea correcto
import type { Gasto } from "@/services/adapters/gastos.adapter"

export default function GastoForm({
  onCreated,
  viajeId,
}: {
  onCreated?: (data: any) => void
  viajeId: number
}) {
  const [tiposDeGasto, setTiposDeGasto] = useState<Gasto[]>([])
  const [loadingTipos, setLoadingTipos] = useState(true)

  const [gasto, setGasto] = useState({
    fk_viaje: viajeId,
    fk_gasto: "",
    valor: "",
    detalles: "",
  })

  useEffect(() => {
    const fetchTiposDeGasto = async () => {
      try {
        const response = await getAllGastos()
        if (response.status) {
          setTiposDeGasto(response.data)
        } else {
          console.error("Error al obtener tipos de gasto:", response.msg)
        }
      } catch (error) {
        console.error("Error inesperado:", error)
      } finally {
        setLoadingTipos(false)
      }
    }

    fetchTiposDeGasto()
  }, [])

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target
    setGasto((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("Nuevo gasto:", gasto)
    onCreated?.(gasto)
    // Aquí iría el POST real al backend
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
          <option value="">
            {loadingTipos ? "Cargando tipos de gasto..." : "Selecciona un tipo"}
          </option>
          {!loadingTipos &&
            tiposDeGasto.map((tipo) => (
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
