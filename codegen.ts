import { CodegenConfig } from '@graphql-codegen/cli'

const config: CodegenConfig = {
  overwrite: true,
  schema: 'http://localhost:5001/graphql',
  // documents: ['**/*.graphql'],
  config: {
    sort: false,
    skipTypename: true,
    scalars: {
      Date: 'string',
      // TODO: Figure out these types
      DateTime: 'Date',
      JSON: 'any',
      JSONObject: 'any',
      PrismicDateTime: 'any',
      PrismicJson: 'any',
      PrismicLong: 'any',
      Time: 'any',
      UUID: 'string | Buffer',
      Upload: 'any'
    }
  },
  generates: {
    'packages/shared-types/src/api.ts': {
      plugins: ['typescript', 'typescript-operations'],
      config: {
        wrapEntireFieldDefinitions: true,
        entireFieldWrapperValue: 'T | (() => T | Promise<T>)'
      }
    },
    'packages/shared-types/src/ui.ts': {
      plugins: ['typescript', 'typescript-operations', 'typescript-react-query'],
      config: {
        fetcher: './client#runQuery',
        exposeQueryKeys: true,
        legacyMode: false,
        scalars: {
          UUID: 'string'
        }
      }
    }
  }
}

export default config
