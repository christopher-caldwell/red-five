import { stitchSchema } from '@/utils'

export const CliSchema = stitchSchema(`#graphql
  type CliResponse {
    time: Float!
    message: String
    command: String!
    isError: Boolean
  }
`)

export const CliMutations = `#graphql
sendCliCommand(command: String!): CliResponse
`
