import { maskWithFragment } from "./maskWithFragment";
import * as simpleFixtures from "./__fixtures__/graphql/__generated__/simple.generated";
import * as nestedFixtures from "./__fixtures__/graphql/__generated__/nested.generated";
import * as nestedListFixtures from "./__fixtures__/graphql/__generated__/nestedList.generated";
import * as inlineFragmentFixtures from "./__fixtures__/graphql/__generated__/inlineFragment.generated";
import * as aliasFixtures from "./__fixtures__/graphql/__generated__/alias.generated";
import * as multipleFragmentsFixtures from "./__fixtures__/graphql/__generated__/multipleFragments.generated";
import * as rootListFixtures from "./__fixtures__/graphql/__generated__/rootList.generated";
import * as unionFixtures from "./__fixtures__/graphql/__generated__/union.generated";

it("returns null when 2nd arg is null", () => {
  const output = maskWithFragment(simpleFixtures.UserHeaderFragmentDoc, null);
  expectType<null>(output);
  expect(output).toBeNull();
});

it("masks query results with simple fragment", () => {
  const input: simpleFixtures.GetUserHeaderQuery = {
    __typename: "Query",
    userById: { __typename: "User", id: "123", username: "testuser", avatarUrl: null },
  };
  const output = maskWithFragment(simpleFixtures.UserHeaderFragmentDoc, input.userById);

  expect(output).toMatchInlineSnapshot(`
Object {
  "__typename": "User",
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
  const output = maskWithFragment(nestedFixtures.PostHeaderFragmentDoc, input.postById);

  expect(output).toMatchInlineSnapshot(`
Object {
  "__typename": "Post",
  "author": Object {
    "__typename": "User",
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
  const output = maskWithFragment(nestedListFixtures.PostWithCommentsFragmentDoc, input.postById);

  expect(output).toMatchInlineSnapshot(`
Object {
  "__typename": "Post",
  "body": "Foo",
  "comments": Array [
    Object {
      "__typename": "Comment",
      "body": "Hello",
    },
    Object {
      "__typename": "Comment",
      "body": "Hi",
    },
  ],
  "title": "Hi",
}
`);
});

it("masks query results with inline fragment", () => {
  const input: inlineFragmentFixtures.GetPostWithAuthorQuery = {
    __typename: "Query",
    postById: {
      __typename: "Post",
      id: "1",
      title: "Hi",
      author: { __typename: "User", username: "testuser" },
    },
  };
  const output = maskWithFragment(inlineFragmentFixtures.PostWithAuthorFragmentDoc, input.postById);

  expect(output).toMatchInlineSnapshot(`
Object {
  "__typename": "Post",
  "author": Object {
    "__typename": "User",
    "username": "testuser",
  },
  "title": "Hi",
}
`);
});

it("masks query results with fragment with alias", () => {
  const input: aliasFixtures.GetPostSummaryQuery = {
    __typename: "Query",
    postById: {
      __typename: "Post",
      id: "1",
      title: "Hi",
      body: "Hello",
      user: { __typename: "User", username: "testuser", thumbnailUrl: "http://example.com/users/123/thumbnail.png" },
    },
  };
  const output = maskWithFragment(aliasFixtures.PostSummaryFragmentDoc, input.postById);

  expect(output).toMatchInlineSnapshot(`
Object {
  "__typename": "Post",
  "body": "Hello",
  "title": "Hi",
  "user": Object {
    "__typename": "User",
    "thumbnailUrl": "http://example.com/users/123/thumbnail.png",
    "username": "testuser",
  },
}
`);
});

it("masks query results with multiple fragments", () => {
  const input: multipleFragmentsFixtures.GetPostDetailQuery = {
    __typename: "Query",
    postById: {
      __typename: "Post",
      id: "1",
      title: "Hi",
      body: "foo",
      author: { __typename: "User", username: "testuser", avatarUrl: null },
    },
  };

  const detail = maskWithFragment(multipleFragmentsFixtures.PostDetailFragmentDoc, input.postById);
  expect(detail).toMatchInlineSnapshot(`
Object {
  "__typename": "Post",
  "author": Object {
    "__typename": "User",
    "avatarUrl": null,
    "username": "testuser",
  },
  "body": "foo",
  "title": "Hi",
}
`);

  const detailHeader = maskWithFragment(multipleFragmentsFixtures.PostDetailHeaderFragmentDoc, input.postById);
  expect(detailHeader).toMatchInlineSnapshot(`
Object {
  "__typename": "Post",
  "author": Object {
    "__typename": "User",
    "avatarUrl": null,
  },
  "title": "Hi",
}
`);
});

it("masks list query results with fragment", () => {
  const input: rootListFixtures.ListPostsQuery = {
    __typename: "Query",
    postsByUserId: [
      {
        __typename: "Post",
        id: "1",
        title: "Hi",
        author: { __typename: "User", id: "123", username: "testuser", avatarUrl: null },
      },
      {
        __typename: "Post",
        id: "2",
        title: "Hello",
        author: { __typename: "User", id: "124", username: "debuguser", avatarUrl: null },
      },
    ],
  };
  const output = maskWithFragment(rootListFixtures.PostListItemFragmentDoc, input.postsByUserId);

  expect(output).toMatchInlineSnapshot(`
Array [
  Object {
    "__typename": "Post",
    "author": Object {
      "__typename": "User",
      "avatarUrl": null,
      "id": "123",
      "username": "testuser",
    },
    "title": "Hi",
  },
  Object {
    "__typename": "Post",
    "author": Object {
      "__typename": "User",
      "avatarUrl": null,
      "id": "124",
      "username": "debuguser",
    },
    "title": "Hello",
  },
]
`);
});

it("masks list query results with fragment", () => {
  const input: unionFixtures.GetPostWithAttachmentsQuery = {
    __typename: "Query",
    postById: {
      __typename: "Post",
      title: "Hi",
      attachmentFiles: [
        { __typename: "Image", imageUrl: "https://example.com/posts/1/images/1" },
        { __typename: "Video", videoUrl: "https://example.com/posts/1/videos/2" },
        { __typename: "Image", imageUrl: "https://example.com/posts/1/images/2" },
      ],
    },
  };
  const output = maskWithFragment(unionFixtures.PostWithAttachmentsFragmentDoc, input.postById);

  expect(output).toMatchInlineSnapshot(`
Object {
  "__typename": "Post",
  "attachmentFiles": Array [
    Object {
      "__typename": "Image",
      "imageUrl": "https://example.com/posts/1/images/1",
    },
    Object {
      "__typename": "Video",
      "videoUrl": "https://example.com/posts/1/videos/2",
    },
    Object {
      "__typename": "Image",
      "imageUrl": "https://example.com/posts/1/images/2",
    },
  ],
  "title": "Hi",
}
`);
});

const expectType = <T>(_value: T) => {
  /* no-op */
};

describe("types", () => {
  const input: simpleFixtures.GetUserHeaderQuery = {
    __typename: "Query",
    userById: { __typename: "User", id: "123", username: "testuser", avatarUrl: null },
  };

  describe("with typed document node", () => {
    it("returns a masked result with a valid type", () => {
      const output = maskWithFragment(simpleFixtures.UserHeaderFragmentDoc, input.userById);
      expectType<simpleFixtures.UserHeaderFragment>(output);
    });

    it("has type error when 2nd argument is not a subset type of the return value", () => {
      expect(() => {
        // @ts-expect-error: 2nd argument has invalid type
        maskWithFragment(simpleFixtures.UserHeaderFragmentDoc, {});
      }).toThrowError();
    });
  });

  describe("with document node", () => {
    it("returns a masked result with a record when type parameter is not specified", () => {
      const output = maskWithFragment(simpleFixtures.UserHeader, input.userById);
      expectType<Record<string, unknown>>(output);
    });

    it("returns a masked result with a valid type when type parameter is specified", () => {
      const output = maskWithFragment<simpleFixtures.UserHeaderFragment>(simpleFixtures.UserHeader, input.userById);
      expectType<simpleFixtures.UserHeaderFragment>(output);
    });

    it("has type error when 2nd argument is not a subset type of the return value", () => {
      expect(() => {
        // @ts-expect-error: 2nd argument has invalid type
        maskWithFragment<simpleFixtures.UserHeaderFragment>(simpleFixtures.UserHeader, {});
      }).toThrowError();
    });
  });
});
