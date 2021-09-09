// Code generated by graphql-codegen. DO NOT EDIT.
import * as Types from "../../__generated__/graphqlTypes";

import { TypedDocumentNode as DocumentNode } from "@graphql-typed-document-node/core";
export type PostUserAvatarFragment = {
  readonly __typename?: "Post";
  readonly author: { readonly __typename?: "User"; readonly avatarUrl?: Types.Maybe<string> };
};

export type PostDetailHeaderFragment = {
  readonly __typename?: "Post";
  readonly title: string;
  readonly author: { readonly __typename?: "User"; readonly avatarUrl?: Types.Maybe<string> };
};

export type PostDetailFragment = {
  readonly __typename?: "Post";
  readonly title: string;
  readonly body: string;
  readonly author: {
    readonly __typename?: "User";
    readonly username: string;
    readonly avatarUrl?: Types.Maybe<string>;
  };
};

export type GetPostDetailQueryVariables = Types.Exact<{
  postId: Types.Scalars["String"];
}>;

export type GetPostDetailQuery = {
  readonly __typename?: "Query";
  readonly postById: {
    readonly __typename?: "Post";
    readonly id: string;
    readonly title: string;
    readonly body: string;
    readonly author: {
      readonly __typename?: "User";
      readonly username: string;
      readonly avatarUrl?: Types.Maybe<string>;
    };
  };
};

export const PostUserAvatarFragmentDoc = {
  kind: "Document",
  definitions: [
    {
      kind: "FragmentDefinition",
      name: { kind: "Name", value: "PostUserAvatar" },
      typeCondition: { kind: "NamedType", name: { kind: "Name", value: "Post" } },
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "author" },
            selectionSet: {
              kind: "SelectionSet",
              selections: [{ kind: "Field", name: { kind: "Name", value: "avatarUrl" } }],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<PostUserAvatarFragment, unknown>;
export const PostDetailHeaderFragmentDoc = {
  kind: "Document",
  definitions: [
    {
      kind: "FragmentDefinition",
      name: { kind: "Name", value: "PostDetailHeader" },
      typeCondition: { kind: "NamedType", name: { kind: "Name", value: "Post" } },
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          { kind: "Field", name: { kind: "Name", value: "title" } },
          { kind: "FragmentSpread", name: { kind: "Name", value: "PostUserAvatar" } },
        ],
      },
    },
    ...PostUserAvatarFragmentDoc.definitions,
  ],
} as unknown as DocumentNode<PostDetailHeaderFragment, unknown>;
export const PostDetailFragmentDoc = {
  kind: "Document",
  definitions: [
    {
      kind: "FragmentDefinition",
      name: { kind: "Name", value: "PostDetail" },
      typeCondition: { kind: "NamedType", name: { kind: "Name", value: "Post" } },
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          { kind: "Field", name: { kind: "Name", value: "title" } },
          { kind: "Field", name: { kind: "Name", value: "body" } },
          {
            kind: "Field",
            name: { kind: "Name", value: "author" },
            selectionSet: {
              kind: "SelectionSet",
              selections: [{ kind: "Field", name: { kind: "Name", value: "username" } }],
            },
          },
          { kind: "FragmentSpread", name: { kind: "Name", value: "PostUserAvatar" } },
        ],
      },
    },
    ...PostUserAvatarFragmentDoc.definitions,
  ],
} as unknown as DocumentNode<PostDetailFragment, unknown>;
export const GetPostDetailDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "query",
      name: { kind: "Name", value: "GetPostDetail" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: { kind: "Variable", name: { kind: "Name", value: "postId" } },
          type: { kind: "NonNullType", type: { kind: "NamedType", name: { kind: "Name", value: "String" } } },
        },
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "postById" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "postId" },
                value: { kind: "Variable", name: { kind: "Name", value: "postId" } },
              },
            ],
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "id" } },
                { kind: "FragmentSpread", name: { kind: "Name", value: "PostDetail" } },
                { kind: "FragmentSpread", name: { kind: "Name", value: "PostDetailHeader" } },
              ],
            },
          },
        ],
      },
    },
    ...PostDetailFragmentDoc.definitions,
    ...PostDetailHeaderFragmentDoc.definitions,
  ],
} as unknown as DocumentNode<GetPostDetailQuery, GetPostDetailQueryVariables>;
