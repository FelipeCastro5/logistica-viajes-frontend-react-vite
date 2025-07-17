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

// Utilidad para dar formato con separadores de miles (estilo colombiano)
const formatWithThousands = (value: string): string => {
  if (!value) return ""
  const [integerPart, decimalPart] = value.split(",")
  const formattedInt = integerPart.replace(/\B(?=(\d{3})+(?!\d))/g, ".")
  return decimalPart !== undefined ? `${formattedInt},${decimalPart}` : formattedInt
}

export function useGastoForm({
  viajeId,
  initialData = {},
  modo = "crear",
}: UseGastoFormOptions) {
  const [tiposDeGasto, setTiposDeGasto] = useState<Gasto[]>([])
  const [loadingTipos, setLoadingTipos] = useState(true)

  const [gasto, setGasto] = useState<GastoFormBody>({
    id_gastoxviaje: initialData.id_gastoxviaje,
    fk_viaje: viajeId,
    fk_gasto: initialData.fk_gasto ?? "",
    valor: initialData.valor ? formatWithThousands(initialData.valor.replace(".", ",")) : "",
    detalles: initialData.detalles ?? "",
  })

  useEffect(() => {
    getAllGastos()
      .then(response => {
        if (response.status) setTiposDeGasto(response.data)
        else console.error("Error:", response.msg)
      })
      .catch(console.error)
      .finally(() => setLoadingTipos(false))
  }, [])

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target
    setGasto(prev => ({ ...prev, [name]: value }))
  }

  const handleValorChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let raw = e.target.value

    // Solo permitir números, punto y coma
    raw = raw.replace(/[^\d,]/g, "")

    // Reemplazar múltiples comas por una sola
    const parts = raw.split(",")
    if (parts.length > 2) {
      raw = `${parts[0]},${parts[1]}`
    }

    const formatted = formatWithThousands(raw)
    setGasto(prev => ({ ...prev, valor: formatted }))
  }

  useEffect(() => {
    if (modo === "editar" && initialData?.id_gastoxviaje) {
      setGasto({
        id_gastoxviaje: initialData.id_gastoxviaje,
        fk_viaje: viajeId,
        fk_gasto: initialData.fk_gasto ?? "",
        valor: initialData.valor
          ? formatWithThousands(initialData.valor.replace(".", ","))
          : "",
        detalles: initialData.detalles ?? "",
      })
    }
  }, [initialData, modo, viajeId])


  const getFormattedBody = () => {
    const raw = gasto.valor.replace(/\./g, "").replace(",", ".") // Convertir a formato numérico válido
    const body: any = {
      fk_viaje: gasto.fk_viaje,
      fk_gasto: parseInt(gasto.fk_gasto),
      valor: parseFloat(raw),
      detalles: gasto.detalles,
    }
    if (gasto.id_gastoxviaje) body.id = gasto.id_gastoxviaje
    return body
  }

  const resetForm = () => {
    setGasto({
      fk_viaje: viajeId,
      fk_gasto: "",
      valor: "",
      detalles: "",
    })
  }

  return {
    gasto,
    tiposDeGasto,
    loadingTipos,
    handleChange,
    handleValorChange,
    getFormattedBody,
    resetForm,
    modo,
  }
}
