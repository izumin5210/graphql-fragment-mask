// Code generated by graphql-codegen. DO NOT EDIT.
import * as Types from "../../__generated__/graphqlTypes";

import { TypedDocumentNode as DocumentNode } from "@graphql-typed-document-node/core";
import gql from "graphql-tag";
export type UserHeaderFragment = {
  readonly __typename?: "User";
  readonly username: string;
  readonly avatarUrl?: Types.Maybe<string>;
};

export type GetUserHeaderQueryVariables = Types.Exact<{
  userId: Types.Scalars["String"];
}>;

export type GetUserHeaderQuery = {
  readonly __typename?: "Query";
  readonly userById: {
    readonly __typename?: "User";
    readonly id: string;
    readonly username: string;
    readonly avatarUrl?: Types.Maybe<string>;
  };
};

export const UserHeaderFragmentDoc = {
  kind: "Document",
  definitions: [
    {
      kind: "FragmentDefinition",
      name: { kind: "Name", value: "UserHeader" },
      typeCondition: { kind: "NamedType", name: { kind: "Name", value: "User" } },
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          { kind: "Field", name: { kind: "Name", value: "username" } },
          { kind: "Field", name: { kind: "Name", value: "avatarUrl" } },
        ],
      },
    },
  ],
} as unknown as DocumentNode<UserHeaderFragment, unknown>;
export const GetUserHeaderDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "query",
      name: { kind: "Name", value: "GetUserHeader" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: { kind: "Variable", name: { kind: "Name", value: "userId" } },
          type: { kind: "NonNullType", type: { kind: "NamedType", name: { kind: "Name", value: "String" } } },
        },
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "userById" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "userId" },
                value: { kind: "Variable", name: { kind: "Name", value: "userId" } },
              },
            ],
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "id" } },
                { kind: "FragmentSpread", name: { kind: "Name", value: "UserHeader" } },
              ],
            },
          },
        ],
      },
    },
    ...UserHeaderFragmentDoc.definitions,
  ],
} as unknown as DocumentNode<GetUserHeaderQuery, GetUserHeaderQueryVariables>;
export const UserHeader = gql`
  fragment UserHeader on User {
    username
    avatarUrl
  }
`;
export const GetUserHeader = gql`
  query GetUserHeader($userId: String!) {
    userById(userId: $userId) {
      id
      ...UserHeader
    }
  }
  ${UserHeader}
`;
