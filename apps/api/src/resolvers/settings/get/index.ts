import { Resolver, Settings } from '@_api/interfaces'
import { createIfNotExists } from '@_api/db'

export const settings: Resolver<Settings> = async (_, { Client }) => {
  return createIfNotExists<Settings>(Client, '/settings', { willPromptBeforeDelete: true, willSaveCliOutput: false })
}
