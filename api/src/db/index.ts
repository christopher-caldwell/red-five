import os from 'os'
import { resolve } from 'path'
import { existsSync, ensureFileSync, writeFileSync, readFileSync } from 'fs-extra'
import { JsonDB } from 'node-json-db'
import { Config } from 'node-json-db/dist/lib/JsonDBConfig'

import { AppConfig } from '@/interfaces'
import { logger } from '@/utils'
import { validateAppConfig } from './configValidation'
import { mapExistingConnections, mapExistingMonitoredConnection } from './mapExistingConnections'

const pathToConfig = resolve(os.homedir(), '.redfive', 'config.json')
const doesHaveExistingConfig = existsSync(pathToConfig)

export const loadConfig = async () => {
  if (!doesHaveExistingConfig) {
    logger.info('No config, writing one')
    ensureFileSync(pathToConfig)
    writeFileSync(pathToConfig, JSON.stringify({ connections: [] }))
  }
  const existingConfig = JSON.parse(readFileSync(pathToConfig).toString()) as AppConfig
  validateAppConfig(existingConfig)
  mapExistingConnections(existingConfig)
  await mapExistingMonitoredConnection(existingConfig.isMonitoring)
  return new JsonDB(new Config(pathToConfig, true, false, '/'))
}

export * from './utils'
