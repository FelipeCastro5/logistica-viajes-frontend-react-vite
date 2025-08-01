// import { useNavigate } from "react-router-dom"
// import MenuButton from "../../../components/layout/MenuButton"
import { useEffect } from "react"
import { useLayoutTitle } from "../../context/LayoutTitleContext"
import TablaViajes from "../../components/tables/TablaViajes"
import TablaConductores from "@/components/tables/TablaConductores"
// import GraficaGastosPorTipo from "../../components/graphics/GraficaGastosPorTipo"
// import GraficaGastosPorViaje from "../../components/graphics/GraficaGastosPorViaje"
// import GraficaIngresosVsGastos from "../../components/graphics/GraficaIngresosVsGastos"

export default function MenuPrincipal() {
  // const navigate = useNavigate()
  const { setTitle } = useLayoutTitle()

  useEffect(() => {
    setTitle(<>MENU PRINCIPAL CONDUCTORES</>)
  }, [])

  return (
    <div className="w-full max-w-3xl mx-auto px-4">
      <div>
        <TablaConductores /><br/>
        <TablaViajes />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6">
        {/* <GraficaGastosPorTipo />
        <GraficaGastosPorViaje />
        <GraficaIngresosVsGastos /> */}
      </div>
      {/* <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <MenuButton label="NUEVO VIAJE" onClick={() => navigate("/nuevo-viaje")} />
        <MenuButton label="VIAJE ACTUAL" onClick={() => navigate("/menu-viaje")} />
        <MenuButton label="VIAJE" onClick={() => navigate("/viaje")} />
      </div> */}
    </div>
  )
}
