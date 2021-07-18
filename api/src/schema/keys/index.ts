import { stitchSchema } from '@/utils'

// namespaces separated by `:`
const KeySchema = `#graphql
  type Key {
    key: String!
    value: String!
    type: String!
    ttl: Int!
  }
  input KeyInput {
    key: String!
    value: String!
    type: String!
    ttl: Int!
  }
  type NameSpacedKeys {
    name: String!
    keys: [Key]!
  }
  type NamespaceKeyResult {
    allKeys: [Key]!
    namespaced: [NameSpacedKeys]!
  }

`

export const KeyQueries = `#graphql
key(id: String!): Key!
keys(limit: Int, startPosition: Int): [Key]!
namespacedKeys: NamespaceKeyResult!
`

export const KeyMutations = `#graphql
createKeyEntry(entry: KeyInput!): MutationResult
removeKey(key: String!): MutationResult
`

export const KeysSchema = stitchSchema(KeySchema)
