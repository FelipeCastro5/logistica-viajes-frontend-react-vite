import { useNavigate } from "react-router-dom"
import { useEffect } from "react"
import { useLayoutTitle } from "../../context/LayoutTitleContext"
import MenuButton from "../../components/MenuButton"

export default function MenuPrincipal() {
  const navigate = useNavigate()
  const { setTitle } = useLayoutTitle()

  useEffect(() => {
    setTitle(<>MENU PRINCIPAL CONDUCTORES</>)
  }, [])

  return (
    <div className="w-full max-w-3xl mx-auto px-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <MenuButton label="NUEVO VIAJE" onClick={() => navigate("/nuevo-viaje")} />
        <MenuButton label="VIAJE ACTUAL" onClick={() => navigate("/menu-viaje")} />
        <MenuButton label="RESUMEN VIAJES" onClick={() => navigate("/resumen")} />
      </div>
    </div>
  )
}
