import { useEffect, useRef, useState } from "react"
import { updateVehiculo } from "@/services/adapters/vehiculo.adapter"
import { toast } from "sonner"

export type Vehiculo = {
  id_vehiculo: number
  fk_usuario: number
  placa: string
  marca: string
  configuracion: string
  tipo_vehiculo: string
  peso_vacio: number
  peso_remolque: number
}

export function useVehiculoForm(vehiculo: Vehiculo) {
  const originalRef = useRef<Vehiculo | null>(null)
  const [editado, setEditado] = useState(false)
  const [saving, setSaving] = useState(false)

  // Guardar estado original
  useEffect(() => {
    if (!originalRef.current) {
      originalRef.current = vehiculo
    }
  }, [vehiculo])

  // Detectar cambios
  useEffect(() => {
    if (!originalRef.current) return
    const o = originalRef.current

    const changed =
      vehiculo.placa !== o.placa ||
      vehiculo.marca !== o.marca ||
      vehiculo.configuracion !== o.configuracion ||
      vehiculo.tipo_vehiculo !== o.tipo_vehiculo ||
      vehiculo.peso_vacio !== o.peso_vacio ||
      vehiculo.peso_remolque !== o.peso_remolque

    setEditado(changed)
  }, [vehiculo])

  // Actualizar vehículo
  const handleUpdateVehiculo = async () => {
    if (!editado) {
      toast.warning("No hay cambios para guardar ⚠️")
      return
    }

    setSaving(true)
    try {
      const payload = {
        id: vehiculo.id_vehiculo, // backend espera "id"
        fk_usuario: vehiculo.fk_usuario,
        placa: vehiculo.placa,
        marca: vehiculo.marca,
        configuracion: vehiculo.configuracion,
        tipo_vehiculo: vehiculo.tipo_vehiculo,
        peso_vacio: vehiculo.peso_vacio,
        peso_remolque: vehiculo.peso_remolque,
      }

      const res = await updateVehiculo(payload as any)

      if (res.status === 200) {
        toast.success(res.msg || "Vehículo actualizado correctamente ✅")
        originalRef.current = vehiculo
        setEditado(false)
      } else {
        toast.error(res.msg || "Error al actualizar el vehículo ❌")
      }
    } catch (error: any) {
      console.error("Error actualizando vehículo:", error)
      toast.error(error?.message || "Error inesperado ❌")
    } finally {
      setSaving(false)
    }
  }

  return {
    editado,
    saving,
    handleUpdateVehiculo,
  }
}
