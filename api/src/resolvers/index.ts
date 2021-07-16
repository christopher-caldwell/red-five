import * as serverResolvers from './servers'

export const resolvers = {
  Query: {
    ...serverResolvers
  }
}
