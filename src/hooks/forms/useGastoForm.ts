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
    valor: initialData.valor ?? "",
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
    const raw = e.target.value.replace(/[^\d.]/g, "")
    setGasto(prev => ({ ...prev, valor: raw }))
  }

  const getFormattedBody = () => {
    const body: any = {
      fk_viaje: gasto.fk_viaje,
      fk_gasto: parseInt(gasto.fk_gasto),
      valor: parseFloat(gasto.valor),
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
