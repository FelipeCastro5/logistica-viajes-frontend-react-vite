import { useEffect } from "react"
import { useLayoutTitle } from "@/context/LayoutTitleContext"
import GestionVehiculosForm from "@/components/forms/GestionVehiculosForm"
import { Button } from "@/components/ui/button"
import { useNavigate } from "react-router-dom"

export default function Vehiculos() {
    const { setTitle } = useLayoutTitle()

    useEffect(() => {
        setTitle(<>GESTIÓN DE VEHÍCULOS</>)
    }, [])

    const navigate = useNavigate()
    return (
        <div className="w-full max-w-6xl mx-auto px-4">
            <GestionVehiculosForm />
            <Button
                onClick={() => navigate("/menu-principal")}
                className="bg-gray-600 hover:bg-gray-700 text-white mt-4"
            >
                VOLVER
            </Button>

        </div>
    )
}
