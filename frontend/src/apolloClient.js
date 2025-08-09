import { ApolloClient, InMemoryCache } from '@apollo/client';
import { createUploadLink } from 'apollo-upload-client';

const backendUrl = process.env.REACT_APP_BACKEND_URL;

const client = new ApolloClient({
  link: createUploadLink({
    uri: `${backendUrl}`,
    credentials: 'include' // send cookies automatically
  }),
  cache: new InMemoryCache(),
});

export default client;
