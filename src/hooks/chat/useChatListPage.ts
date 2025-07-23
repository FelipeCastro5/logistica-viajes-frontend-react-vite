import { useEffect, useState } from "react"
import { useAuth } from "@/hooks/useAuth"
import { useLayoutTitle } from "@/context/LayoutTitleContext"
import { deleteChat, getChatsByUsuario, updateChat, type Chat } from "@/services/adapters/chats.adapter"
import { toast } from "sonner"

export function useChatListPage() {
  const { user } = useAuth()
  const { setTitle } = useLayoutTitle()

  const [chats, setChats] = useState<Chat[]>([])
  const [editChatId, setEditChatId] = useState<number | null>(null)
  const [editChatName, setEditChatName] = useState<string>("")

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

  const startEditing = (chat: Chat) => {
    setEditChatId(chat.id_chat)
    setEditChatName(chat.nombre_chat)
  }

  const handleUpdate = async () => {
    if (!editChatId || !user?.id_usuario) return

    try {
      const res = await updateChat({
        id_chat: editChatId,
        fk_usuario: user.id_usuario,
        nombre_chat: editChatName,
      })

      if (res.status) {
        toast.success("✅ Chat actualizado")
        setChats((prev) =>
          prev.map((chat) =>
            chat.id_chat === editChatId
              ? { ...chat, nombre_chat: editChatName }
              : chat
          )
        )
        setEditChatId(null)
        setEditChatName("")
      } else {
        toast.error("❌ No se pudo actualizar el chat")
      }
    } catch (err) {
      console.error(err)
      toast.error("⚠️ Error al actualizar el chat")
    }
  }

  return {
    chats,
    editChatId,
    editChatName,
    setEditChatId,
    setEditChatName,
    startEditing,
    handleDelete,
    handleUpdate,
  }
}
