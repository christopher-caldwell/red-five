import joi from 'joi'

import { AppConfig, Connection, MonitoringStatus, Settings } from '@_api/interfaces'

const ConnectionSchema = joi.object<Connection>().keys({
  host: joi.string().hostname().required(),
  port: joi.number().port().required(),
  name: joi.string().required(),
  password: joi.string(),
  protocol: joi.string().required(),
  id: joi.string().required(),
  isActive: joi.boolean()
})

const SettingsSchema = joi.object<Settings>().keys({
  willPromptBeforeDelete: joi.bool().required(),
  willSaveCliOutput: joi.bool().required()
})

const MonitoringSchema = joi.object<MonitoringStatus>().keys({
  isMonitoring: joi.boolean().required(),
  activeConnectionId: joi.string().uuid().required()
})

const AppConfigSchema = joi.object<AppConfig>().keys({
  connections: joi.array().items(ConnectionSchema),
  activeConnection: joi.string().allow(''),
  settings: SettingsSchema.default(() => ({})),
  isMonitoring: MonitoringSchema
})

const findDuplicateIds = (arr: AppConfig['connections']) => arr.filter((item, index) => arr.indexOf(item) != index)
const checkForDuplicateIds = (connections: AppConfig['connections']): void => {
  const duplicates = findDuplicateIds(connections)
  if (duplicates.length) throw new Error('Duplicate connection IDs detected. Each ID must be unique - duh')
}

export const validateAppConfig = (appConfig: AppConfig) => {
  const { connections } = appConfig
  if (!connections) throw new Error('Config is malformed. Expected object with key `connections`')
  // It's okay to not have any connections
  if (!connections.length) return

  // Pre-existing connections, whether it's hand made or from using the app.
  const { error } = AppConfigSchema.validate(appConfig)
  if (error) throw new Error(`Config is malformed. Message: ${error.message}`)
  checkForDuplicateIds(connections)
}
