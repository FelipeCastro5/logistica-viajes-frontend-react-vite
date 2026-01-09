import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

type Vehiculo = {
  id_vehiculo: number
  fk_usuario: number // ⚡ importante mantenerlo
  placa: string
  marca: string
  configuracion: string
  tipo_vehiculo: string
  peso_vacio: number
  peso_remolque: number
}

type Props = {
  vehiculo: Vehiculo
  editable: boolean
  onChange: (v: Vehiculo) => void
}

export default function VehiculoForm({ vehiculo, editable, onChange }: Props) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-6">
      <h3 className="md:col-span-2 text-lg font-semibold">Información del vehículo</h3>

      {Object.entries(vehiculo).map(([key, value]) =>
        key !== "id_vehiculo" && key !== "fk_usuario" ? ( // 🔹 ocultamos fk_usuario
          <div key={key}>
            <Label>{key.replace("_", " ")}</Label>
            <Input
              readOnly={!editable}
              value={value}
              onChange={(e) =>
                onChange({
                  ...vehiculo,
                  [key]: typeof value === "number" ? Number(e.target.value) : e.target.value,
                })
              }
            />
          </div>
        ) : null
      )}
    </div>
  )
}
