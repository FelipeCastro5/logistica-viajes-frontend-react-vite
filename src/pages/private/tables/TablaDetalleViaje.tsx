import { Card, CardContent } from "@/components/ui/card"

export default function TablaDetalleViaje() {
  return (
    <Card className="shadow-md border rounded-lg overflow-x-auto">
      <CardContent className="p-4">
        <h2 className="text-xl font-semibold mb-4">Detalle del Viaje</h2>

        <table className="min-w-full text-sm text-left border border-gray-200">
          <tbody>
            {/* VIAJE */}
            <tr className="bg-gray-100">
              <th colSpan={2} className="p-2 font-medium text-gray-700">Datos del Viaje</th>
            </tr>
            <Row label="Código" value="VJ-001" />
            <Row label="Producto" value="Carga general" />
            <Row label="Detalle Producto" value="Cajas con repuestos" />
            <Row label="Dirección de llegada" value="Cra 10 #25-30, Bogotá" />
            <Row label="Fecha salida" value="2025-07-10" />
            <Row label="Fecha llegada" value="2025-07-11" />
            <Row label="Observaciones" value="Sin novedades" />
            <Row label="Estado del viaje" value="Activo" />

            {/* CLIENTE */}
            <tr className="bg-gray-100">
              <th colSpan={2} className="p-2 font-medium text-gray-700">Datos del Cliente</th>
            </tr>
            <Row label="Nombre" value="Transporte Rápido S.A.S." />
            <Row label="NIT" value="900123456-7" />
            <Row label="Teléfono" value="3101234567" />

            {/* MANIFIESTO */}
            <tr className="bg-gray-100">
              <th colSpan={2} className="p-2 font-medium text-gray-700">Manifiesto</th>
            </tr>
            <Row label="Flete total" value="$5,000,000" />
            <Row label="Retención fuente (%)" value="1.50%" />
            <Row label="Valor retención fuente" value="$75,000" />
            <Row label="ICA (%)" value="0.414%" />
            <Row label="Valor ICA" value="$20,700" />
            <Row label="Deducción fiscal" value="$30,000" />
            <Row label="Neto a pagar" value="$4,874,300" />
            <Row label="Anticipo" value="$2,000,000" />
            <Row label="Saldo a pagar" value="$2,874,300" />
            <Row label="Total gastos" value="$800,000" />
            <Row label="Queda al carro" value="$500,000" />
            <Row label="A favor del carro" value="$100,000" />
            <Row label="Porcentaje conductor" value="40%" />
            <Row label="Ganancia conductor" value="$1,949,720" />
          </tbody>
        </table>
      </CardContent>
    </Card>
  )
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <tr className="border-t border-gray-200">
      <td className="p-2 font-medium text-gray-600 w-1/3">{label}</td>
      <td className="p-2 text-gray-800">{value}</td>
    </tr>
  )
}
