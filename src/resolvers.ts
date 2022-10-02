import { prisma } from './db'

export default {
  // Query will be all resolvers used to read the database.
  Query: {
    // We can query a publisher by an id
    publisher: async (parent: any, args: any) => {
      return await prisma.publisher.findUnique({
        where: {
          id: args.id,
        },
      })
    },
    // We get all publishers returned in a list
    publishers: async (parent: any, args: any) => {
      return await prisma.publisher.findMany()
    },
    // Get a platform by it's id
    platform: async (parent: any, args: any) => {
      return await prisma.platform.findUnique({
        where: {
          id: args.id,
        },
      })
    },
    // Get a list of all platforms in database
    platforms: async (parent: any, args: any) => {
      return await prisma.platform.findMany()
    },
    // Get a game from the database with it's id
    game: async (parent: any, args: any) => {
      return await prisma.game.findUnique({
        where: {
          id: args.id,
        },
      })
    },
    // Get a list of all games from the database.
    games: async (parent: any, args: any) => {
      let games = await prisma.game.findMany({
        include: {
          publisher: { include: { Game: false } }, // We do not want all the games associated with the publisher
          platforms: { include: { platform: true } }, // We want to include all platforms associated with this game
        },
      })
      // Below we are taking all platforms for this game object and creating a custom platform object to include the
      // time the game was added to the platform
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

  // Mutations are where Creating, Updating, and Deleting are done
  Mutation: {
    // We can create a publisher with a name and when it was founded
    createPublisher: async (parent: any, args: any) => {
      return await prisma.publisher.create({
        data: {
          name: args.name,
          founded: args.founded,
        },
      })
    },
    // Using the publisher's id we can update the name and when it was founded
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
    // We can delete the publisher by id or name
    deletePublisher: async (parent: any, args: any) => {
      return await prisma.publisher.delete({
        where: {
          id: args.publisher.id,
          name: args.publisher.name,
        },
      })
    },
    // Create a platform with name and when it was founded
    createPlatform: async (parent: any, args: any) => {
      return await prisma.platform.create({
        data: {
          name: args.name,
          founded: args.founded,
        },
      })
    },
    // Using the platform's id we can update the name and when it was founded
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
    // We can delete the platform by id
    deletePlatform: async (parent: any, args: any) => {
      return await prisma.platform.delete({
        where: {
          id: args.platform.id,
        },
      })
    },
    // We can create a game. Also included is a way to tie an existing platform to the game.
    createGame: async (parent: any, args: any) => {
      return await prisma.game.create({
        data: {
          title: args.title,
          publishedYear: args.publishedYear,
          playableHours: args.playableHours,
          publisherId: args.publisherId,
          platforms: {
            create: args.platforms, // We can tie the game on creation to multiple platforms.
          },
        },
      })
    },
    // We can update the game by it's id
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
    // We can delete the game by it's id or title
    deleteGame: async (parent: any, args: any) => {
      return await prisma.game.delete({
        where: {
          id: args.game.id,
          title: args.game.title,
        },
      })
    },
    // This function can remove a game from a platform.
    removeGameFromPlatform: async (parent: any, args: any) => {
      return await prisma.gamePlatform.delete({
        where: {
          gameId_platformId: args.link.gameId,
        },
      })
    },
  },
}
