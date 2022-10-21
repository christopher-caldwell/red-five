import { useMutation, useQuery, UseMutationOptions, UseQueryOptions } from '@tanstack/react-query'
import { runQuery } from './client'
export type Maybe<T> = T | null
export type InputMaybe<T> = Maybe<T>
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] }
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> }
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> }
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string
  String: string
  Boolean: boolean
  Int: number
  Float: number
}

export type Connection = {
  name: Scalars['String']
  id: Scalars['String']
  host: Scalars['String']
  port: Scalars['Int']
  protocol: Scalars['String']
  password?: Maybe<Scalars['String']>
  isActive: Scalars['Boolean']
}

export type ConnectionInput = {
  name: Scalars['String']
  host: Scalars['String']
  port: Scalars['Int']
  protocol: Scalars['String']
  password?: InputMaybe<Scalars['String']>
}

export type ConnectionTestResponse = {
  connected: Scalars['Boolean']
}

export type Key = {
  key: Scalars['String']
  value: Scalars['String']
  type: Scalars['String']
  ttl: Scalars['Int']
}

export type KeyInput = {
  key: Scalars['String']
  value: Scalars['String']
  type: Scalars['String']
  ttl: Scalars['Int']
}

export type NameSpacedKeys = {
  name: Scalars['String']
  keys: Array<Key>
}

export type NamespaceKeyResult = {
  allKeys: Array<Key>
  namespaced: Array<NameSpacedKeys>
}

export type Settings = {
  willPromptBeforeDelete: Scalars['Boolean']
  willSaveCliOutput: Scalars['Boolean']
}

export type SettingsInput = {
  willPromptBeforeDelete: Scalars['Boolean']
  willSaveCliOutput: Scalars['Boolean']
}

export type CliResponse = {
  time: Scalars['Float']
  message?: Maybe<Scalars['String']>
  command: Scalars['String']
  isError?: Maybe<Scalars['Boolean']>
}

export type MutationResult = {
  status: Scalars['Int']
  message?: Maybe<Scalars['String']>
}

export type MonitoringStatus = {
  isMonitoring: Scalars['Boolean']
  activeConnectionId: Scalars['String']
}

export type MonitoringMessage = {
  time: Scalars['Float']
  args: Array<Scalars['String']>
  source: Scalars['String']
  database: Scalars['String']
}

export type Query = {
  activeConnection?: Maybe<Connection>
  connection: Connection
  connections: Array<Connection>
  testActiveConnection: ConnectionTestResponse
  key: Key
  keys: Array<Key>
  namespacedKeys: NamespaceKeyResult
  settings: Settings
  monitoringStatus?: Maybe<MonitoringStatus>
}

export type QueryConnectionArgs = {
  id: Scalars['String']
}

export type QueryConnectionsArgs = {
  limit?: InputMaybe<Scalars['Int']>
  startPosition?: InputMaybe<Scalars['Int']>
}

export type QueryKeyArgs = {
  id: Scalars['String']
}

export type QueryKeysArgs = {
  limit?: InputMaybe<Scalars['Int']>
  startPosition?: InputMaybe<Scalars['Int']>
}

export type Mutation = {
  createConnection?: Maybe<MutationResult>
  removeConnection?: Maybe<MutationResult>
  makeConnectionActive?: Maybe<MutationResult>
  setKey?: Maybe<MutationResult>
  removeKey?: Maybe<MutationResult>
  setSettings?: Maybe<MutationResult>
  sendCliCommand?: Maybe<CliResponse>
  toggleMonitoring?: Maybe<MutationResult>
}

export type MutationCreateConnectionArgs = {
  connection: ConnectionInput
  makeActive?: InputMaybe<Scalars['Boolean']>
}

export type MutationRemoveConnectionArgs = {
  id: Scalars['String']
}

export type MutationMakeConnectionActiveArgs = {
  id?: InputMaybe<Scalars['String']>
}

export type MutationSetKeyArgs = {
  entry: KeyInput
}

export type MutationRemoveKeyArgs = {
  key: Scalars['String']
}

export type MutationSetSettingsArgs = {
  settings: SettingsInput
}

export type MutationSendCliCommandArgs = {
  command: Scalars['String']
}

export type MutationToggleMonitoringArgs = {
  isMonitoring: Scalars['Boolean']
}

export type Subscription = {
  monitorMessage: MonitoringMessage
}

export type MakConnectionActiveMutationVariables = Exact<{
  id: Scalars['String']
}>

export type MakConnectionActiveMutation = { makeConnectionActive?: { message?: string | null } | null }

export type CreateConnectionMutationVariables = Exact<{
  connection: ConnectionInput
}>

export type CreateConnectionMutation = { createConnection?: { message?: string | null } | null }

export type RemoveKeyMutationVariables = Exact<{
  key: Scalars['String']
}>

export type RemoveKeyMutation = { removeKey?: { message?: string | null } | null }

export type RemoveConnectionMutationVariables = Exact<{
  id: Scalars['String']
}>

export type RemoveConnectionMutation = { removeConnection?: { message?: string | null } | null }

export type SendCliCommandMutationVariables = Exact<{
  command: Scalars['String']
}>

export type SendCliCommandMutation = {
  sendCliCommand?: { time: number; message?: string | null; command: string; isError?: boolean | null } | null
}

export type SetSettingsMutationVariables = Exact<{
  settings: SettingsInput
}>

export type SetSettingsMutation = { setSettings?: { message?: string | null } | null }

export type SetKeyMutationVariables = Exact<{
  entry: KeyInput
}>

export type SetKeyMutation = { setKey?: { message?: string | null } | null }

export type ConnectionsQueryVariables = Exact<{ [key: string]: never }>

export type ConnectionsQuery = {
  connections: Array<{ id: string; name: string; host: string; port: number; protocol: string; isActive: boolean }>
}

export type ToggleMonitoringMutationVariables = Exact<{
  isMonitoring: Scalars['Boolean']
}>

export type ToggleMonitoringMutation = { toggleMonitoring?: { status: number } | null }

export type MonitoringStatusQueryVariables = Exact<{ [key: string]: never }>

export type MonitoringStatusQuery = { monitoringStatus?: { isMonitoring: boolean } | null }

export type ActiveConnectionQueryVariables = Exact<{ [key: string]: never }>

export type ActiveConnectionQuery = { activeConnection?: { id: string; name: string } | null }

export type ConnectionQueryVariables = Exact<{
  id: Scalars['String']
}>

export type ConnectionQuery = {
  connection: { name: string; isActive: boolean; port: number; host: string; password?: string | null }
}

export type NamespacedKeysQueryVariables = Exact<{ [key: string]: never }>

export type NamespacedKeysQuery = {
  namespacedKeys: { allKeys: Array<{ key: string }>; namespaced: Array<{ name: string; keys: Array<{ key: string }> }> }
}

export type KeyQueryVariables = Exact<{
  id: Scalars['String']
}>

export type KeyQuery = { key: { value: string; type: string; ttl: number } }

export type SettingsQueryVariables = Exact<{ [key: string]: never }>

export type SettingsQuery = { settings: { willPromptBeforeDelete: boolean; willSaveCliOutput: boolean } }

export type TestActiveConnectionQueryVariables = Exact<{ [key: string]: never }>

export type TestActiveConnectionQuery = { testActiveConnection: { connected: boolean } }

export type MonitorMessageSubscriptionVariables = Exact<{ [key: string]: never }>

export type MonitorMessageSubscription = { monitorMessage: { time: number; args: Array<string> } }

export const MakConnectionActiveDocument = `
    mutation makConnectionActive($id: String!) {
  makeConnectionActive(id: $id) {
    message
  }
}
    `
export const useMakConnectionActiveMutation = <TError = unknown, TContext = unknown>(
  options?: UseMutationOptions<MakConnectionActiveMutation, TError, MakConnectionActiveMutationVariables, TContext>
) =>
  useMutation<MakConnectionActiveMutation, TError, MakConnectionActiveMutationVariables, TContext>(
    ['makConnectionActive'],
    (variables?: MakConnectionActiveMutationVariables) =>
      runQuery<MakConnectionActiveMutation, MakConnectionActiveMutationVariables>(
        MakConnectionActiveDocument,
        variables
      )(),
    options
  )
export const CreateConnectionDocument = `
    mutation createConnection($connection: ConnectionInput!) {
  createConnection(connection: $connection) {
    message
  }
}
    `
export const useCreateConnectionMutation = <TError = unknown, TContext = unknown>(
  options?: UseMutationOptions<CreateConnectionMutation, TError, CreateConnectionMutationVariables, TContext>
) =>
  useMutation<CreateConnectionMutation, TError, CreateConnectionMutationVariables, TContext>(
    ['createConnection'],
    (variables?: CreateConnectionMutationVariables) =>
      runQuery<CreateConnectionMutation, CreateConnectionMutationVariables>(CreateConnectionDocument, variables)(),
    options
  )
export const RemoveKeyDocument = `
    mutation removeKey($key: String!) {
  removeKey(key: $key) {
    message
  }
}
    `
export const useRemoveKeyMutation = <TError = unknown, TContext = unknown>(
  options?: UseMutationOptions<RemoveKeyMutation, TError, RemoveKeyMutationVariables, TContext>
) =>
  useMutation<RemoveKeyMutation, TError, RemoveKeyMutationVariables, TContext>(
    ['removeKey'],
    (variables?: RemoveKeyMutationVariables) =>
      runQuery<RemoveKeyMutation, RemoveKeyMutationVariables>(RemoveKeyDocument, variables)(),
    options
  )
export const RemoveConnectionDocument = `
    mutation removeConnection($id: String!) {
  removeConnection(id: $id) {
    message
  }
}
    `
export const useRemoveConnectionMutation = <TError = unknown, TContext = unknown>(
  options?: UseMutationOptions<RemoveConnectionMutation, TError, RemoveConnectionMutationVariables, TContext>
) =>
  useMutation<RemoveConnectionMutation, TError, RemoveConnectionMutationVariables, TContext>(
    ['removeConnection'],
    (variables?: RemoveConnectionMutationVariables) =>
      runQuery<RemoveConnectionMutation, RemoveConnectionMutationVariables>(RemoveConnectionDocument, variables)(),
    options
  )
export const SendCliCommandDocument = `
    mutation sendCliCommand($command: String!) {
  sendCliCommand(command: $command) {
    time
    message
    command
    isError
  }
}
    `
export const useSendCliCommandMutation = <TError = unknown, TContext = unknown>(
  options?: UseMutationOptions<SendCliCommandMutation, TError, SendCliCommandMutationVariables, TContext>
) =>
  useMutation<SendCliCommandMutation, TError, SendCliCommandMutationVariables, TContext>(
    ['sendCliCommand'],
    (variables?: SendCliCommandMutationVariables) =>
      runQuery<SendCliCommandMutation, SendCliCommandMutationVariables>(SendCliCommandDocument, variables)(),
    options
  )
export const SetSettingsDocument = `
    mutation setSettings($settings: SettingsInput!) {
  setSettings(settings: $settings) {
    message
  }
}
    `
export const useSetSettingsMutation = <TError = unknown, TContext = unknown>(
  options?: UseMutationOptions<SetSettingsMutation, TError, SetSettingsMutationVariables, TContext>
) =>
  useMutation<SetSettingsMutation, TError, SetSettingsMutationVariables, TContext>(
    ['setSettings'],
    (variables?: SetSettingsMutationVariables) =>
      runQuery<SetSettingsMutation, SetSettingsMutationVariables>(SetSettingsDocument, variables)(),
    options
  )
export const SetKeyDocument = `
    mutation setKey($entry: KeyInput!) {
  setKey(entry: $entry) {
    message
  }
}
    `
export const useSetKeyMutation = <TError = unknown, TContext = unknown>(
  options?: UseMutationOptions<SetKeyMutation, TError, SetKeyMutationVariables, TContext>
) =>
  useMutation<SetKeyMutation, TError, SetKeyMutationVariables, TContext>(
    ['setKey'],
    (variables?: SetKeyMutationVariables) =>
      runQuery<SetKeyMutation, SetKeyMutationVariables>(SetKeyDocument, variables)(),
    options
  )
export const ConnectionsDocument = `
    query connections {
  connections {
    id
    name
    host
    port
    protocol
    isActive
  }
}
    `
export const useConnectionsQuery = <TData = ConnectionsQuery, TError = unknown>(
  variables?: ConnectionsQueryVariables,
  options?: UseQueryOptions<ConnectionsQuery, TError, TData>
) =>
  useQuery<ConnectionsQuery, TError, TData>(
    variables === undefined ? ['connections'] : ['connections', variables],
    runQuery<ConnectionsQuery, ConnectionsQueryVariables>(ConnectionsDocument, variables),
    options
  )

useConnectionsQuery.getKey = (variables?: ConnectionsQueryVariables) =>
  variables === undefined ? ['connections'] : ['connections', variables]
export const ToggleMonitoringDocument = `
    mutation toggleMonitoring($isMonitoring: Boolean!) {
  toggleMonitoring(isMonitoring: $isMonitoring) {
    status
  }
}
    `
export const useToggleMonitoringMutation = <TError = unknown, TContext = unknown>(
  options?: UseMutationOptions<ToggleMonitoringMutation, TError, ToggleMonitoringMutationVariables, TContext>
) =>
  useMutation<ToggleMonitoringMutation, TError, ToggleMonitoringMutationVariables, TContext>(
    ['toggleMonitoring'],
    (variables?: ToggleMonitoringMutationVariables) =>
      runQuery<ToggleMonitoringMutation, ToggleMonitoringMutationVariables>(ToggleMonitoringDocument, variables)(),
    options
  )
export const MonitoringStatusDocument = `
    query monitoringStatus {
  monitoringStatus {
    isMonitoring
  }
}
    `
export const useMonitoringStatusQuery = <TData = MonitoringStatusQuery, TError = unknown>(
  variables?: MonitoringStatusQueryVariables,
  options?: UseQueryOptions<MonitoringStatusQuery, TError, TData>
) =>
  useQuery<MonitoringStatusQuery, TError, TData>(
    variables === undefined ? ['monitoringStatus'] : ['monitoringStatus', variables],
    runQuery<MonitoringStatusQuery, MonitoringStatusQueryVariables>(MonitoringStatusDocument, variables),
    options
  )

useMonitoringStatusQuery.getKey = (variables?: MonitoringStatusQueryVariables) =>
  variables === undefined ? ['monitoringStatus'] : ['monitoringStatus', variables]
export const ActiveConnectionDocument = `
    query activeConnection {
  activeConnection {
    id
    name
  }
}
    `
export const useActiveConnectionQuery = <TData = ActiveConnectionQuery, TError = unknown>(
  variables?: ActiveConnectionQueryVariables,
  options?: UseQueryOptions<ActiveConnectionQuery, TError, TData>
) =>
  useQuery<ActiveConnectionQuery, TError, TData>(
    variables === undefined ? ['activeConnection'] : ['activeConnection', variables],
    runQuery<ActiveConnectionQuery, ActiveConnectionQueryVariables>(ActiveConnectionDocument, variables),
    options
  )

useActiveConnectionQuery.getKey = (variables?: ActiveConnectionQueryVariables) =>
  variables === undefined ? ['activeConnection'] : ['activeConnection', variables]
export const ConnectionDocument = `
    query Connection($id: String!) {
  connection(id: $id) {
    name
    isActive
    port
    host
    password
  }
}
    `
export const useConnectionQuery = <TData = ConnectionQuery, TError = unknown>(
  variables: ConnectionQueryVariables,
  options?: UseQueryOptions<ConnectionQuery, TError, TData>
) =>
  useQuery<ConnectionQuery, TError, TData>(
    ['Connection', variables],
    runQuery<ConnectionQuery, ConnectionQueryVariables>(ConnectionDocument, variables),
    options
  )

useConnectionQuery.getKey = (variables: ConnectionQueryVariables) => ['Connection', variables]
export const NamespacedKeysDocument = `
    query namespacedKeys {
  namespacedKeys {
    allKeys {
      key
    }
    namespaced {
      name
      keys {
        key
      }
    }
  }
}
    `
export const useNamespacedKeysQuery = <TData = NamespacedKeysQuery, TError = unknown>(
  variables?: NamespacedKeysQueryVariables,
  options?: UseQueryOptions<NamespacedKeysQuery, TError, TData>
) =>
  useQuery<NamespacedKeysQuery, TError, TData>(
    variables === undefined ? ['namespacedKeys'] : ['namespacedKeys', variables],
    runQuery<NamespacedKeysQuery, NamespacedKeysQueryVariables>(NamespacedKeysDocument, variables),
    options
  )

useNamespacedKeysQuery.getKey = (variables?: NamespacedKeysQueryVariables) =>
  variables === undefined ? ['namespacedKeys'] : ['namespacedKeys', variables]
export const KeyDocument = `
    query key($id: String!) {
  key(id: $id) {
    value
    type
    ttl
  }
}
    `
export const useKeyQuery = <TData = KeyQuery, TError = unknown>(
  variables: KeyQueryVariables,
  options?: UseQueryOptions<KeyQuery, TError, TData>
) =>
  useQuery<KeyQuery, TError, TData>(
    ['key', variables],
    runQuery<KeyQuery, KeyQueryVariables>(KeyDocument, variables),
    options
  )

useKeyQuery.getKey = (variables: KeyQueryVariables) => ['key', variables]
export const SettingsDocument = `
    query settings {
  settings {
    willPromptBeforeDelete
    willSaveCliOutput
  }
}
    `
export const useSettingsQuery = <TData = SettingsQuery, TError = unknown>(
  variables?: SettingsQueryVariables,
  options?: UseQueryOptions<SettingsQuery, TError, TData>
) =>
  useQuery<SettingsQuery, TError, TData>(
    variables === undefined ? ['settings'] : ['settings', variables],
    runQuery<SettingsQuery, SettingsQueryVariables>(SettingsDocument, variables),
    options
  )

useSettingsQuery.getKey = (variables?: SettingsQueryVariables) =>
  variables === undefined ? ['settings'] : ['settings', variables]
export const TestActiveConnectionDocument = `
    query testActiveConnection {
  testActiveConnection {
    connected
  }
}
    `
export const useTestActiveConnectionQuery = <TData = TestActiveConnectionQuery, TError = unknown>(
  variables?: TestActiveConnectionQueryVariables,
  options?: UseQueryOptions<TestActiveConnectionQuery, TError, TData>
) =>
  useQuery<TestActiveConnectionQuery, TError, TData>(
    variables === undefined ? ['testActiveConnection'] : ['testActiveConnection', variables],
    runQuery<TestActiveConnectionQuery, TestActiveConnectionQueryVariables>(TestActiveConnectionDocument, variables),
    options
  )

useTestActiveConnectionQuery.getKey = (variables?: TestActiveConnectionQueryVariables) =>
  variables === undefined ? ['testActiveConnection'] : ['testActiveConnection', variables]
export const MonitorMessageDocument = `
    subscription monitorMessage {
  monitorMessage {
    time
    args
  }
}
    `
