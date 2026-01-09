import { useEffect, useState } from "react"
import { useLayoutTitle } from "@/context/LayoutTitleContext"
import { Button } from "@/components/ui/button"
// import { Input } from "@/components/ui/input"
// import { Label } from "@/components/ui/label"
import { useNavigate } from "react-router-dom"

import TablaVehiculos from "@/components/tables/TablaVehiculos"
import VerVehiculoModal from "@/components/modals/VerVehiculoModal"

// import { VEHICULOS } from "@/mocks/vehiculos.mock"

// 🔹 UTILIDAD LOCAL (buscador por placa)
// const normalizarPlaca = (placa: string) =>
//   placa.toUpperCase().replace(/[^A-Z0-9]/g, "")

export default function Vehiculos() {
  const { setTitle } = useLayoutTitle()
  const navigate = useNavigate()

  // 🔹 Estados usados por el buscador
  // const [placa, setPlaca] = useState("")
  const [idVehiculo, 
  //  setIdVehiculo
  ] = useState<number | null>(null)
  const [openModal, setOpenModal] = useState(false)

  useEffect(() => {
    setTitle(<>GESTIÓN DE VEHÍCULOS</>)
  }, [])

  const user = JSON.parse(localStorage.getItem("user") || "{}")
  const idUsuario = user.id_usuario
  const fkContador = user.fk_contador

  // 🔹 Lógica de búsqueda por placa (mock)
  // const buscarVehiculo = () => {
  //   if (!placa.trim()) {
  //     alert("Ingrese una placa")
  //     return
  //   }
  //
  //   const placaNormalizada = normalizarPlaca(placa)
  //
  //   const vehiculo = VEHICULOS.find(
  //     v => normalizarPlaca(v.placa) === placaNormalizada
  //   )
  //
  //   if (!vehiculo) {
  //     alert("Vehículo no encontrado")
  //     return
  //   }
  //
  //   setIdVehiculo(vehiculo.id_vehiculo)
  //   setOpenModal(true)
  // }

  return (
    <div className="w-full max-w-6xl mx-auto px-4 space-y-6">

      {/* 🔍 BUSCADOR DE VEHÍCULOS (DESHABILITADO) */}
      {/*
      <div className="flex items-end gap-4">
        <div className="flex-1">
          <Label>Buscar vehículo por placa</Label>
          <Input
            placeholder="ABC-123"
            value={placa}
            onChange={(e) => setPlaca(e.target.value)}
          />
        </div>

        <Button onClick={buscarVehiculo}>
          Buscar
        </Button>
      </div>
      */}

      {/* TABLAS */}
      <TablaVehiculos idUsuario={idUsuario} titulo="Mis Vehículos" />

      {fkContador && (
        <TablaVehiculos
          idUsuario={fkContador}
          titulo="Vehículos del Contador"
        />
      )}

      {/* MODAL (solo se abre desde la tabla ahora) */}
      {idVehiculo !== null && (
        <VerVehiculoModal
          idVehiculo={idVehiculo}
          open={openModal}
          onOpenChange={setOpenModal}
        />
      )}

      {/* VOLVER */}
      <Button
        onClick={() => navigate("/menu-principal")}
        className="bg-gray-600 hover:bg-gray-700 text-white mt-4"
      >
        VOLVER
      </Button>
    </div>
  )
}
