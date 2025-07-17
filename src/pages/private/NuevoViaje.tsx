import { useEffect, useState } from "react"
import PageContent from "../../components/layout/PageContent"
import { useLayoutTitle } from "../../context/LayoutTitleContext"
import DetallesViajeForm from "../../components/forms/DetallesViajeForm"
import ManifiestoForm from "../../components/forms/ManifiestoForm"
import { Button } from "@/components/ui/button"
import { useNavigate } from "react-router-dom"
import type { ViajeData } from "@/hooks/forms/viaje"


export default function NuevoViaje() {

  const [nuevoViajeBody, setNuevoViajeBody] = useState<Partial<ViajeData> | null>(null)

  const { setTitle } = useLayoutTitle()
  const [componenteActivo, setComponenteActivo] = useState("DetallesViaje")
  const navigate = useNavigate()
  useEffect(() => {
    setTitle("REGISTRO DE NUEVO VIAJE")
  }, [])

  // const renderizarComponente = () => {
  //   switch (componenteActivo) {
  //     case "DetallesViaje":
  //       return <DetallesViajeForm id_viaje={null} initialData={null}/>
  //     case "Manifiesto":
  //       return <ManifiestoForm />
  //     default:
  //       return <p className="text-center">Selecciona una sección del viaje.</p>
  //   }
  // }

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

      {/* Render persistente */}
      <div className="border border-gray-300 dark:border-gray-700 rounded-lg p-4 bg-white dark:bg-gray-900 shadow">
        {/* {renderizarComponente()} */}
        <div className="relative space-y-6">
          <div className={componenteActivo === "DetallesViaje" ? "block" : "hidden"}>
            <DetallesViajeForm
              modo="crear"
              onChange={(data) => setNuevoViajeBody(data)} // ← importante para recolectar el body
            />

          </div>

          <div className={componenteActivo === "Manifiesto" ? "block" : "hidden"}>
            <ManifiestoForm />
          </div>
        </div>

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
