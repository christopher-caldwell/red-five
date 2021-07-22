export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
};

export type CliResponse = {
  __typename?: 'CliResponse';
  time: Scalars['Float'];
  message?: Maybe<Scalars['String']>;
  command: Scalars['String'];
  isError?: Maybe<Scalars['Boolean']>;
};

export type Connection = {
  __typename?: 'Connection';
  name: Scalars['String'];
  id: Scalars['String'];
  host: Scalars['String'];
  port: Scalars['Int'];
  protocol: Scalars['String'];
  password?: Maybe<Scalars['String']>;
  isActive: Scalars['Boolean'];
};

export type ConnectionInput = {
  name: Scalars['String'];
  host: Scalars['String'];
  port: Scalars['Int'];
  protocol: Scalars['String'];
  password?: Maybe<Scalars['String']>;
};

export type ConnectionTestResponse = {
  __typename?: 'ConnectionTestResponse';
  connected: Scalars['Boolean'];
};

export type Key = {
  __typename?: 'Key';
  key: Scalars['String'];
  value: Scalars['String'];
  type: Scalars['String'];
  ttl: Scalars['Int'];
};

export type KeyInput = {
  key: Scalars['String'];
  value: Scalars['String'];
  type: Scalars['String'];
  ttl: Scalars['Int'];
};

export type MonitoringMessage = {
  __typename?: 'MonitoringMessage';
  time: Scalars['Float'];
  args: Array<Scalars['String']>;
  source: Scalars['String'];
  database: Scalars['String'];
};

export type MonitoringStatus = {
  __typename?: 'MonitoringStatus';
  isMonitoring: Scalars['Boolean'];
  activeConnectionId: Scalars['String'];
};

export type Mutation = {
  __typename?: 'Mutation';
  createConnection?: Maybe<MutationResult>;
  removeConnection?: Maybe<MutationResult>;
  makeConnectionActive?: Maybe<MutationResult>;
  setKey?: Maybe<MutationResult>;
  removeKey?: Maybe<MutationResult>;
  setSettings?: Maybe<MutationResult>;
  sendCliCommand?: Maybe<CliResponse>;
  toggleMonitoring?: Maybe<MutationResult>;
};


export type MutationCreateConnectionArgs = {
  connection: ConnectionInput;
  makeActive?: Maybe<Scalars['Boolean']>;
};


export type MutationRemoveConnectionArgs = {
  id: Scalars['String'];
};


export type MutationMakeConnectionActiveArgs = {
  id?: Maybe<Scalars['String']>;
};


export type MutationSetKeyArgs = {
  entry: KeyInput;
};


export type MutationRemoveKeyArgs = {
  key: Scalars['String'];
};


export type MutationSetSettingsArgs = {
  settings: SettingsInput;
};


export type MutationSendCliCommandArgs = {
  command: Scalars['String'];
};


export type MutationToggleMonitoringArgs = {
  isMonitoring: Scalars['Boolean'];
};

export type MutationResult = {
  __typename?: 'MutationResult';
  status: Scalars['Int'];
  message?: Maybe<Scalars['String']>;
};

export type NameSpacedKeys = {
  __typename?: 'NameSpacedKeys';
  name: Scalars['String'];
  keys: Array<Key>;
};

export type NamespaceKeyResult = {
  __typename?: 'NamespaceKeyResult';
  allKeys: Array<Key>;
  namespaced: Array<NameSpacedKeys>;
};

export type Query = {
  __typename?: 'Query';
  activeConnection?: Maybe<Connection>;
  connection: Connection;
  connections: Array<Connection>;
  testActiveConnection: ConnectionTestResponse;
  key: Key;
  keys: Array<Key>;
  namespacedKeys: NamespaceKeyResult;
  settings: Settings;
  monitoringStatus?: Maybe<MonitoringStatus>;
};


export type QueryConnectionArgs = {
  id: Scalars['String'];
};


export type QueryConnectionsArgs = {
  limit?: Maybe<Scalars['Int']>;
  startPosition?: Maybe<Scalars['Int']>;
};


export type QueryKeyArgs = {
  id: Scalars['String'];
};


export type QueryKeysArgs = {
  limit?: Maybe<Scalars['Int']>;
  startPosition?: Maybe<Scalars['Int']>;
};

export type Settings = {
  __typename?: 'Settings';
  willPromptBeforeDelete: Scalars['Boolean'];
  willSaveCliOutput: Scalars['Boolean'];
};

export type SettingsInput = {
  willPromptBeforeDelete: Scalars['Boolean'];
  willSaveCliOutput: Scalars['Boolean'];
};

export type Subscription = {
  __typename?: 'Subscription';
  monitorMessage: MonitoringMessage;
};
