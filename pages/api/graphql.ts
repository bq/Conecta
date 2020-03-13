require("dotenv").config();

import { ApolloServer, gql } from 'apollo-server-micro';
import * as mongoose from "mongoose";
import jwt from "jsonwebtoken";
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

const apolloServer = new ApolloServer({
  typeDefs,
  resolvers,
  context: async ({ req }) => {
    try {
      const authorization = req.headers.authorization || "";
      const token = authorization.split(" ")[1];
      const { userEmail } = await jwt.verify(token, process.env.JWT_SECRET);
      return { userEmail }
    } catch (e) {
      return {};
    }
  }
});

export const config = {
  api: {
    bodyParser: false
  }
};

export default apolloServer.createHandler({ path: '/api/graphql' });
