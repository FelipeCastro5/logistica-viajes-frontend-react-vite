import { useEffect, useState } from "react"
import PageContent from "../../../components/layout/PageContent"
import { useLayoutTitle } from "../../../context/LayoutTitleContext"
import DetallesViajeForm from "../forms/DetallesViajeForm"
import ManifiestoForm from "../forms/ManifiestoForm"
import TablaGastosViaje from "../tables/TablaGastos"
import ClienteForm from "../forms/ClienteForm"
import { Button } from "@/components/ui/button"
import { useNavigate } from "react-router-dom"

export default function Viaje() {
  const { setTitle } = useLayoutTitle()
  const [componenteActivo, setComponenteActivo] = useState("DetallesViaje")

  const navigate = useNavigate()

  useEffect(() => {
    setTitle("DETALLES DEL VIAJE")
  }, [])

  const renderizarComponente = () => {
    switch (componenteActivo) {
      case "DetallesViaje":
        return <DetallesViajeForm />
      case "Manifiesto":
        return <ManifiestoForm />
      case "GastosViaje":
        return <TablaGastosViaje />
      case "ClienteForm":
        return <ClienteForm onCreated={(data) => console.log("Cliente recibido en padre:", data)} />
      default:
        return <p className="text-center">Selecciona una sección.</p>
    }
  }

  return (
    <PageContent title="VIAJE# COD-1234">
      {/* Botones de navegación */}
      <div className="flex flex-wrap justify-center gap-3 mb-6">
        <Button
          variant={componenteActivo === "DetallesViaje" ? "default" : "outline"}
          onClick={() => setComponenteActivo("DetallesViaje")}
        >
          Detalles del Viaje
        </Button>
        <Button
          variant={componenteActivo === "ClienteForm" ? "default" : "outline"}
          onClick={() => setComponenteActivo("ClienteForm")}
        >
          Cliente
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
