// GraficaGastosPorViaje.tsx
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from "recharts"

const data = [
  { codigo: "VJ001", total_gastos: 120000 },
  { codigo: "VJ002", total_gastos: 95000 },
  { codigo: "VJ003", total_gastos: 110000 },
  { codigo: "VJ004", total_gastos: 130000 },
]

export default function GraficaGastosPorViaje() {
  return (
    <div className="p-4 bg-white rounded-2xl shadow">
      <h2 className="text-lg font-semibold mb-2">Gastos por viaje</h2>
      <BarChart width={500} height={250} data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="codigo" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="total_gastos" fill="#8884d8" name="Total Gastos" />
      </BarChart>
    </div>
  )
}
