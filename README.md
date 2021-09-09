# graphql-fragment-mask
[![CI](https://github.com/izumin5210/graphql-fragment-mask/actions/workflows/ci.yml/badge.svg)](https://github.com/izumin5210/graphql-fragment-mask/actions/workflows/ci.yml)
[![Coverage Status](https://coveralls.io/repos/github/izumin5210/graphql-fragment-mask/badge.svg?branch=main)](https://coveralls.io/github/izumin5210/graphql-fragment-mask?branch=main)
[![npm](https://img.shields.io/npm/v/graphql-fragment-mask)](https://www.npmjs.com/package/graphql-fragment-mask)
[![LICENSE](https://img.shields.io/github/license/izumin5210/graphql-fragment-mask)](./LICENSE)

Mask GraphQL query result with Fragment with [TypedDocumentNode](https://the-guild.dev/blog/typed-document-node) ([graphql-anywhere](https://www.npmjs.com/package/graphql-anywhere) alternative)

## Usage

```ts
import gql from "graphql-tag";
import { PostHeaderFragmentDoc, GetPostDocument } from "./__generated__/Post.generated";

const _POST_HEADER = gql`
  fragment PostHeader on Post {
    title
    author {
      fullName
      avatarUrl
    }
  }
`;

const _POST_DETAIL = gql`
  fragment PostDetail on Post {
    id
    title
    body
    author {
      id
      username
      fullName
      avatarUrl
    }
  }
`;

const _GET_GREETING = gql`
  query GetPost($postId: !String) {
    postById(postId: $postId) {
      ...PostHeader
      ...PostDetail
    }
  }
`;

// ...

const [data] = useQuery(GetPostDocument, { variables: { postId: "123" } });

const header = maskWithFragment(PostHeaderFragmentDoc, data.postById);
// {
//   __typename: "Post",
//   title: "Hello, GraphQL!",
//   author: {
//     __typename: "User",
//     fullName: "Masayuki Izumi",
//     avatarUrl: "https://example.com/users/izumin5210/avatar",
//   }
// }
```

## Dependencies

Install this library with [graphql-js](https://github.com/graphql/graphql-js/) and [graphql-typed-document-node](https://github.com/dotansimha/graphql-typed-document-node):

```
yarn add graphql @graphql-typed-document-node/core graphql-fragment-mask
```

And setup [graphql-code-generator](https://www.graphql-code-generator.com) with [TypedDocumentNode plugin](https://www.graphql-code-generator.com/docs/plugins/typed-document-node) (please refer [TypedDocumentNode's instruction](https://github.com/dotansimha/graphql-typed-document-node#how-to-use)).
