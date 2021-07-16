import { JsonDB } from 'node-json-db'

/** A standard mutation response.
 *
 * This is returned when the consumer doesn't need anything from the mutation, only a confirmation. */
export interface MutationResult {
  status: number
  message?: string
}

export type Resolver<ReturnType, Variables = Record<string, string>> = (
  variables: Variables,
  context: {
    Client: JsonDB
  }
) => Promise<ReturnType>

export * from './generated'
