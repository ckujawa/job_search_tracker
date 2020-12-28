import express from 'express';
import { ApolloServer } from 'apollo-server-express';
import typeDefs from './schema/schema';
import resolvers from './resolvers/resolvers';

const server = new ApolloServer({ typeDefs, resolvers });

const app = express();

server.applyMiddleware({ app });

app.listen(3000, () => { console.log('The api is now available on port 3000'); });

//generate uuid's for object using uuidjs