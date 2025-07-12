import { Moon, Sun } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useDarkMode } from '@/context/useDarkMode'

export default function ThemeToggleButton() {
  const [darkMode, setDarkMode] = useDarkMode()

  return (
    <Button variant="ghost" onClick={() => setDarkMode(!darkMode)}>
      {darkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
    </Button>
  )
}
