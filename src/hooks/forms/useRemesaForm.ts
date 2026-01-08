import { useEffect, useRef, useState } from "react"

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

  codigo_un: string
  grupo_riesgo: string
  caracteristica_peligrosidad: string
  embalaje_envase: string
}

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

  // Emitir siempre cambios
  useEffect(() => {
    onChange?.(form)
  }, [form])

  // Cargar initialData UNA sola vez
  useEffect(() => {
    if (initialData && !initialized.current) {
      setForm(prev => ({
        ...prev,

        numero_remesa: initialData.numero_remesa ?? "",
        numero_autorizacion: initialData.numero_autorizacion ?? "",
        tipo_empaque: initialData.tipo_empaque ?? "",
        naturaleza_carga: initialData.naturaleza_carga ?? "",
        codigo_armonizado: initialData.codigo_armonizado ?? "",

        cantidad: Number(initialData.cantidad) || 0,
        unidad_medida: initialData.unidad_medida ?? "",
        peso_total: Number(initialData.peso_total) || 0,

        mercancia_peligrosa: Boolean(initialData.mercancia_peligrosa),

        // backend usa "observaciones"
        observaciones_remesa:
          (initialData as any).observaciones ??
          initialData.observaciones_remesa ??
          "",

        codigo_un: initialData.codigo_un ?? "",
        grupo_riesgo: initialData.grupo_riesgo ?? "",
        caracteristica_peligrosidad:
          initialData.caracteristica_peligrosidad ?? "",
        embalaje_envase: initialData.embalaje_envase ?? "",
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
      [name]: type === "number" ? Number(value) || 0 : value,
    }))
  }

  const setField = (
    name: keyof RemesaFormData,
    value: string | number | boolean
  ) => {
    setForm(prev => {
      return {
        ...prev,
        [name]: value,
      }
    })
  }
  return {
    form,
    handleChange,
    setField,
  }
}
