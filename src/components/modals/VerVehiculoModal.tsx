import { useEffect, useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { VEHICULOS, SEGUROS } from "@/mocks/vehiculos.mock"
import SeguroForm from "../forms/SeguroForm"
import VehiculoForm from "../forms/VehiculoForm"

type Mode = "ver" | "crear" | "editar"

type Vehiculo = {
  id_vehiculo: number
  placa: string
  marca: string
  configuracion: string
  tipo_vehiculo: string
  peso_vacio: number
  peso_remolque: number
}

type Seguro = {
  id_seguro: number
  fk_vehiculo: number
  tipo_seguro: string
  numero_poliza: string
  aseguradora: string
  fecha_vencimiento: string
  valor: number
}

type Props = {
  idVehiculo: number | null
  open: boolean
  onOpenChange: (open: boolean) => void
  mode?: Mode
}

export default function VerVehiculoModal({ idVehiculo, open, onOpenChange, mode = "ver" }: Props) {
  const [vehiculo, setVehiculo] = useState<Vehiculo>({} as Vehiculo)
  const [seguros, setSeguros] = useState<Seguro[]>([])
  const [seguroActivo, setSeguroActivo] = useState<Seguro | null>(null)

  const isReadOnly = mode === "ver"
  const isCreate = mode === "crear"

  useEffect(() => {
    if (!open) return

    if (isCreate) {
      setVehiculo({ id_vehiculo: 0, placa: "", marca: "", configuracion: "", tipo_vehiculo: "", peso_vacio: 0, peso_remolque: 0 })
      setSeguros([])
      setSeguroActivo(null)
      return
    }

    if (idVehiculo === null) return

    const v = VEHICULOS.find(v => v.id_vehiculo === idVehiculo)
    const s = SEGUROS.filter(s => s.fk_vehiculo === idVehiculo)

    if (v) {
      setVehiculo({ ...v })
      setSeguros(s)
      setSeguroActivo(s[0] ?? null)
    }
  }, [idVehiculo, open, mode])

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl">
        <DialogHeader>
          <DialogTitle>
            {mode === "crear" && "Nuevo Vehículo"}
            {mode === "editar" && "Editar Vehículo"}
            {mode === "ver" && "Detalle del Vehículo"}
          </DialogTitle>
        </DialogHeader>

        <div className="grid gap-6">
          <Card>
            <CardContent>
              <VehiculoForm vehiculo={vehiculo} editable={!isReadOnly} onChange={setVehiculo} />
            </CardContent>
          </Card>

          {seguros.length > 0 && seguroActivo && (
            <Card>
              <CardContent>
                <SeguroForm
                  seguros={seguros}
                  activo={seguroActivo}
                  editable={!isReadOnly}
                  onChange={setSeguroActivo}
                  onSelect={setSeguroActivo}
                />
              </CardContent>
            </Card>
          )}

          <div className="flex justify-end gap-2">
            <Button variant="outline" onClick={() => onOpenChange(false)}>
              Cerrar
            </Button>
            {mode !== "ver" && (
              <Button className="bg-blue-600 text-white">
                {mode === "crear" ? "Registrar vehículo" : "Guardar cambios"}
              </Button>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
