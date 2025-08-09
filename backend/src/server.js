import express from 'express';
import { ApolloServer } from 'apollo-server-express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import path from 'path';
import { fileURLToPath } from 'url';
import { graphqlUploadExpress } from 'graphql-upload';
import { typeDefs, resolvers } from './graphql/index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

app.use(cookieParser())
app.use(cors({
  origin: 'https://mariandnoahmemories.netlify.app',
  credentials: true
}))

app.use(graphqlUploadExpress({ maxFileSize: 10000000, maxFiles: 1 }));

app.use(express.json());

app.use('/uploads', express.static(path.join(__dirname, '../uploads')));

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: ({ req, res }) => ({ req, res }),
});

await server.start();

server.applyMiddleware({
  app,
  path: '/graphql',
  cors: false
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
