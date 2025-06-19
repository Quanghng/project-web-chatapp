/* eslint-disable */
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  /** A date-time string at UTC, such as 2019-12-03T09:54:33Z, compliant with the date-time format. */
  DateTime: { input: any; output: any; }
};

export type AuthResponse = {
  __typename?: 'AuthResponse';
  accessToken: Scalars['String']['output'];
  refreshToken: Scalars['String']['output'];
};

export type CommentModel = {
  __typename?: 'CommentModel';
  content: Scalars['String']['output'];
  createdAt: Scalars['DateTime']['output'];
  id: Scalars['Int']['output'];
  likes: Scalars['Int']['output'];
  post: PostModel;
  postId: Scalars['Int']['output'];
  updatedAt: Scalars['DateTime']['output'];
  user: UserModel;
  userId: Scalars['Int']['output'];
};

export type Mutation = {
  __typename?: 'Mutation';
  createPost: PostModel;
  login: AuthResponse;
  register: AuthResponse;
};


export type MutationCreatePostArgs = {
  content: Scalars['String']['input'];
  title: Scalars['String']['input'];
};


export type MutationLoginArgs = {
  email: Scalars['String']['input'];
  password: Scalars['String']['input'];
};


export type MutationRegisterArgs = {
  email: Scalars['String']['input'];
  password: Scalars['String']['input'];
};

export type PostModel = {
  __typename?: 'PostModel';
  comments?: Maybe<Array<CommentModel>>;
  content: Scalars['String']['output'];
  createdAt: Scalars['DateTime']['output'];
  id: Scalars['Int']['output'];
  likes: Scalars['Int']['output'];
  title: Scalars['String']['output'];
  updatedAt: Scalars['DateTime']['output'];
  user: UserModel;
  userId: Scalars['Int']['output'];
};

export type Query = {
  __typename?: 'Query';
  posts: Array<PostModel>;
  user?: Maybe<UserModel>;
  users: Array<UserModel>;
};


export type QueryUserArgs = {
  id: Scalars['Int']['input'];
};

export type UserModel = {
  __typename?: 'UserModel';
  comments?: Maybe<Array<CommentModel>>;
  createdAt: Scalars['DateTime']['output'];
  email: Scalars['String']['output'];
  hash: Scalars['String']['output'];
  id: Scalars['Int']['output'];
  posts?: Maybe<Array<PostModel>>;
  updatedAt: Scalars['DateTime']['output'];
};

export type GetPostsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetPostsQuery = { __typename?: 'Query', posts: Array<{ __typename?: 'PostModel', id: number, title: string, content: string, likes: number, user: { __typename?: 'UserModel', email: string }, comments?: Array<{ __typename?: 'CommentModel', id: number, content: string, user: { __typename?: 'UserModel', email: string } }> | null }> };


export const GetPostsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetPosts"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"posts"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"content"}},{"kind":"Field","name":{"kind":"Name","value":"likes"}},{"kind":"Field","name":{"kind":"Name","value":"user"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"email"}}]}},{"kind":"Field","name":{"kind":"Name","value":"comments"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"content"}},{"kind":"Field","name":{"kind":"Name","value":"user"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"email"}}]}}]}}]}}]}}]} as unknown as DocumentNode<GetPostsQuery, GetPostsQueryVariables>;