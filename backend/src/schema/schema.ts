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
    }

    type Company{
      id: String
      name: String
      city: String
      state: String
      url: String
      contacts: [Contact]
    }

    type JobLead {
      id: String
      title: String!
      company: Company!
      firstContactDate: Date!
      lastContactDate: Date!
      status: Status
    }

    type Query {
      jobLeads: [JobLead]
      jobLeadById(id: String): JobLead
      companies: [Company]
      contacts: [Contact]
    }

    input ContactInput {
      id: String
      firstName: String
      lastName: String
      title: String
      email: String
    }

    input CompanyInput {
      id: String
      name: String
      city: String
      state: String
      url: String
      contacts: [ContactInput]
    }

    input JobLeadInput {
      id: String
      title: String
      company: CompanyInput
      firstContactDate: Date
      lastContactDate: Date
      status: Status
    }

    type Mutation{
      addJobLead(jobLead: JobLeadInput): JobLead
    }
`



export default typeDefs