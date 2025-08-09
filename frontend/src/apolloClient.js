import { ApolloClient, InMemoryCache } from '@apollo/client';
import { createUploadLink } from 'apollo-upload-client';

const client = new ApolloClient({
  link: createUploadLink({
    uri: 'http://localhost:4000/graphql',
    credentials: 'include' // send cookies automatically
  }),
  cache: new InMemoryCache(),
});

export default client;
