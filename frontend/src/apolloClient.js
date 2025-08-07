import { ApolloClient, InMemoryCache, ApolloLink } from '@apollo/client';
import { createUploadLink } from 'apollo-upload-client';
import { setContext } from '@apollo/client/link/context';

// Middleware to attach token to headers
const authLink = setContext((_, { headers }) => {
  const token = sessionStorage.getItem('token');
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
    }
  };
});

// Upload link (supports file uploads)
const uploadLink = createUploadLink({
  uri: 'http://localhost:4000/graphql',
});

// Combine auth and upload links
const client = new ApolloClient({
  link: ApolloLink.from([authLink, uploadLink]),
  cache: new InMemoryCache(),
});

export default client;
