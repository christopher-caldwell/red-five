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
};

export type ConnectionInput = {
  name: Scalars['String'];
  host: Scalars['String'];
  port: Scalars['Int'];
  protocol: Scalars['String'];
  password?: Maybe<Scalars['String']>;
};

export type Mutation = {
  createConnection?: Maybe<MutationResult>;
  removeConnection?: Maybe<MutationResult>;
};


export type MutationCreateConnectionArgs = {
  connection: ConnectionInput;
};


export type MutationRemoveConnectionArgs = {
  id: Scalars['String'];
};

export type MutationResult = {
  status: Scalars['Int'];
  message?: Maybe<Scalars['String']>;
};

export type Query = {
  connection?: Maybe<Connection>;
  connections?: Maybe<Array<Maybe<Connection>>>;
};


export type QueryConnectionArgs = {
  id: Scalars['String'];
};


export type QueryConnectionsArgs = {
  limit?: Maybe<Scalars['Int']>;
  startPosition?: Maybe<Scalars['Int']>;
};

export type CreateConnectionMutationVariables = Exact<{
  connection: ConnectionInput;
}>;


export type CreateConnectionMutation = { createConnection?: Maybe<Pick<MutationResult, 'message'>> };

export type ConnectionsQueryVariables = Exact<{ [key: string]: never; }>;


export type ConnectionsQuery = { connections?: Maybe<Array<Maybe<Pick<Connection, 'id' | 'name' | 'host' | 'port' | 'protocol'>>>> };


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
export const ConnectionsDocument = `
    query connections {
  connections {
    id
    name
    host
    port
    protocol
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
