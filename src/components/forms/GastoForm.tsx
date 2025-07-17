import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { useGastoForm } from "../../hooks/forms/useGastoForm"
import type { Gasto } from "@/services/adapters/gastos.adapter"

interface GastoFormProps {
  hook: ReturnType<typeof useGastoForm>
}

export default function GastoForm({ hook }: GastoFormProps) {
  const {
    gasto,
    tiposDeGasto,
    loadingTipos,
    handleChange,
    handleValorChange,
    modo,
  } = hook

  return (
    <div className="grid gap-4 mt-4">
      <h3 className="text-lg font-bold mb-2">
        {modo === "editar" ? "Editar Gasto" : "Nuevo Gasto"}
      </h3>

      <div>
        <Label htmlFor="fk_gasto">Tipo de Gasto</Label>
        <select
          id="fk_gasto"
          name="fk_gasto"
          value={gasto.fk_gasto}
          onChange={handleChange}
          required
          className="w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-900 dark:text-white"
        >
          <option value="">
            {loadingTipos ? "Cargando tipos de gasto..." : "Selecciona un tipo"}
          </option>
          {!loadingTipos &&
            tiposDeGasto.map((tipo: Gasto) => (
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
          type="text"
          inputMode="decimal"
          placeholder="Valor del gasto"
          value={gasto.valor}
          onChange={handleValorChange}
          required
          className="font-mono"
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
    </div>
  )
}
