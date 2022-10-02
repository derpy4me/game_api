import { gql } from 'apollo-server'

// This is where we define objects for the GraphQL schemas. While similar to Prisma Models, they are only used in
// GraphQL for determining the data the user needs to input.
export default gql`
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

  type GamePlatformLink {
    id: Int
    name: String
    founded: Int
    added: Int
  }

  type Game {
    id: ID!
    title: String!
    publishedYear: Int!
    publisher: Publisher!
    publisherId: Int!
    playableHours: Int!
    platforms: [GamePlatformLink]
  }

  type Query {
    game(id: Int): Game
    games: [Game]
    publisher(id: Int): Publisher
    publishers: [Publisher]
    platform(id: Int): Platform
    platforms: [Platform]
  }

  input DeleteGameInput {
    id: Int
    title: String
  }
  input UpdateGameInput {
    id: Int!
    title: String
    publishedYear: Int
    publisherId: Int
    playableHours: Int
    platforms: [GamePlatformLinkInput]
  }

  input DeletePlatformInput {
    id: Int
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

  input GamePlatformLinkInput {
    added: Int!
    platformId: Int!
  }
  input removeGameFromPlatformInput {
    gameId: Int!
    platformId: Int!
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
      publishedYear: Int!
      publisherId: Int!
      playableHours: Int!
      platforms: [GamePlatformLinkInput]
    ): Game!
    updateGame(game: UpdateGameInput!): Game
    deleteGame(game: DeleteGameInput!): Game
    removeGameFromPlatform(link: removeGameFromPlatformInput): Game
  }
`

// export { typeDefs, resolvers }
