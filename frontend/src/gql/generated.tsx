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

export type ModifyUserDto = {
  firstName: Scalars['String']['input'];
  lastName: Scalars['String']['input'];
  userId: Scalars['Int']['input'];
};

export type Mutation = {
  __typename?: 'Mutation';
  addParticipantToConversation: Conversation;
  createConversation: Conversation;
  sendMessage: Message;
  updateUser: User;
};


export type MutationAddParticipantToConversationArgs = {
  conversationId: Scalars['Int']['input'];
  userId: Scalars['Int']['input'];
};


export type MutationCreateConversationArgs = {
  inputs: CreateConversationDto;
};


export type MutationSendMessageArgs = {
  inputs: SendMessageDto;
};


export type MutationUpdateUserArgs = {
  inputs: ModifyUserDto;
};

export type Query = {
  __typename?: 'Query';
  getConversation?: Maybe<Conversation>;
  getConversations: Array<Conversation>;
  getConversationsByUser: Array<Conversation>;
  getMessagesByConversation: Array<Message>;
  getUser: User;
  users: Array<User>;
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

/** user */
export type User = {
  __typename?: 'User';
  createdAt: Scalars['DateTime']['output'];
  email: Scalars['String']['output'];
  firstName?: Maybe<Scalars['String']['output']>;
  hash: Scalars['String']['output'];
  id: Scalars['Int']['output'];
  lastName?: Maybe<Scalars['String']['output']>;
  refreshToken?: Maybe<Scalars['String']['output']>;
  updatedAt: Scalars['DateTime']['output'];
};

export type CreateConversationMutationVariables = Exact<{
  inputs: CreateConversationDto;
}>;


export type CreateConversationMutation = { __typename?: 'Mutation', createConversation: { __typename?: 'Conversation', id: number, name?: string | null, createdAt: any, updatedAt: any, participants: Array<{ __typename?: 'ConversationParticipant', user: { __typename?: 'User', id: number, email: string, firstName?: string | null, lastName?: string | null } }> } };

export type GetConversationsByUserQueryVariables = Exact<{
  userId: Scalars['Int']['input'];
}>;


export type GetConversationsByUserQuery = { __typename?: 'Query', getConversationsByUser: Array<{ __typename?: 'Conversation', id: number, name?: string | null, createdAt: any, updatedAt: any, participants: Array<{ __typename?: 'ConversationParticipant', user: { __typename?: 'User', id: number, email: string, firstName?: string | null, lastName?: string | null } }> }> };

export type GetMessagesByConversationQueryVariables = Exact<{
  conversationId: Scalars['Int']['input'];
}>;


export type GetMessagesByConversationQuery = { __typename?: 'Query', getMessagesByConversation: Array<{ __typename?: 'Message', id: number, content: string, createdAt: any, conversationId: number, user: { __typename?: 'User', id: number, email: string } }> };

export type GetUsersQueryVariables = Exact<{ [key: string]: never; }>;


export type GetUsersQuery = { __typename?: 'Query', users: Array<{ __typename?: 'User', id: number, email: string, firstName?: string | null, lastName?: string | null }> };

export type SendMessageMutationVariables = Exact<{
  inputs: SendMessageDto;
}>;


export type SendMessageMutation = { __typename?: 'Mutation', sendMessage: { __typename?: 'Message', id: number, content: string, createdAt: any, conversationId: number, user: { __typename?: 'User', email: string } } };

export type ModifyUserMutationVariables = Exact<{
  inputs: ModifyUserDto;
}>;


export type ModifyUserMutation = { __typename?: 'Mutation', updateUser: { __typename?: 'User', id: number, firstName?: string | null, lastName?: string | null } };


export const CreateConversationDocument = gql`
    mutation CreateConversation($inputs: CreateConversationDto!) {
  createConversation(inputs: $inputs) {
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
export type CreateConversationMutationFn = Apollo.MutationFunction<CreateConversationMutation, CreateConversationMutationVariables>;

/**
 * __useCreateConversationMutation__
 *
 * To run a mutation, you first call `useCreateConversationMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateConversationMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createConversationMutation, { data, loading, error }] = useCreateConversationMutation({
 *   variables: {
 *      inputs: // value for 'inputs'
 *   },
 * });
 */
export function useCreateConversationMutation(baseOptions?: Apollo.MutationHookOptions<CreateConversationMutation, CreateConversationMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateConversationMutation, CreateConversationMutationVariables>(CreateConversationDocument, options);
      }
export type CreateConversationMutationHookResult = ReturnType<typeof useCreateConversationMutation>;
export type CreateConversationMutationResult = Apollo.MutationResult<CreateConversationMutation>;
export type CreateConversationMutationOptions = Apollo.BaseMutationOptions<CreateConversationMutation, CreateConversationMutationVariables>;
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
      id
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