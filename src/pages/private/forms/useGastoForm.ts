import { useEffect, useState } from "react"
import { getAllGastos } from "@/services/adapters/gastos.adapter"
import type { Gasto } from "@/services/adapters/gastos.adapter"

export function useGastoForm(viajeId: number) {
  const [tiposDeGasto, setTiposDeGasto] = useState<Gasto[]>([])
  const [loadingTipos, setLoadingTipos] = useState(true)

  const [gasto, setGasto] = useState({
    fk_viaje: viajeId,
    fk_gasto: "",
    valor: "",
    detalles: "",
  })

  useEffect(() => {
    const fetchTiposDeGasto = async () => {
      try {
        const response = await getAllGastos()
        if (response.status) {
          setTiposDeGasto(response.data)
        } else {
          console.error("Error al obtener tipos de gasto:", response.msg)
        }
      } catch (error) {
        console.error("Error inesperado:", error)
      } finally {
        setLoadingTipos(false)
      }
    }

    fetchTiposDeGasto()
  }, [])

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target
    setGasto((prev) => ({ ...prev, [name]: value }))
  }

  return {
    gasto,
    tiposDeGasto,
    loadingTipos,
    handleChange,
  }
}
