import { useState } from "react"
import { useNavigate } from "react-router-dom"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { ScrollArea } from "@/components/ui/scroll-area"
import VerVehiculoModal from "../modals/VerVehiculoModal"

// mocks
import { VEHICULOS } from "@/mocks/vehiculos.mock"

type Props = {
  idUsuario: number
  titulo?: string
}

export default function TablaVehiculos({ idUsuario, titulo }: Props) {
  const navigate = useNavigate()
  const [page, setPage] = useState(1)

  // 🔹 MODAL STATE (AQUÍ ESTÁ LA CLAVE)
  const [openModal, setOpenModal] = useState(false)
  const [idVehiculoActivo, setIdVehiculoActivo] = useState<number | null>(null)

  const itemsPerPage = 5

  const vehiculosUsuario = VEHICULOS.filter(
    (v) => v.fk_usuario === idUsuario
  )

  const totalPages = Math.ceil(vehiculosUsuario.length / itemsPerPage)

  const pagedVehiculos = vehiculosUsuario.slice(
    (page - 1) * itemsPerPage,
    page * itemsPerPage
  )

  const verVehiculo = (idVehiculo: number) => {
    setIdVehiculoActivo(idVehiculo)
    setOpenModal(true)
  }

  return (
    <Card>
      <CardContent className="p-4">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold">
            {titulo || "Lista de Vehículos"}
          </h2>

          <Button
            onClick={() => navigate("/nuevo-vehiculo")}
            className="text-sm px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md shadow-sm"
          >
            + Nuevo vehículo
          </Button>
        </div>

        <Table>
          <ScrollArea className="max-h-[400px]">
            <TableHeader>
              <TableRow>
                <TableHead className="text-center">Acciones</TableHead>
                <TableHead>Placa</TableHead>
                <TableHead>Marca</TableHead>
                <TableHead>Configuración</TableHead>
                <TableHead>Tipo</TableHead>
                <TableHead>Peso vacío (kg)</TableHead>
                <TableHead>Peso remolque (kg)</TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {pagedVehiculos.map((vehiculo) => (
                <TableRow key={vehiculo.id_vehiculo}>
                  <TableCell className="text-center">
                    <Button
                      size="sm"
                      variant="secondary"
                      onClick={() => verVehiculo(vehiculo.id_vehiculo)}
                    >
                      Ver
                    </Button>
                  </TableCell>

                  <TableCell>{vehiculo.placa}</TableCell>
                  <TableCell>{vehiculo.marca}</TableCell>
                  <TableCell>{vehiculo.configuracion}</TableCell>
                  <TableCell>{vehiculo.tipo_vehiculo}</TableCell>
                  <TableCell>{vehiculo.peso_vacio}</TableCell>
                  <TableCell>{vehiculo.peso_remolque}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </ScrollArea>
        </Table>

        <div className="flex items-center justify-between mt-4">
          <Button
            variant="outline"
            disabled={page === 1}
            onClick={() => setPage((p) => p - 1)}
          >
            Anterior
          </Button>

          <span className="text-sm text-gray-600">
            Página {page} de {totalPages || 1}
          </span>

          <Button
            variant="outline"
            disabled={page === totalPages}
            onClick={() => setPage((p) => p + 1)}
          >
            Siguiente
          </Button>
        </div>

        {/* 🔥 MODAL ÚNICO */}
        {idVehiculoActivo !== null && (
          <VerVehiculoModal
            idVehiculo={idVehiculoActivo}
            open={openModal}
            onOpenChange={setOpenModal}
          />
        )}
      </CardContent>
    </Card>
  )
}
