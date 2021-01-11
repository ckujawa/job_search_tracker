import { ApolloServer, gql } from 'apollo-server-express'
import { GraphQLScalarType } from 'graphql'

const typeDefs = gql`
    scalar Date

    enum Status {
        RESUME_SENT
        PHONE_INT_SCHEDULED
        PHONE_INT_FOLLOWUP
        INTERVIEW_SCHEDULED
        INTERVIEW_FOLLOWUP
        OFFER_MADE
        OFFER_ACCEPTED
        DECLINED
    }

    type Contact{
      id: String
      firstName: String
      lastName: String
      title: String
      email: String
      phone: String
      additionalNotes: String
    }

    type Company{
      id: String
      name: String
      city: String
      state: String
      url: String
      contacts: [Contact]
    }

    type Source{
      id: String
      name: String!
      url: String!
      jobLeadIds: [String]
    }

    type JobLead {
      id: String
      title: String!
      companyId: String!
      firstContactDate: Date!
      lastContactDate: Date!
      nextContactDate: Date
      nextStep: String
      status: Status
      sourceId: String!
      url: String!
      description: String!
    }

    type Query {
      jobLeads: [JobLead]
      jobLeadById(id: String): JobLead
      companies: [Company]
      sources: [Source]
    }

    input ContactInput {
      id: String
      firstName: String
      lastName: String
      title: String
      email: String
      phone: String
      additionalNotes: String
    }

    input CompanyInput {
      id: String
      name: String
      city: String
      state: String
      url: String
      contacts: [ContactInput]
    }

    input AddContactInput {
      companyId: String
      newContact: ContactInput
    }

    input SourceInput {
      id: String
      name: String
      url: String
      jobLeadIds: [String]
    }

    input JobLeadInput {
      id: String
      title: String
      companyId: String
      firstContactDate: Date
      lastContactDate: Date
      status: Status
      sourceId: String
      url: String
      description: String
    }

    input NextStepInput{
      leadId: String
      nextContactDate: Date
      nextStep: String
    }

    type Mutation{
      addJobLead(jobLead: JobLeadInput): JobLead
      updateNextSteps(nextStep: NextStepInput): JobLead
      addCompany(company: CompanyInput): Company
      addContactToCompany(updateInfo: AddContactInput): Company
      addSource(source: SourceInput): Source
    }
`



export default typeDefs