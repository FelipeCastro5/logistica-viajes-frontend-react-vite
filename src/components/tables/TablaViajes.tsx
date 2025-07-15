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
import { useViajesTable } from "@/hooks/tables/useViajesTable"

export default function TablaViajes() {
  const navigate = useNavigate()
  const {
    viajes,
    errorMsg,
    page,
    totalPages,
    setPage,
  } = useViajesTable(10)

  return (
    <Card>
      <CardContent className="p-4">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold mb-4">Lista de Viajes</h2>
          <Button
            onClick={() => navigate("/nuevo-viaje")}
            className="text-sm px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white dark:bg-gray-700 dark:text-white transition duration-150 ease-in-out active:scale-95 rounded-md shadow-sm"
          >
            + Nuevo viaje
          </Button>
        </div>

        {errorMsg && (
          <p className="text-red-500 font-medium mb-4">{errorMsg}</p>
        )}

        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Código</TableHead>
              <TableHead>Cliente</TableHead>
              <TableHead>Producto</TableHead>
              <TableHead>Salida</TableHead>
              <TableHead>Llegada</TableHead>
              <TableHead>Estado</TableHead>
              <TableHead className="text-center">Acciones</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {viajes.map((viaje) => (
              <TableRow key={viaje.id_viaje}>
                <TableCell>{viaje.codigo}</TableCell>
                <TableCell>{viaje.nombre_cliente}</TableCell>
                <TableCell>{viaje.producto}</TableCell>
                <TableCell>{viaje.fecha_salida.slice(0, 10)}</TableCell>
                <TableCell>{viaje.fecha_llegada.slice(0, 10)}</TableCell>
                <TableCell>
                  <span
                    className={`text-sm font-medium ${viaje.estado_viaje
                      ? "text-green-600"
                      : "text-red-500"
                      }`}
                  >
                    {viaje.estado_viaje ? "Activo" : "Inactivo"}
                  </span>
                </TableCell>
                <TableCell className="text-center">
                  <Button
                    variant="secondary"
                    onClick={() => navigate(`/viaje/${viaje.id_viaje}`)}
                    className="text-sm"
                  >
                    Ver viaje
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
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
            Página {page} de {totalPages}
          </span>
          <Button
            variant="outline"
            disabled={page === totalPages}
            onClick={() => setPage((p) => p + 1)}
          >
            Siguiente
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
