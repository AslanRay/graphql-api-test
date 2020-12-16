import express from 'express';
import cors from 'cors';
import compression from 'compression';
import { createServer } from 'http';
import { ApolloServer } from 'apollo-server-express';
import expressPlayground from 'graphql-playground-middleware-express';
import schema from './schema';

const app = express();

app.use('*', cors());

app.use(compression());

const servidor = new ApolloServer({
  schema,
  introspection: true
});

servidor.applyMiddleware({ app });

app.get('/', expressPlayground({
  endpoint: '/graphql'
}));

const httpServer = createServer(app);

const PORT = 5200;

httpServer.listen({port: PORT}, () => console.log(`API en http://localhost:${PORT}/graphql`));