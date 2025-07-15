// GraficaIngresosVsGastos.tsx
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from "recharts"

const data = [
  { mes: "Ene", ingresos: 300000, gastos: 120000 },
  { mes: "Feb", ingresos: 250000, gastos: 110000 },
  { mes: "Mar", ingresos: 280000, gastos: 130000 },
  { mes: "Abr", ingresos: 320000, gastos: 140000 },
]

export default function GraficaIngresosVsGastos() {
  return (
    <div className="p-4 bg-white rounded-2xl shadow">
      <h2 className="text-lg font-semibold mb-2">Ingresos vs Gastos</h2>
      <AreaChart width={500} height={250} data={data}>
        <defs>
          <linearGradient id="colorIngresos" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#82ca9d" stopOpacity={0.8} />
            <stop offset="95%" stopColor="#82ca9d" stopOpacity={0} />
          </linearGradient>
          <linearGradient id="colorGastos" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8} />
            <stop offset="95%" stopColor="#8884d8" stopOpacity={0} />
          </linearGradient>
        </defs>
        <XAxis dataKey="mes" />
        <YAxis />
        <CartesianGrid strokeDasharray="3 3" />
        <Tooltip />
        <Legend />
        <Area
          type="monotone"
          dataKey="ingresos"
          stroke="#82ca9d"
          fillOpacity={1}
          fill="url(#colorIngresos)"
          name="Ingresos"
        />
        <Area
          type="monotone"
          dataKey="gastos"
          stroke="#8884d8"
          fillOpacity={1}
          fill="url(#colorGastos)"
          name="Gastos"
        />
      </AreaChart>
    </div>
  )
}
