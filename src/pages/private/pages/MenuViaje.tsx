import { useNavigate } from "react-router-dom"
import { useEffect } from "react"
import { useLayoutTitle } from "../../../context/LayoutTitleContext"
import MenuButton from "../../../components/layout/MenuButton"

export default function MenuViaje() {
  const navigate = useNavigate()
  const { setTitle } = useLayoutTitle()

  useEffect(() => {
    setTitle("INFORMACIÓN DEL VIAJE")
  }, [])

  const handleFinalizar = () => {
    if (window.confirm("¿Desea finalizar el viaje?")) {
      alert("Viaje finalizado (simulado)")
      navigate("/menu-principal")
    }
  }

  return (
    <>
      <h2 className="text-xl mb-6">
        VIAJE: <span className="font-bold text-green-400">#123456</span>
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full max-w-3xl">
        <MenuButton label="INFORMACIÓN BÁSICA" onClick={() => navigate("/detalles-viaje")} />
        <MenuButton label="INFORMACIÓN CLIENTE" onClick={() => navigate("/info-cliente")} />
        <MenuButton label="MANIFIESTO" onClick={() => navigate("/manifiesto")} />
        <MenuButton label="GASTOS" onClick={() => navigate("/total-gastos")} />
        <MenuButton
          label="FINALIZAR VIAJE"
          onClick={handleFinalizar}
          className="bg-red-600 hover:bg-red-700"
        />
        <MenuButton
          label="VOLVER"
          onClick={() => navigate("/menu-principal")}
          className="bg-gray-600 hover:bg-gray-700"
        />
      </div>
    </>
  )
}
