// hooks/forms/useRemesaForm.ts

export type RemesaFormData = {
  numero_remesa: string
  numero_autorizacion: string
  tipo_empaque: string
  naturaleza_carga: string
  codigo_armonizado: string
  cantidad: number
  unidad_medida: string
  peso_total: number
  mercancia_peligrosa: boolean
  observaciones_remesa: string

  // mercancía peligrosa
  codigo_un: string
  grupo_riesgo: string
  caracteristica_peligrosidad: string
  embalaje_envase: string
}

// hooks/forms/useRemesaForm.ts
import { useEffect, useRef, useState } from "react"

export function useRemesaForm(
  initialData?: Partial<RemesaFormData>,
  onChange?: (data: RemesaFormData) => void
) {
  const [form, setForm] = useState<RemesaFormData>({
    numero_remesa: "",
    numero_autorizacion: "",
    tipo_empaque: "",
    naturaleza_carga: "",
    codigo_armonizado: "",
    cantidad: 0,
    unidad_medida: "",
    peso_total: 0,
    mercancia_peligrosa: false,
    observaciones_remesa: "",

    codigo_un: "",
    grupo_riesgo: "",
    caracteristica_peligrosidad: "",
    embalaje_envase: "",
  })

  const initialized = useRef(false)

  // Emitir siempre el body al padre
  useEffect(() => {
    onChange?.(form)
  }, [form])

  // Cargar initialData una sola vez
  useEffect(() => {
    if (initialData && !initialized.current) {
      setForm(prev => ({
        ...prev,
        ...initialData,
        cantidad: Number(initialData.cantidad) || 0,
        peso_total: Number(initialData.peso_total) || 0,
        mercancia_peligrosa: Boolean(initialData.mercancia_peligrosa),
      }))

      initialized.current = true
    }
  }, [initialData])

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value, type } = e.target

    setForm(prev => ({
      ...prev,
      [name]:
        type === "number"
          ? Number(value) || 0
          : value,
    }))
  }

  const setField = (
    name: keyof RemesaFormData,
    value: string | number | boolean
  ) => {
    setForm(prev => ({
      ...prev,
      [name]: value,
    }))
  }

  return {
    form,
    handleChange,
    setField,
  }
}
