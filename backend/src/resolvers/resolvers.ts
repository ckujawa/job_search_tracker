import { IResolvers } from 'apollo-server-express';
import { GraphQLScalarType, Kind } from 'graphql';
import { Company, JobLead, Source } from '../model/JobLeadSchema';

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
    companies: () => [{}]
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
    },
    updateNextSteps: async (obj, { nextStepInput }) => {
      const {leadId, nextContactDate, nextStep} = nextStepInput
      try {
        const updated = await Company.findByIdAndUpdate(leadId, { nextContactDate: nextContactDate, nextStep: nextStep })
        return updated
      } catch (err) {
        console.error(`something went wrong when updateing next steps: ${err.message}`)
      }
    },
    addJobCompany: async (obj, { company }) => {
      try {
        const newCompany = await Company.create({
          ...company
        })
        return newCompany
      } catch (err) {
        console.error(`We were unable to save the new company: ${err.message}`)
      }
    }, 
    addContactToCompany: async (object, { updateInfo }) => {
      let { id, newContact } = updateInfo
      try {
        const toUpdate = await Company.findById(id)
        toUpdate.contacts.push(newContact)
        await toUpdate.save()
        return toUpdate
      } catch(err) {
        console.error(`Unable to add ${newContact.firstName} ${newContact.lastNaem} to company with id ${id}: ${err.message}`)
      }
    }, 
    addSource: async (object, { source }) => {
      try {
        const added = Source.create({
          ...source
        })
        return added
      } catch (err) {
        console.error(`An error occurred when adding a new source: ${err.message}`)
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
