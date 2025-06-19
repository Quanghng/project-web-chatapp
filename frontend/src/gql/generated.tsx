import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
const defaultOptions = {} as const;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  DateTime: { input: any; output: any; }
};

export type Comment = {
  __typename?: 'Comment';
  content: Scalars['String']['output'];
  createdAt: Scalars['DateTime']['output'];
  id: Scalars['Int']['output'];
  likes: Scalars['Int']['output'];
  threadId: Scalars['Int']['output'];
  updatedAt: Scalars['DateTime']['output'];
  user: User;
  userId: Scalars['Int']['output'];
};

export type ModifyThreadDto = {
  content: Scalars['String']['input'];
  threadId: Scalars['Int']['input'];
  title: Scalars['String']['input'];
};

export type Mutation = {
  __typename?: 'Mutation';
  deleteThread: Thread;
  modifyThread: Thread;
  postComment: Comment;
  postThread: Thread;
};


export type MutationDeleteThreadArgs = {
  threadId: Scalars['Float']['input'];
};


export type MutationModifyThreadArgs = {
  inputs: ModifyThreadDto;
};


export type MutationPostCommentArgs = {
  inputs: PostCommentDto;
};


export type MutationPostThreadArgs = {
  inputs: PostThreadDto;
};

export type PostCommentDto = {
  content: Scalars['String']['input'];
  threadId: Scalars['Int']['input'];
  userId: Scalars['Int']['input'];
};

export type PostThreadDto = {
  content: Scalars['String']['input'];
  title: Scalars['String']['input'];
  userId: Scalars['Int']['input'];
};

export type Query = {
  __typename?: 'Query';
  getComments: Array<Comment>;
  getThreads: Array<Thread>;
  getUser: User;
};


export type QueryGetCommentsArgs = {
  threadId: Scalars['Float']['input'];
};


export type QueryGetUserArgs = {
  id: Scalars['Int']['input'];
};

export type Thread = {
  __typename?: 'Thread';
  comments?: Maybe<Array<Comment>>;
  content: Scalars['String']['output'];
  createdAt: Scalars['DateTime']['output'];
  id: Scalars['Int']['output'];
  likes: Scalars['Int']['output'];
  title: Scalars['String']['output'];
  updatedAt: Scalars['DateTime']['output'];
  user: User;
  userId: Scalars['Int']['output'];
};

/** user */
export type User = {
  __typename?: 'User';
  comments?: Maybe<Array<Comment>>;
  createdAt: Scalars['DateTime']['output'];
  email: Scalars['String']['output'];
  firstName?: Maybe<Scalars['String']['output']>;
  getThreads: Array<Thread>;
  hash: Scalars['String']['output'];
  id: Scalars['Int']['output'];
  lastName?: Maybe<Scalars['String']['output']>;
  refreshToken?: Maybe<Scalars['String']['output']>;
  thread?: Maybe<Array<Thread>>;
  updatedAt: Scalars['DateTime']['output'];
};

export type DeleteThreadMutationVariables = Exact<{
  id: Scalars['Float']['input'];
}>;


export type DeleteThreadMutation = { __typename?: 'Mutation', deleteThread: { __typename?: 'Thread', id: number } };

export type GetThreadsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetThreadsQuery = { __typename?: 'Query', getThreads: Array<{ __typename?: 'Thread', id: number, title: string, content: string, likes: number, user: { __typename?: 'User', email: string }, comments?: Array<{ __typename?: 'Comment', id: number, content: string, user: { __typename?: 'User', email: string } }> | null }> };

export type GetUserWithThreadsQueryVariables = Exact<{
  id: Scalars['Int']['input'];
}>;


export type GetUserWithThreadsQuery = { __typename?: 'Query', getUser: { __typename?: 'User', id: number, email: string, firstName?: string | null, lastName?: string | null, getThreads: Array<{ __typename?: 'Thread', id: number, title: string, content: string, likes: number, comments?: Array<{ __typename?: 'Comment', id: number, content: string, user: { __typename?: 'User', email: string } }> | null }> } };

export type ModifyThreadMutationVariables = Exact<{
  inputs: ModifyThreadDto;
}>;


export type ModifyThreadMutation = { __typename?: 'Mutation', modifyThread: { __typename?: 'Thread', id: number, title: string, content: string } };


export const DeleteThreadDocument = gql`
    mutation DeleteThread($id: Float!) {
  deleteThread(threadId: $id) {
    id
  }
}
    `;
export type DeleteThreadMutationFn = Apollo.MutationFunction<DeleteThreadMutation, DeleteThreadMutationVariables>;

/**
 * __useDeleteThreadMutation__
 *
 * To run a mutation, you first call `useDeleteThreadMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteThreadMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteThreadMutation, { data, loading, error }] = useDeleteThreadMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useDeleteThreadMutation(baseOptions?: Apollo.MutationHookOptions<DeleteThreadMutation, DeleteThreadMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeleteThreadMutation, DeleteThreadMutationVariables>(DeleteThreadDocument, options);
      }
export type DeleteThreadMutationHookResult = ReturnType<typeof useDeleteThreadMutation>;
export type DeleteThreadMutationResult = Apollo.MutationResult<DeleteThreadMutation>;
export type DeleteThreadMutationOptions = Apollo.BaseMutationOptions<DeleteThreadMutation, DeleteThreadMutationVariables>;
export const GetThreadsDocument = gql`
    query GetThreads {
  getThreads {
    id
    title
    content
    likes
    user {
      email
    }
    comments {
      id
      content
      user {
        email
      }
    }
  }
}
    `;

/**
 * __useGetThreadsQuery__
 *
 * To run a query within a React component, call `useGetThreadsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetThreadsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetThreadsQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetThreadsQuery(baseOptions?: Apollo.QueryHookOptions<GetThreadsQuery, GetThreadsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetThreadsQuery, GetThreadsQueryVariables>(GetThreadsDocument, options);
      }
export function useGetThreadsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetThreadsQuery, GetThreadsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetThreadsQuery, GetThreadsQueryVariables>(GetThreadsDocument, options);
        }
export function useGetThreadsSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetThreadsQuery, GetThreadsQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetThreadsQuery, GetThreadsQueryVariables>(GetThreadsDocument, options);
        }
export type GetThreadsQueryHookResult = ReturnType<typeof useGetThreadsQuery>;
export type GetThreadsLazyQueryHookResult = ReturnType<typeof useGetThreadsLazyQuery>;
export type GetThreadsSuspenseQueryHookResult = ReturnType<typeof useGetThreadsSuspenseQuery>;
export type GetThreadsQueryResult = Apollo.QueryResult<GetThreadsQuery, GetThreadsQueryVariables>;
export const GetUserWithThreadsDocument = gql`
    query GetUserWithThreads($id: Int!) {
  getUser(id: $id) {
    id
    email
    firstName
    lastName
    getThreads {
      id
      title
      content
      likes
      comments {
        id
        content
        user {
          email
        }
      }
    }
  }
}
    `;

/**
 * __useGetUserWithThreadsQuery__
 *
 * To run a query within a React component, call `useGetUserWithThreadsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetUserWithThreadsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetUserWithThreadsQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useGetUserWithThreadsQuery(baseOptions: Apollo.QueryHookOptions<GetUserWithThreadsQuery, GetUserWithThreadsQueryVariables> & ({ variables: GetUserWithThreadsQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetUserWithThreadsQuery, GetUserWithThreadsQueryVariables>(GetUserWithThreadsDocument, options);
      }
export function useGetUserWithThreadsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetUserWithThreadsQuery, GetUserWithThreadsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetUserWithThreadsQuery, GetUserWithThreadsQueryVariables>(GetUserWithThreadsDocument, options);
        }
export function useGetUserWithThreadsSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetUserWithThreadsQuery, GetUserWithThreadsQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetUserWithThreadsQuery, GetUserWithThreadsQueryVariables>(GetUserWithThreadsDocument, options);
        }
export type GetUserWithThreadsQueryHookResult = ReturnType<typeof useGetUserWithThreadsQuery>;
export type GetUserWithThreadsLazyQueryHookResult = ReturnType<typeof useGetUserWithThreadsLazyQuery>;
export type GetUserWithThreadsSuspenseQueryHookResult = ReturnType<typeof useGetUserWithThreadsSuspenseQuery>;
export type GetUserWithThreadsQueryResult = Apollo.QueryResult<GetUserWithThreadsQuery, GetUserWithThreadsQueryVariables>;
export const ModifyThreadDocument = gql`
    mutation ModifyThread($inputs: ModifyThreadDto!) {
  modifyThread(inputs: $inputs) {
    id
    title
    content
  }
}
    `;
export type ModifyThreadMutationFn = Apollo.MutationFunction<ModifyThreadMutation, ModifyThreadMutationVariables>;

/**
 * __useModifyThreadMutation__
 *
 * To run a mutation, you first call `useModifyThreadMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useModifyThreadMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [modifyThreadMutation, { data, loading, error }] = useModifyThreadMutation({
 *   variables: {
 *      inputs: // value for 'inputs'
 *   },
 * });
 */
export function useModifyThreadMutation(baseOptions?: Apollo.MutationHookOptions<ModifyThreadMutation, ModifyThreadMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<ModifyThreadMutation, ModifyThreadMutationVariables>(ModifyThreadDocument, options);
      }
export type ModifyThreadMutationHookResult = ReturnType<typeof useModifyThreadMutation>;
export type ModifyThreadMutationResult = Apollo.MutationResult<ModifyThreadMutation>;
export type ModifyThreadMutationOptions = Apollo.BaseMutationOptions<ModifyThreadMutation, ModifyThreadMutationVariables>;