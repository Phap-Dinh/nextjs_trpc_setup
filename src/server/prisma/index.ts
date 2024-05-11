import { PrismaClient } from '@prisma/client'

const prismaClientSingleton = () => {
  const prisma = new PrismaClient()

  return prisma
}

declare global {
  var prisma: undefined | ReturnType<typeof prismaClientSingleton>
}

export const prisma = globalThis.prisma ?? prismaClientSingleton()

if (process.env.NODE_ENV !== 'production') globalThis.prisma = prisma
