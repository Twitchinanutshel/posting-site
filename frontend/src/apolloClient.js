import { ApolloClient, InMemoryCache } from '@apollo/client';
import { createUploadLink } from 'apollo-upload-client';


const client = new ApolloClient({
  link: createUploadLink({
    uri: 'https://posting-site-noahgauci-76f8b67cb3a2.herokuapp.com/graphql',
    credentials: 'include' // send cookies automatically
  }),
  cache: new InMemoryCache(),
});

export default client;
