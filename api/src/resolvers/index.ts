import * as connectionResolvers from './connections'
import * as keysResolvers from './keys'

export const resolvers = {
  ...connectionResolvers,
  ...keysResolvers
}
