import { useState } from "react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Card, CardContent } from "@/components/ui/card"
import NuevoGastoModal from "./NuevoGastoModal"

// 🔹 Datos simulados: reemplaza esto con tu fetch o props
const mockGastos = [
    { id_gastoxviaje: 1, nombre_gasto: "Combustible", valor: 1500.25, detalles: "Gasolinera Shell" },
    { id_gastoxviaje: 2, nombre_gasto: "Peaje", valor: 300.75, detalles: "Ruta Norte" },
    { id_gastoxviaje: 3, nombre_gasto: "Hotel", valor: 900.0, detalles: "Parada en Ciudad A" },
]

export default function TablaGastosViaje() {
    const [gastos] = useState(mockGastos)

    const total = gastos.reduce((acc, gasto) => acc + Number(gasto.valor), 0)

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
                            <TableHead>Otro</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {gastos.map((gasto) => (
                            <TableRow key={gasto.id_gastoxviaje}>
                                <TableCell>{gasto.nombre_gasto}</TableCell>
                                <TableCell>${Number(gasto.valor).toFixed(2)}</TableCell>
                                <TableCell>{gasto.detalles}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>

                <div className="text-right mt-4 text-base font-semibold">
                    Total: <span className="text-blue-700">${total.toFixed(2)}</span>
                </div>
                <NuevoGastoModal viajeId={123} /> {/* ← Reemplaza 123 por el ID real del viaje si lo tienes */}
            </CardContent>
        </Card>
    )
}
