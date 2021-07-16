import { stitchSchema } from '../utils'

import { MutationResultSchema } from './shared'
import { EmployeeMutations, EmployeeQueries, EmployeesSchema } from './employee'

const schemas = stitchSchema(EmployeesSchema, MutationResultSchema)
const queries = `#graphql
  type Query {
    ${stitchSchema(EmployeeQueries)}
  }
`
const mutations = `#graphql
  type Mutation {
    ${stitchSchema(EmployeeMutations)}
  }
`

export const schema = stitchSchema(schemas, queries, mutations)

export * from '../resolvers'