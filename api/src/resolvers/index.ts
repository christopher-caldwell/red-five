import * as connectionResolvers from './connections'
import * as keysResolvers from './keys'
import * as settingsResolvers from './settings'
import * as cliResolvers from './cli'
import { monitoringResolvers, monitoringSubscriptions } from './monitoring'

export const resolvers = {
  ...connectionResolvers,
  ...keysResolvers,
  ...settingsResolvers,
  ...cliResolvers,
  ...monitoringResolvers
}

export const subscription = {
  ...monitoringSubscriptions
}
