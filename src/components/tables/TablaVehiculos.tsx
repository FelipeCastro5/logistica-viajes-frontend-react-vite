import { useEffect, useState } from "react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { ScrollArea } from "@/components/ui/scroll-area"
import VerVehiculoModal from "../modals/VerVehiculoModal"
import { getVehiculosByUsuario } from "@/services/adapters/vehiculo.adapter"

type Props = {
  idUsuario: number
  titulo?: string
}

type ModalMode = "ver" | "crear" | "editar"

type Vehiculo = {
  id_vehiculo: number
  fk_usuario: number
  placa: string
  marca: string
  configuracion: string
  tipo_vehiculo: string
  peso_vacio: string | number
  peso_remolque: string | number
}

export default function TablaVehiculos({ idUsuario, titulo }: Props) {
  const [page, setPage] = useState(1)
  const [vehiculos, setVehiculos] = useState<Vehiculo[]>([])
  const [loading, setLoading] = useState(false)

  // Modal state
  const [openModal, setOpenModal] = useState(false)
  const [vehiculoId, setVehiculoId] = useState<number | null>(null)
  const [mode, setMode] = useState<ModalMode>("ver")

  const itemsPerPage = 5

  // =====================
  // Fetch vehicles
  // =====================
  const fetchVehiculos = async () => {
    setLoading(true)
    try {
      const res = await getVehiculosByUsuario(idUsuario)
      if (res.status === 200 && Array.isArray(res.data)) {
        setVehiculos(
          res.data.map((v: any) => ({
            ...v,
            peso_vacio: Number(v.peso_vacio),
            peso_remolque: Number(v.peso_remolque),
          }))
        )
      } else {
        setVehiculos([])
      }
    } catch (error) {
      console.error("Error al cargar vehículos:", error)
      setVehiculos([])
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchVehiculos()
  }, [idUsuario])

  // =====================
  // Pagination
  // =====================
  const totalPages = Math.ceil(vehiculos.length / itemsPerPage)
  const pagedVehiculos = vehiculos.slice(
    (page - 1) * itemsPerPage,
    page * itemsPerPage
  )

  // =====================
  // Handlers
  // =====================
  const abrirModalVehiculo = (modo: ModalMode, id: number | null = null) => {
    setMode(modo)
    setVehiculoId(id)
    setOpenModal(true)
  }

  return (
    <Card>
      <CardContent className="p-4">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold">{titulo || "Lista de Vehículos"}</h2>

          {/* Nuevo vehículo */}
          <Button
            className="text-sm px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md shadow-sm"
            size="sm"
            onClick={() => abrirModalVehiculo("crear")}
          >
            + Nuevo vehículo
          </Button>
        </div>

        {loading ? (
          <p className="text-center text-gray-500">Cargando vehículos...</p>
        ) : (
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
                        onClick={() => abrirModalVehiculo("ver", vehiculo.id_vehiculo)}
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
        )}

        {/* Paginación */}
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

        {/* Modal */}
        <VerVehiculoModal
          open={openModal}
          onOpenChange={setOpenModal}
          idVehiculo={vehiculoId}
          mode={mode}
        />
      </CardContent>
    </Card>
  )
}
