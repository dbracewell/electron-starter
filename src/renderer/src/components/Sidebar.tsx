import { useStore } from '@/hooks/useStore'
import { useCallback, useEffect, useState } from 'react'

export const Sidebar = (): React.JSX.Element => {
  const [savedWidth, setSavedWidth] = useStore('sidebar:width', 300)
  const [sideBarVisible] = useStore('sidebar:visible', true)

  const [isResizing, setIsResizing] = useState(false)
  const [localWidth, setLocalWidth] = useState(300)

  useEffect(() => {
    if (savedWidth) setLocalWidth(savedWidth)
  }, [savedWidth])

  const startResizing = useCallback(() => {
    setIsResizing(true)
  }, [])

  const stopResizing = useCallback(() => {
    if (isResizing) {
      setIsResizing(false)
      setSavedWidth(localWidth) // Persist the final result
    }
  }, [isResizing, localWidth, setSavedWidth])

  const resize = useCallback(
    (e: MouseEvent) => {
      if (isResizing) {
        // Constraints: 200px to 450px
        const newWidth = Math.min(Math.max(e.clientX, 200), 450)
        setLocalWidth(newWidth)
      }
    },
    [isResizing]
  )

  useEffect(() => {
    if (isResizing) {
      window.addEventListener('mousemove', resize)
      window.addEventListener('mouseup', stopResizing)
    }
    return () => {
      window.removeEventListener('mousemove', resize)
      window.removeEventListener('mouseup', stopResizing)
    }
  }, [isResizing, resize, stopResizing])

  if (!sideBarVisible) return <></>

  return (
    <div
      className={`flex pt-1.5 pb-1.5 pl-1.5 group relative ${
        isResizing ? 'transition-none select-none' : 'transition-all duration-150'
      }`}
      id="sidebar"
      style={{ width: `${localWidth}px` }}
    >
      <div className="flex-1 pt-8 border-r border-border flex flex-col p-2 rounded-xl bg-sidebar/10 backdrop-blur-xl border">
        {/* Sidebar Content */}
      </div>

      <div
        className={`w-1.5 absolute top-0 right-0 bottom-0 cursor-col-resize hover:bg-primary/30 transition-colors ${
          isResizing ? 'bg-primary' : 'bg-transparent'
        }`}
        onMouseDown={startResizing}
      />
    </div>
  )
}
