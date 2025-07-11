import { useState } from "react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"

// 🔹 Datos simulados
const mockViajes = Array.from({ length: 42 }, (_, i) => ({
  id: i + 1,
  codigo: `VJ-${String(i + 1).padStart(3, "0")}`,
  cliente: `Cliente ${i + 1}`,
  producto: `Producto ${i + 1}`,
  fecha_salida: `2025-07-${(i % 28) + 1}`,
  fecha_llegada: `2025-07-${(i % 28) + 2}`,
  estado_viaje: i % 2 === 0 ? "Activo" : "Inactivo",
}))

const ITEMS_PER_PAGE = 10

export default function TablaViajes() {
  const [page, setPage] = useState(1)

  const totalPages = Math.ceil(mockViajes.length / ITEMS_PER_PAGE)
  const startIndex = (page - 1) * ITEMS_PER_PAGE
  const currentViajes = mockViajes.slice(startIndex, startIndex + ITEMS_PER_PAGE)

  return (
    <Card>
      <CardContent className="p-4">
        <h2 className="text-lg font-semibold mb-4">Lista de Viajes</h2>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Código</TableHead>
              <TableHead>Cliente</TableHead>
              <TableHead>Producto</TableHead>
              <TableHead>Salida</TableHead>
              <TableHead>Llegada</TableHead>
              <TableHead>Estado</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {currentViajes.map((viaje) => (
              <TableRow key={viaje.id}>
                <TableCell>{viaje.codigo}</TableCell>
                <TableCell>{viaje.cliente}</TableCell>
                <TableCell>{viaje.producto}</TableCell>
                <TableCell>{viaje.fecha_salida}</TableCell>
                <TableCell>{viaje.fecha_llegada}</TableCell>
                <TableCell>
                  <span className={`text-sm font-medium ${viaje.estado_viaje === "Activo" ? "text-green-600" : "text-red-500"}`}>
                    {viaje.estado_viaje}
                  </span>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>

        {/* Paginación */}
        <div className="flex items-center justify-between mt-4">
          <Button variant="outline" disabled={page === 1} onClick={() => setPage(p => p - 1)}>
            Anterior
          </Button>
          <span className="text-sm text-gray-600">
            Página {page} de {totalPages}
          </span>
          <Button variant="outline" disabled={page === totalPages} onClick={() => setPage(p => p + 1)}>
            Siguiente
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
