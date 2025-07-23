import { useNavigate } from "react-router-dom"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Plus, Trash2 } from "lucide-react"
import PageContent from "@/components/layout/PageContent"
import { useChatListPage } from "@/hooks/chat/useChatListPage"

export default function ChatListPage() {
  const navigate = useNavigate()
  const {
    chats,
    editChatId,
    editChatName,
    setEditChatId,
    setEditChatName,
    startEditing,
    handleDelete,
    handleUpdate,
  } = useChatListPage()

  return (
    <PageContent>
      <div className="max-w-md mx-auto mt-4">
        <Button
          variant="default"
          size="sm"
          className="w-full flex items-center justify-center gap-2"
          onClick={() => navigate("/chat-bot/nuevo")}
        >
          <Plus className="w-4 h-4" />
          Nuevo Chat
        </Button>
      </div>

      <div className="grid gap-4 max-w-md mx-auto mt-6">
        {chats.map((chat) => (
          <Card key={chat.id_chat}>
            <CardContent className="p-4 flex justify-between items-center">
              {editChatId === chat.id_chat ? (
                <input
                  type="text"
                  className="border px-2 py-1 rounded"
                  value={editChatName}
                  onChange={(e) => setEditChatName(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleUpdate()}
                />
              ) : (
                <span className="font-medium">{chat.nombre_chat}</span>
              )}

              <div className="flex gap-2">
                <Button
                  size="sm"
                  variant="secondary"
                  onClick={() => navigate(`/chat-bot/${chat.id_chat}`)}
                >
                  Entrar
                </Button>

                {editChatId === chat.id_chat ? (
                  <>
                    <Button size="sm" variant="default" onClick={handleUpdate}>
                      Guardar
                    </Button>
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => {
                        setEditChatId(null)
                        setEditChatName("")
                      }}
                    >
                      Cancelar
                    </Button>
                  </>
                ) : (
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => startEditing(chat)}
                  >
                    Editar
                  </Button>
                )}

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
