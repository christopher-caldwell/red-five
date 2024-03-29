import os from 'os'
import adze from 'adze'
import { resolve } from 'path'
import { existsSync, ensureFileSync, writeFileSync, readFileSync } from 'fs-extra'
import { JsonDB } from 'node-json-db'
import { Config } from 'node-json-db/dist/lib/JsonDBConfig'

import { AppConfig } from '@_api/interfaces'
import { validateAppConfig } from './configValidation'
import { mapExistingConnections, mapExistingMonitoredConnection } from './mapExistingConnections'

const pathToConfig = resolve(os.homedir(), '.redfive', 'config.json')
const doesHaveExistingConfig = existsSync(pathToConfig)

const logger = adze().label('configurationLoader')
export const loadConfig = async () => {
  if (!doesHaveExistingConfig) {
    logger.info('No config, writing one')
    ensureFileSync(pathToConfig)
    writeFileSync(pathToConfig, JSON.stringify({ connections: [] }))
  }
  const existingConfig = JSON.parse(readFileSync(pathToConfig).toString()) as AppConfig
  validateAppConfig(existingConfig)
  mapExistingConnections(existingConfig)
  // TODO: Check if this fallback is valid
  await mapExistingMonitoredConnection(existingConfig.isMonitoring || { isMonitoring: false, activeConnectionId: '' })
  return new JsonDB(new Config(pathToConfig, true, false, '/'))
}

export * from './utils'
