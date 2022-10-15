import { Resolver } from '@_api/interfaces'
import { MutationResult, SettingsInput } from '@_api-types'

export const setSettings: Resolver<MutationResult, SetSettingsArgs> = async ({ settings }, { Client }) => {
  Client.push('/settings', settings)
  return {
    status: 200
  }
}

export interface SetSettingsArgs {
  settings: SettingsInput
}
