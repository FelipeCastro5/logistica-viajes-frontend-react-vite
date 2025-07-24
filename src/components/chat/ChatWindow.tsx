import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { useState, useEffect, useRef } from "react"
import { useNavigate } from "react-router-dom"
import { getMensajesByChat } from "@/services/adapters/mensajes.adapter"
import { iaConversacionSimple } from "@/services/adapters/ia.adapter"
import { useAuth } from "@/hooks/useAuth"

interface Mensaje {
  id_mensaje: number
  fk_chat: number
  pregunta: string
  respuesta: string
  fecha: string
}

interface ChatWindowProps {
  chatId?: string
}

export default function ChatWindow({ chatId }: ChatWindowProps) {
  const { user } = useAuth()
  const [messages, setMessages] = useState<{ id: number; from: string; text: string }[]>([])
  const [input, setInput] = useState("")
  const [loading, setLoading] = useState(false)
  const [chatIdState, setChatIdState] = useState<number | null>(chatId ? Number(chatId) : null)

  const navigate = useNavigate()
  const scrollRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    const fetchMensajes = async () => {
      if (!chatId) {
        setMessages([
          {
            id: 1,
            from: "bot",
            text: "Hola, este es un nuevo chat. ¿En que te puedo ayudar hoy?",
          },
        ])
        return
      }

      const res = await getMensajesByChat(Number(chatId))
      if (res.status === 200) {
        const mappedMessages = res.data.flatMap((mensaje: Mensaje) => [
          {
            id: mensaje.id_mensaje * 2 - 1,
            from: "user",
            text: mensaje.pregunta,
          },
          {
            id: mensaje.id_mensaje * 2,
            from: "bot",
            text: mensaje.respuesta,
          },
        ])
        setMessages(mappedMessages)
      } else {
        setMessages([
          {
            id: 1,
            from: "bot",
            text: "No se pudieron cargar los mensajes.",
          },
        ])
      }
    }

    fetchMensajes()
  }, [chatId])

  // Scroll automático al final cuando cambia messages
  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages])

  const handleSend = async () => {
    if (!input.trim() || loading) return

    const pregunta = input.trim()
    setInput("")
    setLoading(true)

    const userMsg = {
      id: Date.now(),
      from: "user",
      text: pregunta,
    }

    setMessages((prev) => [...prev, userMsg])

    try {
      const res = await iaConversacionSimple(user.id_usuario, pregunta, chatIdState || 0)

      if (res.status === 200) {
        const { respuesta, chatId: newChatId } = res.data

        // Si es un nuevo chat, actualizamos el chatId local
        if (!chatIdState && newChatId) {
          setChatIdState(newChatId)
        }

        const botMsg = {
          id: Date.now() + 1,
          from: "bot",
          text: respuesta,
        }
        setMessages((prev) => [...prev, botMsg])
      } else {
        setMessages((prev) => [
          ...prev,
          { id: Date.now() + 1, from: "bot", text: "Ocurrió un error con la IA." },
        ])
      }
    } catch (err) {
      setMessages((prev) => [
        ...prev,
        { id: Date.now() + 1, from: "bot", text: "Error de red o del servidor." },
      ])
    } finally {
      setLoading(false)
    }
  }

  return (
    <Card className="w-full max-w-2xl h-[600px] flex flex-col">
      <CardContent className="flex flex-col p-4 h-full">
        <div className="flex-1 overflow-hidden">
          <ScrollArea className="h-full pr-2">
            <div className="flex flex-col space-y-4">
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`max-w-[75%] px-4 py-2 rounded-xl text-sm ${
                    msg.from === "user"
                      ? "bg-blue-600 text-white self-end text-right"
                      : "bg-gray-200 text-black self-start"
                  }`}
                >
                  {msg.text}
                </div>
              ))}
              <div ref={scrollRef} />
            </div>
          </ScrollArea>
        </div>

        <form
          onSubmit={(e) => {
            e.preventDefault()
            handleSend()
          }}
          className="mt-4 flex gap-2"
        >
          <Input
            placeholder="Escribe un mensaje..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="flex-1"
            disabled={loading}
          />
          <Button type="submit" disabled={loading}>
            {loading ? "..." : "Enviar"}
          </Button>
        </form>

        <Button
          onClick={() => navigate("/chat-bot")}
          className="bg-gray-600 hover:bg-gray-700 text-white mt-4"
        >
          VOLVER
        </Button>
      </CardContent>
    </Card>
  )
}
