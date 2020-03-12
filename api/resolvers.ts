import { ApolloError, AuthenticationError } from "apollo-server-micro";
import bcrypt from "bcrypt";
import { UserModel } from "./models/user";

const resolvers = {
  Query: {
  },
  Mutation: {
    signUp: async (root: any, args: any, context: any) => {
      const currentUser = await UserModel.findOne({
        email: args.email
      });
      if (currentUser) {
        throw new ApolloError("This user already exists", "USER_EXISTS");
      }

      const password = await bcrypt.hash(args.password, 7);
      const newUser = new UserModel({
        email: args.email,
        password,
        isVolunteer: args.isVolunteer,
        name: args.name,
        phone: args.phone
      });

      await UserModel.create(newUser);
    }
  }
};

export default resolvers;
