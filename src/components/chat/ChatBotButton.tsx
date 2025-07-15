import { useNavigate } from "react-router-dom"
import { MessageCircle } from "lucide-react" // o cualquier ícono
import { Button } from "@/components/ui/button"

export default function ChatBotButton() {
  const navigate = useNavigate()

  return (
    <Button
      onClick={() => navigate("/chat-bot")}
      className="fixed bottom-6 right-6 w-14 h-14 rounded-full bg-blue-600 hover:bg-blue-700 shadow-lg text-white p-0"
    >
      <MessageCircle className="w-6 h-6" />
    </Button>
  )
}
