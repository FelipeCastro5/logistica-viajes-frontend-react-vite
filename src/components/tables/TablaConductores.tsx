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

export default function TablaConductores() {
  return (
    <Card>
      <CardContent className="p-4">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold mb-4">Lista de Conductores</h2>
        </div>

        <div className="overflow-x-auto max-h-[400px] overflow-y-auto">
          <Table className="min-w-[900px]">
            <TableHeader>
              <TableRow>
                <TableHead>Tipo Doc</TableHead>
                <TableHead>Num Doc</TableHead>
                <TableHead>Nombre</TableHead>
                <TableHead>Apellido</TableHead>
                <TableHead>Teléfono</TableHead>
                <TableHead>Correo</TableHead>
                <TableHead>Estado</TableHead>
                <TableHead className="text-center">Acciones</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {/* Filas de ejemplo estáticas */}
              <TableRow>
                <TableCell>CC</TableCell>
                <TableCell>123456789</TableCell>
                <TableCell>Juan Carlos</TableCell>
                <TableCell>Pérez Rojas</TableCell>
                <TableCell>3001234567</TableCell>
                <TableCell>juan@example.com</TableCell>
                <TableCell>
                  <span className="text-green-600 font-medium text-sm">Activo</span>
                </TableCell>
                <TableCell className="text-center">
                  <Button size="sm" variant="secondary">Ver</Button>
                </TableCell>
              </TableRow>

              <TableRow>
                <TableCell>TI</TableCell>
                <TableCell>987654321</TableCell>
                <TableCell>Luisa Fernanda</TableCell>
                <TableCell>Martínez Díaz</TableCell>
                <TableCell>3109876543</TableCell>
                <TableCell>luisa@example.com</TableCell>
                <TableCell>
                  <span className="text-red-500 font-medium text-sm">Inactivo</span>
                </TableCell>
                <TableCell className="text-center">
                  <Button size="sm" variant="secondary">Ver</Button>
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  )
}
