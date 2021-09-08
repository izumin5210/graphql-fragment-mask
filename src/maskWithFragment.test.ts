import { maskWithFragment } from "./maskWithFragment";
import * as simpleFixtures from "./__fixtures__/graphql/__generated__/simple.generated";
import * as nestedFixtures from "./__fixtures__/graphql/__generated__/nested.generated";
import * as nestedListFixtures from "./__fixtures__/graphql/__generated__/nestedList.generated";

it("masks query results with simple fragment", () => {
  const input: simpleFixtures.GetUserHeaderQuery = {
    __typename: "Query",
    userById: { __typename: "User", id: "123", username: "testuser", avatarUrl: null },
  };
  const output: simpleFixtures.UserHeaderFragment = maskWithFragment(
    simpleFixtures.UserHeaderFragmentDoc,
    input.userById
  );

  expect(output).toMatchInlineSnapshot(`
Object {
  "avatarUrl": null,
  "username": "testuser",
}
`);
});

it("masks query results with nested fragment", () => {
  const input: nestedFixtures.GetPostHeaderQuery = {
    __typename: "Query",
    postById: {
      __typename: "Post",
      id: "1",
      title: "Hi",
      author: { __typename: "User", id: "123", username: "testuser", avatarUrl: null },
    },
  };
  const output: nestedFixtures.PostHeaderFragment = maskWithFragment(
    nestedFixtures.PostHeaderFragmentDoc,
    input.postById
  );

  expect(output).toMatchInlineSnapshot(`
Object {
  "author": Object {
    "avatarUrl": null,
    "username": "testuser",
  },
  "title": "Hi",
}
`);
});

it("masks query results with nested fragment with list fields", () => {
  const input: nestedListFixtures.GetPostWithCommentsQuery = {
    __typename: "Query",
    postById: {
      __typename: "Post",
      id: "1",
      title: "Hi",
      body: "Foo",
      comments: [
        { __typename: "Comment", id: "1", body: "Hello" },
        { __typename: "Comment", id: "2", body: "Hi" },
      ],
    },
  };
  const output: nestedListFixtures.PostWithCommentsFragment = maskWithFragment(
    nestedListFixtures.PostWithCommentsFragmentDoc,
    input.postById
  );

  expect(output).toMatchInlineSnapshot(`
Object {
  "body": "Foo",
  "comments": Array [
    Object {
      "body": "Hello",
    },
    Object {
      "body": "Hi",
    },
  ],
  "title": "Hi",
}
`);
});
