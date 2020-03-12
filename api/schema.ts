import { gql } from "apollo-server-micro";

const typeDefs = gql`
  type Query {
    me: User
    matchUsers: [User]
    partialMatchUsers: [User]
    allUsers: [User]
  }

  type Mutation {
    signUp(
      email: String!
      password: String!
      isVolunteer: Boolean
      name: String
      phone: String
    ): String
    login(email: String!, password: String!): String
  }

  type User {
    id: ID
    email: String
    name: String
    phone: String
    availability: TimeTable
    request: TimeTable
    isVolunteer: Boolean
  }

  type TimeTable {
    L: [Int]
    M: [Int]
    X: [Int]
    J: [Int]
    V: [Int]
    S: [Int]
    D: [Int]
  }
`;

export default typeDefs;
