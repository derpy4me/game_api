import { prisma } from './db'

export default {
  Query: {
    publisher: async (parent: any, args: any) => {
      return await prisma.publisher.findUnique({
        where: {
          id: args.id,
        },
      })
    },
    publishers: async (parent: any, args: any) => {
      return await prisma.publisher.findMany()
    },
    platform: async (parent: any, args: any) => {
      return await prisma.platform.findUnique({
        where: {
          id: args.id,
        },
      })
    },
    platforms: async (parent: any, args: any) => {
      return await prisma.platform.findMany()
    },
    game: async (parent: any, args: any) => {
      return await prisma.game.findUnique({
        where: {
          id: args.id,
        },
      })
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
          platforms: {
            create: args.platforms,
          },
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
    removeGameFromPlatform: async (parent: any, args: any) => {
      return await prisma.gamePlatform.delete({
        where: {
          gameId_platformId: args.link.gameId,
        },
      })
    },
  },
}
