import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

function handle_async_func(func: Function, args: any) {
  func(args)
    .then(async () => {
      await prisma.$disconnect()
    })
    .catch(async (e: any) => {
      console.error(e)
      await prisma.$disconnect()
      process.exit(1)
    })
}

async function seed_database() {
  const publisher = await prisma.publisher.create({
    data: {
      name: 'activision',
      founded: 1979,
    },
  })
  const platform = await prisma.platform.create({
    data: {
      name: 'steam',
      founded: 2003,
    },
  })
  console.log(publisher)
  console.log(platform)
}

async function get_publisher(publisherId: any) {
  const publisher = await prisma.publisher.findFirst({
    where: {
      id: publisherId,
    },
  })
  console.log(publisher)
}

async function get_platform(platformId: any) {
  const platform = await prisma.platform.findFirst({
    where: {
      id: platformId,
    },
  })
  console.log(platform)
}

// handle_async_func(seed_database)
// handle_async_func(get_publisher)
handle_async_func(get_platform, 1)

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
