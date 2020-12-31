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
      id: Int
      firstName: String!
      lastName: String!
      title: String

    }

    type Company{
      id: Int
      name: String!
      city: String
      state: String
      zipCode: String
      url: String
      contacts: [Contact]
    }

    type JobLead {
      id: Int
      roleTitle: String!
      company: Company!
      source: String!
      url: String!
      firstContactDate: Date!
      lastContactDate: Date!
      status: Status
    }

    type Query {
      jobLeads: [JobLead]
      jobLead(id: String): JobLead
      companies: [Company]
      contacts: [Contact]
    }
`



export default typeDefs