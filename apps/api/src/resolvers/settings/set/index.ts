import { MutationResult, Resolver, SettingsInput } from '@_api/interfaces'

export const setSettings: Resolver<MutationResult, SetSettingsArgs> = async ({ settings }, { Client }) => {
  Client.push('/settings', settings)
  return {
    status: 200
  }
}

export interface SetSettingsArgs {
  settings: SettingsInput
}
