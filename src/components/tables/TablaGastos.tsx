// src/components/tables/TablaGastos.tsx
import { useEffect, useState } from "react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Card, CardContent } from "@/components/ui/card"
import NuevoGastoModal from "../modals/NuevoGastoModal"
import { getGastosPorViajeByViajeId } from "@/services/adapters/gastoxviaje.adapter"
import { toast } from "sonner"
import EditarGastoModal from "../modals/EditarGastoModal"
import EliminarGastoModal from "../modals/EliminarGasto"

interface Gasto {
  id_gastoxviaje: number
  nombre_gasto: string
  valor: number | string
  detalles: string
}

interface Props {
  id_viaje: number
}

export default function TablaGastosViaje({ id_viaje }: Props) {
  const [gastos, setGastos] = useState<Gasto[]>([])

  useEffect(() => {
    const fetchGastos = async () => {
      try {
        const res = await getGastosPorViajeByViajeId(id_viaje)
        setGastos(res.data || [])
      } catch (error) {
        console.error("Error al cargar gastos:", error)
        toast.error("Error al cargar los gastos del viaje ❌")
      }
    }

    if (id_viaje) {
      fetchGastos()
    }
  }, [id_viaje])

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
              <TableHead>Acciones</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {gastos.map((gasto) => (
              <TableRow key={gasto.id_gastoxviaje}>
                <TableCell>{gasto.nombre_gasto}</TableCell>
                <TableCell>${parseFloat(gasto.valor as string).toFixed(2)}</TableCell>
                <TableCell>{gasto.detalles}</TableCell>
                <TableCell><EditarGastoModal viajeId={id_viaje}/><EliminarGastoModal viajeId={id_viaje}/></TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>

        <div className="text-left mt-4 text-base font-semibold">
          Total: <span className="text-blue-700">${total.toFixed(2)}</span>
        </div>
        <div className="text-right mt-4 text-base font-semibold">
          <NuevoGastoModal viajeId={id_viaje} />
        </div>

      </CardContent>
    </Card>
  )
}
