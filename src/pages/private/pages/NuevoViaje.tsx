import { useEffect } from "react"
import PageContent from "../../../components/layout/PageContent"
import { useLayoutTitle } from "../../../context/LayoutTitleContext"
import DetallesViajeForm from "../forms/DetallesViajeForm"
import ManifiestoForm from "../forms/ManifiestoForm"

export default function NuevoViaje() {
  const { setTitle } = useLayoutTitle()

  useEffect(() => {
    setTitle("REGISTRO DE NUEVO VIAJE")
  }, [])

  return (
    <PageContent title="Registrar Nuevo Viaje">
      <DetallesViajeForm />
      <ManifiestoForm/>
    </PageContent>
  )
}
