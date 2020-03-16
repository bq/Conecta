import { gql } from "apollo-server-micro";

const typeDefs = gql`
  type Query {
    me: User
    matchUsers: [User]
    allUsers: [User]
    getUser(email: String!): User
  }

  type Mutation {
    signUp(
      email: String!
      password: String!
      isVolunteer: Boolean
      name: String
      phone: String
      dni: String!
      availability: TimeTableInput
      services: ServicesInput
    ): String
    login(email: String!, password: String!): String
    updateProfile(
      name: String
      phone: String
      dni: String
      availability: TimeTableInput,
      services: ServicesInput
    ): User
  }

  type User {
    id: ID
    email: String
    name: String
    phone: String
    dni: String
    availability: TimeTable
    isVolunteer: Boolean
    services: Services
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

  input TimeTableInput {
    L: [Int]
    M: [Int]
    X: [Int]
    J: [Int]
    V: [Int]
    S: [Int]
    D: [Int]
  }

  type Services {
    childCare: Boolean
    shopping: Boolean
    pharmacy: Boolean
    laundry: Boolean
    call: Boolean
    other: Boolean
    otherText: String
  }

  input ServicesInput {
    childCare: Boolean
    shopping: Boolean
    pharmacy: Boolean
    laundry: Boolean
    call: Boolean
    other: Boolean
    otherText: String
  }
`;

export default typeDefs;
