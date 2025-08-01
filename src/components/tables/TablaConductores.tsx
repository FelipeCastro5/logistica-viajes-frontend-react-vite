"use client"

import { useEffect, useState } from "react"
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
import { getConductoresByFilter } from "@/services/adapters/usuario.adapter"

interface Conductor {
  id_usuario: number
  nombre_documento: string | null
  abreviatura: string | null
  num_doc: string
  p_nombre: string
  s_nombre: string
  p_apellido: string
  s_apellido: string
  telefono: string
  correo: string
  estado_usuario: boolean
  nombre_rol: string
}

interface TablaConductoresProps {
  onSelectConductor?: (id: number) => void
}

export default function TablaConductores({ onSelectConductor }: TablaConductoresProps) {
  const [conductores, setConductores] = useState<Conductor[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getConductoresByFilter("", 1, 10)
        setConductores(response.data.logs)
      } catch (error) {
        console.error("Error al cargar conductores", error)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [])

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
                <TableHead className="text-center">Acciones</TableHead>
                <TableHead>Tipo Doc</TableHead>
                <TableHead>Num Doc</TableHead>
                <TableHead>Nombre</TableHead>
                <TableHead>Apellido</TableHead>
                <TableHead>Teléfono</TableHead>
                <TableHead>Correo</TableHead>
                <TableHead>Estado</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {loading ? (
                <TableRow>
                  <TableCell colSpan={8} className="text-center py-4">
                    Cargando conductores...
                  </TableCell>
                </TableRow>
              ) : conductores.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={8} className="text-center py-4">
                    No se encontraron conductores.
                  </TableCell>
                </TableRow>
              ) : (
                conductores.map((c) => (
                  <TableRow key={c.id_usuario}>
                    <TableCell className="text-center">
                      <Button
                        size="sm"
                        variant="secondary"
                        onClick={() => onSelectConductor?.(c.id_usuario)}
                      >
                        Ver
                      </Button>
                    </TableCell>
                    <TableCell>{c.abreviatura || "N/A"}</TableCell>
                    <TableCell>{c.num_doc}</TableCell>
                    <TableCell>{`${c.p_nombre} ${c.s_nombre || ""}`}</TableCell>
                    <TableCell>{`${c.p_apellido} ${c.s_apellido || ""}`}</TableCell>
                    <TableCell>{c.telefono}</TableCell>
                    <TableCell>{c.correo}</TableCell>
                    <TableCell>
                      <span
                        className={c.estado_usuario
                          ? "text-green-600 font-medium text-sm"
                          : "text-red-500 font-medium text-sm"}
                      >
                        {c.estado_usuario ? "Activo" : "Inactivo"}
                      </span>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  )
}
