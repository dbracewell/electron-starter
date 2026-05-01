import { create, StoreApi, UseBoundStore } from 'zustand'
import { createJSONStorage, persist, StateStorage } from 'zustand/middleware'

type WithSelectors<S> = S extends { getState: () => infer T }
  ? S & { use: { [K in keyof T]: () => T[K] } }
  : never

const createSelectors = <S extends UseBoundStore<StoreApi<object>>>(_store: S) => {
  const store = _store as WithSelectors<typeof _store>
  store.use = {}
  for (const k of Object.keys(store.getState())) {
    ;(store.use as any)[k] = () => store((s) => s[k as keyof typeof s])
  }

  return store
}

const storage: StateStorage = {
  getItem: async (): Promise<string | null> => {
    return await window.api.store.get()
  },
  setItem: async (_name, value): Promise<void> => {
    await window.api.store.set(value)
  },
  removeItem: async (_: string) => {}
}

interface AppSettings {
  sidebarWidth: number
  sidebarVisible: boolean
  setSidebarWidth: (width: number) => void
  setSidebarVisible: (visible: boolean) => void
}

const useAppSettingsBase = create<AppSettings>()(
  persist(
    (set) => ({
      sidebarWidth: 300,
      sidebarVisible: true,
      setSidebarVisible: (visible) => set(() => ({ sidebarVisible: visible })),
      setSidebarWidth: (width) => set(() => ({ sidebarWidth: width }))
    }),
    {
      name: '<APP_NAME>',
      storage: createJSONStorage(() => storage)
    }
  )
)

export const useAppSettings = createSelectors(useAppSettingsBase)
