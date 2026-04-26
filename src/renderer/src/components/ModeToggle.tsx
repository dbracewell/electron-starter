import { useTheme } from '@/components/ThemeProvider'
import { Button } from '@/components/ui/button'

export function ModeToggle() {
  const { theme, setTheme } = useTheme()

  const handleToggle = () => {
    // Determine the next theme
    const nextTheme = theme === 'light' ? 'dark' : 'light'

    // Update React & DOM
    setTheme(nextTheme)

    // Trigger the Electron API you created
    window.api.darkMode.toggle()
  }

  return (
    <Button onClick={handleToggle} variant="outline">
      Toggle Theme (Current: {theme})
    </Button>
  )
}
