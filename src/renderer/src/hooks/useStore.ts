import { useEffect, useState } from 'react'

export function useStore<T>(key: string, initialValue: T) {
  const [storedValue, setStoredValue] = useState<T>(initialValue)
  const [isLoading, setIsLoading] = useState(true)

  // Load the value from Electron on mount
  useEffect(() => {
    const fetchStoredValue = async () => {
      try {
        const item = await window.api.store.get(key)
        if (item !== undefined) {
          setStoredValue(item as T)
        }
      } catch (error) {
        console.error(`Error loading ${key} from store`, error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchStoredValue()
  }, [key])

  // Create a setter function that updates React state AND Electron store
  const setValue = async (value: T) => {
    try {
      setStoredValue(value)
      await window.api.store.set(key, value)
    } catch (error) {
      console.error(`Error saving ${key} to store`, error)
    }
  }

  return [storedValue, setValue, isLoading] as const
}
