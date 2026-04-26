import { ModeToggle } from '@/components/ModeToggle'
import { Sidebar } from '@/components/Sidebar'
import { TitleBar } from '@/components/TitleBar'

function App(): React.JSX.Element {
  return (
    <>
      <Sidebar />
      <div className="flex flex-col flex-1 w-full overflow-hidden">
        <TitleBar />
        <main className="flex flex-1 flex-col w-full h-full ">
          <ModeToggle />
          <br />
          <div className="bg-green-500">Hellow</div>
        </main>
      </div>
    </>
  )
}

export default App
