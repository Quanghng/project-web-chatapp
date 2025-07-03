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
const WS_URL = `ws://${window.location.host}/graphql` || "ws://localhost:3333/graphql";

const API_BASE = import.meta.env.VITE_API_BASE_URL;
const GRAPHQL_HTTP = import.meta.env.VITE_GRAPHQL_HTTP_URL;
const GRAPHQL_WS = import.meta.env.VITE_GRAPHQL_WS_URL;

console.log('--- FRONTEND DEBUG: ENV VARS ---');
console.log('VITE_API_BASE_URL:', API_BASE);
console.log('VITE_GRAPHQL_HTTP_URL:', GRAPHQL_HTTP);
console.log('VITE_GRAPHQL_WS_URL:', GRAPHQL_WS);
console.log('--- END FRONTEND DEBUG ---');

const httpLink = createHttpLink({
  uri: GRAPHQL_HTTP_URL,
  credentials: "include", 
});

const wsLink = new GraphQLWsLink(createClient({
  url: WS_URL,
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
