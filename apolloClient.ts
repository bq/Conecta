import { ApolloClient } from "apollo-client";
import { InMemoryCache } from "apollo-cache-inmemory";
import { HttpLink } from "apollo-link-http";
import { setContext } from "apollo-link-context";
import nextCookie from "next-cookies";
import fetch from "isomorphic-unfetch";

export default function createApolloClient(initialState, ctx) {
  const authLink = setContext((_, { headers }) => {
    const { token } = nextCookie(ctx || {});

    return {
      headers: {
        ...headers,
        authorization: token ? `Bearer ${token}` : ""
      }
    };
  });

  return new ApolloClient({
    ssrMode: Boolean(ctx),
    link: authLink.concat(
      new HttpLink({
        uri: `${
          typeof window !== "undefined"
            ? window.location.origin
            : "http://localhost:3000"
        }/api/graphql`,
        credentials: "same-origin",
        fetch
      })
    ),
    cache: new InMemoryCache().restore(initialState)
  });
}
