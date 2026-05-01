import { ModeToggle } from '@/components/ModeToggle'
import { Sidebar } from '@/components/Sidebar'
import { TitleBar } from '@/components/TitleBar'
import { Button } from '@/components/ui/button'

function App(): React.JSX.Element {
  return (
    <>
      <Sidebar />
      <div className="flex flex-col flex-1 w-full overflow-hidden">
        <TitleBar />
        <main className="p-2 flex flex-1 flex-col w-full h-full ">
          <ModeToggle />
          <br />
          <div className="flex items-center gap-2">
            <Button variant="secondary">Browse</Button>
            <Button>Connect</Button>
          </div>
        </main>
      </div>
    </>
  )
}

export default App
