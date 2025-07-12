import { useEffect, useState } from "react"
import PageContent from "../../../components/layout/PageContent"
import { useLayoutTitle } from "../../../context/LayoutTitleContext"
import DetallesViajeForm from "../forms/DetallesViajeForm"
import ManifiestoForm from "../forms/ManifiestoForm"
import { Button } from "@/components/ui/button"
import { useNavigate } from "react-router-dom"

export default function NuevoViaje() {
  const { setTitle } = useLayoutTitle()
  const [componenteActivo, setComponenteActivo] = useState("DetallesViaje")
  const navigate = useNavigate()
  useEffect(() => {
    setTitle("REGISTRO DE NUEVO VIAJE")
  }, [])

  const renderizarComponente = () => {
    switch (componenteActivo) {
      case "DetallesViaje":
        return <DetallesViajeForm />
      case "Manifiesto":
        return <ManifiestoForm />
      default:
        return <p className="text-center">Selecciona una sección del viaje.</p>
    }
  }

  return (
    <PageContent title="Registrar Nuevo Viaje">
      {/* Botones de navegación entre formularios */}
      <div className="flex gap-4 justify-center mb-6">
        <button
          onClick={() => setComponenteActivo("DetallesViaje")}
          className={`px-4 py-2 rounded-md font-semibold ${componenteActivo === "DetallesViaje"
              ? "bg-blue-600 text-white"
              : "bg-gray-200 text-gray-800 hover:bg-blue-100"
            }`}
        >
          Detalles del Viaje
        </button>
        <button
          onClick={() => setComponenteActivo("Manifiesto")}
          className={`px-4 py-2 rounded-md font-semibold ${componenteActivo === "Manifiesto"
              ? "bg-blue-600 text-white"
              : "bg-gray-200 text-gray-800 hover:bg-blue-100"
            }`}
        >
          Manifiesto
        </button>
      </div>

      {/* Render dinámico */}
      <div className="border border-gray-300 rounded-lg p-4 bg-white shadow">
        {renderizarComponente()}
        <Button
          onClick={() => navigate("/menu-principal")}
          className="bg-gray-600 hover:bg-gray-700 text-white mt-4"
        >
          VOLVER
        </Button>
      </div>
    </PageContent>
  )
}
