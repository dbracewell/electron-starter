declare global {
  interface Window {
    electron: ElectronAPI
    api: {
      store: {
        get: <T>(key: string) => Promise<T>
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        set: (key: string, value: any) => Promise<void>
        has: (key: string) => Promise<boolean>
      }
      darkMode: {
        toggle: () => Promise<void>
        system: () => Promise<void>
      }
    }
  }
}

export {}
