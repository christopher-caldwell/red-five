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

export type Mutation = {
  __typename?: 'Mutation';
  createConnection?: Maybe<MutationResult>;
  removeConnection?: Maybe<MutationResult>;
  makeConnectionActive?: Maybe<MutationResult>;
  createKeyEntry?: Maybe<MutationResult>;
  removeKey?: Maybe<MutationResult>;
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


export type MutationCreateKeyEntryArgs = {
  entry: KeyInput;
};


export type MutationRemoveKeyArgs = {
  key: Scalars['String'];
};

export type MutationResult = {
  __typename?: 'MutationResult';
  status: Scalars['Int'];
  message?: Maybe<Scalars['String']>;
};

export type NameSpacedKeys = {
  __typename?: 'NameSpacedKeys';
  name: Scalars['String'];
  keys: Array<Maybe<Key>>;
};

export type Query = {
  __typename?: 'Query';
  activeConnection?: Maybe<Connection>;
  connection: Connection;
  connections: Array<Maybe<Connection>>;
  key: Key;
  keys: Array<Maybe<Key>>;
  namespacedKeys: Array<Maybe<NameSpacedKeys>>;
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


export type QueryNamespacedKeysArgs = {
  limit?: Maybe<Scalars['Int']>;
  startPosition?: Maybe<Scalars['Int']>;
};
