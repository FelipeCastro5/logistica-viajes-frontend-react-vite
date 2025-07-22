// src/pages/ChatListPage.tsx
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { useLayoutTitle } from "@/context/LayoutTitleContext"
import PageContent from "@/components/layout/PageContent"
import { useAuth } from "@/hooks/useAuth"
import { deleteChat, getChatsByUsuario, type Chat } from "@/services/adapters/chats.adapter"
import { toast } from "sonner"
import { Trash2 } from "lucide-react"

export default function ChatListPage() {
  const { setTitle } = useLayoutTitle()
  const navigate = useNavigate()
  const { user } = useAuth()
  const [chats, setChats] = useState<Chat[]>([])

  useEffect(() => {
    setTitle("Chats Disponibles")
  }, [])

  useEffect(() => {
    const fetchChats = async () => {
      try {
        if (!user?.id_usuario) return
        const res = await getChatsByUsuario(user.id_usuario)
        if (res.status) {
          setChats(res.data || [])
        } else {
          toast.warning("No se encontraron chats.")
        }
      } catch (error) {
        console.error("Error al obtener los chats:", error)
        toast.error("Error al cargar los chats.")
      }
    }

    fetchChats()
  }, [user?.id_usuario])

  const handleDelete = async (chatId: number) => {
    if (!confirm("¿Estás seguro que deseas eliminar este chat?")) return

    try {
      const res = await deleteChat(chatId)
      if (res.status) {
        toast.success("✅ Chat eliminado correctamente")
        setChats((prev) => prev.filter((chat) => chat.id_chat !== chatId))
      } else {
        toast.error("❌ No se pudo eliminar el chat")
      }
    } catch (err) {
      console.error(err)
      toast.error("⚠️ Error al eliminar el chat")
    }
  }

  return (
    <PageContent title="Selecciona un Chat">
      <div className="grid gap-4 max-w-md mx-auto mt-6">
        {chats.map((chat) => (
          <Card key={chat.id_chat}>
            <CardContent className="p-4 flex justify-between items-center">
              <span className="font-medium">{chat.nombre_chat}</span>
              <div className="flex gap-2">
                <Button
                  size="sm"
                  variant="secondary"
                  onClick={() => navigate(`/chat-bot/${chat.id_chat}`)}
                >
                  Entrar
                </Button>
                <Button
                  size="sm"
                  variant="destructive"
                  onClick={() => handleDelete(chat.id_chat)}
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
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
