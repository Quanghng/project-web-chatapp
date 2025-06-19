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

export type Conversation = {
  __typename?: 'Conversation';
  createdAt: Scalars['DateTime']['output'];
  id: Scalars['Int']['output'];
  messages: Array<Message>;
  name?: Maybe<Scalars['String']['output']>;
  participants: Array<ConversationParticipant>;
  updatedAt: Scalars['DateTime']['output'];
};

export type ConversationParticipant = {
  __typename?: 'ConversationParticipant';
  conversationId: Scalars['Int']['output'];
  id: Scalars['Int']['output'];
  joinedAt: Scalars['DateTime']['output'];
  user: User;
  userId: Scalars['Int']['output'];
};

export type CreateConversationDto = {
  name?: InputMaybe<Scalars['String']['input']>;
  participantIds: Array<Scalars['Int']['input']>;
};

export type Message = {
  __typename?: 'Message';
  content: Scalars['String']['output'];
  conversationId: Scalars['Int']['output'];
  createdAt: Scalars['DateTime']['output'];
  id: Scalars['Int']['output'];
  user: User;
  userId: Scalars['Int']['output'];
};

export type ModifyThreadDto = {
  content: Scalars['String']['input'];
  threadId: Scalars['Int']['input'];
  title: Scalars['String']['input'];
};

export type ModifyUserDto = {
  firstName: Scalars['String']['input'];
  lastName: Scalars['String']['input'];
  userId: Scalars['Int']['input'];
};

export type Mutation = {
  __typename?: 'Mutation';
  addParticipantToConversation: Conversation;
  createConversation: Conversation;
  deleteThread: Thread;
  likeThread: Thread;
  modifyThread: Thread;
  postComment: Comment;
  postThread: Thread;
  sendMessage: Message;
  unlikeThread: Thread;
  updateUser: User;
};


export type MutationAddParticipantToConversationArgs = {
  conversationId: Scalars['Int']['input'];
  userId: Scalars['Int']['input'];
};


export type MutationCreateConversationArgs = {
  inputs: CreateConversationDto;
};


export type MutationDeleteThreadArgs = {
  threadId: Scalars['Float']['input'];
};


export type MutationLikeThreadArgs = {
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


export type MutationSendMessageArgs = {
  inputs: SendMessageDto;
};


export type MutationUnlikeThreadArgs = {
  threadId: Scalars['Float']['input'];
};


export type MutationUpdateUserArgs = {
  inputs: ModifyUserDto;
};

export type PostCommentDto = {
  content: Scalars['String']['input'];
  threadId: Scalars['Int']['input'];
  userId: Scalars['Int']['input'];
};

export type PostThreadDto = {
  content: Scalars['String']['input'];
  imageUrl?: InputMaybe<Scalars['String']['input']>;
  title: Scalars['String']['input'];
  userId: Scalars['Int']['input'];
};

export type Query = {
  __typename?: 'Query';
  getComments: Array<Comment>;
  getConversation?: Maybe<Conversation>;
  getConversations: Array<Conversation>;
  getConversationsByUser: Array<Conversation>;
  getMessagesByConversation: Array<Message>;
  getThread: Thread;
  getThreads: Array<Thread>;
  getUser: User;
  users: Array<User>;
};


export type QueryGetCommentsArgs = {
  threadId: Scalars['Float']['input'];
};


export type QueryGetConversationArgs = {
  id: Scalars['Int']['input'];
};


export type QueryGetConversationsByUserArgs = {
  userId: Scalars['Int']['input'];
};


export type QueryGetMessagesByConversationArgs = {
  conversationId: Scalars['Int']['input'];
};


export type QueryGetThreadArgs = {
  threadId: Scalars['Float']['input'];
};


export type QueryGetUserArgs = {
  id: Scalars['Int']['input'];
};

export type SendMessageDto = {
  content: Scalars['String']['input'];
  conversationId: Scalars['Int']['input'];
  userId: Scalars['Int']['input'];
};

export type Subscription = {
  __typename?: 'Subscription';
  messageSent: Message;
};


export type SubscriptionMessageSentArgs = {
  conversationId: Scalars['Int']['input'];
};

export type Thread = {
  __typename?: 'Thread';
  comments?: Maybe<Array<Comment>>;
  content: Scalars['String']['output'];
  createdAt: Scalars['DateTime']['output'];
  id: Scalars['Int']['output'];
  imageUrl?: Maybe<Scalars['String']['output']>;
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

export type GetConversationsByUserQueryVariables = Exact<{
  userId: Scalars['Int']['input'];
}>;


export type GetConversationsByUserQuery = { __typename?: 'Query', getConversationsByUser: Array<{ __typename?: 'Conversation', id: number, name?: string | null, createdAt: any, updatedAt: any, participants: Array<{ __typename?: 'ConversationParticipant', user: { __typename?: 'User', id: number, email: string, firstName?: string | null, lastName?: string | null } }> }> };

export type GetMessagesByConversationQueryVariables = Exact<{
  conversationId: Scalars['Int']['input'];
}>;


export type GetMessagesByConversationQuery = { __typename?: 'Query', getMessagesByConversation: Array<{ __typename?: 'Message', id: number, content: string, createdAt: any, conversationId: number, user: { __typename?: 'User', email: string } }> };

export type GetThreadByIdQueryVariables = Exact<{
  threadId: Scalars['Float']['input'];
}>;


export type GetThreadByIdQuery = { __typename?: 'Query', getThread: { __typename?: 'Thread', id: number, title: string, content: string, createdAt: any, likes: number, imageUrl?: string | null, user: { __typename?: 'User', id: number, email: string }, comments?: Array<{ __typename?: 'Comment', id: number, content: string, createdAt: any, likes: number, user: { __typename?: 'User', id: number, email: string, firstName?: string | null, lastName?: string | null } }> | null } };

export type GetThreadsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetThreadsQuery = { __typename?: 'Query', getThreads: Array<{ __typename?: 'Thread', id: number, title: string, content: string, createdAt: any, likes: number, imageUrl?: string | null, user: { __typename?: 'User', id: number, email: string, firstName?: string | null, lastName?: string | null }, comments?: Array<{ __typename?: 'Comment', id: number, content: string, createdAt: any, likes: number, user: { __typename?: 'User', id: number, email: string, firstName?: string | null, lastName?: string | null } }> | null }> };

export type GetUsersQueryVariables = Exact<{ [key: string]: never; }>;


export type GetUsersQuery = { __typename?: 'Query', users: Array<{ __typename?: 'User', id: number, email: string, firstName?: string | null, lastName?: string | null }> };

export type LikeThreadMutationVariables = Exact<{
  threadId: Scalars['Float']['input'];
}>;


export type LikeThreadMutation = { __typename?: 'Mutation', likeThread: { __typename?: 'Thread', id: number, title: string, content: string, likes: number, user: { __typename?: 'User', email: string }, comments?: Array<{ __typename?: 'Comment', id: number, content: string, user: { __typename?: 'User', email: string } }> | null } };

export type MessageSentSubscriptionVariables = Exact<{
  conversationId: Scalars['Int']['input'];
}>;


export type MessageSentSubscription = { __typename?: 'Subscription', messageSent: { __typename?: 'Message', id: number, content: string, createdAt: any, conversationId: number, user: { __typename?: 'User', email: string } } };

export type GetUserWithThreadsQueryVariables = Exact<{
  id: Scalars['Int']['input'];
}>;


export type GetUserWithThreadsQuery = { __typename?: 'Query', getUser: { __typename?: 'User', id: number, email: string, firstName?: string | null, lastName?: string | null, getThreads: Array<{ __typename?: 'Thread', id: number, title: string, content: string, createdAt: any, likes: number, imageUrl?: string | null, comments?: Array<{ __typename?: 'Comment', id: number, content: string, createdAt: any, user: { __typename?: 'User', email: string } }> | null }> } };

export type PostCommentMutationVariables = Exact<{
  inputs: PostCommentDto;
}>;


export type PostCommentMutation = { __typename?: 'Mutation', postComment: { __typename?: 'Comment', id: number, createdAt: any, updatedAt: any, content: string, likes: number, threadId: number, userId: number } };

export type PostThreadMutationVariables = Exact<{
  inputs: PostThreadDto;
}>;


export type PostThreadMutation = { __typename?: 'Mutation', postThread: { __typename?: 'Thread', id: number, title: string, content: string, likes: number, imageUrl?: string | null } };

export type SendMessageMutationVariables = Exact<{
  inputs: SendMessageDto;
}>;


export type SendMessageMutation = { __typename?: 'Mutation', sendMessage: { __typename?: 'Message', id: number, content: string, createdAt: any, conversationId: number, user: { __typename?: 'User', email: string } } };

export type UnlikeThreadMutationVariables = Exact<{
  threadId: Scalars['Float']['input'];
}>;


export type UnlikeThreadMutation = { __typename?: 'Mutation', unlikeThread: { __typename?: 'Thread', id: number, title: string, content: string, likes: number, user: { __typename?: 'User', email: string }, comments?: Array<{ __typename?: 'Comment', id: number, content: string, user: { __typename?: 'User', email: string } }> | null } };

export type ModifyThreadMutationVariables = Exact<{
  inputs: ModifyThreadDto;
}>;


export type ModifyThreadMutation = { __typename?: 'Mutation', modifyThread: { __typename?: 'Thread', id: number, title: string, content: string } };

export type ModifyUserMutationVariables = Exact<{
  inputs: ModifyUserDto;
}>;


export type ModifyUserMutation = { __typename?: 'Mutation', updateUser: { __typename?: 'User', id: number, firstName?: string | null, lastName?: string | null } };


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
export const GetConversationsByUserDocument = gql`
    query GetConversationsByUser($userId: Int!) {
  getConversationsByUser(userId: $userId) {
    id
    name
    participants {
      user {
        id
        email
        firstName
        lastName
      }
    }
    createdAt
    updatedAt
  }
}
    `;

/**
 * __useGetConversationsByUserQuery__
 *
 * To run a query within a React component, call `useGetConversationsByUserQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetConversationsByUserQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetConversationsByUserQuery({
 *   variables: {
 *      userId: // value for 'userId'
 *   },
 * });
 */
export function useGetConversationsByUserQuery(baseOptions: Apollo.QueryHookOptions<GetConversationsByUserQuery, GetConversationsByUserQueryVariables> & ({ variables: GetConversationsByUserQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetConversationsByUserQuery, GetConversationsByUserQueryVariables>(GetConversationsByUserDocument, options);
      }
export function useGetConversationsByUserLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetConversationsByUserQuery, GetConversationsByUserQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetConversationsByUserQuery, GetConversationsByUserQueryVariables>(GetConversationsByUserDocument, options);
        }
export function useGetConversationsByUserSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetConversationsByUserQuery, GetConversationsByUserQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetConversationsByUserQuery, GetConversationsByUserQueryVariables>(GetConversationsByUserDocument, options);
        }
export type GetConversationsByUserQueryHookResult = ReturnType<typeof useGetConversationsByUserQuery>;
export type GetConversationsByUserLazyQueryHookResult = ReturnType<typeof useGetConversationsByUserLazyQuery>;
export type GetConversationsByUserSuspenseQueryHookResult = ReturnType<typeof useGetConversationsByUserSuspenseQuery>;
export type GetConversationsByUserQueryResult = Apollo.QueryResult<GetConversationsByUserQuery, GetConversationsByUserQueryVariables>;
export const GetMessagesByConversationDocument = gql`
    query GetMessagesByConversation($conversationId: Int!) {
  getMessagesByConversation(conversationId: $conversationId) {
    id
    content
    createdAt
    user {
      email
    }
    conversationId
  }
}
    `;

/**
 * __useGetMessagesByConversationQuery__
 *
 * To run a query within a React component, call `useGetMessagesByConversationQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetMessagesByConversationQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetMessagesByConversationQuery({
 *   variables: {
 *      conversationId: // value for 'conversationId'
 *   },
 * });
 */
export function useGetMessagesByConversationQuery(baseOptions: Apollo.QueryHookOptions<GetMessagesByConversationQuery, GetMessagesByConversationQueryVariables> & ({ variables: GetMessagesByConversationQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetMessagesByConversationQuery, GetMessagesByConversationQueryVariables>(GetMessagesByConversationDocument, options);
      }
export function useGetMessagesByConversationLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetMessagesByConversationQuery, GetMessagesByConversationQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetMessagesByConversationQuery, GetMessagesByConversationQueryVariables>(GetMessagesByConversationDocument, options);
        }
export function useGetMessagesByConversationSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetMessagesByConversationQuery, GetMessagesByConversationQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetMessagesByConversationQuery, GetMessagesByConversationQueryVariables>(GetMessagesByConversationDocument, options);
        }
export type GetMessagesByConversationQueryHookResult = ReturnType<typeof useGetMessagesByConversationQuery>;
export type GetMessagesByConversationLazyQueryHookResult = ReturnType<typeof useGetMessagesByConversationLazyQuery>;
export type GetMessagesByConversationSuspenseQueryHookResult = ReturnType<typeof useGetMessagesByConversationSuspenseQuery>;
export type GetMessagesByConversationQueryResult = Apollo.QueryResult<GetMessagesByConversationQuery, GetMessagesByConversationQueryVariables>;
export const GetThreadByIdDocument = gql`
    query GetThreadById($threadId: Float!) {
  getThread(threadId: $threadId) {
    id
    title
    content
    createdAt
    likes
    imageUrl
    user {
      id
      email
    }
    comments {
      id
      content
      createdAt
      likes
      user {
        id
        email
        firstName
        lastName
      }
    }
  }
}
    `;

/**
 * __useGetThreadByIdQuery__
 *
 * To run a query within a React component, call `useGetThreadByIdQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetThreadByIdQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetThreadByIdQuery({
 *   variables: {
 *      threadId: // value for 'threadId'
 *   },
 * });
 */
export function useGetThreadByIdQuery(baseOptions: Apollo.QueryHookOptions<GetThreadByIdQuery, GetThreadByIdQueryVariables> & ({ variables: GetThreadByIdQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetThreadByIdQuery, GetThreadByIdQueryVariables>(GetThreadByIdDocument, options);
      }
export function useGetThreadByIdLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetThreadByIdQuery, GetThreadByIdQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetThreadByIdQuery, GetThreadByIdQueryVariables>(GetThreadByIdDocument, options);
        }
export function useGetThreadByIdSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetThreadByIdQuery, GetThreadByIdQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetThreadByIdQuery, GetThreadByIdQueryVariables>(GetThreadByIdDocument, options);
        }
export type GetThreadByIdQueryHookResult = ReturnType<typeof useGetThreadByIdQuery>;
export type GetThreadByIdLazyQueryHookResult = ReturnType<typeof useGetThreadByIdLazyQuery>;
export type GetThreadByIdSuspenseQueryHookResult = ReturnType<typeof useGetThreadByIdSuspenseQuery>;
export type GetThreadByIdQueryResult = Apollo.QueryResult<GetThreadByIdQuery, GetThreadByIdQueryVariables>;
export const GetThreadsDocument = gql`
    query GetThreads {
  getThreads {
    id
    title
    content
    createdAt
    likes
    imageUrl
    user {
      id
      email
      firstName
      lastName
    }
    comments {
      id
      content
      createdAt
      likes
      user {
        id
        email
        firstName
        lastName
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
export const GetUsersDocument = gql`
    query GetUsers {
  users {
    id
    email
    firstName
    lastName
  }
}
    `;

/**
 * __useGetUsersQuery__
 *
 * To run a query within a React component, call `useGetUsersQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetUsersQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetUsersQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetUsersQuery(baseOptions?: Apollo.QueryHookOptions<GetUsersQuery, GetUsersQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetUsersQuery, GetUsersQueryVariables>(GetUsersDocument, options);
      }
export function useGetUsersLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetUsersQuery, GetUsersQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetUsersQuery, GetUsersQueryVariables>(GetUsersDocument, options);
        }
export function useGetUsersSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetUsersQuery, GetUsersQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetUsersQuery, GetUsersQueryVariables>(GetUsersDocument, options);
        }
export type GetUsersQueryHookResult = ReturnType<typeof useGetUsersQuery>;
export type GetUsersLazyQueryHookResult = ReturnType<typeof useGetUsersLazyQuery>;
export type GetUsersSuspenseQueryHookResult = ReturnType<typeof useGetUsersSuspenseQuery>;
export type GetUsersQueryResult = Apollo.QueryResult<GetUsersQuery, GetUsersQueryVariables>;
export const LikeThreadDocument = gql`
    mutation LikeThread($threadId: Float!) {
  likeThread(threadId: $threadId) {
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
export type LikeThreadMutationFn = Apollo.MutationFunction<LikeThreadMutation, LikeThreadMutationVariables>;

/**
 * __useLikeThreadMutation__
 *
 * To run a mutation, you first call `useLikeThreadMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLikeThreadMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [likeThreadMutation, { data, loading, error }] = useLikeThreadMutation({
 *   variables: {
 *      threadId: // value for 'threadId'
 *   },
 * });
 */
export function useLikeThreadMutation(baseOptions?: Apollo.MutationHookOptions<LikeThreadMutation, LikeThreadMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<LikeThreadMutation, LikeThreadMutationVariables>(LikeThreadDocument, options);
      }
export type LikeThreadMutationHookResult = ReturnType<typeof useLikeThreadMutation>;
export type LikeThreadMutationResult = Apollo.MutationResult<LikeThreadMutation>;
export type LikeThreadMutationOptions = Apollo.BaseMutationOptions<LikeThreadMutation, LikeThreadMutationVariables>;
export const MessageSentDocument = gql`
    subscription MessageSent($conversationId: Int!) {
  messageSent(conversationId: $conversationId) {
    id
    content
    createdAt
    user {
      email
    }
    conversationId
  }
}
    `;

/**
 * __useMessageSentSubscription__
 *
 * To run a query within a React component, call `useMessageSentSubscription` and pass it any options that fit your needs.
 * When your component renders, `useMessageSentSubscription` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the subscription, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useMessageSentSubscription({
 *   variables: {
 *      conversationId: // value for 'conversationId'
 *   },
 * });
 */
export function useMessageSentSubscription(baseOptions: Apollo.SubscriptionHookOptions<MessageSentSubscription, MessageSentSubscriptionVariables> & ({ variables: MessageSentSubscriptionVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useSubscription<MessageSentSubscription, MessageSentSubscriptionVariables>(MessageSentDocument, options);
      }
export type MessageSentSubscriptionHookResult = ReturnType<typeof useMessageSentSubscription>;
export type MessageSentSubscriptionResult = Apollo.SubscriptionResult<MessageSentSubscription>;
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
      createdAt
      likes
      imageUrl
      comments {
        id
        content
        user {
          email
        }
        createdAt
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
export const PostCommentDocument = gql`
    mutation PostComment($inputs: PostCommentDto!) {
  postComment(inputs: $inputs) {
    id
    createdAt
    updatedAt
    content
    likes
    threadId
    userId
  }
}
    `;
export type PostCommentMutationFn = Apollo.MutationFunction<PostCommentMutation, PostCommentMutationVariables>;

/**
 * __usePostCommentMutation__
 *
 * To run a mutation, you first call `usePostCommentMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `usePostCommentMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [postCommentMutation, { data, loading, error }] = usePostCommentMutation({
 *   variables: {
 *      inputs: // value for 'inputs'
 *   },
 * });
 */
export function usePostCommentMutation(baseOptions?: Apollo.MutationHookOptions<PostCommentMutation, PostCommentMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<PostCommentMutation, PostCommentMutationVariables>(PostCommentDocument, options);
      }
export type PostCommentMutationHookResult = ReturnType<typeof usePostCommentMutation>;
export type PostCommentMutationResult = Apollo.MutationResult<PostCommentMutation>;
export type PostCommentMutationOptions = Apollo.BaseMutationOptions<PostCommentMutation, PostCommentMutationVariables>;
export const PostThreadDocument = gql`
    mutation PostThread($inputs: PostThreadDto!) {
  postThread(inputs: $inputs) {
    id
    title
    content
    likes
    imageUrl
  }
}
    `;
export type PostThreadMutationFn = Apollo.MutationFunction<PostThreadMutation, PostThreadMutationVariables>;

/**
 * __usePostThreadMutation__
 *
 * To run a mutation, you first call `usePostThreadMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `usePostThreadMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [postThreadMutation, { data, loading, error }] = usePostThreadMutation({
 *   variables: {
 *      inputs: // value for 'inputs'
 *   },
 * });
 */
export function usePostThreadMutation(baseOptions?: Apollo.MutationHookOptions<PostThreadMutation, PostThreadMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<PostThreadMutation, PostThreadMutationVariables>(PostThreadDocument, options);
      }
export type PostThreadMutationHookResult = ReturnType<typeof usePostThreadMutation>;
export type PostThreadMutationResult = Apollo.MutationResult<PostThreadMutation>;
export type PostThreadMutationOptions = Apollo.BaseMutationOptions<PostThreadMutation, PostThreadMutationVariables>;
export const SendMessageDocument = gql`
    mutation SendMessage($inputs: SendMessageDto!) {
  sendMessage(inputs: $inputs) {
    id
    content
    createdAt
    user {
      email
    }
    conversationId
  }
}
    `;
export type SendMessageMutationFn = Apollo.MutationFunction<SendMessageMutation, SendMessageMutationVariables>;

/**
 * __useSendMessageMutation__
 *
 * To run a mutation, you first call `useSendMessageMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useSendMessageMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [sendMessageMutation, { data, loading, error }] = useSendMessageMutation({
 *   variables: {
 *      inputs: // value for 'inputs'
 *   },
 * });
 */
export function useSendMessageMutation(baseOptions?: Apollo.MutationHookOptions<SendMessageMutation, SendMessageMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<SendMessageMutation, SendMessageMutationVariables>(SendMessageDocument, options);
      }
export type SendMessageMutationHookResult = ReturnType<typeof useSendMessageMutation>;
export type SendMessageMutationResult = Apollo.MutationResult<SendMessageMutation>;
export type SendMessageMutationOptions = Apollo.BaseMutationOptions<SendMessageMutation, SendMessageMutationVariables>;
export const UnlikeThreadDocument = gql`
    mutation UnlikeThread($threadId: Float!) {
  unlikeThread(threadId: $threadId) {
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
export type UnlikeThreadMutationFn = Apollo.MutationFunction<UnlikeThreadMutation, UnlikeThreadMutationVariables>;

/**
 * __useUnlikeThreadMutation__
 *
 * To run a mutation, you first call `useUnlikeThreadMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUnlikeThreadMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [unlikeThreadMutation, { data, loading, error }] = useUnlikeThreadMutation({
 *   variables: {
 *      threadId: // value for 'threadId'
 *   },
 * });
 */
export function useUnlikeThreadMutation(baseOptions?: Apollo.MutationHookOptions<UnlikeThreadMutation, UnlikeThreadMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UnlikeThreadMutation, UnlikeThreadMutationVariables>(UnlikeThreadDocument, options);
      }
export type UnlikeThreadMutationHookResult = ReturnType<typeof useUnlikeThreadMutation>;
export type UnlikeThreadMutationResult = Apollo.MutationResult<UnlikeThreadMutation>;
export type UnlikeThreadMutationOptions = Apollo.BaseMutationOptions<UnlikeThreadMutation, UnlikeThreadMutationVariables>;
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
export const ModifyUserDocument = gql`
    mutation ModifyUser($inputs: ModifyUserDto!) {
  updateUser(inputs: $inputs) {
    id
    firstName
    lastName
  }
}
    `;
export type ModifyUserMutationFn = Apollo.MutationFunction<ModifyUserMutation, ModifyUserMutationVariables>;

/**
 * __useModifyUserMutation__
 *
 * To run a mutation, you first call `useModifyUserMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useModifyUserMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [modifyUserMutation, { data, loading, error }] = useModifyUserMutation({
 *   variables: {
 *      inputs: // value for 'inputs'
 *   },
 * });
 */
export function useModifyUserMutation(baseOptions?: Apollo.MutationHookOptions<ModifyUserMutation, ModifyUserMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<ModifyUserMutation, ModifyUserMutationVariables>(ModifyUserDocument, options);
      }
export type ModifyUserMutationHookResult = ReturnType<typeof useModifyUserMutation>;
export type ModifyUserMutationResult = Apollo.MutationResult<ModifyUserMutation>;
export type ModifyUserMutationOptions = Apollo.BaseMutationOptions<ModifyUserMutation, ModifyUserMutationVariables>;