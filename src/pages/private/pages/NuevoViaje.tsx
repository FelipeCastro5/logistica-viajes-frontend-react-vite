import { useEffect, useState } from "react"
import PageContent from "../../../components/layout/PageContent"
import { useLayoutTitle } from "../../../context/LayoutTitleContext"
import DetallesViajeForm from "../forms/DetallesViajeForm"
import ManifiestoForm from "../forms/ManifiestoForm"
import { Button } from "@/components/ui/button"
import { useNavigate } from "react-router-dom"
import { createNewViaje } from "@/services/adapters/viajes.adapter"

export default function NuevoViaje() {
  const { setTitle } = useLayoutTitle()
  const [componenteActivo, setComponenteActivo] = useState("DetallesViaje")
  const navigate = useNavigate()

  const handleCreateViaje = async () => {
    if (!detalles || !manifiesto) {
      alert("Faltan datos del viaje o del manifiesto.")
      return
    }

    const payload = {
      ...detalles,
      ...manifiesto,
    }

    // 👇 Imprime el body armado en consola
    console.log("Payload a enviar:", payload)
    try {
      const res = await createNewViaje(payload)
      console.log("Viaje creado:", res)
      navigate("/menu-principal")
    } catch (err) {
      console.error("Error creando el viaje:", err)
    }
  }


  useEffect(() => {
    setTitle("REGISTRO DE NUEVO VIAJE")
  }, [])

  const [detalles, setDetalles] = useState<any>(null)
  const [manifiesto, setManifiesto] = useState<any>(null)

  const renderizarComponente = () => {
    switch (componenteActivo) {
      case "DetallesViaje":
        return (
          <DetallesViajeForm
            initialData={detalles}
            onFormChange={setDetalles}
          />
        )
      case "Manifiesto":
        return (
          <ManifiestoForm
            initialData={detalles}
            onFormChange={setDetalles}
          />
        )
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
            : "bg-gray-200 text-gray-800 hover:bg-blue-900 hover:text-gray-200"
            }`}
        >
          Detalles del Viaje
        </button>
        <button
          onClick={() => setComponenteActivo("Manifiesto")}
          className={`px-4 py-2 rounded-md font-semibold ${componenteActivo === "Manifiesto"
            ? "bg-blue-600 text-white"
            : "bg-gray-200 text-gray-800 hover:bg-blue-900 hover:text-gray-200"
            }`}
        >
          Manifiesto
        </button>
      </div>

      {/* Render dinámico */}
      <div className="border border-gray-300 dark:border-gray-700 rounded-lg p-4 bg-white dark:bg-gray-900 shadow">
        {renderizarComponente()}
        <Button
          className="bg-green-600 hover:bg-green-700 text-white mt-4"
          onClick={handleCreateViaje}
        >
          CREAR VIAJE
        </Button>
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
