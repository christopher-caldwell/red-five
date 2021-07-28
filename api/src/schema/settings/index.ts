import { stitchSchema } from '@/utils'

const SettingsSchema = `#graphql
  type Settings {
    willPromptBeforeDelete: Boolean!
    willSaveCliOutput: Boolean!
    cliWipeBehavior: String!
    cliMessagePersistLimit: Float!
    keysRefreshInterval: Float!
  }
  input SettingsInput {
    willPromptBeforeDelete: Boolean!
    willSaveCliOutput: Boolean!
    cliWipeBehavior: String!
    cliMessagePersistLimit: Float!
    keysRefreshInterval: Float!
  }
`

export const SettingsQueries = `#graphql
settings: Settings!
`

export const SettingsMutations = `#graphql
setSettings(settings: SettingsInput!): MutationResult
`

export const FinalSettingsSchema = stitchSchema(SettingsSchema)
