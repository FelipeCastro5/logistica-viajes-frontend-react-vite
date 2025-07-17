import { useState, useEffect } from "react"
import { getAllGastos } from "@/services/adapters/gastos.adapter"
import type { Gasto } from "@/services/adapters/gastos.adapter"

type GastoFormMode = "crear" | "editar"

interface GastoFormBody {
  id_gastoxviaje?: number
  fk_viaje: number
  fk_gasto: string
  valor: string
  detalles: string
}

interface UseGastoFormOptions {
  viajeId: number
  initialData?: Partial<GastoFormBody>
  modo?: GastoFormMode
}

//
// 📦 Utilidades
//

/**
 * Formatea un valor numérico (con coma como decimal) con separadores de miles estilo colombiano.
 * Ej: "1000000,5" → "1.000.000,5"
 * Además, elimina ceros innecesarios en la parte decimal.
 */
const formatWithThousands = (value: string): string => {
  if (!value) return ""

  const [intPart, decimalPartRaw] = value.split(",")

  const formattedInt = intPart.replace(/\B(?=(\d{3})+(?!\d))/g, ".")

  if (!decimalPartRaw) return formattedInt

  // Eliminar ceros a la derecha del decimal
  const cleanedDecimal = decimalPartRaw.replace(/0+$/, "")
  return cleanedDecimal ? `${formattedInt},${cleanedDecimal}` : formattedInt
}

//
// 🧠 Hook principal
//

export function useGastoForm({
  viajeId,
  initialData = {},
  modo = "crear",
}: UseGastoFormOptions) {
  //
  // 🛠️ Estado: datos del gasto y tipos disponibles
  //

  const [tiposDeGasto, setTiposDeGasto] = useState<Gasto[]>([])
  const [loadingTipos, setLoadingTipos] = useState(true)

  const [gasto, setGasto] = useState<GastoFormBody>({
    id_gastoxviaje: initialData.id_gastoxviaje,
    fk_viaje: viajeId,
    fk_gasto: initialData.fk_gasto ?? "",
    valor: initialData.valor
      ? formatWithThousands(initialData.valor.replace(".", ","))
      : "",
    detalles: initialData.detalles ?? "",
  })

  //
  // 📥 Cargar tipos de gasto desde la API al montar el componente
  //

  useEffect(() => {
    getAllGastos()
      .then(response => {
        if (response.status) setTiposDeGasto(response.data)
        else console.error("Error:", response.msg)
      })
      .catch(console.error)
      .finally(() => setLoadingTipos(false))
  }, [])

  //
  // 🖊️ Manejadores de cambios en los inputs
  //

  // Manejador general (detalles, tipo de gasto)
  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value } = e.target
    setGasto(prev => ({ ...prev, [name]: value }))
  }

  // Manejador específico para el input de "valor"
  const handleValorChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let raw = e.target.value

    // Solo permitir números y una coma
    raw = raw.replace(/[^\d,]/g, "")

    // Si hay más de una coma, tomar solo la primera parte válida
    const parts = raw.split(",")
    if (parts.length > 2) {
      raw = `${parts[0]},${parts[1]}`
    }

    const formatted = formatWithThousands(raw)
    setGasto(prev => ({ ...prev, valor: formatted }))
  }

  //
  // 📤 Preparar los datos para enviar (POST/PUT)
  //

  const getFormattedBody = () => {
    const raw = gasto.valor.replace(/\./g, "").replace(",", ".")
    const body: any = {
      fk_viaje: gasto.fk_viaje,
      fk_gasto: parseInt(gasto.fk_gasto),
      valor: parseFloat(raw),
      detalles: gasto.detalles,
    }
    if (gasto.id_gastoxviaje) body.id = gasto.id_gastoxviaje
    return body
  }

  //
  // ♻️ Resetear el formulario
  //

  const resetForm = () => {
    setGasto({
      fk_viaje: viajeId,
      fk_gasto: "",
      valor: "",
      detalles: "",
    })
  }

  //
  // 📦 API del hook
  //

  return {
    gasto, tiposDeGasto, loadingTipos,
    handleChange, handleValorChange, getFormattedBody, resetForm,
    modo,
  }
}
