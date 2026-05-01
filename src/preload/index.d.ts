declare global {
  interface Window {
    electron: ElectronAPI
    api: {
      store: {
        get: () => Promise<string | null>
        set: (data: string) => Promise<void>
      }
      darkMode: {
        toggle: () => Promise<void>
        system: () => Promise<void>
      }
    }
  }
}

export {}
