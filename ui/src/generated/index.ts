import { useMutation, UseMutationOptions, useQuery, UseQueryOptions } from 'react-query';
import { runQuery } from 'client';
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

export type Connection = {
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

export type Key = {
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

export type Mutation = {
  createConnection?: Maybe<MutationResult>;
  removeConnection?: Maybe<MutationResult>;
  makeConnectionActive?: Maybe<MutationResult>;
  setKey?: Maybe<MutationResult>;
  removeKey?: Maybe<MutationResult>;
  setSettings?: Maybe<MutationResult>;
};


export type MutationCreateConnectionArgs = {
  connection: ConnectionInput;
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

export type MutationResult = {
  status: Scalars['Int'];
  message?: Maybe<Scalars['String']>;
};

export type NameSpacedKeys = {
  name: Scalars['String'];
  keys: Array<Key>;
};

export type NamespaceKeyResult = {
  allKeys: Array<Key>;
  namespaced: Array<NameSpacedKeys>;
};

export type Query = {
  activeConnection?: Maybe<Connection>;
  connection: Connection;
  connections: Array<Connection>;
  key: Key;
  keys: Array<Key>;
  namespacedKeys: NamespaceKeyResult;
  settings: Settings;
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
  willPromptBeforeDelete: Scalars['Boolean'];
};

export type SettingsInput = {
  willPromptBeforeDelete: Scalars['Boolean'];
};

export type CreateConnectionMutationVariables = Exact<{
  connection: ConnectionInput;
}>;


export type CreateConnectionMutation = { createConnection?: Maybe<Pick<MutationResult, 'message'>> };

export type MakConnectionActiveMutationVariables = Exact<{
  id: Scalars['String'];
}>;


export type MakConnectionActiveMutation = { makeConnectionActive?: Maybe<Pick<MutationResult, 'message'>> };

export type RemoveConnectionMutationVariables = Exact<{
  id: Scalars['String'];
}>;


export type RemoveConnectionMutation = { removeConnection?: Maybe<Pick<MutationResult, 'message'>> };

export type RemoveKeyMutationVariables = Exact<{
  key: Scalars['String'];
}>;


export type RemoveKeyMutation = { removeKey?: Maybe<Pick<MutationResult, 'message'>> };

export type SetKeyMutationVariables = Exact<{
  entry: KeyInput;
}>;


export type SetKeyMutation = { setKey?: Maybe<Pick<MutationResult, 'message'>> };

export type SetSettingsMutationVariables = Exact<{
  settings: SettingsInput;
}>;


export type SetSettingsMutation = { setSettings?: Maybe<Pick<MutationResult, 'message'>> };

export type ActiveConnectionQueryVariables = Exact<{ [key: string]: never; }>;


export type ActiveConnectionQuery = { activeConnection?: Maybe<Pick<Connection, 'id' | 'name'>> };

export type ConnectionsQueryVariables = Exact<{ [key: string]: never; }>;


export type ConnectionsQuery = { connections: Array<Pick<Connection, 'id' | 'name' | 'host' | 'port' | 'protocol' | 'isActive'>> };

export type KeyQueryVariables = Exact<{
  id: Scalars['String'];
}>;


export type KeyQuery = { key: Pick<Key, 'value' | 'type' | 'ttl'> };

export type NamespacedKeysQueryVariables = Exact<{ [key: string]: never; }>;


export type NamespacedKeysQuery = { namespacedKeys: { allKeys: Array<Pick<Key, 'key'>>, namespaced: Array<(
      Pick<NameSpacedKeys, 'name'>
      & { keys: Array<Pick<Key, 'key'>> }
    )> } };

export type SettingsQueryVariables = Exact<{ [key: string]: never; }>;


export type SettingsQuery = { settings: Pick<Settings, 'willPromptBeforeDelete'> };


export const CreateConnectionDocument = `
    mutation createConnection($connection: ConnectionInput!) {
  createConnection(connection: $connection) {
    message
  }
}
    `;
export const useCreateConnectionMutation = <
      TError = unknown,
      TContext = unknown
    >(options?: UseMutationOptions<CreateConnectionMutation, TError, CreateConnectionMutationVariables, TContext>) => 
    useMutation<CreateConnectionMutation, TError, CreateConnectionMutationVariables, TContext>(
      (variables?: CreateConnectionMutationVariables) => runQuery<CreateConnectionMutation, CreateConnectionMutationVariables>(CreateConnectionDocument, variables)(),
      options
    );
export const MakConnectionActiveDocument = `
    mutation makConnectionActive($id: String!) {
  makeConnectionActive(id: $id) {
    message
  }
}
    `;
export const useMakConnectionActiveMutation = <
      TError = unknown,
      TContext = unknown
    >(options?: UseMutationOptions<MakConnectionActiveMutation, TError, MakConnectionActiveMutationVariables, TContext>) => 
    useMutation<MakConnectionActiveMutation, TError, MakConnectionActiveMutationVariables, TContext>(
      (variables?: MakConnectionActiveMutationVariables) => runQuery<MakConnectionActiveMutation, MakConnectionActiveMutationVariables>(MakConnectionActiveDocument, variables)(),
      options
    );
export const RemoveConnectionDocument = `
    mutation removeConnection($id: String!) {
  removeConnection(id: $id) {
    message
  }
}
    `;
export const useRemoveConnectionMutation = <
      TError = unknown,
      TContext = unknown
    >(options?: UseMutationOptions<RemoveConnectionMutation, TError, RemoveConnectionMutationVariables, TContext>) => 
    useMutation<RemoveConnectionMutation, TError, RemoveConnectionMutationVariables, TContext>(
      (variables?: RemoveConnectionMutationVariables) => runQuery<RemoveConnectionMutation, RemoveConnectionMutationVariables>(RemoveConnectionDocument, variables)(),
      options
    );
export const RemoveKeyDocument = `
    mutation removeKey($key: String!) {
  removeKey(key: $key) {
    message
  }
}
    `;
export const useRemoveKeyMutation = <
      TError = unknown,
      TContext = unknown
    >(options?: UseMutationOptions<RemoveKeyMutation, TError, RemoveKeyMutationVariables, TContext>) => 
    useMutation<RemoveKeyMutation, TError, RemoveKeyMutationVariables, TContext>(
      (variables?: RemoveKeyMutationVariables) => runQuery<RemoveKeyMutation, RemoveKeyMutationVariables>(RemoveKeyDocument, variables)(),
      options
    );
export const SetKeyDocument = `
    mutation setKey($entry: KeyInput!) {
  setKey(entry: $entry) {
    message
  }
}
    `;
export const useSetKeyMutation = <
      TError = unknown,
      TContext = unknown
    >(options?: UseMutationOptions<SetKeyMutation, TError, SetKeyMutationVariables, TContext>) => 
    useMutation<SetKeyMutation, TError, SetKeyMutationVariables, TContext>(
      (variables?: SetKeyMutationVariables) => runQuery<SetKeyMutation, SetKeyMutationVariables>(SetKeyDocument, variables)(),
      options
    );
export const SetSettingsDocument = `
    mutation setSettings($settings: SettingsInput!) {
  setSettings(settings: $settings) {
    message
  }
}
    `;
export const useSetSettingsMutation = <
      TError = unknown,
      TContext = unknown
    >(options?: UseMutationOptions<SetSettingsMutation, TError, SetSettingsMutationVariables, TContext>) => 
    useMutation<SetSettingsMutation, TError, SetSettingsMutationVariables, TContext>(
      (variables?: SetSettingsMutationVariables) => runQuery<SetSettingsMutation, SetSettingsMutationVariables>(SetSettingsDocument, variables)(),
      options
    );
export const ActiveConnectionDocument = `
    query activeConnection {
  activeConnection {
    id
    name
  }
}
    `;
export const useActiveConnectionQuery = <
      TData = ActiveConnectionQuery,
      TError = unknown
    >(
      variables?: ActiveConnectionQueryVariables, 
      options?: UseQueryOptions<ActiveConnectionQuery, TError, TData>
    ) => 
    useQuery<ActiveConnectionQuery, TError, TData>(
      ['activeConnection', variables],
      runQuery<ActiveConnectionQuery, ActiveConnectionQueryVariables>(ActiveConnectionDocument, variables),
      options
    );
useActiveConnectionQuery.getKey = (variables?: ActiveConnectionQueryVariables) => ['activeConnection', variables];

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
    `;
export const useConnectionsQuery = <
      TData = ConnectionsQuery,
      TError = unknown
    >(
      variables?: ConnectionsQueryVariables, 
      options?: UseQueryOptions<ConnectionsQuery, TError, TData>
    ) => 
    useQuery<ConnectionsQuery, TError, TData>(
      ['connections', variables],
      runQuery<ConnectionsQuery, ConnectionsQueryVariables>(ConnectionsDocument, variables),
      options
    );
useConnectionsQuery.getKey = (variables?: ConnectionsQueryVariables) => ['connections', variables];

export const KeyDocument = `
    query key($id: String!) {
  key(id: $id) {
    value
    type
    ttl
  }
}
    `;
export const useKeyQuery = <
      TData = KeyQuery,
      TError = unknown
    >(
      variables: KeyQueryVariables, 
      options?: UseQueryOptions<KeyQuery, TError, TData>
    ) => 
    useQuery<KeyQuery, TError, TData>(
      ['key', variables],
      runQuery<KeyQuery, KeyQueryVariables>(KeyDocument, variables),
      options
    );
useKeyQuery.getKey = (variables: KeyQueryVariables) => ['key', variables];

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
    `;
export const useNamespacedKeysQuery = <
      TData = NamespacedKeysQuery,
      TError = unknown
    >(
      variables?: NamespacedKeysQueryVariables, 
      options?: UseQueryOptions<NamespacedKeysQuery, TError, TData>
    ) => 
    useQuery<NamespacedKeysQuery, TError, TData>(
      ['namespacedKeys', variables],
      runQuery<NamespacedKeysQuery, NamespacedKeysQueryVariables>(NamespacedKeysDocument, variables),
      options
    );
useNamespacedKeysQuery.getKey = (variables?: NamespacedKeysQueryVariables) => ['namespacedKeys', variables];

export const SettingsDocument = `
    query settings {
  settings {
    willPromptBeforeDelete
  }
}
    `;
export const useSettingsQuery = <
      TData = SettingsQuery,
      TError = unknown
    >(
      variables?: SettingsQueryVariables, 
      options?: UseQueryOptions<SettingsQuery, TError, TData>
    ) => 
    useQuery<SettingsQuery, TError, TData>(
      ['settings', variables],
      runQuery<SettingsQuery, SettingsQueryVariables>(SettingsDocument, variables),
      options
    );
useSettingsQuery.getKey = (variables?: SettingsQueryVariables) => ['settings', variables];