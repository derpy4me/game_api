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
        createPlatform: (parent, args) => __awaiter(void 0, void 0, void 0, function* () {
            return yield db_1.prisma.platform.create({
                data: {
                    name: args.name,
                    founded: args.founded,
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
                },
            });
        }),
    },
};
exports.resolvers = resolvers;
//# sourceMappingURL=schema.js.map