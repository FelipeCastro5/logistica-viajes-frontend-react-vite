import { useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { useLayoutTitle } from "@/context/LayoutTitleContext"
import PageContent from "@/components/layout/PageContent"

const mockChats = [
  { id: "soporte", nombre: "Soporte Técnico" },
  { id: "logistica", nombre: "Logística" },
  { id: "facturacion", nombre: "Facturación" },
]

export default function ChatListPage() {
  const { setTitle } = useLayoutTitle()
  const navigate = useNavigate()

  useEffect(() => {
    setTitle("Chats Disponibles")
  }, [])

  return (
    <PageContent title="Selecciona un Chat">
      <div className="grid gap-4 max-w-md mx-auto mt-6">
        {mockChats.map((chat) => (
          <Card key={chat.id}>
            <CardContent className="p-4 flex justify-between items-center">
              <span className="font-medium">{chat.nombre}</span>
              <Button onClick={() => navigate(`/chat-bot/${chat.id}`)}>Entrar</Button>
            </CardContent>
          </Card>
        ))}
        <Button
          onClick={() => navigate("/menu-principal")}
          className="bg-gray-600 hover:bg-gray-700 text-white mt-4"
        >
          VOLVER
        </Button>
      </div>
    </PageContent>
  )
}
