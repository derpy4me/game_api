import { gql } from 'apollo-server'
import { prisma } from './db'
import { DateTimeResolver } from 'graphql-scalars'

const typeDefs = gql`
  scalar DateTime

  type Publisher {
    id: ID!
    name: String!
    founded: Int!
  }

  type Platform {
    id: ID!
    name: String!
    founded: Int!
  }

  type GamePlatform {
    game: Game!
    gameId: Int!
    platform: Platform!
    platformId: Int!
    added: DateTime!
  }

  type Game {
    id: ID!
    title: String!
    publishedYear: DateTime!
    publisher: Publisher!
    publisherId: Int!
    playableHours: Int!
  }

  type Query {
    # games: [Game]!
    publishers: [Publisher]!
    platforms: [Platform]!
  }

  # type Mutation {
  #   createDraft(content: String, title: String!): Post!
  #   publish(id: ID!): Post
  # }
`

const resolvers: any = {
  Query: {
    publishers: (parent: any, args: any) => {
      return prisma.publisher.findMany()
    },
    platforms: (parent: any, args: any) => {
      return prisma.platform.findMany()
    },
  },
}

export { resolvers, typeDefs }
