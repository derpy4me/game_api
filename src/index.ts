import { ApolloServer } from 'apollo-server'

import { resolvers, typeDefs } from './schema'

const port = process.env.PORT || 4000

const server = new ApolloServer({
  resolvers,
  typeDefs,
}).listen({ port }, () => console.log(`Server listening on ${port}`))
