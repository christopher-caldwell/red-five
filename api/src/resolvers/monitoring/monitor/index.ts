import { SubscriptionResolver } from '@/interfaces'

export const monitor: SubscriptionResolver<{ greetings: string }> = async function* ({}, { Client }) {
  console.log('running')
  for (const hi of ['Hi', 'Bonjour', 'Hola', 'Ciao', 'Zdravo']) {
    yield { greetings: hi }
  }
}
