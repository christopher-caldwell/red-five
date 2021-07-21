import * as connectionResolvers from './connections'
import * as keysResolvers from './keys'
import * as settingsResolvers from './settings'
import * as cliResolvers from './cli'
import * as monitoringResolvers from './monitoring'

export const resolvers = {
  ...connectionResolvers,
  ...keysResolvers,
  ...settingsResolvers,
  ...cliResolvers,
  ...monitoringResolvers
}

const waitForMs = (ms: number) => new Promise(resolve => setTimeout(resolve, ms))

export const subscription = {
  greetings: async function* sayHiIn5Languages() {
    for (const hi of ['Hi', 'Bonjour', 'Hola', 'Ciao', 'Zdravo']) {
      await waitForMs(2000)
      yield { greetings: hi }
    }
  }
}
