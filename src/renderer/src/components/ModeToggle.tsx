import { useTheme } from '@/components/ThemeProvider'
import { Button } from '@/components/ui/button'

export function ModeToggle() {
  const { theme, setTheme } = useTheme()

  const handleToggle = () => {
    const nextTheme = theme === 'light' ? 'dark' : 'light'
    setTheme(nextTheme)
    window.api.darkMode.toggle()
  }

  return (
    <Button onClick={handleToggle} variant="outline">
      Toggle Theme (Current: {theme})
    </Button>
  )
}
