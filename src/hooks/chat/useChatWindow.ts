// src/hooks/useChat.ts
import { useState, useEffect, useRef } from "react"
import { getMensajesByChat } from "@/services/adapters/mensajes.adapter"
import { iaInteligente } from "@/services/adapters/ia.adapter"
import { useAuth } from "../useAuth"


interface Mensaje {
  id_mensaje: number
  fk_chat: number
  pregunta: string
  respuesta: string
  fecha: string
}

export const useChat = (initialChatId?: string) => {
  const { user } = useAuth()
  const [messages, setMessages] = useState<{ id: number; from: string; text: string }[]>([])
  const [input, setInput] = useState("")
  const [loading, setLoading] = useState(false)
  const [chatId, setChatId] = useState<number | null>(initialChatId ? Number(initialChatId) : null)
  const [titulo, setTitulo] = useState("Nuevo chat")

  const scrollRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    const fetchMensajes = async () => {
      if (!initialChatId) {
        setMessages([
          {
            id: 1,
            from: "bot",
            text: "Hola, este es un nuevo chat. ¿En qué te puedo ayudar hoy?",
          },
        ])
        return
      }

      const res = await getMensajesByChat(Number(initialChatId))
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
  }, [initialChatId])

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
      const res = await iaInteligente(user.id_usuario, pregunta, chatId || 0)

      if (res.status === 200) {
        const { respuesta, chatId: newChatId, titulo: newTitulo } = res.data

        if (!chatId && newChatId) {
          setChatId(newChatId)
        }

        if (newTitulo) {
          setTitulo(newTitulo)
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

  return {
    messages,
    input,
    loading,
    titulo,
    scrollRef,
    setInput,
    handleSend,
  }
}
