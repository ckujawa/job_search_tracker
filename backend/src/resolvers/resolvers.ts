import { IResolvers } from 'apollo-server-express';
import { GraphQLScalarType, Kind } from 'graphql';

const resolvers: IResolvers = {
  Query: {
    jobLeads: () => [{}],
    jobLead: () => {},
    companies: () => [{}],
    contacts: () => [{}],
  },

  Date: new GraphQLScalarType({
    name: 'Date',
    description: "Prety self-explanatory...",
    parseValue(value) {
      // value from the client
      return new Date(value);
    },
    serialize(value) {
      // value sent to the client
      return value.getTime();
    },
    parseLiteral(ast) {
      if (ast.kind === Kind.INT) {
        return new Date(ast.value);
      }
      return null;
    },
  }),
};

export default resolvers;
