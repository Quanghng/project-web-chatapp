import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import { ApolloClient, InMemoryCache, ApolloProvider, createHttpLink, split } from "@apollo/client";
import { BrowserRouter } from "react-router-dom";
import "./index.css"; 
import { setContext } from "@apollo/client/link/context";
import { GraphQLWsLink } from "@apollo/client/link/subscriptions";
import { createClient } from "graphql-ws";
import { getMainDefinition } from "@apollo/client/utilities";


const GRAPHQL_HTTP_URL = import.meta.env.VITE_GRAPHQL_HTTP_URL || "http://localhost:3333/graphql";
const GRAPHQL_WS_URL = import.meta.env.VITE_GRAPHQL_WS_URL || "ws://localhost:3333/graphql";


const httpLink = createHttpLink({
  uri: GRAPHQL_HTTP_URL,
  credentials: "include", 
});

const wsLink = new GraphQLWsLink(createClient({
  url: GRAPHQL_WS_URL,
  connectionParams: () => {
    const token = localStorage.getItem('accessToken');
    return {
      Authorization: token ? `Bearer ${token}` : '',
    };
  },
}));

const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem("accessToken");
  return {
    headers: {
      ...headers,
      Authorization: token ? `Bearer ${token}` : "",
    },
  };
});

const splitLink = split(
  ({ query }) => {
    const definition = getMainDefinition(query);
    return (
      definition.kind === "OperationDefinition" &&
      definition.operation === "subscription"
    );
  },
  wsLink,
  authLink.concat(httpLink)
);

export const client = new ApolloClient({
  link: splitLink,
  cache: new InMemoryCache(),
});

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <ApolloProvider client={client}>
        <App />
      </ApolloProvider>
    </BrowserRouter>
  </StrictMode>
);
