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

  input DeleteGameInput {
    id: Int
    title: String
  }
  input UpdateGameInput {
    id: Int!
    title: String
    publishedYear: DateTime
    publisherId: Int
    playableHours: Int
  }

  input DeletePlatformInput {
    id: Int
    name: String
  }
  input UpdatePlatformInput {
    id: Int
    name: String
    founded: Int
  }

  input DeletePublisherInput {
    id: Int
    name: String
  }
  input UpdatePublisherInput {
    id: Int!
    name: String
    founded: Int
  }

  type Mutation {
    createPublisher(name: String!, founded: Int!): Publisher!
    updatePublisher(publisher: UpdatePublisherInput!): Publisher
    deletePublisher(publisher: DeletePublisherInput!): Publisher

    createPlatform(name: String!, founded: Int!): Platform!
    updatePlatform(platform: UpdatePlatformInput!): Platform
    deletePlatform(platform: DeletePlatformInput!): Platform

    createGame(
      title: String!
      publishedYear: DateTime!
      publisherId: Int!
      playableHours: Int!
    ): Game!
    updateGame(game: UpdateGameInput!): Game
    deleteGame(game: DeleteGameInput!): Game
  }
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
  Mutation: {
    createPublisher: async (parent: any, args: any) => {
      return await prisma.publisher.create({
        data: {
          name: args.name,
          founded: args.founded,
        },
      })
    },
    updatePublisher: async (parent: any, args: any) => {
      return await prisma.publisher.update({
        where: {
          id: args.publisher.id,
        },
        data: {
          name: args.publisher.name,
          founded: args.publisher.founded,
        },
      })
    },
    deletePublisher: async (parent: any, args: any) => {
      return await prisma.publisher.delete({
        where: {
          id: args.publisher.id,
          name: args.publisher.name,
        },
      })
    },
    createPlatform: async (parent: any, args: any) => {
      return await prisma.platform.create({
        data: {
          name: args.name,
          founded: args.founded,
        },
      })
    },
    updatePlatform: async (parent: any, args: any) => {
      return await prisma.publisher.update({
        where: {
          id: args.publisher.id,
        },
        data: {
          name: args.publisher.name,
          founded: args.publisher.founded,
        },
      })
    },
    deletePlatform: async (parent: any, args: any) => {
      return await prisma.publisher.delete({
        where: {
          id: args.publisher.id,
          name: args.publisher.name,
        },
      })
    },
    createGame: async (parent: any, args: any) => {
      return await prisma.game.create({
        data: {
          title: args.title,
          publishedYear: args.publishedYear,
          playableHours: args.playableHours,
          publisherId: args.publisherId,
        },
      })
    },
    updateGame: async (parent: any, args: any) => {
      return await prisma.game.update({
        where: {
          id: args.game.id,
        },
        data: {
          title: args.game.title,
          publishedYear: args.game.publishedYear,
          playableHours: args.game.playableHours,
          publisherId: args.publisherId,
        },
      })
    },
    deleteGame: async (parent: any, args: any) => {
      return await prisma.game.delete({
        where: {
          id: args.game.id,
          title: args.game.title,
        },
      })
    },
  },
}

export { typeDefs, resolvers }
