import { useEffect, useState } from "react"
import { useLayoutTitle } from "../../context/LayoutTitleContext"
import TablaViajes from "../../components/tables/TablaViajes"
import TablaConductores from "@/components/tables/TablaConductores"
import { useAuth } from "@/hooks/useAuth"
import { Button } from "@/components/ui/button"
import { Link } from "react-router-dom"

export default function MenuPrincipal() {
  const { setTitle } = useLayoutTitle()
  const { user } = useAuth()
  const [selectedUserId, setSelectedUserId] = useState<number | null>(null)

  const id_usuario = user?.id_usuario
  const rol = user?.nombre_rol

  useEffect(() => {
    setTitle(<>MENU PRINCIPAL CONDUCTORES</>)
  }, [])

  const handleVerViajes = (id: number) => {
    setSelectedUserId(id)
  }

  const shouldShowConductores = rol === "Contador"
  const userIdToUse = shouldShowConductores ? selectedUserId : id_usuario

  return (
    <div className="w-full max-w-5xl mx-auto px-4">
      {shouldShowConductores && (
        <>
          <TablaConductores onSelectConductor={handleVerViajes} />
          <br />
        </>
      )}

      {userIdToUse && <TablaViajes idUsuario={userIdToUse} />}
      <Link to="/vehiculos">
        <Button className="mb-4">Gestionar vehículos</Button>
      </Link>
    </div>
  )
}
