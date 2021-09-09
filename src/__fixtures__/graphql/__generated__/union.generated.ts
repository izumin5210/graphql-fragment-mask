// Code generated by graphql-codegen. DO NOT EDIT.
import * as Types from "../../__generated__/graphqlTypes";

import { TypedDocumentNode as DocumentNode } from "@graphql-typed-document-node/core";
export type PostImageFragment = { readonly __typename?: "Image"; readonly imageUrl: string };

export type PostVideoFragment = { readonly __typename?: "Video"; readonly videoUrl: string };

export type PostWithAttachmentsFragment = {
  readonly __typename?: "Post";
  readonly title: string;
  readonly attachmentFiles: ReadonlyArray<
    | { readonly __typename?: "Image"; readonly imageUrl: string }
    | { readonly __typename?: "Video"; readonly videoUrl: string }
  >;
};

export type GetPostWithAttachmentsQueryVariables = Types.Exact<{
  postId: Types.Scalars["String"];
}>;

export type GetPostWithAttachmentsQuery = {
  readonly __typename?: "Query";
  readonly postById: {
    readonly __typename?: "Post";
    readonly title: string;
    readonly attachmentFiles: ReadonlyArray<
      | { readonly __typename?: "Image"; readonly imageUrl: string }
      | { readonly __typename?: "Video"; readonly videoUrl: string }
    >;
  };
};

export const PostImageFragmentDoc = {
  kind: "Document",
  definitions: [
    {
      kind: "FragmentDefinition",
      name: { kind: "Name", value: "PostImage" },
      typeCondition: { kind: "NamedType", name: { kind: "Name", value: "Image" } },
      selectionSet: {
        kind: "SelectionSet",
        selections: [{ kind: "Field", name: { kind: "Name", value: "imageUrl" } }],
      },
    },
  ],
} as unknown as DocumentNode<PostImageFragment, unknown>;
export const PostVideoFragmentDoc = {
  kind: "Document",
  definitions: [
    {
      kind: "FragmentDefinition",
      name: { kind: "Name", value: "PostVideo" },
      typeCondition: { kind: "NamedType", name: { kind: "Name", value: "Video" } },
      selectionSet: {
        kind: "SelectionSet",
        selections: [{ kind: "Field", name: { kind: "Name", value: "videoUrl" } }],
      },
    },
  ],
} as unknown as DocumentNode<PostVideoFragment, unknown>;
export const PostWithAttachmentsFragmentDoc = {
  kind: "Document",
  definitions: [
    {
      kind: "FragmentDefinition",
      name: { kind: "Name", value: "PostWithAttachments" },
      typeCondition: { kind: "NamedType", name: { kind: "Name", value: "Post" } },
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          { kind: "Field", name: { kind: "Name", value: "title" } },
          {
            kind: "Field",
            name: { kind: "Name", value: "attachmentFiles" },
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "FragmentSpread", name: { kind: "Name", value: "PostImage" } },
                { kind: "FragmentSpread", name: { kind: "Name", value: "PostVideo" } },
              ],
            },
          },
        ],
      },
    },
    ...PostImageFragmentDoc.definitions,
    ...PostVideoFragmentDoc.definitions,
  ],
} as unknown as DocumentNode<PostWithAttachmentsFragment, unknown>;
export const GetPostWithAttachmentsDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "query",
      name: { kind: "Name", value: "GetPostWithAttachments" },
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
              selections: [{ kind: "FragmentSpread", name: { kind: "Name", value: "PostWithAttachments" } }],
            },
          },
        ],
      },
    },
    ...PostWithAttachmentsFragmentDoc.definitions,
  ],
} as unknown as DocumentNode<GetPostWithAttachmentsQuery, GetPostWithAttachmentsQueryVariables>;
