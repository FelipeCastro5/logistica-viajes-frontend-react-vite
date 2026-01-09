import { useEffect, useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import VehiculoForm from "../forms/VehiculoForm"
import SeguroForm from "../forms/SeguroForm"
import { getVehiculoById } from "@/services/adapters/vehiculo.adapter"
import { getSegurosByVehiculo } from "@/services/adapters/seguros.adapter"

type Mode = "ver" | "crear" | "editar"

// ✅ Incluimos fk_usuario
type Vehiculo = {
  id_vehiculo: number
  fk_usuario: number
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
  const [vehiculo, setVehiculo] = useState<Vehiculo>({
    id_vehiculo: 0,
    fk_usuario: 0,
    placa: "",
    marca: "",
    configuracion: "",
    tipo_vehiculo: "",
    peso_vacio: 0,
    peso_remolque: 0,
  })
  const [seguros, setSeguros] = useState<Seguro[]>([])
  const [seguroActivo, setSeguroActivo] = useState<Seguro | null>(null)
  const [loading, setLoading] = useState(false)

  const isReadOnly = mode === "ver"
  const isCreate = mode === "crear"

  useEffect(() => {
    if (!open) return

    if (isCreate) {
      // Limpiamos los forms
      setVehiculo({
        id_vehiculo: 0,
        fk_usuario: 0,
        placa: "",
        marca: "",
        configuracion: "",
        tipo_vehiculo: "",
        peso_vacio: 0,
        peso_remolque: 0,
      })
      setSeguros([])
      setSeguroActivo(null)
      return
    }

    if (idVehiculo === null) return

    const fetchVehiculo = async () => {
      setLoading(true)
      try {
        // 🔹 Obtener vehículo por ID
        const resVehiculo = await getVehiculoById(idVehiculo)
        if (resVehiculo.status === 200 && resVehiculo.data) {
          const v = resVehiculo.data
          const vehiculoData: Vehiculo = {
            ...v,
            fk_usuario: v.fk_usuario ?? 0,
            peso_vacio: Number(v.peso_vacio),
            peso_remolque: Number(v.peso_remolque),
          }
          setVehiculo(vehiculoData)

          // 🔹 Obtener seguros por vehículo
          const resSeguros = await getSegurosByVehiculo(idVehiculo)
          if (resSeguros.status === 200 && resSeguros.data) {
            const segurosData: Seguro[] = resSeguros.data.map((s: any) => ({
              ...s,
              valor: Number(s.valor),
            }))
            setSeguros(segurosData)
            setSeguroActivo(segurosData[0] ?? null)
          } else {
            setSeguros([])
            setSeguroActivo(null)
          }
        }
      } catch (error) {
        console.error("Error al cargar vehículo o seguros:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchVehiculo()
  }, [idVehiculo, open, mode, isCreate])

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
          {loading ? (
            <p className="text-center text-gray-500">Cargando vehículo...</p>
          ) : (
            <>
              <Card>
                <CardContent>
                  <VehiculoForm
                    vehiculo={vehiculo}
                    editable={!isReadOnly}
                    onChange={setVehiculo}
                  />
                </CardContent>
              </Card>

              {/* Mostramos SeguroForm siempre que haya al menos un seguro */}
              {seguros.length > 0 && (
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
            </>
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
