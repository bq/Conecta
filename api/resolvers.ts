import { ApolloError, AuthenticationError } from "apollo-server-micro";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { UserModel } from "./models/user";

const daysOfWeek = ["L", "M", "X", "J", "V", "S", "D"];

const resolvers = {
  Query: {
    me: async (root: any, args: any, context: any) => {
      if (!context || !context.userEmail) {
        throw new ApolloError("Invalid token", "INVALID_TOKEN");
      }

      const user = await UserModel.findOne({ email: context.userEmail });

      return {
        email: user.email,
        isVolunteer: user.isVolunteer
      };
    },
    matchUsers: async (root: any, args: any, context: any) => {
      if (!context || !context.userEmail) {
        throw new ApolloError("Invalid token", "INVALID_TOKEN");
      }

      const user = await UserModel.findOne({ email: context.userEmail });

      const query = {
        isVolunteer: !user.isVolunteer,
      };
      daysOfWeek.forEach(day => {
        if (user.availability[day] && user.availability[day].length) {
          query[`availability.${day}`] = { $all: user.availability[day] };
        }
      });

      const users = await UserModel.find(query);

      return users.map(u => ({
        id: u._id,
        email: u.email,
        name: u.name,
        phone: u.phone,
        dni: u.dni,
        availability: u.availability,
        isVolunteer: u.isVolunteer
      }));
    },
    allUsers: async (root: any, args: any, context: any) => {
      if (!context || !context.userEmail) {
        throw new ApolloError("Invalid token", "INVALID_TOKEN");
      }

      const user = await UserModel.findOne({ email: context.userEmail });
      const users = await UserModel.find({ isVolunteer: !user.isVolunteer });

      return users.map(u => ({
        id: u._id,
        email: u.email,
        name: u.name,
        phone: u.phone,
        availability: u.availability,
        isVolunteer: u.isVolunteer
      }));
    }
  },
  Mutation: {
    login: async (root: any, args: any, context: any) => {
      const user = await UserModel.findOne({
        email: args.email
      });
      if (!user) {
        throw new ApolloError(
          "Email or password incorrect",
          "WRONG_EMAIL_OR_PASSWORD"
        );
      }

      const valid: boolean = await bcrypt.compare(args.password, user.password);
      if (!valid) {
        throw new ApolloError(
          "Email or password incorrect",
          "WRONG_EMAIL_OR_PASSWORD"
        );
      }

      return jwt.sign({ userEmail: user.email }, process.env.JWT_SECRET);
    },
    signUp: async (root: any, args: any, context: any) => {
      const currentUser = await UserModel.findOne({
        email: args.email
      });
      if (currentUser) {
        throw new ApolloError("This user already exists", "USER_EXISTS");
      }

      const password = await bcrypt.hash(args.password, 7);
      const user = new UserModel({
        email: args.email,
        password,
        isVolunteer: args.isVolunteer,
        name: args.name,
        phone: args.phone,
        dni: args.dni,
        availability: args.availability
      });

      const newUser = await UserModel.create(user);
      return jwt.sign({ userEmail: newUser.email }, process.env.JWT_SECRET);
    }
  }
};

export default resolvers;
