import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";

export default function TablaDetalleViaje() {
  const navigate = useNavigate();

  return (
    <Card className="shadow-md border rounded-lg overflow-x-auto bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-100">
      <CardContent className="p-6">
        <table className="w-full text-sm border border-gray-300 dark:border-gray-700">
          <tbody>
            {/* VIAJE */}
            <Section title="Datos del Viaje" />
            <Row label="Código" value="VJ-001" />
            <Row label="Producto" value="Carga general" />
            <Row label="Detalle Producto" value="Cajas con repuestos" />
            <Row label="Dirección de llegada" value="Cra 10 #25-30, Bogotá" />
            <Row label="Fecha salida" value="2025-07-10" />
            <Row label="Fecha llegada" value="2025-07-11" />
            <Row label="Observaciones" value="Sin novedades" />
            <Row label="Estado del viaje" value="Activo" />

            {/* CLIENTE */}
            <Section title="Datos del Cliente" />
            <Row label="Nombre" value="Transporte Rápido S.A.S." />
            <Row label="NIT" value="900123456-7" />
            <Row label="Teléfono" value="3101234567" />

            {/* MANIFIESTO */}
            <Section title="Manifiesto" />
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

        <div className="mt-6 flex justify-center">
          <Button
            onClick={() => navigate("/viaje")}
            className="bg-gray-700 hover:bg-gray-800 text-white"
          >
            VOLVER
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <tr className="border-t border-gray-200 dark:border-gray-700">
      <td className="p-3 font-medium text-gray-700 dark:text-gray-300 w-1/3">{label}</td>
      <td className="p-3 text-gray-900 dark:text-gray-100">{value}</td>
    </tr>
  );
}

function Section({ title }: { title: string }) {
  return (
    <tr className="bg-gray-100 dark:bg-gray-800">
      <th colSpan={2} className="p-3 text-left font-semibold text-gray-700 dark:text-gray-200">
        {title}
      </th>
    </tr>
  );
}
