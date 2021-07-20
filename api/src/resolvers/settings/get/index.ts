import { Resolver, Settings } from '@/interfaces'
import { createIfNotExists } from '@/db'

export const settings: Resolver<Settings> = async ({}, { Client }) => {
  return createIfNotExists<Settings>(Client, '/settings', { willPromptBeforeDelete: true })
}
