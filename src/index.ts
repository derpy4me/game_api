import { ApolloServer } from 'apollo-server'

import { resolvers, typeDefs } from './schema'

// Check if a port is specified in .env or use port 4000 by default.
const port = process.env.PORT || 4000

// The Apollo server sandbox is started here and the Graphql typeDefs and resolvers are passed in.
const server = new ApolloServer({
  resolvers,
  typeDefs,
}).listen({ port }, () => console.log(`Server listening on ${port}`))
