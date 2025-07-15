// GraficaGastosPorTipo.tsx
import { PieChart, Pie, Cell, Tooltip, Legend } from "recharts"

const data = [
  { name: "Combustible", value: 120000 },
  { name: "Peajes", value: 80000 },
  { name: "Mantenimiento", value: 40000 },
  { name: "Alimentación", value: 30000 },
]

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"]

export default function GraficaGastosPorTipo() {
  return (
    <div className="p-4 bg-white rounded-2xl shadow">
      <h2 className="text-lg font-semibold mb-2">Gastos por tipo</h2>
      <PieChart width={350} height={250}>
        <Pie
          data={data}
          cx="50%"
          cy="50%"
          outerRadius={80}
          label
          dataKey="value"
        >
          {data.map((_, index) => (
            <Cell key={index} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip />
        <Legend />
      </PieChart>
    </div>
  )
}
