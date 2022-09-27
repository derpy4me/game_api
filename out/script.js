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
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
function handle_async_func(func, args) {
    func(args)
        .then(() => __awaiter(this, void 0, void 0, function* () {
        yield prisma.$disconnect();
    }))
        .catch((e) => __awaiter(this, void 0, void 0, function* () {
        console.error(e);
        yield prisma.$disconnect();
        process.exit(1);
    }));
}
function seed_database() {
    return __awaiter(this, void 0, void 0, function* () {
        const publisher = yield prisma.publisher.create({
            data: {
                name: 'activision',
                founded: 1979,
            },
        });
        const platform = yield prisma.platform.create({
            data: {
                name: 'steam',
                founded: 2003,
            },
        });
        const game = yield prisma.game.create({
            data: {
                title: 'call of duty',
                publishedYear: new Date(2003, 10, 29),
                publisherId: 1,
                playableHours: 7,
                platforms: {
                    create: { added: new Date(2003, 10, 29), platformId: 1 },
                },
            },
        });
        console.log(publisher);
        console.log(platform);
    });
}
function get_publisher(publisherId) {
    return __awaiter(this, void 0, void 0, function* () {
        const publisher = yield prisma.publisher.findFirst({
            where: {
                id: publisherId,
            },
        });
        console.log(publisher);
    });
}
function get_platform(platformId) {
    return __awaiter(this, void 0, void 0, function* () {
        const platform = yield prisma.platform.findFirst({
            where: {
                id: platformId,
            },
        });
        console.log(platform);
    });
}
function get_game(gameId) {
    return __awaiter(this, void 0, void 0, function* () {
        const game = yield prisma.game.findFirst({
            where: {
                id: gameId,
            },
            include: {
                platforms: { include: { platform: true } },
            },
        });
        const result = Object.assign(Object.assign({}, game), { platforms: game === null || game === void 0 ? void 0 : game.platforms.map((platform) => {
                const a_platform = {
                    id: platform.platformId,
                    name: platform.platform.name,
                    founded: platform.platform.founded,
                    added: platform.added,
                };
                return a_platform;
            }) });
        console.log(result);
    });
}
// handle_async_func(seed_database, null)
// handle_async_func(get_publisher)
// handle_async_func(get_platform, 1)
handle_async_func(get_game, 1);
// async function main() {
//   const user = await prisma.user.create({
//     data: {
//       name: 'Alice',
//       email: 'alice@prisma.io',
//     },
//   })
//   console.log(user)
// }
// async function get_users() {
//   const users = await prisma.user.findMany()
//   console.log(users)
// }
// async function create_bob() {
//   const user = await prisma.user.create({
//     data: {
//       name: 'Bob',
//       email: 'bob@prisma.io',
//       posts: {
//         create: {
//           title: 'Hello Bob',
//         },
//       },
//     },
//   })
//   console.log(user)
// }
// async function get_users_with_posts() {
//   const users = await prisma.user.findMany({
//     include: {
//       posts: true,
//     },
//   })
//   console.dir(users, { depth: null })
// }
// ```npx prisma studio``` GUI to view and edit database.
//# sourceMappingURL=script.js.map