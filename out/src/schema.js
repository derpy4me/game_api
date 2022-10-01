"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.resolvers = exports.typeDefs = void 0;
const apollo_server_1 = require("apollo-server");
const db_1 = require("./db");
const typeDefs = (0, apollo_server_1.gql) `
  # scalar DateTime

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
    publishedYear: Int
    publisherId: Int
    playableHours: Int
    platforms: [GamePlatformLinkInput]
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
      publishedYear: DateTime!
      publisherId: Int!
      playableHours: Int!
      platforms: [GamePlatformLinkInput]
    ): Game!
    updateGame(game: UpdateGameInput!): Game
    deleteGame(game: DeleteGameInput!): Game
    removeGameFromPlatform(link: removeGameFromPlatformInput): Game
  }
`;
exports.typeDefs = typeDefs;
const resolvers = {
    Query: {
        publishers: (parent, args) => __awaiter(void 0, void 0, void 0, function* () {
            return yield db_1.prisma.publisher.findMany();
        }),
        platforms: (parent, args) => __awaiter(void 0, void 0, void 0, function* () {
            return yield db_1.prisma.platform.findMany();
        }),
        games: (parent, args) => __awaiter(void 0, void 0, void 0, function* () {
            let games = yield db_1.prisma.game.findMany({
                include: {
                    publisher: { include: { Game: false } },
                    platforms: { include: { platform: true } },
                },
            });
            return games.map((game) => {
                return Object.assign(Object.assign({}, game), { platforms: game === null || game === void 0 ? void 0 : game.platforms.map((platform) => {
                        return {
                            id: platform.platformId,
                            name: platform.platform.name,
                            founded: platform.platform.founded,
                            added: platform.added,
                        };
                    }) });
            });
        }),
    },
    Mutation: {
        createPublisher: (parent, args) => __awaiter(void 0, void 0, void 0, function* () {
            return yield db_1.prisma.publisher.create({
                data: {
                    name: args.name,
                    founded: args.founded,
                },
            });
        }),
        updatePublisher: (parent, args) => __awaiter(void 0, void 0, void 0, function* () {
            return yield db_1.prisma.publisher.update({
                where: {
                    id: args.publisher.id,
                },
                data: {
                    name: args.publisher.name,
                    founded: args.publisher.founded,
                },
            });
        }),
        deletePublisher: (parent, args) => __awaiter(void 0, void 0, void 0, function* () {
            return yield db_1.prisma.publisher.delete({
                where: {
                    id: args.publisher.id,
                    name: args.publisher.name,
                },
            });
        }),
        createPlatform: (parent, args) => __awaiter(void 0, void 0, void 0, function* () {
            return yield db_1.prisma.platform.create({
                data: {
                    name: args.name,
                    founded: args.founded,
                },
            });
        }),
        updatePlatform: (parent, args) => __awaiter(void 0, void 0, void 0, function* () {
            return yield db_1.prisma.publisher.update({
                where: {
                    id: args.publisher.id,
                },
                data: {
                    name: args.publisher.name,
                    founded: args.publisher.founded,
                },
            });
        }),
        deletePlatform: (parent, args) => __awaiter(void 0, void 0, void 0, function* () {
            return yield db_1.prisma.publisher.delete({
                where: {
                    id: args.publisher.id,
                    name: args.publisher.name,
                },
            });
        }),
        createGame: (parent, args) => __awaiter(void 0, void 0, void 0, function* () {
            return yield db_1.prisma.game.create({
                data: {
                    title: args.title,
                    publishedYear: args.publishedYear,
                    playableHours: args.playableHours,
                    publisherId: args.publisherId,
                    platforms: {
                        create: args.platforms,
                    },
                },
            });
        }),
        updateGame: (parent, args) => __awaiter(void 0, void 0, void 0, function* () {
            return yield db_1.prisma.game.update({
                where: {
                    id: args.game.id,
                },
                data: {
                    title: args.game.title,
                    publishedYear: args.game.publishedYear,
                    playableHours: args.game.playableHours,
                    publisherId: args.publisherId,
                },
            });
        }),
        deleteGame: (parent, args) => __awaiter(void 0, void 0, void 0, function* () {
            return yield db_1.prisma.game.delete({
                where: {
                    id: args.game.id,
                    title: args.game.title,
                },
            });
        }),
        removeGameFromPlatform: (parent, args) => __awaiter(void 0, void 0, void 0, function* () {
            return yield db_1.prisma.gamePlatform.delete({
                where: {
                    gameId_platformId: args.link.gameId,
                },
            });
        }),
    },
};
exports.resolvers = resolvers;
//# sourceMappingURL=schema.js.map