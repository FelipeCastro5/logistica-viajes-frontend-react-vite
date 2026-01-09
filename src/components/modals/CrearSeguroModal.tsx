import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { createSeguro } from "@/services/adapters/seguros.adapter"
import { toast } from "sonner"

type Seguro = {
  fk_vehiculo: number
  tipo_seguro: string
  numero_poliza: string
  aseguradora: string
  fecha_vencimiento: string
  valor: number
}

type Props = {
  idVehiculo: number
  open: boolean
  onOpenChange: (open: boolean) => void
}

export default function CrearSeguroModal({ idVehiculo, open, onOpenChange }: Props) {
  const [seguro, setSeguro] = useState<Seguro>({
    fk_vehiculo: idVehiculo,
    tipo_seguro: "SOAT", // 🔹 Tipo quemado
    numero_poliza: "",
    aseguradora: "",
    fecha_vencimiento: "",
    valor: 0,
  })
  const [saving, setSaving] = useState(false)

  const handleCreateSeguro = async () => {
    // Validación simple
    if (!seguro.numero_poliza || !seguro.aseguradora || !seguro.fecha_vencimiento || !seguro.valor) {
      toast.warning("Completa todos los campos obligatorios ⚠️")
      return
    }

    setSaving(true)
    try {
      const res = await createSeguro(seguro)
      if (res.status === 200 || res.status === 201) {
        toast.success(res.msg || "Seguro creado correctamente ✅")
        onOpenChange(false)
      } else {
        toast.error(res.msg || "Error al crear el seguro ❌")
      }
    } catch (error: any) {
      console.error("Error creando seguro:", error)
      toast.error(error?.message || "Error inesperado al crear el seguro ❌")
    } finally {
      setSaving(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Crear nuevo seguro</DialogTitle>
        </DialogHeader>

        <div className="grid gap-4">
          <Card>
            <CardContent>
              <div className="grid gap-4">
                <div>
                  <Label>Tipo de seguro</Label>
                  <Input value={seguro.tipo_seguro} readOnly />
                </div>

                <div>
                  <Label>Aseguradora</Label>
                  <Input
                    value={seguro.aseguradora}
                    onChange={e => setSeguro({ ...seguro, aseguradora: e.target.value })}
                  />
                </div>

                <div>
                  <Label>Número de póliza</Label>
                  <Input
                    value={seguro.numero_poliza}
                    onChange={e => setSeguro({ ...seguro, numero_poliza: e.target.value })}
                  />
                </div>

                <div>
                  <Label>Fecha de vencimiento</Label>
                  <Input
                    type="date"
                    value={seguro.fecha_vencimiento}
                    onChange={e => setSeguro({ ...seguro, fecha_vencimiento: e.target.value })}
                  />
                </div>

                <div>
                  <Label>Valor</Label>
                  <Input
                    type="number"
                    value={seguro.valor}
                    onChange={e => setSeguro({ ...seguro, valor: Number(e.target.value) })}
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="flex justify-end gap-2">
            <Button variant="outline" onClick={() => onOpenChange(false)}>
              Cerrar
            </Button>
            <Button
              className="bg-blue-600 text-white"
              onClick={handleCreateSeguro}
              disabled={saving}
            >
              {saving ? "Creando..." : "Crear seguro"}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
