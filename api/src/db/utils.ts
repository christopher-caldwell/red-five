import { JsonDB } from 'node-json-db'

export const findById = <TData>(Client: JsonDB, id: string, searchPath: string, key: string = 'id'): TData => {
  const index = Client.getIndex(searchPath, id, key)
  if (index < 0) throw new Error('Not found')
  const item = Client.getObject<TData>(`${searchPath}[${index}]`)
  return item
}
