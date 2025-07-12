import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"

interface ChatWindowProps {
  chatId?: string
}

export default function ChatWindow({ chatId }: ChatWindowProps) {
  const [messages, setMessages] = useState<{ id: number; from: string; text: string }[]>([])
  const [input, setInput] = useState("")
  const navigate = useNavigate()

  useEffect(() => {
    // Simula carga de mensajes previos
    setMessages([
      { id: 1, from: "bot", text: `Hola, bienvenido al chat de ${chatId}` },
    ])
  }, [chatId])

  const handleSend = () => {
    if (!input.trim()) return
    setMessages([...messages, { id: Date.now(), from: "user", text: input }])
    setInput("")
  }

  return (
    <Card className="w-full max-w-2xl h-[600px] flex flex-col">
      <CardContent className="flex flex-col flex-1 p-4">
        <ScrollArea className="flex-1 overflow-y-auto pr-2 space-y-4">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`max-w-[75%] px-4 py-2 rounded-xl text-sm ${msg.from === "user"
                  ? "bg-blue-600 text-white self-end"
                  : "bg-gray-200 text-black self-start"
                }`}
            >
              {msg.text}
            </div>
          ))}
        </ScrollArea>

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
          />
          <Button type="submit">Enviar</Button>
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
