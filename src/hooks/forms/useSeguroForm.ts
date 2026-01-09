import { useEffect, useRef, useState } from "react"
import { updateSeguro } from "@/services/adapters/seguros.adapter"
import { toast } from "sonner"

export type Seguro = {
  id_seguro: number
  fk_vehiculo: number
  tipo_seguro: string
  numero_poliza: string
  aseguradora: string
  fecha_vencimiento: string
  valor: number
}

export function useSeguroForm(seguro: Seguro | null) {
  const originalRef = useRef<Seguro | null>(null)
  const [editado, setEditado] = useState(false)
  const [saving, setSaving] = useState(false)

  // Guardar estado original cuando cambia el seguro activo
  useEffect(() => {
    if (seguro) {
      originalRef.current = seguro
      setEditado(false)
    }
  }, [seguro?.id_seguro])

  // Detectar cambios
  useEffect(() => {
    if (!seguro || !originalRef.current) return
    const o = originalRef.current

    const changed =
      seguro.aseguradora !== o.aseguradora ||
      seguro.numero_poliza !== o.numero_poliza ||
      seguro.fecha_vencimiento !== o.fecha_vencimiento ||
      seguro.valor !== o.valor

    setEditado(changed)
  }, [seguro])

  // Guardar cambios
  const handleUpdateSeguro = async () => {
    if (!seguro || !editado) {
      toast.warning("No hay cambios para guardar ⚠️")
      return
    }

    setSaving(true)
    try {
      const payload = {
        id: seguro.id_seguro, // backend espera "id"
        fk_vehiculo: seguro.fk_vehiculo,
        tipo_seguro: seguro.tipo_seguro,
        numero_poliza: seguro.numero_poliza,
        aseguradora: seguro.aseguradora,
        fecha_vencimiento: seguro.fecha_vencimiento,
        valor: seguro.valor,
      }

      const res = await updateSeguro(payload as any)

      if (res.status === 200) {
        toast.success(res.msg || "Seguro actualizado correctamente ✅")
        originalRef.current = seguro
        setEditado(false)
      } else {
        toast.error(res.msg || "Error al actualizar el seguro ❌")
      }
    } catch (error: any) {
      console.error("Error actualizando seguro:", error)
      toast.error(error?.message || "Error inesperado ❌")
    } finally {
      setSaving(false)
    }
  }

  return {
    editado,
    saving,
    handleUpdateSeguro,
  }
}
