import { useEffect } from "react"
import { useLayoutTitle } from "../../context/LayoutTitleContext"
import TablaViajes from "../../components/tables/TablaViajes"
import TablaConductores from "@/components/tables/TablaConductores"
import { useAuth } from "@/hooks/useAuth"

export default function MenuPrincipal() {
  const { setTitle } = useLayoutTitle()
  const { user } = useAuth()
  const id_usuario = user?.id_usuario

  useEffect(() => {
    setTitle(<>MENU PRINCIPAL CONDUCTORES</>)
  }, [])

  return (
    <div className="w-full max-w-3xl mx-auto px-4">
      <div>
        <TablaConductores /><br />

        <TablaViajes idUsuario={id_usuario} />
      </div>
    </div>
  )
}
