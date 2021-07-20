import { stitchSchema } from '@/utils'

// namespaces separated by `:`
const SettingsSchema = `#graphql
  type Settings {
    willPromptBeforeDelete: Boolean!
  }
  input SettingsInput {
    willPromptBeforeDelete: Boolean!
  }
`

export const SettingsQueries = `#graphql
settings: Settings!
`

export const SettingsMutations = `#graphql
setSettings(settings: SettingsInput!): MutationResult
`

export const FinalSettingsSchema = stitchSchema(SettingsSchema)
