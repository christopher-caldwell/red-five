export type Maybe<T> = T | null
export type InputMaybe<T> = Maybe<T>
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] }
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> }
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> }
export type EntireFieldWrapper<T> = T | (() => T | Promise<T>)
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string
  String: string
  Boolean: boolean
  Int: number
  Float: number
}

export type Connection = {
  name: EntireFieldWrapper<Scalars['String']>
  id: EntireFieldWrapper<Scalars['String']>
  host: EntireFieldWrapper<Scalars['String']>
  port: EntireFieldWrapper<Scalars['Int']>
  protocol: EntireFieldWrapper<Scalars['String']>
  password?: EntireFieldWrapper<Maybe<Scalars['String']>>
  isActive: EntireFieldWrapper<Scalars['Boolean']>
}

export type ConnectionInput = {
  name: Scalars['String']
  host: Scalars['String']
  port: Scalars['Int']
  protocol: Scalars['String']
  password?: InputMaybe<Scalars['String']>
}

export type ConnectionTestResponse = {
  connected: EntireFieldWrapper<Scalars['Boolean']>
}

export type Key = {
  key: EntireFieldWrapper<Scalars['String']>
  value: EntireFieldWrapper<Scalars['String']>
  type: EntireFieldWrapper<Scalars['String']>
  ttl: EntireFieldWrapper<Scalars['Int']>
}

export type KeyInput = {
  key: Scalars['String']
  value: Scalars['String']
  type: Scalars['String']
  ttl: Scalars['Int']
}

export type NameSpacedKeys = {
  name: EntireFieldWrapper<Scalars['String']>
  keys: EntireFieldWrapper<Array<Key>>
}

export type NamespaceKeyResult = {
  allKeys: EntireFieldWrapper<Array<Key>>
  namespaced: EntireFieldWrapper<Array<NameSpacedKeys>>
}

export type Settings = {
  willPromptBeforeDelete: EntireFieldWrapper<Scalars['Boolean']>
  willSaveCliOutput: EntireFieldWrapper<Scalars['Boolean']>
}

export type SettingsInput = {
  willPromptBeforeDelete: Scalars['Boolean']
  willSaveCliOutput: Scalars['Boolean']
}

export type CliResponse = {
  time: EntireFieldWrapper<Scalars['Float']>
  message?: EntireFieldWrapper<Maybe<Scalars['String']>>
  command: EntireFieldWrapper<Scalars['String']>
  isError?: EntireFieldWrapper<Maybe<Scalars['Boolean']>>
}

export type MutationResult = {
  status: EntireFieldWrapper<Scalars['Int']>
  message?: EntireFieldWrapper<Maybe<Scalars['String']>>
}

export type MonitoringStatus = {
  isMonitoring: EntireFieldWrapper<Scalars['Boolean']>
  activeConnectionId: EntireFieldWrapper<Scalars['String']>
}

export type MonitoringMessage = {
  time: EntireFieldWrapper<Scalars['Float']>
  args: EntireFieldWrapper<Array<Scalars['String']>>
  source: EntireFieldWrapper<Scalars['String']>
  database: EntireFieldWrapper<Scalars['String']>
}

export type Query = {
  activeConnection?: EntireFieldWrapper<Maybe<Connection>>
  connection: EntireFieldWrapper<Connection>
  connections: EntireFieldWrapper<Array<Connection>>
  testActiveConnection: EntireFieldWrapper<ConnectionTestResponse>
  key: EntireFieldWrapper<Key>
  keys: EntireFieldWrapper<Array<Key>>
  namespacedKeys: EntireFieldWrapper<NamespaceKeyResult>
  settings: EntireFieldWrapper<Settings>
  monitoringStatus?: EntireFieldWrapper<Maybe<MonitoringStatus>>
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
  createConnection?: EntireFieldWrapper<Maybe<MutationResult>>
  removeConnection?: EntireFieldWrapper<Maybe<MutationResult>>
  makeConnectionActive?: EntireFieldWrapper<Maybe<MutationResult>>
  setKey?: EntireFieldWrapper<Maybe<MutationResult>>
  removeKey?: EntireFieldWrapper<Maybe<MutationResult>>
  setSettings?: EntireFieldWrapper<Maybe<MutationResult>>
  sendCliCommand?: EntireFieldWrapper<Maybe<CliResponse>>
  toggleMonitoring?: EntireFieldWrapper<Maybe<MutationResult>>
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
  monitorMessage: EntireFieldWrapper<MonitoringMessage>
}
