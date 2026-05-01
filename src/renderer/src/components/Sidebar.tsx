import { useAppSettings } from '@/hooks/useStore'
import { cn } from '@/lib/utils'
import { useCallback, useEffect, useState } from 'react'

export const Sidebar = (): React.JSX.Element => {
  const sidebarWidth = useAppSettings.use.sidebarWidth()
  const setSidebarWidth = useAppSettings.use.setSidebarWidth()
  const sideBarVisible = useAppSettings.use.sidebarVisible()

  const [isResizing, setIsResizing] = useState(false)
  const [localWidth, setLocalWidth] = useState(300)

  useEffect(() => {
    if (sidebarWidth) setLocalWidth(sidebarWidth)
  }, [sidebarWidth])

  const startResizing = useCallback(() => {
    setIsResizing(true)
  }, [])

  const stopResizing = useCallback(() => {
    if (isResizing) {
      setIsResizing(false)
      setSidebarWidth(localWidth) // Persist the final result
    }
  }, [isResizing, localWidth, setSidebarWidth])

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
      className={cn(
        'flex pt-1.5 pb-1.5 pl-1.5 group relative ',
        isResizing ? 'transition-none select-none' : 'transition-all duration-150'
      )}
      id="sidebar"
      style={{ width: `${localWidth}px` }}
    >
      <div className="flex-1 pt-8 rounded-[1em] flex flex-col p-2 bg-sidebar/30 backdrop-blur-xl border-2">
        {/* Sidebar Content */}
      </div>

      <div
        className="w-1.5 absolute top-0 right-0 bottom-0 cursor-col-resize"
        onMouseDown={startResizing}
      />
    </div>
  )
}
