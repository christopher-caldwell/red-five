/// <reference types="react-scripts" />

interface ImportMetaEnv extends Readonly<Record<string, string>> {
  readonly VITE_GRAPHQL_WEB_SOCKET_ENDPOINT: string
  readonly VITE_GRAPHQL_ENDPOINT: string
}
