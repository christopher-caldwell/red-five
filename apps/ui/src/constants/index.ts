export const GRAPHQL_ENDPOINT = process.env['NX_GRAPHQL_ENDPOINT'] as string
export const GRAPHQL_WEB_SOCKET_ENDPOINT = process.env['NX_GRAPHQL_WEB_SOCKET_ENDPOINT'] as string

if (!GRAPHQL_ENDPOINT) throw new Error('Cannot find GRAPHQL_ENDPOINT in the env')
if (!GRAPHQL_WEB_SOCKET_ENDPOINT) throw new Error('Cannot find GRAPHQL_WEB_SOCKET_ENDPOINT in the env')

export * from './styles'
export * from './theme'
export * from './links'
