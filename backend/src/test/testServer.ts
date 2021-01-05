import { createTestClient, ApolloServerTestClient } from 'apollo-server-testing'
import { ApolloServer } from 'apollo-server-express'
import resolvers from '../resolvers/resolvers'
import typeDefs from '../schema/schema.graphql'

const testServer = (dataSources: any): ApolloServerTestClient => {
    return createTestClient(
        new ApolloServer({typeDefs, resolvers, dataSources}) as any
    )
}

export default testServer