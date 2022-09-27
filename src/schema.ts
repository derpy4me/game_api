import { gql } from 'apollo-server'
import { prisma } from './db'
import { DateTimeResolver } from 'graphql-scalars'
import { platform } from 'os'

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
    games: [Game]
  }

  type Game {
    id: ID!
    title: String!
    publishedYear: DateTime!
    publisher: Publisher!
    publisherId: Int!
    playableHours: Int!
    platforms: [Platform]
  }

  type Query {
    games: [Game]
    publishers: [Publisher]
    platforms: [Platform]
  }

  # type Mutation {
  #   createDraft(content: String, title: String!): Post!
  #   publish(id: ID!): Post
  # }
`

const resolvers: any = {
  Query: {
    publishers: async (parent: any, args: any) => {
      return await prisma.publisher.findMany()
    },
    platforms: async (parent: any, args: any) => {
      return await prisma.platform.findMany()
    },
    games: async (parent: any, args: any) => {
      let games = await prisma.game.findMany({
        include: {
          publisher: { include: { Game: false } },
          platforms: { include: { platform: true } },
        },
      })
      return games.map((game) => {
        return {
          ...game,
          platforms: game?.platforms.map((platform) => {
            return {
              id: platform.platformId,
              name: platform.platform.name,
              founded: platform.platform.founded,
              added: platform.added,
            }
          }),
        }
      })
    },
  },
}

export { resolvers, typeDefs }
