import { IResolvers } from 'apollo-server-express';
import { GraphQLScalarType, Kind } from 'graphql';
import { JobLead } from '../model/JobLeadSchema';

const resolvers: IResolvers = {
  Query: {
    jobLeads: async () => {
      try {
        const leads = await JobLead.find()
        return leads
      } catch (err) {
        //nope.
      }
    },
    jobLeadById: async (obj, args) => {
      try {
        const lead = await JobLead.findById(args.id)
        return lead
      } catch (err) {
        //barf...
      }
    },
    companies: () => [{}],
    contacts: () => [{}],
  },

  Mutation: {
    addJobLead: async (obj, { jobLead }, context) => {
      try{
        const lead = await JobLead.create({
          ...jobLead
        })
        return lead
      } catch (err) {
        //barf
        console.error(`We were unable to save the jobLead: ${err.message}`)
      }
    }
  },

  Date: new GraphQLScalarType({
    name: 'Date',
    description: "it's a date, deal with it",
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
