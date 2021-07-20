export const writeToLocalStorage = <T>(key: string, payload: T): void => {
  localStorage.setItem(key, JSON.stringify(payload))
}

export const getItemFromLocalStorage = <T>(key: string): T | null => JSON.parse(localStorage.getItem(key) || 'null')

export const removeItemFromLocalStorage = (key: string): void => localStorage.removeItem(key)

export * from 'constants/localStorage'
