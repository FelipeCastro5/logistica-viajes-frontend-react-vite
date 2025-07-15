import { useEffect, useState } from "react"
import { getAllGastos } from "@/services/adapters/gastos.adapter"
import { createGastoPorViaje } from "@/services/adapters/gastoxviaje.adapter"
import type { Gasto } from "@/services/adapters/gastos.adapter"

const formatNumber = (num: number): string => {
  if (isNaN(num)) return ""
  return new Intl.NumberFormat("es-CO", {
    style: "currency",
    currency: "COP",
    minimumFractionDigits: 0,
    maximumFractionDigits: 5,
  }).format(num)
}

export function useGastoForm(viajeId: number, onCreated?: (data: any) => void) {
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

  const handleValorChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const rawValue = e.target.value.replace(/\D/g, "")
    const parsed = parseFloat(rawValue)
    setGasto((prev) => ({
      ...prev,
      valor: isNaN(parsed) ? "" : parsed.toString(),
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    try {
      const formattedGasto = {
        ...gasto,
        fk_gasto: parseInt(gasto.fk_gasto),
        valor: parseFloat(gasto.valor),
      }

      const response = await createGastoPorViaje(formattedGasto)

      if (response.status) {
        onCreated?.(response.data)
      } else {
        console.error("Error al crear gasto:", response.msg)
        alert("No se pudo registrar el gasto. Intenta de nuevo.")
      }
    } catch (error) {
      console.error("Error inesperado:", error)
      alert("Ocurrió un error al registrar el gasto.")
    }
  }

  return {
    gasto,
    tiposDeGasto,
    loadingTipos,
    handleChange,
    handleValorChange,
    handleSubmit,
    formatNumber,
  }
}
