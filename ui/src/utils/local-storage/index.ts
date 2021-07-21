export const writeToLocalStorage = <T>(key: string, payload: T): void => {
  localStorage.setItem(key, JSON.stringify(payload))
}

export const getItemFromLocalStorage = <T>(key: string): T | null => JSON.parse(localStorage.getItem(key) || 'null')

export const removeItemFromLocalStorage = (key: string): void => localStorage.removeItem(key)

export const pushToLocalStorageArray = <TData>(key: string, newItem: TData, createIfNotFound?: boolean): void => {
  const storedArray = getItemFromLocalStorage<TData[]>(key)
  if (!storedArray) {
    if (!createIfNotFound) throw new Error('No key found')
    writeToLocalStorage(key, [newItem])
    return
  }
  if (!Array.isArray(storedArray)) throw new Error('Given key is not an array')
  const updatedArray = [...storedArray, newItem]
  writeToLocalStorage(key, updatedArray)
}

export * from 'constants/localStorage'
