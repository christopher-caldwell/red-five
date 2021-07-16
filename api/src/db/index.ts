import os from 'os'
import { resolve } from 'path'
import { existsSync, ensureFileSync, writeFileSync } from 'fs-extra'
import { JsonDB } from 'node-json-db'
import { Config } from 'node-json-db/dist/lib/JsonDBConfig'

import { logger } from '@/utils'

const pathToConfig = resolve(os.homedir(), '.redfive', 'config.json')
const doesHaveExistingConfig = existsSync(pathToConfig)

export const loadConfig = () => {
  if (!doesHaveExistingConfig) {
    logger.info('No config, writing one')
    ensureFileSync(pathToConfig)
    writeFileSync(pathToConfig, JSON.stringify({ connections: [] }))
  }
  return new JsonDB(new Config(pathToConfig, true, false, '/'))
}

export * from './utils'
