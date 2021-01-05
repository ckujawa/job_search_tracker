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
      roleTitle: String!
      company: Company!
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