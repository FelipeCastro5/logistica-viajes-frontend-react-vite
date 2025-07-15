import { useEffect, useState } from "react"
import { useParams, useNavigate } from "react-router-dom"

import PageContent from "../../components/layout/PageContent"
import { useLayoutTitle } from "../../context/LayoutTitleContext"
import DetallesViajeForm from "../../components/forms/DetallesViajeForm"
import ManifiestoForm from "../../components/forms/ManifiestoForm"
import TablaGastosViaje from "../../components/tables/TablaGastos"
import { Button } from "@/components/ui/button"

import { getViajeById } from "@/services/adapters/viajes.adapter"
import { getManifiestoById } from "@/services/adapters/manifiestos.adapter"
import { getGastosPorViajeByViajeId } from "@/services/adapters/gastoxviaje.adapter"

export default function Viaje() {
  const { setTitle } = useLayoutTitle()
  const { id } = useParams()
  const id_viaje = Number(id)

  const navigate = useNavigate()

  const [componenteActivo, setComponenteActivo] = useState("DetallesViaje")

  const [detallesViaje, setDetallesViaje] = useState<any>(null)
  const [manifiesto, setManifiesto] = useState<any>(null)
  const [gastos, setGastos] = useState<any[]>([])

  useEffect(() => {
    setTitle("DETALLES DEL VIAJE")

    if (id_viaje) {
      fetchData(id_viaje)
    }
  }, [id_viaje])

  const fetchData = async (id: number) => {
    try {
      const detalles = await getViajeById(id)
      const manifiestoRes = await getManifiestoById(id)
      const gastosRes = await getGastosPorViajeByViajeId(id)

      console.log("📦 Detalles del viaje:", detalles?.data)
      console.log("📦 Manifiesto:", manifiestoRes?.data)
      console.log("📦 Gastos por viaje:", gastosRes?.data)


      setDetallesViaje(detalles?.data)
      setManifiesto(manifiestoRes?.data)
      setGastos(gastosRes?.data || [])
    } catch (error) {
      console.error("Error al cargar datos del viaje:", error)
    }
  }

  const renderizarComponente = () => {
    switch (componenteActivo) {
      case "DetallesViaje":
        return <DetallesViajeForm id_viaje={id_viaje} initialData={detallesViaje} />
      case "Manifiesto":
        return <ManifiestoForm id_viaje={id_viaje} initialData={manifiesto} />
      case "GastosViaje":
        return <TablaGastosViaje id_viaje={id_viaje} gastos={gastos} />
      default:
        return <p className="text-center">Selecciona una sección.</p>
    }
  }

  return (
    <PageContent title={`VIAJE# COD-${id_viaje}`}>
      {/* Botones de navegación */}
      <div className="flex flex-wrap justify-center gap-3 mb-6">
        <Button
          variant={componenteActivo === "DetallesViaje" ? "default" : "outline"}
          onClick={() => setComponenteActivo("DetallesViaje")}
        >
          Detalles del Viaje
        </Button>

        <Button
          variant={componenteActivo === "Manifiesto" ? "default" : "outline"}
          onClick={() => setComponenteActivo("Manifiesto")}
        >
          Manifiesto
        </Button>

        <Button
          variant={componenteActivo === "GastosViaje" ? "default" : "outline"}
          onClick={() => setComponenteActivo("GastosViaje")}
        >
          Gastos del Viaje
        </Button>
      </div>

      {/* Contenedor dinámico */}
      <div className="border border-gray-300 dark:border-gray-700 rounded-lg p-4 bg-white dark:bg-gray-900 shadow">
        {renderizarComponente()}
      </div>

      <div className="flex items-center justify-between mb-4">
        <Button
          onClick={() => navigate("/menu-principal")}
          className="bg-gray-600 hover:bg-gray-700 text-white mt-4"
        >
          VOLVER
        </Button>
        <Button
          variant="secondary"
          onClick={() => navigate("/tabla-viaje")}
          className="text-sm"
        >
          detalles viaje
        </Button>
      </div>
    </PageContent>
  )
}
