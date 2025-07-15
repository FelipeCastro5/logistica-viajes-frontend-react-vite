// src/components/tables/TablaGastos.tsx

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Card, CardContent } from "@/components/ui/card"
import NuevoGastoModal from "../modals/NuevoGastoModal"

interface Gasto {
  id_gastoxviaje: number
  nombre_gasto: string
  valor: number | string
  detalles: string
}

interface Props {
  gastos: Gasto[]
  id_viaje: number
}

export default function TablaGastosViaje({ gastos, id_viaje }: Props) {
  const total = gastos.reduce((acc, gasto) => acc + parseFloat(gasto.valor as string), 0)

  return (
    <Card>
      <CardContent className="p-4">
        <h2 className="text-lg font-semibold mb-4">Gastos del Viaje</h2>

        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Nombre del Gasto</TableHead>
              <TableHead>Valor</TableHead>
              <TableHead>Detalles</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {gastos.map((gasto) => (
              <TableRow key={gasto.id_gastoxviaje}>
                <TableCell>{gasto.nombre_gasto}</TableCell>
                <TableCell>${parseFloat(gasto.valor as string).toFixed(2)}</TableCell>
                <TableCell>{gasto.detalles}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>

        <div className="text-right mt-4 text-base font-semibold">
          Total: <span className="text-blue-700">${total.toFixed(2)}</span>
        </div>

        {/* Modal con el id del viaje real */}
        <NuevoGastoModal viajeId={id_viaje} />
      </CardContent>
    </Card>
  )
}
