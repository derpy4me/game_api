import { PrismaClient } from '@prisma/client'

// We create the prisma client for interacting with the database
const prisma = new PrismaClient()

export { prisma }
