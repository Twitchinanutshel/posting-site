import express from 'express';
import { ApolloServer } from 'apollo-server-express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import path from 'path';
import { fileURLToPath } from 'url';
import { graphqlUploadExpress } from 'graphql-upload';
import { typeDefs, resolvers } from './graphql/index.js';
import { verifyToken } from './graphql/utils/auth.js';
import fs from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

app.use(cookieParser())

app.get('/uploads/:filename', (req, res) => {
  try {
    verifyToken(req); 

    const filePath = path.join(process.cwd(), 'uploads', req.params.filename);
    if (!fs.existsSync(filePath)) {
      return res.status(404).send('File not found');
    }

    res.sendFile(filePath);
  } catch (err) {
    return res.status(403).json({ error: 'Unauthorized' });
  }
});

const allowedOrigin = 'https://mariandnoahmemories.netlify.app';
app.options('/graphql', cors({
  origin: allowedOrigin,
  credentials: true,
}));
app.use(cors({
  origin: allowedOrigin,
  credentials: true
}))

app.use(graphqlUploadExpress({ maxFileSize: 10000000, maxFiles: 1 }));

app.use(express.json());


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
