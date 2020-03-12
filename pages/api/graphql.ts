require("dotenv").config();

import { ApolloServer, gql } from 'apollo-server-micro';
import * as mongoose from "mongoose";
import resolvers from "../../api/resolvers";
import typeDefs from "../../api/schema";

mongoose.connect(
  process.env.MONGO_URL,
  { useNewUrlParser: true, useCreateIndex: true },
  (err) => {
    if (err) {
      throw err;
    }
  }
);

const apolloServer = new ApolloServer({ typeDefs, resolvers });

export const config = {
  api: {
    bodyParser: false
  }
};

export default apolloServer.createHandler({ path: '/api/graphql' });
