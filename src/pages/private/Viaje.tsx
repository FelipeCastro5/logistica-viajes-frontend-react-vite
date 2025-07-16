import { useEffect, useState } from "react"
import { useParams, useNavigate } from "react-router-dom"

import PageContent from "../../components/layout/PageContent"
import { useLayoutTitle } from "../../context/LayoutTitleContext"
import DetallesViajeForm from "../../components/forms/DetallesViajeForm"
import ManifiestoForm from "../../components/forms/ManifiestoForm"
import TablaGastosViaje from "../../components/tables/TablaGastos"
import { Button } from "@/components/ui/button"

import { getViajeById, updateViaje } from "@/services/adapters/viajes.adapter"
import { getManifiestoById, updateManifiesto } from "@/services/adapters/manifiestos.adapter"

import { toast } from "sonner"

export default function Viaje() {
  const { setTitle } = useLayoutTitle()
  const { id } = useParams()
  const id_viaje = Number(id)

  const navigate = useNavigate()

  const [componenteActivo, setComponenteActivo] = useState("DetallesViaje")

  const [detallesViaje, setDetallesViaje] = useState<any>(null)
  const [manifiesto, setManifiesto] = useState<any>(null)

  const [viajeEditado, setViajeEditado] = useState<any>(null)
  const [manifiestoEditado, setManifiestoEditado] = useState<any>(null)

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

      console.log("📦 Detalles del viaje:", detalles?.data)
      console.log("📦 Manifiesto:", manifiestoRes?.data)

      setDetallesViaje(detalles?.data)
      setManifiesto(manifiestoRes?.data)
      
    } catch (error) {
      console.error("Error al cargar datos del viaje:", error)
    }
  }

  const handleGuardar = async () => {
    if (!viajeEditado && !manifiestoEditado) {
      toast.warning("No hay cambios para guardar")
      return
    }

    try {
      if (viajeEditado) {
        await updateViaje({
          ...viajeEditado,
          id_viaje,
        })
      }

      if (manifiestoEditado) {
        await updateManifiesto({
          ...manifiestoEditado,
          id_manifiesto: manifiestoEditado.id_manifiesto,
          id_viaje,
        })
      }

      toast.success("Datos actualizados correctamente ✅")
      fetchData(id_viaje)
      setViajeEditado(null)
      setManifiestoEditado(null)
    } catch (error) {
      console.error("Error al guardar:", error)
      toast.error("Error al guardar los datos ❌")
    }
  }

  // const renderizarComponente = () => {
  //   switch (componenteActivo) {
  //     case "DetallesViaje":
  //       return <DetallesViajeForm id_viaje={id_viaje} initialData={detallesViaje} onChange={setViajeEditado}/>
  //     case "Manifiesto":
  //       return <ManifiestoForm id_viaje={id_viaje} initialData={manifiesto} />
  //     case "GastosViaje":
  //       return <TablaGastosViaje id_viaje={id_viaje} gastos={gastos} />
  //     default:
  //       return <p className="text-center">Selecciona una sección.</p>
  //   }
  // }

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
        {/* {renderizarComponente()} */}
        <div className="relative space-y-6">
          <div className={componenteActivo === "DetallesViaje" ? "block" : "hidden"}>
            <DetallesViajeForm
              id_viaje={id_viaje}
              initialData={detallesViaje}
              onChange={setViajeEditado}
            />
          </div>

          <div className={componenteActivo === "Manifiesto" ? "block" : "hidden"}>
            <ManifiestoForm
              id_viaje={id_viaje}
              initialData={manifiesto}
              onChange={setManifiestoEditado}
            />
          </div>

          <div className={componenteActivo === "GastosViaje" ? "block" : "hidden"}>
            <TablaGastosViaje id_viaje={id_viaje} />
          </div>
        </div>

      </div>

      <div className="flex items-center justify-between mb-4 flex-wrap gap-2">
        <Button
          onClick={() => navigate("/menu-principal")}
          className="bg-gray-600 hover:bg-gray-700 text-white mt-4"
        >
          VOLVER
        </Button>

        {viajeEditado && (
          <Button
            onClick={handleGuardar}
            className="bg-green-600 hover:bg-green-700 text-white mt-4"
          >
            GUARDAR CAMBIOS
          </Button>
        )}

        <Button
          variant="secondary"
          onClick={() => navigate("/tabla-viaje")}
          className="text-sm mt-4"
        >
          detalles viaje
        </Button>
      </div>

    </PageContent>
  )
}
