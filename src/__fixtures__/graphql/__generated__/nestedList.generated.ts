// Code generated by graphql-codegen. DO NOT EDIT.
import * as Types from "../../__generated__/graphqlTypes";

import { TypedDocumentNode as DocumentNode } from "@graphql-typed-document-node/core";
import gql from "graphql-tag";
export type PostWithCommentsFragment = {
  readonly __typename?: "Post";
  readonly title: string;
  readonly body: string;
  readonly comments: ReadonlyArray<{ readonly __typename?: "Comment"; readonly body: string }>;
};

export type GetPostWithCommentsQueryVariables = Types.Exact<{
  postId: Types.Scalars["String"];
}>;

export type GetPostWithCommentsQuery = {
  readonly __typename?: "Query";
  readonly postById: {
    readonly __typename?: "Post";
    readonly id: string;
    readonly title: string;
    readonly body: string;
    readonly comments: ReadonlyArray<{ readonly __typename?: "Comment"; readonly id: string; readonly body: string }>;
  };
};

export const PostWithCommentsFragmentDoc = {
  kind: "Document",
  definitions: [
    {
      kind: "FragmentDefinition",
      name: { kind: "Name", value: "PostWithComments" },
      typeCondition: { kind: "NamedType", name: { kind: "Name", value: "Post" } },
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          { kind: "Field", name: { kind: "Name", value: "title" } },
          { kind: "Field", name: { kind: "Name", value: "body" } },
          {
            kind: "Field",
            name: { kind: "Name", value: "comments" },
            selectionSet: {
              kind: "SelectionSet",
              selections: [{ kind: "Field", name: { kind: "Name", value: "body" } }],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<PostWithCommentsFragment, unknown>;
export const GetPostWithCommentsDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "query",
      name: { kind: "Name", value: "GetPostWithComments" },
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
                {
                  kind: "Field",
                  name: { kind: "Name", value: "comments" },
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [{ kind: "Field", name: { kind: "Name", value: "id" } }],
                  },
                },
                { kind: "FragmentSpread", name: { kind: "Name", value: "PostWithComments" } },
              ],
            },
          },
        ],
      },
    },
    ...PostWithCommentsFragmentDoc.definitions,
  ],
} as unknown as DocumentNode<GetPostWithCommentsQuery, GetPostWithCommentsQueryVariables>;
export const PostWithComments = gql`
  fragment PostWithComments on Post {
    title
    body
    comments {
      body
    }
  }
`;
export const GetPostWithComments = gql`
  query GetPostWithComments($postId: String!) {
    postById(postId: $postId) {
      id
      comments {
        id
      }
      ...PostWithComments
    }
  }
  ${PostWithComments}
`;
