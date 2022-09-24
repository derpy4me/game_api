import { ApolloServer } from 'apollo-server'

import { resolvers, typeDefs } from './schema'

// const resolvers = {
//   Query: {
//     info: () => 'This is a video game API',
//   },
// }

const port = process.env.PORT || 4000

const server = new ApolloServer({
  resolvers,
  typeDefs,
}).listen({ port }, () => console.log(`Server listening on ${port}`))
