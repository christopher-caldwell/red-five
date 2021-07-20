import * as connectionResolvers from './connections'
import * as keysResolvers from './keys'
import * as settingsResolvers from './settings'

export const resolvers = {
  ...connectionResolvers,
  ...keysResolvers,
  ...settingsResolvers
}
