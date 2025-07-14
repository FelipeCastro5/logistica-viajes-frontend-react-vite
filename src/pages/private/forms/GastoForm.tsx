import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { useGastoForm } from "./useGastoForm"

export default function GastoForm({
  onCreated,
  viajeId,
}: {
  onCreated?: (data: any) => void
  viajeId: number
}) {
  const { gasto, tiposDeGasto, loadingTipos, handleChange } = useGastoForm(viajeId)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("Nuevo gasto:", gasto)
    onCreated?.(gasto)
    // Aquí iría el POST real
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
          className="w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-800 dark:text-white dark:placeholder-gray-900"
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
