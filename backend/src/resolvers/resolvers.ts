import { IResolvers } from 'apollo-server-express';
import { GraphQLScalarType, Kind } from 'graphql';
import Company from '../database/model/Company';
import Contact from '../database/model/Contact';
import JobLead from '../database/model/JobLead';

const resolvers: IResolvers = {
  Query: {
    jobLeads: async () => {
      const jobLeads: JobLead[] = await JobLead.query()

      return jobLeads
    },
    jobLead: async (parent, args, ctx) => {
      const jobLead: JobLead = await JobLead.query().findById(args.id)

      return jobLead
    },
    companies: async () => {
      const companies: Company[] = await Company.query()

      return companies
    },
    company: async (parent, args, ctx) => {
      const company: Company = await Company.query().findById(args.id)

      return company
    },
    contacts: async () => {
      const contacts: Contact[] = await Contact.query()

      return contacts
    },
    contact: async (parent, args, ctx) => {
      const contact: Contact = await Contact.query().findById(args.id)

      return contact
    }
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
