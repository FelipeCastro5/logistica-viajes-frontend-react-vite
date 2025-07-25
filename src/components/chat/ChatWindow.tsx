import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { useNavigate } from "react-router-dom"
import { useChat } from "@/hooks/chat/useChatWindow"


interface ChatWindowProps {
  chatId?: string
}

export default function ChatWindow({ chatId }: ChatWindowProps) {
  const { messages, input, loading, titulo, scrollRef, setInput, handleSend, } = useChat(chatId)

  const navigate = useNavigate()

  return (
    <Card className="w-full max-w-2xl h-[600px] flex flex-col">
      <CardContent className="flex flex-col p-4 h-full">
        <h2 className="text-lg font-semibold mb-2 text-center">{titulo}</h2>

        <div className="flex-1 overflow-hidden">
          <ScrollArea className="h-full pr-2">
            <div className="flex flex-col space-y-4">
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`max-w-[75%] px-4 py-2 rounded-xl text-sm ${msg.from === "user"
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
