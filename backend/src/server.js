import express from 'express';
import { ApolloServer } from 'apollo-server-express';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url'; 
import { graphqlUploadExpress } from 'graphql-upload';
import { typeDefs, resolvers } from './graphql/index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

const corsOptions = {
  origin: "http://localhost:5173",
  credentials: true
};

app.use(graphqlUploadExpress({ maxFileSize: 10000000, maxFiles: 1 }));

app.use(express.json());

app.use('/uploads', express.static(path.join(__dirname, '../uploads')));

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: ({ req }) => ({ req }),
  cors: corsOptions
});

await server.start();

server.applyMiddleware({ app, path: '/graphql' });

app.listen(4000, () => {
  console.log(`Server ready at http://localhost:4000${server.graphqlPath}`);
});
